---
title: Blood Bank and Donor Management System
status: final
created: 2026-11-18
updated: 2026-11-18
---

# PRD: Blood Bank and Donor Management System

## 0. Document Purpose

This Product Requirements Document (PRD) is the requirements contract for the four-member university team, project supervisor, and downstream UX, architecture, and delivery-planning work. It defines user-visible capabilities, priority, business rules, logical data needs, privacy and safety boundaries, measurable acceptance criteria, assumptions, and external validation gates. It does not choose a technology stack, define APIs or physical database tables, create implementation stories, or authorize real-world operation.

### Source precedence and reconciliation

1. The canonical `_bmad-output/specs/spec-blood-bank-management-system/SPEC.md` and its `initial-project-specification.md` companion control the requirements and scope.
2. The project proposal PDF is supporting context. Its earlier six-role model and earlier diagrams are superseded; its proposed stack and detailed performance targets are not adopted because the controlling specification makes no such commitments and this PRD does not define architecture.
3. The supplied JPEG use-case diagram is authoritative for the updated actors and use cases. It confirms the eight-role model and makes technician-recorded donor deferral explicit; donor deferral remains **Should Have**, as in the controlling specification.
4. The root `initial-project-specification.md` was checked against the canonical detailed companion and matches it.

No material source conflict requires a user decision. The proposal's historical or current-state claims are not treated as independently verified facts about NBTS operations. The older use-case and class diagrams in the proposal are not used.

## 1. Vision

Blood-bank staff, donors, sponsors, camp organizers, and hospitals need a shared, traceable view of donor and camp activity, synthetic inventory, and hospital requests. The university prototype demonstrates how those workflows can be coordinated while keeping hospital visibility limited, donor communication consent-aware, and unit allocation protected by explicit state and safety checks.

The product is a responsive web application for synthetic-data demonstration. It supports the workflow from donor and camp management through donation and screening-status recording, unit availability, request handling, reservation, and confirmed prototype issue. It helps staff notice expiry and stock risks and prepare human-reviewed donor call-ups; it does not make clinical decisions or represent that any real blood is safe, compatible, or issued.

### 1.1 Objectives

- Maintain accurate, traceable synthetic records for donors, camps, donations, screening status, units, requests, issues, and sponsorship offers.
- Demonstrate stock availability, expiry and low-stock warnings, controlled request priority, FEFO ordering within a human-selected candidate set, partial fulfillment, and confirmed issue.
- Provide useful minimum workflows for all eight roles with server-enforced role and institution boundaries.
- Protect donor privacy, exclude patient identity, respect consent and opt-out, and preserve critical audit history.
- Demonstrate transaction safety, concurrent-allocation controls, explicit failure handling, and a synthetic backup/restore test.

### 1.2 Success Metrics

These are prototype acceptance signals, not healthcare service-level targets.

**Primary**

- **SM-1 — Safe inventory:** Every required unit-state, screening, expiry, reservation, and issue test passes; blocked units are never shown as available, reserved, or issued. Validates FR-14–FR-22 and FR-31–FR-34.
- **SM-2 — Request integrity:** Queue order, priority override, partial fulfillment, cancellation, quantity invariants, and two-person issue tests pass without over-allocation or rewriting issued history. Validates FR-25–FR-34.
- **SM-3 — Privacy and isolation:** All eight role-boundary tests pass across two synthetic bank scopes and two hospitals; no test reveals patient identifiers or exposes donor/unit details to a hospital. Validates FR-01–FR-07, FR-25, FR-36–FR-43.
- **SM-4 — Recoverability and traceability:** Critical mutation/audit atomicity tests pass, and restore verification recovers inventory, requests, reservations, and audit history consistently. Validates FR-42–FR-44.

**Secondary**

- **SM-5 — Operational usefulness:** Synthetic demonstrations complete donor/camp, donation/screening, sponsor, dashboard, and simulated-call-up workflows for their authorized roles. Validates FR-07–FR-13, FR-36–FR-41.
- **SM-6 — Scoped Should features:** Any Should feature included in the release passes its associated conditional acceptance criteria; omitted Should features are recorded as deferred rather than implied complete. Validates FR-10, FR-23–FR-24, FR-35, FR-40, FR-45–FR-46.

**Counter-metrics (do not optimize)**

- **SM-C1 — No unsafe throughput trade-off:** Do not reduce screening, expiry, authorization, audit, confirmation, or transaction checks to increase request throughput. Counterbalances SM-1 and SM-2.
- **SM-C2 — No data-collection trade-off:** Do not collect patient identity, real donor data, or sensitive donor detail to improve reports, matching, or demonstration realism. Counterbalances SM-3 and SM-5.
- **SM-C3 — No clinical-automation trade-off:** Do not optimize the candidate list or inventory ordering into automated compatibility or final eligibility decisions. Counterbalances SM-1, SM-2, and SM-5.

## 2. Target Users

### 2.1 Jobs To Be Done

- **Donor:** Find published camps, control communication preferences, see my own donation history, and respond to a call-up without seeing another donor's information.
- **Sponsor:** Find a camp, offer non-monetary support, and track the status of my own offer.
- **Hospital Requester:** Submit and track a request for a servicing blood bank and see aggregate availability without seeing donor or unit identities.
- **Medical Officer In-Charge:** Maintain donor records, review candidate donors, manage call-up campaigns, and approve camp publication without delegating clinical decisions to software.
- **Blood Bank Technician:** Record donation and supplied screening status, maintain accurate unit state, work the request queue, reserve units, and complete a separately confirmed prototype issue.
- **Camp Manager:** Plan and manage camp activity, registrations and outcome, coordinate approved camp notices, and track camp-linked sponsorship offers.
- **Blood Bank Manager:** Monitor stock and risks, review reports, authorize justified request-priority changes, and approve transfers when that Should feature is available.
- **Admin (System Administrator):** Manage accounts, institution master data, settings, and read-only audit access without bypassing operational safety controls.

### 2.2 Role-Permission Matrix

The following matrix defines the v1 access boundary. Every permission is additionally restricted by the user's role and institution scope and is enforced server-side.

