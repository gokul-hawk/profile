import { NextResponse } from "next/server";
import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function POST(request: Request) {
  try {
    let ip = 
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() || 
      request.headers.get("x-real-ip") || 
      "unknown";

    let city = request.headers.get("x-vercel-ip-city") || "Unknown City";
    let country = request.headers.get("x-vercel-ip-country") || "Unknown Country";

    // If Vercel gives "Unknown City", fetch precise location using HTTPS
    if ((city === "Unknown City" || !city) && ip !== "unknown" && ip !== "127.0.0.1") {
      try {
        // Changed http to https so Vercel allows the request
        const geoRes = await fetch(`https://ipwho.is/${ip}`);
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