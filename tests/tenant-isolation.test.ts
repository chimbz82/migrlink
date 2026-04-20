import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db } from '../src/db/index'; // Import neon db instance
import { organizations, workers } from '../packages/db/schema';
import { sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

// Simple Integration Test demonstrating Tenant Isolation using Postgres RLS simulation

describe('Tenant Isolation / RLS Logic', () => {
  const orgA_id = 'org_A_' + Date.now();
  const orgB_id = 'org_B_' + Date.now();

  beforeEach(async () => {
    // Setup two distinct orgs
    await db.insert(organizations).values([
      { id: orgA_id, name: 'Org A Ltd', sponsorLicenceNumber: 'SA101' },
      { id: orgB_id, name: 'Org B Ltd', sponsorLicenceNumber: 'SB202' }
    ]);

    // Insert Workers
    await db.insert(workers).values([
      {
        id: uuidv4(),
        organizationId: orgA_id,
        legalNameComponents: { first: 'Alice', last: 'A' },
        dateOfBirth: new Date(),
        nationality: 'ZAF'
      },
      {
        id: uuidv4(),
        organizationId: orgB_id,
        legalNameComponents: { first: 'Bob', last: 'B' },
        dateOfBirth: new Date(),
        nationality: 'ZWE'
      }
    ]);
  });

  afterEach(async () => {
    // Clean up
    await db.delete(organizations).where(sql`id IN (${orgA_id}, ${orgB_id})`);
  });

  it('ensures queries parameterized with orgA only return orgA workers (App Layer Check)', async () => {
    const resultOrgA = await db.select().from(workers).where(sql`organization_id = ${orgA_id}`);
    expect(resultOrgA.length).toBe(1);
    expect(resultOrgA[0].legalNameComponents.first).toBe('Alice');
    
    const resultOrgB = await db.select().from(workers).where(sql`organization_id = ${orgB_id}`);
    expect(resultOrgB.length).toBe(1);
    expect(resultOrgB[0].legalNameComponents.first).toBe('Bob');
  });

  it('ensures true RLS drops cross-tenant reads entirely (DB Layer Check)', async () => {
    // Simulate transaction under Org A context
    await db.transaction(async (tx) => {
      // Set Postgres Session Variable for RLS (Assuming Policy requires it)
      await tx.execute(sql`SET LOCAL app.current_organization_id = ${orgA_id}`);
      
      // Query without explicit WHERE clause - should be restricted by RLS POLICY inside PG
      const restrictedResult = await tx.select().from(workers);
      
      // Even without a WHERE clause, it only gets Alice
      restrictedResult.forEach(worker => {
        expect(worker.organizationId).toBe(orgA_id);
      });
    });
  });
});