| Role | Permitted actions | Explicit limits |
|---|---|---|
| **Donor** | Self-register; read/update own permitted profile and contact preferences; read own donation history and published camps; respond to own call-ups; camp preregistration is Should. | No access to other donors, internal screening details, unit inventory, or hospital requests. |
| **Sponsor** | Register; read published camps; create and track own camp-linked sponsorship offers. | No access to other sponsors' records, donor/screening data, inventory, or requests; no payment operations. |
| **Hospital Requester** | Submit, read, and track requests for the account's hospital; choose initial High/Standard urgency; view assigned-bank aggregate stock counts. | No patient identity fields, donor identity, unit IDs, screening detail, another hospital's requests, reservation, or issue authority. |
| **Medical Officer In-Charge** | Manage donor records; filter and review candidate donors; approve campaign recipients and manage call-up campaigns; approve camp publication. | No unit registration, screening override, issue, request-priority override, account administration, or automated final eligibility decision. |
| **Blood Bank Technician** | Record donations and supplied screening status; register/correct units; process the request queue; select operational candidates; reserve units; initiate and confirm routine issues using distinct technician accounts; discard units; record donor deferrals as a Should feature. | Cannot override failed/pending screening, expiry, discard, quarantine, institution scope, or request priority; cannot approve their own issue. |
| **Camp Manager** | Plan and maintain camps; record attendance/outcomes; manage preregistrations if the Should feature is included; coordinate simulated camp notices; associate and track camp sponsors/offers. | Sees only minimum donor contact/registration data needed for camp operations; no screening details, inventory controls, requests, or clinical decisions. |
| **Blood Bank Manager** | Monitor stock, risks and dashboards; review detailed reports if the Should feature is implemented; authorize request-priority overrides and justified release/cancellation of a still-valid unissued reservation; approve transfers as a Should feature; review relevant operational audit events. | Cannot override hard safety blocks or change a failed/expired/discarded unit to Available; no final clinical decision authority. |
| **Admin (System Administrator)** | Provision/disable accounts and assign approved roles/institutions; manage bank/hospital master data; access audit history read-only; manage versioned rules/settings if the Should feature is implemented. | No screening approval, unit issue, request-priority decision, or routine donor clinical detail; administrative status never bypasses safety or authorization. |

The Medical Officer's camp-publication approval and the least-privilege grants above are adopted prototype recommendations, not claims about NBTS or another institution's real delegation policy.

### 2.3 Non-Users in v1

- Patients are not users; patient names, identifiers, and identifying clinical narratives are not stored.
- NBTS, laboratories, hospitals' live information systems, and SMS providers are outside the system boundary.
- The prototype is not for real donors, real screening results, real blood inventory, or real clinical issue.

### 2.4 Source-Derived Workflows

The input documents provide role-based workflows but no named-person user-session narratives. To avoid inventing personas, this PRD does not fabricate named UJ records. These source-derived workflows provide the end-to-end behavioral basis for later UX work:

1. **Donor and camp:** A donor registers or signs in, manages contact and SMS preferences, views a published camp, optionally preregisters, views personal donation history, and responds to a call-up. Only that donor's records are visible.
2. **Camp and sponsorship:** Camp Manager creates a draft camp, submits it for Medical Officer In-Charge approval, publishes it after approval, manages registrations and notices, records the outcome, and links offers from sponsors. Sponsors see and manage only their own offers.
3. **Donation and inventory:** Technician records a synthetic donation and supplied screening status, registers linked units, and sees stock update only when each unit meets every availability condition. Discard, correction, and quarantine retain history.
4. **Request and issue:** Hospital Requester submits a non-identifying request. Technician reviews it in High-first/FIFO-within-tier order, selects an operational candidate set, reserves valid units FEFO, and initiates issue. A second technician rechecks all hard blocks and confirms. Partial fulfillment remains active; hospital views remain aggregate and institution-scoped.
5. **Risk and call-up:** Dashboard exposes low-stock and near-expiry warnings. Medical Officer filters a synthetic candidate list, reviews recipients, and sends consent-checked simulated call-ups. No result is represented as final donor eligibility or real message delivery.

## 3. Glossary

- **Available unit** — A unit whose required data is valid, screening status is Passed, expiry is in the future, lifecycle state is Available, and no active block or reservation exists.
- **Blood bank** — An institution that owns and processes synthetic inventory and services explicitly assigned hospital requests.
- **Blood component** — A configured inventory category such as a component type; the prototype does not determine clinical suitability.
- **Call-up candidate** — A donor returned by non-clinical, identified filters for human review; not a declaration of eligibility.
- **Camp** — A planned donation activity with an approval and publication lifecycle.
- **Deferral** — A recorded donor suppression period/status. The Should-have feature does not determine a clinical deferral policy.
- **FEFO** — First-expiry-first-out ordering within only the candidate units selected by an authorized human.
- **High / Standard** — The two request urgency values. High is processed before Standard; FIFO applies within each value.
- **Institution scope** — The blood bank or hospital boundary an account or record is authorized to access.
- **Issue** — A prototype event moving a valid reserved unit to an immutable Issued state after two distinct technician confirmations; it is not actual clinical release.
- **Reservation** — A time-bounded association between one request and one unit, subject to all current safety and state guards.
- **Screening status** — A supplied synthetic Pending, Passed, or Failed workflow value; not a lab result interpretation or real approval.
- **Simulated delivery** — A prototype message status recorded by a simulated gateway; it never means a real SMS was sent.
- **Sponsor offer** — A camp-linked, non-payment description of offered support and its status.
- **Terminal unit state** — Issued, Discarded, or Expired; these states cannot be restored by an override.

## 4. Features and Functional Requirements

Priority labels: **Must** is required for v1; **Should** is desirable if time allows; **Could** is optional; **Won't** is excluded. **Confirmed**, **Recommendation**, and **Assumption** distinguish the source of a decision. A synthetic assumption is not clinical or institutional policy.

### 4.1 Identity, Authorization, and Privacy

**Description:** All eight roles use authenticated, minimum-privilege workflows. Authorization and institution scope apply on the server to every view and operation, not just to visible screens. Donors and sponsors access their own private records. Hospitals receive only their own requests and aggregate stock counts.

