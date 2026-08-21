import { NextResponse } from "next/server";
import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.POSTGRES_PRISMA_URL_PRISMA_DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const TIMEOUT_MS = 4000;

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

// Extracting granular details (Lat, Lon, Postal Code) from free providers
async function fetchDetailedGeoData(ip: string) {
  const strategies = [
    {
      name: "ip-api",
      url: `http://ip-api.com/json/${ip}?fields=status,city,country,regionName,lat,lon,zip`,
      parse: (data: any) => (data.status === "success" ? { 
        city: data.city, 
        country: data.country, 
        region: data.regionName,
        latitude: data.lat,
        longitude: data.lon,
        postalCode: data.zip
      } : null),
    },
    {
      name: "ipwhois",
      url: `https://ipwho.is/${ip}`,
      parse: (data: any) => (data.success ? { 
        city: data.city, 
        country: data.country, 
        region: data.region,
        latitude: data.latitude,
        longitude: data.longitude,
        postalCode: data.postal
      } : null),
    },
  ];

  for (const strategy of strategies) {
    try {
      const data = await fetchWithTimeout(strategy.url);
      const result = strategy.parse(data);
      if (result && result.city) return result;
    } catch (error) {
      console.warn(`[GeoIP] Provider ${strategy.name} failed`);
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

    let city = "Unknown City";
    let country = "Unknown Country";
    let region = "Unknown Region";
    let latitude: number | null = null;
    let longitude: number | null = null;
    let postalCode = "";

    const isLocalIP = ip === "unknown" || ip === "127.0.0.1" || ip.startsWith("192.168.");
    
    if (!isLocalIP) {
      const geoData = await fetchDetailedGeoData(ip);
      if (geoData) {
        city = geoData.city || city;
        country = geoData.country || country;
        region = geoData.region || region;
        latitude = geoData.latitude || null;
        longitude = geoData.longitude || null;
        postalCode = geoData.postalCode || "";
      }
    }

    const userAgent = request.headers.get("user-agent") || "Unknown Device";
    const body = await request.json().catch(() => ({}));

    // Make sure your Prisma Visitor model has fields for latitude/longitude if you want to save them!
    await prisma.visitor.create({
      data: {
        ip,
        city: decodeURIComponent(city),
        country,
        // region, latitude, longitude, postalCode (add these to your Prisma schema if needed)
        userAgent,
        path: body.path || "/",
      },
    });

    return NextResponse.json({ success: true, location: { city, country, latitude, longitude } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}