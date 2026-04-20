# Regulatory Model & Compliance Security

MigraLink operates as a B2B SaaS mitigating legal and financial risk for UK sponsors hiring from Southern Africa.

## 1. The Immutable Event Chain (Primary Moat)
UK Home Office audits demand perfect record-keeping.
* Every state change (Worker added, Document uploaded, Visa expired) triggers a ComplianceEvent.
* Each event is serialized to canonical JSON and hashed with SHA-256.
* Each event references the `hash_self` of the prior event for that tenant, creating an unforgeable cryptographic chain.

## 2. Document Retention & Processing
* Scanned securely into Cloudflare R2 immediately after an AV check.
* R2 buckets enforce strict region constraints (UK-London) to satisfy GDPR residency.
* OCR processing extracts PII automatically to reduce human entry error.

## 3. Data Privacy (GDPR & POPIA)
* Data Subject Access Requests (DSAR) are fully self-service via the Worker Portal.
* Explicit consent records track the lawful basis of processing ('contract', 'legal_obligation').

## 4. OISC Disclaimers
MigraLink is a software tool, not a legal entity. Strict OISC disclaimers block any assumption of immigration advice.