- **FR-01 — Authenticate all roles (Must, Confirmed):** Users in all eight roles can authenticate and log out. Protected operations reject unauthenticated or disabled accounts.
- **FR-02 — Provision accounts and institutions safely (Must, Recommendation):** Admin provisions and disables staff accounts, maintains blood-bank/hospital master data and authorized service relationships, and assigns institution scope. Donor and sponsor self-registration is separate. Account recovery uses a reset, never disclosure of an existing credential. Role/scope changes are authorized and audited.
- **FR-03 — Enforce role and institution scope (Must, Recommendation):** Server-side access checks cover list/detail reads, direct record IDs, search, dashboards, exports, mutations, and background operations. Cross-scope access is denied by default.
- **FR-04 — Exclude patient identity (Must, Confirmed):** No patient account or patient-name, patient-identifier, or identifying narrative field is available. Patient-identifying input is rejected or safely removed before persistence and never copied into logs.
- **FR-05 — Record donor contact consent (Must, Recommendation):** Store communication preference, consent source/time, and opt-out/do-not-contact status. Recheck current preference immediately before every simulated message attempt, including retry.
- **FR-06 — Use labelled synthetic records (Must, Recommendation):** All seeded identities, contacts, inventory, and workflow results are synthetic and clearly marked. No real personal, patient, or screening data is permitted.

**Testable consequences:** A disabled account cannot perform a protected action; direct-ID and export attempts obey the same scope as screens; hospital views contain no donor/unit identity or screening details; each message attempt checks the current donor preference.

### 4.2 Donors, Camps, and Sponsorship

**Description:** Donors, sponsors, and camp staff manage only the records and actions appropriate to their roles. Camp publication requires approval. Sponsorship is non-payment activity.

- **FR-07 — Manage donor records (Must, Confirmed):** Donors can register, update permitted contact details and communication preferences, view their own donation history and published camps, and respond to a call-up. Medical Officer In-Charge can maintain permitted donor master/contact fields for authorized donor-management work. Donor self-service is restricted to that donor's record.
- **FR-08 — Manage basic camp operations (Must, Confirmed):** Camp Manager can plan and maintain basic camps, record attendance and outcomes, coordinate camp notices through simulation, and associate sponsor offers. Managing donor preregistrations depends on FR-10 and remains Should.
- **FR-09 — Approve camp publication (Must, Recommendation):** Camp follows Draft → PendingApproval → Published → Completed or Cancelled. Medical Officer In-Charge approves publication; rejection returns it to Draft with reason. Material changes to an approved camp require renewed approval.
- **FR-10 — Support donor preregistration (Should, Confirmed):** Donors can preregister for a camp or appointment slot when this feature is implemented. Duplicate donor/camp registrations are rejected; any enabled capacity is not exceeded.
- **FR-11 — Register sponsors and offers (Must, Confirmed):** Sponsors can register, view published camps, submit camp-linked offers, and track their own offers. They cannot view another sponsor's private records.
- **FR-12 — Track non-payment sponsorship (Must, Recommendation):** Offers record description, non-monetary quantity/delivery detail, camp, dates, status, and actor history. Sponsor edits or withdraws only while Proposed; Camp Manager accepts, declines, or records fulfillment. No payment amount, payment processing, receipt, or real-value reward is recorded.

**Testable consequences:** Only Published camps are visible to donors and sponsors; rejected or materially changed camps follow approval rules; offer histories are retained; sponsor access is own-record only; no payment transaction can be created.

### 4.3 Donations, Screening Status, and Inventory

**Description:** A unit is traceable to a synthetic donation and becomes Available only after all required data and hard safety conditions pass. FEFO is an ordering aid after human selection, not a clinical selection function.

- **FR-13 — Record donations (Must, Confirmed):** Technician records a synthetic donation with donor reference, optional camp, collection time, and recording actor.
- **FR-14 — Record supplied screening status (Must, Confirmed/Recommendation):** Technician records Pending, Passed, or Failed with source/scenario reference, actor, and time. The system records but does not interpret laboratory results or establish real screening authority.
- **FR-15 — Register linked units (Must, Confirmed/Recommendation):** Each unit has a unique ID, source donation, blood group, component, positive volume and unit, collection and expiry times, location, screening reference, lifecycle status, and creator.
- **FR-16 — Guard availability (Must, Recommendation):** A unit becomes Available only when required fields are valid, a named synthetic rule-set version supplies expiry, screening is Passed, current time is before expiry, and no active block or reservation exists. Missing/unknown rules fail closed.
- **FR-17 — Enforce unit transitions (Must, Recommendation):** Reject disallowed transitions. A correction cannot silently reactivate an Issued, Discarded, Expired, Failed-screening, or Quarantined unit. A conflict affecting a reserved unit blocks issue and records an audited state change.
- **FR-18 — Show scoped stock and warnings (Must, Confirmed):** Staff dashboards show stock by blood group and component plus expiry and low-stock warnings using seeded synthetic thresholds and the same availability predicate used by reservation. Hospital Requesters see aggregate counts only for their assigned bank, by group/component.
- **FR-19 — Order selected candidates FEFO (Must, Confirmed):** For an authorized human-selected operational candidate set, order valid units by expiry timestamp, then stable unit ID. The system does not select compatible units.
- **FR-20 — Reserve atomically (Must, Recommendation):** Before committing a reservation, recheck request ownership, request balance, unit state, screening, expiry, and competing reservations in one atomic operation. A unit has at most one active reservation.
- **FR-21 — Expire reservations (Must, Assumption):** A synthetic reservation lasts 30 minutes. Expiry is recorded atomically; release returns a unit to Available only if it remains unissued, unexpired, Passed-screening, and otherwise valid.
- **FR-22 — Record discard (Must, Confirmed):** Technician records discard reason, actor, time, and unit. Discarded is terminal and unavailable.
- **FR-23 — Manage donor deferrals (Should, Confirmed):** Technician records coded donor deferral status/history with restricted detail. An active recorded deferral suppresses call-up; the system does not infer a deferral policy or clinical reason.
- **FR-24 — Transfer units (Should, Confirmed):** Blood Bank Manager approves a transfer with origin, destination, dispatch, receipt, and cancellation events. In-transit units are unavailable at both locations and cannot be counted twice.

**Testable consequences:** Pending/Failed, incomplete, reserved, issued, discarded, quarantined, and expired units do not count as Available; current time equal to expiry is expired; an unknown rule set blocks availability; concurrent reservation attempts yield at most one active reservation; a terminal unit cannot be restored.

### 4.4 Hospital Requests, Queue, Reservation, and Issue

