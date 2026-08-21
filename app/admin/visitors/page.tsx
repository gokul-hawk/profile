import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Globe, Shield, Clock, MapPin, Monitor } from "lucide-react";

// 1. Force Next.js to treat this page as dynamic
export const dynamic = "force-dynamic";

const adapter = new PrismaPg({ connectionString: process.env.POSTGRES_PRISMA_URL_PRISMA_DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function getVisitors() {
  return await prisma.visitor.findMany({
    orderBy: { timestamp: "desc" },
    take: 100, // Limit to last 100 visitors for performance
  });
}

export default async function AdminVisitorsPage() {
  const visitors = await getVisitors();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Globe className="text-emerald-400" /> Visitor Analytics
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Real-time telemetry and geolocation tracking for your portfolio.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Total Logs Tracked: {visitors.length}
          </div>
        </div>

        {/* Visitors Table Container */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 text-emerald-400 text-xs uppercase tracking-wider border-b border-slate-800">
                  <th className="p-4 font-semibold">Timestamp</th>
                  <th className="p-4 font-semibold">Location</th>
                  <th className="p-4 font-semibold">Coordinates</th>
                  <th className="p-4 font-semibold">Path</th>
                  <th className="p-4 font-semibold">Device & IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {visitors.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      No visitor records found yet.
                    </td>
                  </tr>
                ) : (
                  visitors.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-800/40 transition-colors">
                      {/* Timestamp */}
                      <td className="p-4 text-slate-300 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-slate-500" />
                          {new Date(v.timestamp).toLocaleString()}
                        </div>
                      </td>

                      {/* Location (City, Region, Country) */}
                      <td className="p-4">
                        <div className="font-medium text-white flex items-center gap-1.5">
                          <MapPin size={14} className="text-emerald-400 shrink-0" />
                          {v.city}, {v.region ? `${v.region}, ` : ""}{v.country}
                        </div>
                        {v.postalCode && (
                          <span className="text-xs text-slate-500 font-mono mt-0.5 block">
                            ZIP: {v.postalCode}
                          </span>
                        )}
                      </td>

                      {/* Coordinates */}
                      <td className="p-4 font-mono text-xs text-slate-400 whitespace-nowrap">
                        {v.latitude && v.longitude ? (
                          <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800 text-emerald-300">
                            {v.latitude.toFixed(2)}, {v.longitude.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-slate-600">N/A</span>
                        )}
                      </td>

                      {/* Path */}
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-950/50 border border-emerald-500/20 text-emerald-300 font-mono text-xs">
                          {v.path}
                        </span>
                      </td>

                      {/* Device & IP */}
                      <td className="p-4">
                        <div className="text-slate-300 text-xs truncate max-w-xs" title={v.userAgent}>
                          {v.userAgent}
                        </div>
                        <div className="text-slate-500 text-xs font-mono mt-0.5">
                          IP: {v.ip}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}