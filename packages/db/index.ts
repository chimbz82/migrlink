import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import * as schemaConsent from './schema-consent';

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema: { ...schema, ...schemaConsent } });

export * from './schema';
export * from './schema-consent';
