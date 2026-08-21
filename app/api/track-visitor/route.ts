import { NextResponse } from "next/server";
import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.POSTGRES_PRISMA_URL_PRISMA_DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const TIMEOUT_MS = 4000;

// Helper to fetch with a strict timeout
async function fetchWithTimeout(url: string) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

// Multi-provider fallback geolocator
async function fetchGeoDataWithFallbacks(ip: string) {
  const strategies = [
    {
      name: "ip-api",
      url: `http://ip-api.com/json/${ip}`,
      parse: (data: any) => (data.status === "success" ? { city: data.city, country: data.country } : null),
    },
    {
      name: "ipwhois",
      url: `https://ipwho.is/${ip}`,
      parse: (data: any) => (data.success ? { city: data.city, country: data.country } : null),
    },
    {
      name: "freeipapi",
      url: `https://freeipapi.com/api/json/${ip}`,
      parse: (data: any) => (data.cityName ? { city: data.cityName, country: data.countryName } : null),
    },
  ];

  for (const strategy of strategies) {
    try {
      const data = await fetchWithTimeout(strategy.url);
      const result = strategy.parse(data);
      if (result && result.city && result.country) {
        return result;
      }
    } catch (error) {
      console.warn(`[GeoIP] Provider ${strategy.name} failed:`, error instanceof Error ? error.message : error);
    }
  }

  return null;
}

export async function POST(request: Request) {
  try {
    let ip = 
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() || 
      request.headers.get("x-real-ip") || 
      "unknown";

    let city = request.headers.get("x-vercel-ip-city") || "Unknown City";
    let country = request.headers.get("x-vercel-ip-country") || "Unknown Country";

    // If Vercel gives unknown/missing location, fall back to multi-provider chain
    const isLocalIP = ip === "unknown" || ip === "127.0.0.1" || ip.startsWith("192.168.") || ip.startsWith("10.");
    if ((!city || city === "Unknown City" || !country || country === "Unknown Country") && !isLocalIP) {
      const geoData = await fetchGeoDataWithFallbacks(ip);
      if (geoData) {
        city = geoData.city || city;
        country = geoData.country || country;
      }
    }

    const userAgent = request.headers.get("user-agent") || "Unknown Device";
    const body = await request.json().catch(() => ({}));

    await prisma.visitor.create({
      data: {
        ip,
        city: decodeURIComponent(city),
        country,
        userAgent,
        path: body.path || "/",
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Visitor tracking error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}