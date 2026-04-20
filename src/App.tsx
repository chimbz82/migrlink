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

import DashboardLayout from './components/DashboardLayout';
import SponsorDashboard from './components/SponsorDashboard';

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
    <DashboardLayout>
      <SponsorDashboard />
    </DashboardLayout>
  );
}
