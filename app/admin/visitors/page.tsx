import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Reusing the same database connection setup
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function getVisitors() {
  // Fetch all visitors, sorted by newest first
  return await prisma.visitor.findMany({
    orderBy: { timestamp: "desc" },
  });
}

export default async function AdminVisitorsPage() {
  const visitors = await getVisitors();

  return (
    <div className="p-8 bg-white min-h-screen text-slate-800">
      <h1 className="text-3xl font-bold mb-6">Visitor Logs</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-emerald-50 text-emerald-900">
              <th className="p-3 border">Timestamp</th>
              <th className="p-3 border">City</th>
              <th className="p-3 border">Country</th>
              <th className="p-3 border">Device/Browser</th>
              <th className="p-3 border">Path</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((v) => (
              <tr key={v.id} className="border-b hover:bg-slate-50">
                <td className="p-3">{new Date(v.timestamp).toLocaleString()}</td>
                <td className="p-3">{v.city}</td>
                <td className="p-3">{v.country}</td>
                <td className="p-3 text-xs">{v.userAgent.substring(0, 50)}...</td>
                <td className="p-3 text-emerald-700 font-mono">{v.path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}