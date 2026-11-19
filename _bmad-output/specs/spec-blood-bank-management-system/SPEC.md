---
id: SPEC-blood-bank-management-system
companions:
  - initial-project-specification.md
sources: []
---

# Blood Bank and Donor Management System

## Why

Donors, sponsors, hospitals, camp organizers, and blood-bank staff need coordinated, auditable workflows for donor and camp activity, synthetic inventory, and hospital requests. The university project demonstrates safer operations without clinical decisions, real personal data, live integrations, or actual blood issue.

## Capabilities

- **CAP-1**
  - **intent:** Donors, sponsors, and camp managers manage authorized profiles, camp participation, and sponsorship activity.
  - **success:** Synthetic donor, camp, and non-payment sponsorship records follow role-scoped workflows; donor and sponsor accounts access only their own private records.
- **CAP-2**
  - **intent:** Blood-bank staff record donations and screening status so inventory reflects the supplied operational result.
  - **success:** Each synthetic unit is linked to a donation and screening event; pending or failed screening never makes it available, and no clinical decision is inferred.
- **CAP-3**
  - **intent:** Staff maintain accurate, traceable blood-unit inventory and availability.
  - **success:** Stock and alerts exclude incomplete, pending, failed, reserved, issued, discarded, expired, and quarantined units; concurrent operations cannot allocate one unit twice.
- **CAP-4**
  - **intent:** Hospitals submit and track requests while blood-bank staff reserve and issue units through controlled workflows.
  - **success:** Requests preserve quantity invariants, High urgency precedes Standard with FIFO inside each tier, FEFO orders only human-selected candidates, and partial balances remain active.
- **CAP-5**
  - **intent:** Authorized medical staff review donor candidates and send call-ups while donors control contact preferences.
  - **success:** Campaign recipients are human-reviewed, current opt-outs are honored at each simulated send, retries are idempotent, and final medical eligibility remains human.
- **CAP-6**
  - **intent:** Users access only the records and functions permitted by their role and institution.
  - **success:** All eight roles are authorized server-side, institution boundaries are tested, and critical mutations have transaction-linked, protected audit history.
- **CAP-7**
  - **intent:** Managers and staff monitor inventory and operational risk and recover from prototype data loss.
  - **success:** Dashboards and alerts reconcile to current unit state, and a synthetic restore test recovers inventory, requests, reservations, and audit history consistently.

## Constraints

- V1 is a four-member university prototype using synthetic data; no real patient, donor, or screening data, patient names, actual healthcare-facility issue, or live external integrations.
- Use technology the team can implement confidently; this specification selects no database, framework, API design, or system architecture.
- All eight roles receive minimum v1 workflows with least privilege and institution-scoped access.
- Medical compatibility and final donor eligibility are human decisions. Prototype rule values are labelled synthetic and are not clinical recommendations.
- SMS is simulated; consent/opt-out is enforced; no sensitive medical details are sent.
- Hospital accounts see only their requests and aggregate availability, never donor identity, unit IDs, screening details, or patient information.
- Clinical/institutional and Sri Lankan legal/privacy validation is required before real data or operational use.
- Internet access is assumed; the timeline is unfixed and user validation is limited to 2–3 supervisor-arranged interviews and published sources.

## Non-goals

- Clinical compatibility, diagnosis, final donor-eligibility decisions, or automated clinical prioritization.
- Real SMS, hospital/NBTS/laboratory integration, or issuing blood in a healthcare facility.
- Real donor, patient, or screening data; patient accounts or patient names.
- Payment processing, paid blood handling, real-value donor rewards, or machine learning.
- A production service-level, emergency response, legal compliance, or clinical-safety claim.

## Success signal

A synthetic end-to-end demonstration registers donor/camp activity, records donation and screening status, maintains accurate stock, processes a hospital request using defined priority/FIFO and FEFO rules, and records a two-person confirmed issue without exposing donor or patient details to hospitals. Tests demonstrate hard safety blocks, quantity/state invariants, institution isolation, consent-aware simulated messages, concurrency safety, audit consistency, and backup restoration.

## Assumptions

- Prototype issue requires two distinct authorized technician accounts; the second account independently confirms the first technician's action.
- A reservation lasts 30 minutes in the synthetic prototype; this is a demonstration default, not an institutional policy.
- Camp Manager owns camp operations; Medical Officer In-Charge approves publication as a project-level workflow recommendation.
- Technician-recorded screening status demonstrates synthetic workflow only and does not establish real screening authority.
- Event timestamps are UTC and displayed in Asia/Colombo time.
- V1 uses seeded synthetic rule values; admin-editable/versioned rule management is Should Have.

## Open Questions

- Before real-world use, which authoritative NBTS/institutional rules govern donor eligibility/deferral, screening authority, shelf life/component handling, request issue, and role delegation?
- Before real personal data is used, what legal/privacy requirements govern notices, consent, retention/deletion, data rights, access, and breach handling in Sri Lanka?
- Before operational deployment, what emergency-response targets, escalation ownership, stock thresholds, and recovery objectives are approved by the institution?
