import { NextResponse } from "next/server";
import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Setup adapter for Prisma 7
const adapter = new PrismaPg({ connectionString: process.env.POSTGRES_PRISMA_URL_PRISMA_DATABASE_URL});
const prisma = new PrismaClient({ adapter });

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const city = request.headers.get("x-vercel-ip-city") || "Unknown City";
    const country = request.headers.get("x-vercel-ip-country") || "Unknown Country";
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