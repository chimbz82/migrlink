# 12-Week MVP Roadmap

## Weeks 1-2: Monorepo Scaffold & Infrastructure
* Set up Next.js, TurboRepo, Drizzle, Neon, Clerk
* Implement standard RLS rules
* Establish core CI/CD via GitHub Actions

## Weeks 3-5: Core Data Model & Cryptography
* Schema definitions for Workers, Visas, Documents
* Build the `compliance-engine` package for SHA-256 hash chaining
* Implement the UKVI register sync cron

## Weeks 6-8: Document Pipeline & Parser
* Build the `document-parser` package
* Cloudflare R2 pre-signed URL uploads
* Basic OCR and Virus Scan abstraction bounds

## Weeks 9-10: Dashboards & Scoring
* Build the sponsor UI
* Build the `risk-scoring` package for compliance health scores
* Worker self-serve portals

## Weeks 11-12: Hardening & Audits
* Playwright E2E tests
* DSAR JSON/PDF exports
* Security pentesting