**Description:** Hospital users request units without entering patient identity. Technicians process operational state; manager-approved priority overrides are auditable. Partial fulfillment remains visible and active until fulfilled or closed.

- **FR-25 — Submit scoped requests (Must, Confirmed/Recommendation):** Hospital Requester submits an assigned blood bank, hospital, requested group/component, positive whole-number quantity, initial High or Standard urgency, server submission time, and optional non-identifying note. There is no patient-name or patient-identifier field.
- **FR-26 — Preserve quantity invariants (Must, Recommendation):** Track requested, actively reserved, issued, and remaining quantity separately. Enforce `issued + active_reserved <= requested`; reject zero, negative, fractional, and over-allocation values.
- **FR-27 — Enforce and expose request lifecycle (Must, Recommendation):** Support Submitted, UnderReview, WaitingForStock, PartiallyReserved, Reserved, PartiallyIssued, Fulfilled, Rejected, CancellationRequested, Cancelled, and ClosedPartiallyFulfilled; reject transitions not defined in §7. Hospital Requesters can read status and remaining quantity only for their hospital's requests.
- **FR-28 — Order the queue (Must, Confirmed/Recommendation):** Process High before Standard; use FIFO within each tier by current-tier entry time, then request ID. A priority change enters the new tier at its end. Partial remainders retain current priority and tier-entry time.
- **FR-29 — Control priority changes (Must, Confirmed/Recommendation):** Hospital Requester supplies initial urgency. Only Blood Bank Manager can override it, with reason and audit event. No automatic clinical prioritization or silent reordering occurs.
- **FR-30 — Preserve partial fulfillment (Must, Confirmed):** An unfulfilled remainder stays active at its existing priority until completed or explicitly closed under cancellation rules.
- **FR-31 — Track reservations (Must, Recommendation):** Each reservation links one request to one unit and records creator, creation/expiry time, and state. Cancellation/expiry cannot reverse an issue or release a blocked unit.
- **FR-32 — Require confirmed issue (Must, Confirmed/Recommendation):** Issue requires a current valid reservation, final screening/state/expiry checks, and two distinct authorized Blood Bank Technician accounts: one initiates and another confirms. Neither can bypass hard blocks.
- **FR-33 — Limit manager authorization (Must, Confirmed/Recommendation):** Blood Bank Manager may authorize a justified request-priority override or release/cancellation of a still-valid unissued reservation with reason. No role can override pending/failed screening, expiry, discard, quarantine, or institution restrictions.
- **FR-34 — Preserve issue history (Must, Confirmed):** Record issue/outcome against request, unit, reservation, actors, and time. Issued and discarded events are immutable; correction is a compensating event, not history rewriting.
- **FR-35 — Notify request participants (Should, Confirmed):** Notify relevant hospital and staff on request-state changes without donor identity or patient information.

**Testable consequences:** High requests precede Standard, FIFO is deterministic within a tier, manager override is audited, partial balances retain position, cancellation releases only valid unissued units, no request exceeds its quantity, and issue commits only after distinct-technician confirmation and final hard checks.

### 4.5 Donor Filtering and Simulated Communications

**Description:** Authorized medical staff review candidate donors and control campaign dispatch. The system does not make a final eligibility decision; every message is simulated and consent-aware.

- **FR-36 — Filter call-up candidates (Must, Confirmed/Recommendation):** Medical Officer In-Charge filters using current consent/contactability, relevant recorded camp activity or donor response, and elapsed time since the last recorded donation against an explicitly identified synthetic interval rule. Without a named active synthetic rule set, no eligibility result or recipient list is produced.
- **FR-37 — Human-review recipients (Must, Recommendation):** Medical Officer In-Charge reviews and confirms each recipient set. Current opt-out/do-not-contact and a minimal call-up suppression flag suppress recipients; recorded active deferrals also suppress when the Should feature is present. The list is never labelled as final eligibility.
- **FR-38 — Simulate notifications (Must, Confirmed/Recommendation):** Call-ups and camp notices use only a simulated gateway. Track campaign, recipient, template, queued/simulated-delivered/failed/suppressed/replied state, attempts, timestamps, and donor response. Simulated delivery never implies real SMS delivery.
- **FR-39 — Make sends consent-aware and idempotent (Must, Recommendation):** Deduplicate each campaign/donor logical message; retries do not create duplicate logical sends. Recheck current consent before every attempt. Messages contain no screening, diagnosis, or patient detail.
- **FR-40 — Provide detailed reports and exports (Should, Confirmed):** Authorized roles can access detailed reports and CSV/PDF exports if implemented; data is minimized and obeys the same role and institution scopes as the source records.

**Testable consequences:** Candidate sets require an active identified rule set and human confirmation; opted-out, suppressed, and recorded-deferred donors are omitted; retries remain one logical message; failure is not displayed as delivery; exported data is scoped and contains no prohibited identities.

### 4.6 Dashboards, Audit, and Operations

**Description:** Staff see current, scoped operational status. Critical mutations and their audit records are inseparable. Synthetic recovery is demonstrated before the prototype is accepted.

- **FR-41 — Show operational dashboards (Must, Confirmed/Recommendation):** Provide basic views of stock, expiry/low-stock warnings, donation activity, and request queue by urgency and waiting time. Figures use the same availability rules as inventory operations and disclose last-updated time when freshness may be material.
- **FR-42 — Record critical audit events (Must, Confirmed/Recommendation):** Log actor, role/institution, timestamp, action, entity, outcome, reason when applicable, and minimal safe old/new values for critical changes including screening, priority, reservation/issue/discard, accounts/roles, and security-sensitive actions.
- **FR-43 — Protect and review audit history (Must, Recommendation):** Audit history is append-only to application roles; critical mutation and audit commit atomically. Redact secrets and unnecessary donor details; log audit reads and exports. Admin can view/filter audit history read-only. An audit failure cannot be reported as a successful mutation.
- **FR-44 — Demonstrate backup and restore (Must, Recommendation):** Document and test a synthetic backup/restore that recovers inventory, requests, reservations, and audit history consistently.
- **FR-45 — Version operational rules (Should, Confirmed):** Admin can create/review/version settings and activate a rule set. Each use retains the version reference; changes do not silently rewrite prior expiry or eligibility outcomes.
- **FR-46 — Improve accessibility/localization (Should, Confirmed):** Improve accessibility and localization beyond the baseline responsive English interface. Sinhala/Tamil donor-facing pages and SMS templates are optional Could features with separately agreed criteria.

