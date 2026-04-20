import express from 'express';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './src/db/schema.js';
import crypto from 'crypto';
import path from 'path';

// Generate Hash function for Compliance Events
function generateHash(data: string, prevHash: string | null = null): string {
  const hash = crypto.createHash('sha256');
  if (prevHash) {
    hash.update(prevHash);
  }
  hash.update(data);
  return hash.digest('hex');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Database setup
  const sqlite = new Database('data.db');
  
  // Set WAL mode for better concurrency
  sqlite.pragma('journal_mode = WAL');

  // Simple table initialization (for prototype)
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS organizations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      ukvi_license_number TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      organization_id TEXT REFERENCES organizations(id),
      email TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS workers (
      id TEXT PRIMARY KEY,
      organization_id TEXT REFERENCES organizations(id),
      legal_name_first TEXT NOT NULL,
      legal_name_last TEXT NOT NULL,
      sa_verification_id TEXT,
      visa_expiry TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS compliance_events (
      id TEXT PRIMARY KEY,
      organization_id TEXT REFERENCES organizations(id),
      worker_id TEXT REFERENCES workers(id),
      event_type TEXT NOT NULL,
      payload TEXT NOT NULL,
      hash_prev TEXT,
      hash_self TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      organization_id TEXT REFERENCES organizations(id),
      worker_id TEXT REFERENCES workers(id),
      file_name TEXT NOT NULL,
      document_type TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const db = drizzle(sqlite, { schema });

  // Seed default org
  const orgCount = sqlite.prepare('SELECT count(*) as count FROM organizations').get() as { count: number };
  if (orgCount.count === 0) {
    sqlite.prepare('INSERT INTO organizations (id, name, ukvi_license_number) VALUES (?, ?, ?)').run(
      'org_1', 'Acme Corp (UK)', 'A1234567'
    );
  }

  // --- API Routes ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'MigraLink core running.' });
  });

  // Get workers
  app.get('/api/workers', (req, res) => {
    const workers = sqlite.prepare('SELECT * FROM workers').all();
    res.json({ workers });
  });

  // Add a worker
  app.post('/api/workers', (req, res) => {
    const { firstName, lastName, saVerification, visaExpiry } = req.body;
    const workerId = crypto.randomUUID();
    
    sqlite.prepare(`
      INSERT INTO workers (id, organization_id, legal_name_first, legal_name_last, sa_verification_id, visa_expiry) 
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(workerId, 'org_1', firstName, lastName, saVerification, visaExpiry);

    // Emit compliance event
    logComplianceEvent('org_1', workerId, 'WORKER_ADDED', JSON.stringify({ firstName, lastName, action: 'Worker profile created' }));

    res.json({ status: 'success', workerId });
  });

  app.get('/api/events', (req, res) => {
     const events = sqlite.prepare('SELECT * FROM compliance_events ORDER BY created_at DESC').all();
     res.json({ events });
  });

  // Upload document stub
  app.post('/api/documents', (req, res) => {
    const { workerId, documentType, fileName } = req.body;
    const docId = crypto.randomUUID();

    sqlite.prepare(`
      INSERT INTO documents (id, organization_id, worker_id, file_name, document_type, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(docId, 'org_1', workerId, fileName, documentType, 'pending');

    logComplianceEvent('org_1', workerId, 'DOCUMENT_UPLOADED', JSON.stringify({ docId, documentType, fileName }));

    res.json({ status: 'success', docId });
  });

  app.get('/api/dashboard', (req, res) => {
    const workerCount = sqlite.prepare("SELECT count(*) as count FROM workers").get() as {count: number};
    const documentCount = sqlite.prepare("SELECT count(*) as count FROM documents").get() as {count: number};
    const eventCount = sqlite.prepare("SELECT count(*) as count FROM compliance_events").get() as {count: number};

    // Calculate score based on missing docs or something simple
    const score = 100 - (workerCount.count > 0 ? (workerCount.count * 10 - documentCount.count * 5) : 0);
    const clampedScore = Math.max(0, Math.min(100, score));

    res.json({
        healthScore: clampedScore,
        stats: {
            workers: workerCount.count,
            documents: documentCount.count,
            events: eventCount.count
        }
    });
  });

  // Helper for hash-chained events
  function logComplianceEvent(orgId: string, workerId: string, eventType: string, payload: string) {
    const lastEvent = sqlite.prepare('SELECT hash_self FROM compliance_events WHERE organization_id = ? ORDER BY created_at DESC LIMIT 1').get(orgId) as { hash_self: string } | undefined;
    
    const prevHash = lastEvent ? lastEvent.hash_self : null;
    const eventId = crypto.randomUUID();
    const selfHash = generateHash(payload + eventId + eventType, prevHash);

    sqlite.prepare(`
      INSERT INTO compliance_events (id, organization_id, worker_id, event_type, payload, hash_prev, hash_self)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(eventId, orgId, workerId, eventType, payload, prevHash, selfHash);
  }

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
