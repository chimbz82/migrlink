import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import * as schemaConsent from './schema-consent';

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  const sql = neon(url);
  return drizzle(sql, { schema: { ...schema, ...schemaConsent } });
}

let _db: ReturnType<typeof getDb> | undefined;

export const db = new Proxy({} as ReturnType<typeof getDb>, {
  get(_target, prop) {
    if (!_db) _db = getDb();
    return (_db as any)[prop];
  },
});

export * from './schema';
export * from './schema-consent';