**Testable consequences:** Dashboard counts reconcile with committed, scoped records; critical changes roll back if audit cannot commit; application roles cannot edit/delete audit history; restoration recovers related records consistently; rule versions remain traceable.

## 5. Business Rules and State Contracts

### 5.1 Inventory

1. An Available unit has unique ID, source donation, group, component, positive measured volume, collection time, future expiry, location, Passed screening status, and Available state.
2. Pending/Failed screening, expired, reserved, issued, discarded, quarantined, incomplete, or conflicting units are excluded from stock and cannot be reserved or issued.
3. Expiry is calculated from a named synthetic component rule-set version. Missing/unknown rule means unavailable; changing a rule does not silently rewrite existing outcomes.
4. Event timestamps are stored in UTC and displayed in Asia/Colombo time. A unit expires at `current_time >= expires_at`.
5. Availability, dashboard counts, and reservation use the same committed data and hard-block predicates.
6. FEFO sorts the human-selected eligible candidate set by expiry, then stable unit ID; it does not infer clinical compatibility.
7. Reservation and issue checks/state changes are atomic; at most one active reservation exists per unit.
8. Issued, Discarded, and Expired are terminal. Failed-screening or Quarantined units require an audited correction/revalidation process and cannot transition directly to Available.

### 5.2 Unit State Model

| Current state | Event | Next state | Guard |
|---|---|---|---|
| PendingScreening | Passed status recorded | Available | Required data valid; not expired; status is supplied synthetic data |
| PendingScreening | Failed status or conflicting record | Quarantined | Reason, actor, and time recorded |
| Quarantined | Correction/revalidation requested | PendingScreening | Correction and new screening event audited; no direct transition to Available |
| Available | Reservation created | Reserved | Atomic request/unit checks; no active reservation |
| Reserved | Issue confirmed | Issued | Two distinct technicians; reservation current; all hard checks pass |
| Reserved | Reservation expires or is cancelled | Available | Only if unissued, unexpired, Passed, and otherwise valid |
| PendingScreening, Available, Reserved, or Quarantined | Discard recorded | Discarded | Reason, actor, and time; active reservation closed atomically |
| Any nonterminal state | Expiry reached | Expired | Reservation cannot remain active; no issue after expiry |
| Any nonterminal, nonissued state | Data conflict or screening correction | Quarantined | Block issue; invalidate active reservation; audit |
| Issued, Discarded, Expired | Restoration attempted | No transition | Terminal state; use compensating event, never reactivate |

### 5.3 Request, Reservation, and Queue

| Request state | Allowed next state(s) | Guard |
|---|---|---|
| Submitted | UnderReview, Cancelled, Rejected | Requester may cancel before allocation; Technician begins review |
| UnderReview | WaitingForStock, PartiallyReserved, Reserved, Rejected, Cancelled | Technician validates; cancel only before allocation |
| WaitingForStock | PartiallyReserved, Reserved, Rejected, CancellationRequested | Technician processes queue; requester requests cancellation |
| PartiallyReserved | Reserved, PartiallyIssued, CancellationRequested | A reserved subset may be issued; only valid unissued reservations count |
| Reserved | PartiallyIssued, Fulfilled, CancellationRequested | Issue requires two-technician confirmation |
| PartiallyIssued | PartiallyIssued, Fulfilled, CancellationRequested | Remaining amount stays active; issued units are immutable |
| CancellationRequested | Cancelled, ClosedPartiallyFulfilled | Technician/Manager releases valid unissued reservations; issued amount remains |
| Cancelled, Rejected, Fulfilled, ClosedPartiallyFulfilled | No transition | Terminal; correction is a new audited event |

An active reservation has Active, Issued, Cancelled, or Expired state. For every request:

- `issued_quantity + active_reserved_quantity <= requested_quantity`
- `remaining_quantity = requested_quantity - issued_quantity - active_reserved_quantity` for allocation purposes
- High precedes Standard. FIFO within the current tier uses tier-entry time, then immutable request ID.
- Initial tier-entry time is server submission time. An authorized priority override records old/new value, reason, actor, and time and places the request at the end of the new tier. Partial fulfillment does not reset tier-entry time.
- Cancellation before allocation may become Cancelled. After allocation, cancellation is requested and staff release eligible unissued reservations. After any issue, the request closes as ClosedPartiallyFulfilled if an unissued remainder is not fulfilled; issued units are never reversed.

### 5.4 Campaign and Sponsorship

- Each campaign/donor pair has one logical message; retries are idempotent and consent is rechecked on every attempt.
- No identified active synthetic candidate rule means no candidate eligibility result or campaign recipient set.
- Sponsorship transitions are Proposed → Accepted, Declined, or Withdrawn; Accepted → Fulfilled or Withdrawn. Declined, Withdrawn, and Fulfilled are terminal.
- Sponsor controls only their Proposed offer. Camp Manager controls review and fulfillment status. V1 does not process or record payment.

## 6. Logical Data Requirements

These are logical record requirements, not a physical database schema.

