import { db } from '@migralink/db';
import { workers, visas, complianceEvents } from '@migralink/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, ShieldCheck, Search } from 'lucide-react';

export default async function DashboardPage() {
  const { orgId } = auth();
  
  const allWorkers = await db.query.workers.findMany({ where: eq(workers.organizationId, orgId) });
  const allVisas = await db.query.visas.findMany({ where: eq(visas.organizationId, orgId) });
  
  const ninetyDaysFromNow = new Date();
  ninetyDaysFromNow.setDate(ninetyDaysFromNow.getDate() + 90);
  
  const expiringVisas = allVisas.filter(v => v.expiryDate && new Date(v.expiryDate) < ninetyDaysFromNow);
  const unusedCoS = allVisas.filter(v => v.status === 'unassigned');
  
  const deductions = (expiringVisas.length * 10) + (unusedCoS.length * 5);
  const healthScore = Math.max(0, 100 - deductions);
  
  const scoreColor = healthScore >= 90 ? 'text-emerald-500' : healthScore >= 70 ? 'text-amber-500' : 'text-red-500';

  const recentEvents = await db.query.complianceEvents.findMany({
    where: eq(complianceEvents.organizationId, orgId),
    orderBy: [desc(complianceEvents.occurredAt)],
    limit: 5
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="col-span-1 md:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm">Compliance Health Score</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <div className={`text-7xl font-black ${scoreColor}`}>{healthScore}</div>
            <div>
              <Badge variant={expiringVisas.length > 0 ? "destructive" : "secondary"}>{expiringVisas.length} Expiring Visas</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
