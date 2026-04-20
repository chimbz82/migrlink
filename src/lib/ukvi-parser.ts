import Papa from 'papaparse';
import { db } from './index';
import { organizations } from '../../packages/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Downloads and parses the latest UKVI Register of Sponsors CSV.
 * URL: https://assets.publishing.service.gov.uk/media/69e1f75798c6c9802f7eda18/2026-04-17_-_Worker_and_Temporary_Worker.csv
 * 
 * Note: UKVI updates this roughly every day. We extract only what we need and cache
 * the licence status against our enrolled tenants.
 */
export async function syncUkviSponsorRegister(csvUrl: string) {
  console.log(`Starting UKVI CSV Sync from: ${csvUrl}`);
  
  try {
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error(`UKVI Fetch Failed: ${response.statusText}`);
    
    const csvContent = await response.text();
    
    // Parse using PapaParse
    const parsed = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
    });
    
    if (parsed.errors.length > 0 && parsed.errors[0].type !== 'Delimiter') {
      console.warn("UKVI CSV Parsing warnings:", parsed.errors);
    }

    const ukviData = parsed.data as Array<{
      'Organisation Name': string;
      'Town/City': string;
      'County': string;
      'Type & Rating': string;
      'Route': string;
    }>;
    
    const syncTimestamp = new Date().toISOString();

    // Map by approximate Name (since UKVI CSV hides Licence Numbers for public) 
    // OR if we manage to scrape a better dataset. For this MVP, we fuzzy-match or exact-match names.
    // In production, we'd verify using the specific route & town. Let's do exact match for MVP.

    const allMatchedTenants = await db.select().from(organizations);

    let updatedCount = 0;
    
    for (const tenant of allMatchedTenants) {
      // Find within UKVI list
      const ukviRecord = ukviData.find(record => 
        record['Organisation Name'].trim().toLowerCase() === tenant.name.trim().toLowerCase()
      );
      
      if (ukviRecord) {
        // Extract Rating (e.g. "Worker (A rating)")
        const ratingMatch = ukviRecord['Type & Rating'].match(/\((.*?)\)/);
        const rating = ratingMatch ? ratingMatch[1] : ukviRecord['Type & Rating'];

        await db.update(organizations)
          .set({
            licenceRating: rating,
            ukviSyncState: {
              lastSyncedAt: syncTimestamp,
              status: 'MATCHED',
              county: ukviRecord['County']
            }
          })
          .where(eq(organizations.id, tenant.id));
          
        updatedCount++;
      } else {
         // Mark as potentially suspended or name mismatch
         await db.update(organizations)
          .set({
            ukviSyncState: {
               lastSyncedAt: syncTimestamp,
               status: 'NOT_FOUND_IN_REGISTER'
            }
          })
          .where(eq(organizations.id, tenant.id));
      }
    }
    
    console.log(`UKVI Sync Complete. ${updatedCount} tenants updated.`);
    return { success: true, updated: updatedCount };

  } catch (error) {
    console.error("UKVI Sync Error:", error);
    return { success: false, error };
  }
}