| Record | Minimum data and relationships | Validation and privacy |
|---|---|---|
| Account and role assignment | Account ID, unique login, role, active state, institution scope, created/disabled time, recovery state. | Admin provisions staff; role/scope changes audited; secrets never logged. |
| Institution | ID, type (blood bank or hospital), name, active state, authorized hospital-to-bank service relationships. | Scope applies to every institution-bound record; seed two banks and hospitals for isolation testing. |
| Donor | ID, synthetic display/contact data, preferences, consent source/time, do-not-contact, call-up suppression and optional active deferral reference. | No real identifiers or unsanitized medical narratives; donor self-service is own-record only. |
| Sponsor | ID, person/organization type, synthetic display/contact data, active state. | Sponsor sees own profile and offers only. |
| Camp | ID, institution, name, schedule, location, organizer/contact, status, optional capacity, approval/cancellation reason, outcome, actors and timestamps. | Publish only after approval; preserve material changes and cancellation history. |
| Camp registration/attendance | Donor, camp, registration/attendance status and timestamps. | Unique donor/camp pair; preregistration is Should; minimum necessary contact data. |
| Sponsorship offer | Sponsor, camp, description, non-monetary quantities/delivery details, status and history, dates and actors. | No payment amount or transaction. |
| Donation | ID, blood bank, donor, optional camp, collection time, completion state, recording technician. | Unique; validate institution relationships; no patient data. |
| Screening event | Unit/donation, generic Pending/Passed/Failed status, scenario source, actor, time, correction reason/history. | Synthetic-only; no lab interpretation or real approval claim. |
| Blood unit | ID, owning bank, source donation, group, component, positive volume/unit, collection/expiry times, location, screening reference, status, rule version, creator. | Unique; expiry after collection; traceable; unit ID never exposed to hospital. |
| Hospital request | ID, requesting hospital, servicing bank, requester, group/component, positive integer quantity, urgency/status, server submission/tier-entry times, non-identifying note and quantities. | Scoped to both assigned institutions; no patient name, identifier, or patient narrative. |
| Reservation | ID, request, one unit, state, created/expiry times, creator, cancellation/expiry reason. | One active reservation per unit; quantity invariant checked atomically. |
| Issue/outcome | ID, request, unit, reservation, initiating/confirming technicians, timestamp and outcome. | Two distinct authorized users; immutable; no patient identity. |
| Campaign/message | Campaign, donor, approved template, consent reference, status, attempt count, response and timestamps. | One logical donor/campaign message; check current opt-out each attempt; no sensitive details. |
| Audit event | Actor/role/scope, timestamp, action, entity, outcome, reason, safe old/new values and correlation reference. | Append-only to application roles; redact sensitive values; audit reads/exports and critical failures. |
| Operational rule set | ID/version, label/source, effective demo period, values, activation actor/time. | Seeded synthetic values; editing/versioning is Should; preserve version used by each record. |

**Validation:** Required IDs are unique; foreign references resolve and obey institution scope; dates and positive quantities are validated server-side; stale writes produce a visible conflict rather than overwrite; retries do not create duplicate logical operations; any optional export obeys the same scope and minimization rules as its source.

## 7. Security, Privacy, and Audit Requirements

### 7.1 Authentication and Authorization

- Use salted password hashing through an established library; never store or log plaintext passwords or recovery secrets.
- Apply login throttling, session expiry, explicit logout, and account disablement. A disabled account loses protected access on its next operation.
- Enforce least privilege and institution scope server-side for every request. Hiding a screen is not authorization.
- Assign each staff account explicit role(s) and institution scope; prefer one role per synthetic account for auditable demonstrations. Donors and sponsors access only their own private records.
- Protect sensitive traffic in transit; validate inputs and safely handle rendered content; defend against injection, script injection, and cross-site request forgery; keep credentials/secrets out of source and logs.
- Staff accounts are Admin-provisioned; donor and sponsor registration is separate. Role changes cannot be self-approved.
- Admin does not bypass screening, expiry, reservation, audit, or institution controls.

### 7.2 Privacy and Data Minimization

- Only synthetic records and clearly labelled demonstration values are permitted.
- Do not store patient names, patient identifiers, or identifying clinical narratives.
- Hospital accounts see aggregate availability and their own requests only, never donor identity, unit IDs, or screening details.
- Donor data is visible only to authorized roles for a stated workflow; camp roles receive only minimum contact/registration information.
- Messages contain no screening result, diagnosis, patient information, or unnecessary personal detail. Consent and opt-out apply to every attempt.
- Real-data retention, deletion, rights, lawful basis, notice, and breach processes remain unresolved pending qualified local review; this PRD makes no legal-compliance claim.

### 7.3 Audit and Integrity

- Audit screening, unit/request/reservation/issue/discard/transfer changes, priority changes, account/role changes, camp approval/cancellation, message outcomes, exports, audit access, and security-relevant failures.
- Record actor, role/scope, time, action, affected record, outcome, reason when applicable, and only necessary safe old/new values.
- Application users cannot edit or delete audit history. Audit-view access is itself audited.
- Critical mutation and audit event commit atomically; if audit persistence fails, the mutation is not reported as successful.
- Corrections append compensating events; issued, discarded, and expired history is not overwritten.
- Errors are explicit. Validation, authorization, transaction, network, scheduled-work, and recovery failures never return a success-shaped response.

## 8. Cross-Cutting Non-Functional Requirements

- **Safety:** Pending/failed screening, expired, discarded, quarantined, incomplete, or otherwise blocked units cannot be counted Available, reserved, or issued. No user override exists.
- **Integrity:** Enforce state transitions, referential validity, quantity invariants, uniqueness, atomic reservation/issue, and audit consistency.
- **Concurrency:** Competing reservation/issue operations for one unit allow at most one valid commit. Conflicts report recoverable errors and refreshed state.
- **Security:** Server-side RBAC, institution isolation, secure credential/session behavior, least privilege, protected audit, and input validation.
- **Privacy:** Synthetic-only data, no patient identity, donor-data minimization, consent, opt-out, and scoped visibility.
- **Reliability:** Provide a reproducible backup/restore test; show critical failures clearly; never report an uncommitted operation as successful.
- **Usability:** Responsive web interface, role-appropriate actions, understandable status labels, and actionable plain-language validation.
- **Accessibility/localization:** Accessibility improvements are Should. Optional Sinhala/Tamil donor-facing content is Could. No WCAG conformance claim is made unless separately tested.
- **Testability:** Seed deterministic synthetic records for role, state, concurrency, privacy, and failure tests. Verify business rules with automated tests where practical.
- **Performance/availability:** No production SLA or numeric response-time target is specified. Record performance on the agreed synthetic demonstration dataset; do not promise emergency response or real-world availability.
- **Maintainability boundary:** Keep the requirements technology-neutral. No stack, API, database, deployment topology, or architecture is selected in this PRD.

## 9. Error and Exception Handling

