import { NextResponse } from "next/server";
import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function POST(request: Request) {
  try {
    // 1. Get the raw IP from Vercel headers
    let ip = 
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() || 
      request.headers.get("x-real-ip") || 
      "unknown";

    let city = request.headers.get("x-vercel-ip-city") || "Unknown City";
    let country = request.headers.get("x-vercel-ip-country") || "Unknown Country";

    // 2. If Vercel gives "Unknown City" (common on mobile networks or localhost), 
    // fetch precise location using a free public IP API
    if ((city === "Unknown City" || !city) && ip !== "unknown" && ip !== "127.0.0.1") {
      try {
        const geoRes = await fetch(`http://ipwho.is/${ip}`);
        const geoData = await geoRes.json();
        if (geoData.success) {
          city = geoData.city || city;
          country = geoData.country || country;
        }
      } catch (e) {
        console.error("Geo lookup failed", e);
      }
    }

    const userAgent = request.headers.get("user-agent") || "Unknown Device";
    const body = await request.json().catch(() => ({}));

    // Save accurate details to database
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
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}