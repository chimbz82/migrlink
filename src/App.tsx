import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, FileText, Activity, AlertTriangle, UploadCloud } from 'lucide-react';
import { Toaster, toast } from 'sonner';

interface DashboardStats {
  healthScore: number;
  stats: {
    workers: number;
    documents: number;
    events: number;
  };
}

interface Worker {
  id: string;
  legal_name_first: string;
  legal_name_last: string;
  sa_verification_id: string;
  visa_expiry: string;
  created_at: string;
}

interface ComplianceEvent {
  id: string;
  event_type: string;
  payload: string;
  hash_prev: string | null;
  hash_self: string;
  created_at: string;
}

export default function App() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [events, setEvents] = useState<ComplianceEvent[]>([]);

  // Add Worker Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [saVerification, setSaVerification] = useState('');
  const [visaExpiry, setVisaExpiry] = useState('');

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/dashboard');
      if (res.ok) setStats(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchWorkers = async () => {
    try {
      const res = await fetch('/api/workers');
      if (res.ok) setWorkers((await res.json()).workers);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      if (res.ok) setEvents((await res.json()).events);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchWorkers();
    fetchEvents();
  }, []);

  const handleAddWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/workers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, saVerification, visaExpiry })
      });
      if (res.ok) {
        toast.success('Worker added successfully!');
        setFirstName(''); setLastName(''); setSaVerification(''); setVisaExpiry('');
        fetchDashboard();
        fetchWorkers();
        fetchEvents();
      }
    } catch (error) {
      toast.error('Failed to add worker');
    }
  };

  const handleDocUpload = async (workerId: string) => {
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workerId, documentType: 'passport', fileName: 'passport_scan.pdf' })
      });
      if (res.ok) {
        toast.success("Document uploaded & compliance event chained!");
        fetchDashboard();
        fetchEvents();
      }
    } catch (error) {
      toast.error('Failure');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 flex flex-col font-sans">
      <Toaster />
      
      {/* Header */}
      <header className="px-6 py-4 border-b bg-white dark:bg-neutral-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-indigo-600" />
          <span className="font-bold text-xl tracking-tight">MigraLink</span>
        </div>
        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200">
          UKVI Regulated Sponsor (Demo)
        </Badge>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Sponsor Dashboard</h1>
          <p className="text-neutral-500">Manage Southern Africa talent compliance and visa tracking.</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workers">Workers Pipeline</TabsTrigger>
            <TabsTrigger value="compliance">Immutable Audit Log</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Compliance Health</CardTitle>
                  <Activity className="h-4 w-4 text-neutral-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-600">
                    {stats?.healthScore ?? 100}/100
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">Based on active documents & expiries</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
                  <Users className="h-4 w-4 text-neutral-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats?.stats.workers ?? 0}</div>
                  <p className="text-xs text-neutral-500 mt-1">Under sponsorship</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Verified Documents</CardTitle>
                  <FileText className="h-4 w-4 text-neutral-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats?.stats.documents ?? 0}</div>
                  <p className="text-xs text-neutral-500 mt-1">Passports, CoS, Contracts</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Immutable Events</CardTitle>
                  <ShieldCheck className="h-4 w-4 text-neutral-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats?.stats.events ?? 0}</div>
                  <p className="text-xs text-neutral-500 mt-1">Chain length</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workers" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Add Worker</CardTitle>
                    <CardDescription>Onboard a new sponsored worker.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddWorker} className="space-y-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input required value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Jane" />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input required value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label>SA ID Verification</Label>
                        <Input value={saVerification} onChange={e => setSaVerification(e.target.value)} placeholder="SA ID Number" />
                      </div>
                      <div className="space-y-2">
                        <Label>Visa Expiry</Label>
                        <Input type="date" required value={visaExpiry} onChange={e => setVisaExpiry(e.target.value)} />
                      </div>
                      <Button type="submit" className="w-full">Create Profile</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2 space-y-4">
                <h3 className="font-semibold text-lg">Active Personnel ({workers.length})</h3>
                {workers.map(worker => (
                  <Card key={worker.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{worker.legal_name_first} {worker.legal_name_last}</p>
                        <p className="text-sm text-neutral-500">ID: {worker.id.slice(0, 8)}... | Visa Expiry: {worker.visa_expiry}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleDocUpload(worker.id)}>
                          <UploadCloud className="w-4 h-4 mr-2" /> Upload Doc stub
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {workers.length === 0 && (
                  <div className="p-8 border border-dashed rounded-lg text-center text-neutral-500">
                    No workers added yet.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compliance">
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-indigo-600" />
                  Hash-Chained System of Record
                </CardTitle>
                <CardDescription>
                  Every change is cryptographically linked. Tamper-evident by design for UKVI audits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Hash Prev</TableHead>
                        <TableHead>Hash Self</TableHead>
                        <TableHead>Data</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events.map((evt) => (
                        <TableRow key={evt.id} className="font-mono text-xs">
                          <TableCell className="whitespace-nowrap">{new Date(evt.created_at).toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={evt.event_type.includes('UPLOAD') ? 'default' : 'secondary'}>
                              {evt.event_type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-neutral-500 truncate max-w-[100px]" title={evt.hash_prev || 'GENESIS'}>
                            {evt.hash_prev ? evt.hash_prev.slice(0,12) + '...' : 'GENESIS'}
                          </TableCell>
                          <TableCell className="text-emerald-600 truncate max-w-[100px]" title={evt.hash_self}>
                            {evt.hash_self.slice(0,12)}...
                          </TableCell>
                          <TableCell className="truncate max-w-[200px]" title={evt.payload}>
                            {evt.payload}
                          </TableCell>
                        </TableRow>
                      ))}
                      {events.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-neutral-500 font-sans">
                            No events recorded. Add a worker to begin the chain.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