| Scenario | Required behavior |
|---|---|
| Unauthenticated, disabled, unauthorized, or cross-institution access | Deny server-side; disclose no protected values; record security-relevant events. |
| Missing/invalid unit field, duplicate ID, invalid date, or illegal transition | Reject before commit; explain the actionable field/state issue to authorized users; preserve history. |
| Pending/failed screening, expiry, discard, quarantine, or stale data during reservation/issue | Block availability and operation; show a safe reason to authorized staff. |
| Simultaneous reservation or issue attempts | Allow at most one atomic commit; reject others with a refreshable conflict and no partial mutation. |
| Screening changes to failed or record becomes disputed while reserved | Quarantine unit and invalidate reservation atomically; block issue; audit and notify responsible staff. |
| Invalid quantity or requested/reserved/issued inconsistency | Reject; retain prior state and quantities; never silently clamp or over-fulfill. |
| Duplicate, stale, unauthorized, insufficient-stock, or rejected request | Preserve one logical request; show status, reason, and remaining amount; infer no clinical decision. |
| Cancellation before/after allocation or partial issue | Release only valid unissued reservations; retain issued history; use Cancelled or ClosedPartiallyFulfilled as appropriate. |
| Reservation expiry races with issue/cancellation | Serialize state transition; only one outcome commits; no expired unit can issue. |
| Priority changed without manager authority or reason | Deny and audit; preserve current priority and queue position. |
| Opt-out, revoked consent, duplicate retry, simulated failure, or absent response | Suppress or record failure truthfully; deduplicate; preserve status; never imply real delivery. |
| Camp rejected, materially changed, over capacity, or cancelled | Prevent invalid publication/registration; retain reason; simulate notices to affected registrants. |
| Duplicate, withdrawn, mislinked, or unauthorized sponsorship change | Preserve status history; reject duplicate logical offers; do not process money. |
| Transfer incomplete or receipt missing | Keep the unit visible as in transit and unavailable at both ends; record receipt or cancellation explicitly. |
| Audit/database/network/scheduler/backup/restore failure | Do not claim success; roll back dependent critical mutation; show recoverable error and alert authorized staff for operational failures. |
| Stale or inconsistent dashboard/alert/report | Recalculate from current committed records; show last-updated time where material; apply source-record scope. |

## 10. Scope and Guardrails

### 10.1 Must Have — v1

- Secure authentication and least-privilege authorization for all eight roles.
- Donor registration and management, donation and supplied screening-status recording, unit registration and lifecycle control.
- Accurate availability by blood group/component, expiry and low-stock warnings.
- Hospital requests, request queue, High-first/FIFO-within-tier ordering, FEFO reservation within human-selected candidates, partial fulfillment, and two-technician confirmed prototype issue.
- Human-reviewed donor filtering and simulated, consent-aware call-ups.
- Basic camp management, essential sponsor registration and non-payment offer tracking.
- Dashboards, validation, audit history, institution isolation, transaction safety, concurrency controls, and synthetic backup/restore verification.

### 10.2 Should Have

- Donor camp preregistration, advanced camp workflows, sponsorship coordination improvements, donor deferral management, and unit transfers.
- Request notifications, detailed reports, CSV/PDF exports, configurable/versioned operational rules, and improved accessibility/localization.

### 10.3 Could Have

- QR/barcode support, offline camp data capture, advanced analytics, additional sponsorship features, and optional Sinhala/Tamil donor-facing pages/templates.

### 10.4 Won't Have in v1

- Real SMS delivery or live hospital, NBTS, laboratory, or national-system integration.
- Real donor, patient, or screening data; patient names; or real blood issue in a healthcare facility.
- Clinical compatibility selection, diagnosis, final automated donor eligibility, or automated clinical prioritization.
- Payment processing, paid blood handling, real-value donor rewards, or machine learning.

### 10.5 Explicit Safety and Product Guardrails

- The prototype demonstrates workflows only. It is not a clinical decision-support or live inventory system.
- Human staff remain responsible for compatibility, donor eligibility, operational selection, and any real release decisions.
- No screen, report, or message may imply that a donor is finally eligible, a unit is clinically compatible, an SMS was truly delivered, or blood was actually issued.
- No patient-identifying field or workaround is permitted, including in notes, exports, logs, or messages.
- Should/Could items do not displace Must safety, privacy, authorization, audit, or data-integrity controls.

## 11. Acceptance Criteria and Traceability

Automated tests are preferred for authorization, state, quantity, idempotency, transaction, and concurrency rules. All fixtures and demonstrations use synthetic data.

