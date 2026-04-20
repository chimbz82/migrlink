# MigraLink Architecture

## Core Stack
* **Web App:** Next.js 15 (App Router), React, Tailwind CSS, shadcn/ui
* **API / Backend:** Node.js, Express (or Next API routes for serverless), Clerk Auth
* **Database:** Neon Serverless Postgres
* **ORM:** Drizzle ORM
* **Blob Storage:** Cloudflare R2 (London Region for UK compliance)
* **Background Jobs:** Inngest (Cron jobs, reminders)

## Monorepo Structure
* **apps/web**: User-facing portals (Sponsor Dashboard, Worker Portal)
* **apps/api**: Dedicated microservices or webhook consumers
* **packages/compliance-engine**: The cryptographic hash-chaining moat for immutable audit logs
* **packages/document-parser**: Abstraction layer for ClamAV scanning and AWS Textract / Google Doc AI OCR
* **packages/risk-scoring**: Rules engine for evaluating tenant health scores (document expiry, CoS status)

## Security
* Row-Level Security (RLS) is strictly enforced at the Postgres level via Drizzle & Clerk Org IDs.
* Environment secrets mapped dynamically.
