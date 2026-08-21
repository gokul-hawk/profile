import { NextResponse } from "next/server";
import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.POSTGRES_PRISMA_URL_PRISMA_DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");

  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function anonymizeIp(ip: string): string {
  if (ip === "unknown") {
    return ip;
  }

  // IPv4
  if (ip.includes(".")) {
    const parts = ip.split(".");

    if (parts.length === 4) {
      parts[3] = "0";
      return parts.join(".");
    }
  }

  // IPv6
  if (ip.includes(":")) {
    const parts = ip.split(":");

    if (parts.length > 3) {
      return parts.slice(0, 4).join(":") + "::";
    }
  }

  return ip;
}

export async function POST(request: Request) {
  try {
    // --------------------------------
    // 1. Get visitor IP
    // --------------------------------

    const rawIp = getClientIp(request);

    const ip =
      rawIp !== "127.0.0.1" && rawIp !== "::1"
        ? anonymizeIp(rawIp)
        : "unknown";

    // --------------------------------
    // 2. Get location from Vercel
    // --------------------------------

    let city =
      request.headers.get("x-vercel-ip-city") ||
      "Unknown City";

    let country =
      request.headers.get("x-vercel-ip-country") ||
      "Unknown Country";

    // --------------------------------
    // 3. Fallback IP geolocation
    // --------------------------------

    if (
      city === "Unknown City" &&
      rawIp !== "unknown" &&
      rawIp !== "127.0.0.1" &&
      rawIp !== "::1"
    ) {
      try {
        const geoResponse = await fetch(
          `https://ipwho.is/${encodeURIComponent(rawIp)}`,
          {
            cache: "no-store",
          }
        );

        if (geoResponse.ok) {
          const geoData = await geoResponse.json();

          if (geoData.success) {
            city = geoData.city || city;
            country = geoData.country || country;
          }
        }
      } catch (error) {
        console.error("Geo lookup failed:", error);
      }
    }

    // --------------------------------
    // 4. Get user agent
    // --------------------------------

    const userAgent =
      request.headers.get("user-agent") ||
      "Unknown Device";

    // --------------------------------
    // 5. Get request body
    // --------------------------------

    let body: { path?: string } = {};

    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const path =
      typeof body.path === "string" && body.path.length > 0
        ? body.path
        : "/";

    // --------------------------------
    // 6. Save visitor
    // --------------------------------

    await prisma.visitor.create({
      data: {
        ip,
        city: safeDecode(city),
        country,
        userAgent,
        path,
      },
    });

    // --------------------------------
    // 7. Success response
    // --------------------------------

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Visitor tracking error:", error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}