| ID | Acceptance result | Covers |
|---|---|---|
| **AC-01** | All eight roles authenticate; disabled/unauthenticated users cannot access protected operations; Admin reset does not reveal the existing credential. | FR-01, FR-02 |
| **AC-02** | Each role is denied disallowed read/write/approve/export actions at the server boundary; Admin can manage accounts and institution master data only within the assigned administrator role. | FR-02, FR-03 |
| **AC-03** | Two synthetic bank scopes and two hospitals demonstrate isolation across lists, direct IDs, dashboards, audit views, and exports. | FR-02, FR-03 |
| **AC-04** | Hospital users see only their requests and assigned-bank aggregate availability; no donor, unit, screening, or patient identity is exposed. | FR-04, FR-18, FR-25, FR-27 |
| **AC-05** | Donor and sponsor accounts access only their own protected records and permitted public camp data; authorized Medical Officer donor-management access is limited to assigned duties. | FR-07, FR-11 |
| **AC-06** | Camp cannot be published before approval; rejection, material edit, completion, and cancellation follow the defined workflow. If preregistration is implemented, duplicate registration is rejected. | FR-08–FR-10 |
| **AC-07** | Sponsorship status history is camp-linked and auditable; no payment amount/transaction can be created. | FR-11, FR-12 |
| **AC-08** | Donation, synthetic screening event, and each resulting unit are linked; pending/failed, incomplete, or rule-unresolved units remain unavailable; discard and quarantine/revalidation history is preserved. | FR-13–FR-17, FR-22 |
| **AC-09** | Unit ID, source donation, positive volume, timestamps, location, state, and rule reference are validated. | FR-15–FR-17 |
| **AC-10** | Stock counts and alerts match committed state; reserved, expired, failed, discarded, quarantined, and issued units are excluded, including the exact expiry boundary. | FR-16–FR-18 |
| **AC-11** | FEFO orders a human-selected valid candidate set by expiry then unit ID and performs no compatibility selection. | FR-19 |
| **AC-12** | Concurrent reservation or issue attempts against one unit produce at most one valid allocation/issue; losers receive a conflict and no partial change. | FR-20, FR-32 |
| **AC-13** | Prototype reservation expiry at 30 minutes is audited; expiry/cancellation releases only a still-valid unissued unit. | FR-21, FR-31 |
| **AC-14** | Queue order is High then Standard, FIFO by current-tier entry time and deterministic tie-break; audited overrides enter the new tier in order, and partial remainders keep their place. | FR-26–FR-30 |
| **AC-15** | Invalid quantity, over-reservation, over-issue, duplicate retry, unauthorized cancellation, and stale request update are rejected without corrupting totals. | FR-25–FR-31 |
| **AC-16** | Issue succeeds only for a valid current reservation after two distinct technicians confirm; all hard blocks remain non-overridable. | FR-32, FR-33 |
| **AC-17** | Request cancellation before allocation and after allocation/partial issue releases only valid unissued stock and preserves issued history. | FR-27, FR-31, FR-34 |
| **AC-18** | Candidate results require human confirmation; missing rule sets produce no eligibility result or campaign list; current opt-out and call-up suppression suppress messages. If detailed deferrals exist, active deferrals also suppress. | FR-05, FR-23, FR-36, FR-37 |
| **AC-19** | Simulated call-ups and camp notices are deduplicated and consent-checked at send/retry; Queued, Suppressed, Failed, SimulatedDelivered, and Replied states are truthful. | FR-38, FR-39 |
| **AC-20** | Critical change and audit event commit together; audit-write failure leaves the mutation uncommitted; audit is read-only to application roles, sensitive values are redacted, and reads/exports are logged. | FR-42, FR-43 |
| **AC-21** | Backup restoration recovers synthetic inventory, requests, reservations, and audit history consistently. | FR-44 |
| **AC-22** | Dashboard stock and warnings reconcile with inventory; queue urgency and waiting time are accurate; no dashboard crosses institution boundaries. | FR-03, FR-18, FR-41 |
| **AC-23** | Seeded data is clearly synthetic; no test requires real personal/medical data, patient names, live SMS/integration, automated clinical decisions, or real blood issue. | FR-06; scope |
| **AC-24** | If preregistration/capacity management is included, duplicate registrations are rejected, capacity is not exceeded, and cancellation notices follow camp workflow. | FR-10 |
| **AC-25** | If detailed deferral management is included, active deferrals and history are respected by candidate filtering without computing eligibility. | FR-23, FR-37 |
| **AC-26** | If transfers are included, approval, in-transit, receipt, and cancellation preserve a single inventory location and never count the unit at both ends. | FR-24 |
| **AC-27** | If request notifications, reports, or exports are included, each is role/institution-scoped and contains no donor identity or patient data. | FR-03, FR-35, FR-40 |
| **AC-28** | If Admin rule editing is included, activation is versioned, prior versions remain traceable, and records retain the rule-set version used. | FR-45 |
| **AC-29** | If accessibility/localization enhancements are included, criteria are separately agreed and do not weaken authorization or safety messaging. | FR-46 |

## 12. Assumptions Index

- **A-1 — Synthetic reservation lifetime:** 30 minutes in the prototype only; not an institutional policy. See FR-21 and AC-13.
- **A-2 — Two-person prototype issue:** Two distinct authorized technician accounts initiate and confirm; a demonstration control, not a real release policy. See FR-32 and AC-16.
- **A-3 — Camp approval:** Medical Officer In-Charge approves publication while Camp Manager owns operations; project workflow recommendation, not an asserted institutional delegation. See FR-08–FR-09.
- **A-4 — Screening authority:** Technician-entered statuses are synthetic demonstration data and do not establish clinical authority. See FR-14 and FR-16.
- **A-5 — Synthetic rule values:** Eligibility intervals, shelf-life values, warning windows, and thresholds are test fixtures and not clinical recommendations. See FR-16, FR-18, FR-36, FR-45.
- **A-6 — Time handling:** Event timestamps use UTC and display in Asia/Colombo time. See §5.1 and §6.
- **A-7 — Role scope:** Accounts are assigned explicit role and institution scope; prefer one role per synthetic account for auditable demonstrations. See §2 and FR-03.
- **A-8 — Source-derived workflows instead of named UJs:** The sources provide workflows but no named user-session narrative; no persona stories are invented. UX work should capture and confirm named journeys with users if needed.

## 13. Open Questions and External Validation Gates

These questions do not block development or evaluation of the synthetic-data university prototype. They block any real-data or operational use and require authoritative input; the PRD does not invent the answers.

1. **Clinical/institutional — Owner: qualified local clinical authority/NBTS and participating institution.** Before real use, which approved rules govern donor eligibility and deferral, screening and release authority, component shelf-life/handling, request/issue procedures, and role delegation? Revisit before any real clinical data or operation.
2. **Legal/privacy — Owner: qualified Sri Lankan legal/privacy reviewer and institution.** Before any real personal data, what requirements govern notices, lawful basis, consent, retention/deletion, data rights, access, and breach handling? Revisit before collecting real data.
3. **Operational — Owner: participating institution.** Before operational deployment, who owns emergency escalation, what request-response targets and stock thresholds apply, and what recovery objectives are approved? Revisit before production use.
4. **Project validation — Owner: project team/supervisor.** Arrange the stated 2–3 interviews and confirm usability and role assumptions using synthetic scenarios. Revisit during requirements validation; do not infer clinical or legal policy from interviews alone.

## 14. Source Notes and Deferred Decisions

- **Controlling requirements:** canonical `SPEC.md` and `initial-project-specification.md` in `_bmad-output/specs/spec-blood-bank-management-system/`.
- **Supporting context:** `/Users/migara/Downloads/BloodBank_Project_Proposal (1).pdf`; used for project motivation and context, not as authority over newer roles, priorities, or non-goals.
- **Authoritative updated use cases:** `/Users/migara/Downloads/WhatsApp Image 2026-11-05 at 10.12.18.jpeg`.
- The proposal describes older six-role work and a technology stack. Both are excluded from this PRD because the updated diagram and controlling specification supersede the role model, and architecture/stack decisions are explicitly deferred.
- Numeric response, availability, scale, and coverage targets from the proposal are not adopted as requirements. The controlling specification commits to no production SLA or numeric response target.
- User validation is constrained to 2–3 supervisor-arranged interviews and published sources. The proposal's claims about current national practice remain unverified and are not represented as current fact.
- Real SMS, hospital/NBTS/lab integration, clinical decision rules, legal compliance, and production service levels remain out of scope or gated as specified above.
