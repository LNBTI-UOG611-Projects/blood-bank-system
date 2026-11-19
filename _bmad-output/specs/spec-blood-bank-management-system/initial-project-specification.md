# Blood Bank and Donor Management System

**Specification version:** 1.0  
**Status:** Development-ready requirements baseline for a synthetic-data university prototype  
**Source:** The brainstorming conversation and the user's subsequent specification review; no external proposal is assumed  
**Implementation status:** No coding, technology selection, API design, database schema, or system architecture is included

## 1. Reading this specification

Every requirement carries a MoSCoW priority and an origin label:

- **C — Confirmed:** stated in the user's brainstorming or later scope decisions.
- **R — Adopted recommendation:** added to close a safety, security, integrity, or clarity gap under the user's approval to refine the specification.
- **A — Prototype assumption:** a bounded value or workflow selected to make synthetic demonstrations testable. It is not clinical or organizational policy.
- **X — External validation:** requires an authoritative institutional, clinical, or legal decision before real-world use.

MoSCoW meanings: **Must** is required for the v1 prototype; **Should** is desirable but may be deferred without breaking the core demonstration; **Could** is optional; **Won't** is excluded from v1. A requirement tagged R or A is not represented as an original user statement.

A combined tag such as **C/R** preserves a confirmed requirement while marking its added safeguard as a recommendation; details remain explicit in the requirement text.

The requirements define outcomes and domain contracts. They intentionally do not select a technology stack, prescribe API endpoints, or define physical database tables.

## 2. Project overview

The Blood Bank and Donor Management System (BBDMS) is a responsive web application that demonstrates controlled donor, camp, donation, screening-status, blood-unit inventory, hospital-request, sponsorship, and communication workflows. It is for a four-member university team and uses synthetic data only. It is not a live healthcare system and must not be used to make or execute clinical decisions.

### Objectives

- Maintain accurate, traceable synthetic inventory by unit, component, status, location, and expiry.
- Coordinate donor records, basic camps, donations, screening status, sponsor activity, and simulated call-ups.
- Process hospital requests using high-priority-first/FIFO ordering, FEFO reservation within a human-selected candidate set, and confirmed prototype issue.
- Enforce least privilege, institution scoping, donor privacy, audit history, data validation, and concurrency-safe inventory changes.
- Demonstrate failure handling and recovery without real donor, patient, screening, or blood-distribution data.

### Success signal

A reviewer can follow synthetic records from donor and camp through donation, screening-status entry, unit availability, request, reservation, and issue; verify accurate stock and queue ordering; and test role isolation, hard safety blocks, audit history, concurrent allocation, simulated message failures, and backup restoration. No scenario uses real medical data, exposes donor identities to hospitals, or represents an actual clinical release.

## 3. Scope and boundaries

### Must Have — v1

- Authentication and role-based authorization for all eight roles.
- Donor registration and profile management; donor contact and SMS-preference controls.
- Basic camp creation, approval/publication, updates, cancellation, and outcome recording.
- Donation and screening-status recording; blood-unit registration and lifecycle control.
- Accurate availability by blood group and component; expiry and low-stock warnings.
- Hospital requests, initial urgency, high-priority-first/FIFO-within-tier processing, FEFO reservation, partial fulfillment, and confirmed prototype issuing.
- Human-reviewed donor candidate filtering and simulated SMS call-ups.
- Essential sponsor registration and camp-linked offer/activity tracking without payment execution.
- Basic dashboards, validation, audit history, transaction safety, institution isolation, and a tested synthetic backup/restore.

### Should Have

- Donor camp preregistration and advanced camp management.
- Donor deferral management and richer sponsorship coordination.
- Blood-unit transfers between locations.
- Request notifications, detailed reports, CSV/PDF exports, and admin-editable/versioned operational rules.
- Improved accessibility and localization work.

### Could Have

- QR/barcode support, offline camp capture, advanced analytics, additional sponsorship features, and optional Sinhala/Tamil donor-facing pages and SMS templates.

### Won't Have in v1

- Real SMS delivery or live hospital, NBTS, laboratory, or national-system integration.
- Real donor, patient, or screening data, patient names, or actual blood issuing in a healthcare facility.
- Clinical compatibility selection, diagnosis, automated final donor eligibility, or automated clinical prioritization.
- Payment processing, paid blood handling, real-value donor rewards, or machine learning.

### Boundaries and constraints

- Hospitals submit requests and receive aggregate availability counts and their own request information. They do not receive unit identifiers, donor identities, screening details, or patient data.
- Patients are not users. Patient names and identifying patient narratives are prohibited in all records, notes, messages, logs, and exports.
- NBTS, hospitals' live information systems, laboratories, and SMS providers are external.
- The prototype assumes internet access. It does not claim production availability, clinical safety, regulatory compliance, or real-world effectiveness.
- Use technology the team can implement confidently; no database or framework is prescribed here.
- Validation access is limited to 2–3 supervisor-arranged interviews and published sources. The timeline is not fixed.
- Before real-world use, authoritative clinical/institutional and Sri Lankan legal/privacy validation is mandatory.

## 4. Users, roles, and permissions

All permissions are enforced server-side for every list, detail, mutation, dashboard, search, audit view, and export. Staff accounts are assigned one or more explicitly granted roles and an institution; the prototype should prefer one role per account for auditable demonstrations. A user cannot grant permissions to themselves.

| Role | Permitted v1 responsibilities and records | Explicit restrictions |
|---|---|---|
| **Donor** | Self-register; view/update own contact details and communication preferences; view own donation history and published camps; respond to own call-ups. Camp preregistration is Should. | Cannot view another donor, internal screening details, stock units, or requests. |
| **Sponsor** | Register as a person or organization; browse published camps; create, update while Proposed, withdraw while Proposed, and track own camp-linked sponsorship offers. | Cannot view other sponsors' records, donor/screening data, stock, or requests; no payment operation. |
| **Hospital Requester** | Submit, read, and track requests belonging to the requester's hospital and addressed to an assigned blood bank; set initial High or Standard urgency; view that bank's aggregate stock counts by group/component. Request cancellation follows the rules in §7. | No donor identity, unit ID, screening details, another hospital's requests, stock reservation, or issue authority. |
| **Medical Officer In-Charge** | Maintain donor master/contact records; filter candidate donors; review and approve call-up recipients; create simulated campaigns; approve camp publication under the adopted prototype workflow. | No unit registration, screening-state override, inventory issue, request-priority override, account administration, or final system-generated eligibility decision. |
| **Blood Bank Technician** | Record donations and synthetic screening status; register and correct units; process the request queue; select operational candidates; create reservations; initiate and confirm routine issues with a second distinct technician account; record discard/quarantine reasons. | Cannot override failed screening, expiry, discard, quarantine, institution scope, or request priority; cannot approve their own issue. |
| **Camp Manager** | Create and maintain camps; manage camp attendance/outcomes; review offers and mark them Accepted, Declined, Withdrawn, or Fulfilled; send approved simulated camp notices; request cancellation and notify registrants. May access only the minimum donor contact data needed for camp operations. | No donor screening details, unit inventory controls, hospital requests, or clinical eligibility decisions. |
| **Blood Bank Manager** | Monitor stock, risks, queue, and reports; approve request-priority overrides with reason; authorize a release of a still-valid unissued reservation; approve Should-have transfers; review relevant operational audit events. | Cannot override hard safety blocks or change a failed/expired/discarded unit to Available; no routine donor-master access or clinical decision authority. |
| **Admin (System Administrator)** | Provision/disable staff accounts, assign approved roles/institutions, maintain institution master data, access the audit log, and manage system settings. Rule editing is available only if the Should-have rule-management feature is implemented. | No screening approval, unit issue, request-priority decision, or routine access to donor clinical information. Administrative status does not bypass authorization or safety rules. |

### Permission and data-isolation rules

- Donors and sponsors can access only their own private records. Public camp information is visible to authenticated roles as permitted.
- Hospital access is scoped to the account's hospital. Staff access is scoped to assigned blood bank(s); cross-institution access is denied by default.
- For synthetic isolation tests, seed at least two institution scopes and two hospitals. This is test data, not a requirement for live multi-tenancy or integration.
- Hospital availability is aggregated; never expose donor/unit identifiers or screening results to a hospital account.
- Camp staff see only minimal contact/registration information needed for camp work. Medical officers see donor information only for authorized donor-management/call-up duties.
- Admin audit access is read-only. Sensitive values are redacted; audit-view access is itself recorded.

The Medical Officer's camp-publication approval and the least-privilege grants above are adopted project recommendations for this prototype. They are not claims about NBTS or any institution's real delegation policy.

## 5. Functional requirements

### Identity, authorization, and privacy

- **FR-01 [C, Must]:** Authenticate all eight roles and provide logout. Unauthenticated users cannot read or change protected records.
- **FR-02 [R, Must]:** Staff accounts are provisioned/disabled by Admin; donor and sponsor self-registration is separate. V1 account recovery is an Admin-initiated reset that never reveals an existing credential. Role or institution assignment changes require explicit authorization and audit.
- **FR-03 [R, Must]:** Enforce role and institution authorization server-side on every operation, including direct record access, dashboards, search, exports, and background operations.
- **FR-04 [C, Must]:** Do not create patient accounts or store patient names. Reject patient-identifying notes and message content; use request IDs instead.
- **FR-05 [R, Must]:** Record donor SMS consent/preference and opt-out state with time/source. Check the current state at each simulated send, including retries.
- **FR-06 [R, Must]:** Use synthetic records only. Seeded demo identities and data must be clearly labelled and must not resemble real records or real contact destinations.

### Donors, camps, and sponsors

- **FR-07 [C, Must]:** Donors can register, update permitted profile/contact fields, set communication preferences, view their own history, view published camps, and respond to call-ups.
- **FR-08 [C, Must]:** Camp Managers can create and maintain basic camps, record attendance/outcomes, associate sponsorship offers, and record cancellation notices.
- **FR-09 [R, Must]:** A camp follows Draft → PendingApproval → Published → Completed or Cancelled. The Medical Officer In-Charge approves publication; material changes to an approved camp require renewed approval. Rejection returns the camp to Draft with a reason.
- **FR-10 [Should]:** Donors preregister for camps; the system prevents duplicate registration and enforces a configured capacity if capacity tracking is enabled.
- **FR-11 [C, Must]:** Sponsors can register, view public camps, submit offers, and track their own offer status. Camp Managers can link an offer to one camp.
- **FR-12 [R, Must]:** Track offers as Proposed, Accepted, Declined, Withdrawn, or Fulfilled, with description, non-monetary quantity/delivery details, dates, camp, sponsor, status history, and responsible actor. Sponsor edits/withdraws only while Proposed; Camp Manager reviews and updates status. Do not record financial amounts or process payments in v1.

### Donations, screening, and inventory

- **FR-13 [C, Must]:** Technicians record completed synthetic donations with donor reference, camp (if applicable), collection time, and recorder.
- **FR-14 [C/R, Must]:** Record screening status explicitly as Pending, Passed, or Failed, with the synthetic scenario's result source, actor, and timestamp. These are prototype workflow labels, not clinical classifications. The prototype records supplied status; it does not interpret laboratory results or approve real clinical screening.
- **FR-15 [C/R, Must]:** Register each unit with unique unit ID; source donation; blood group; component; volume and unit of measure; collection time; expiry timestamp; location; screening reference/status; lifecycle state; and creator.
- **FR-16 [R, Must]:** A unit can become Available only when required fields are valid, a named synthetic rule-set version supplies expiry, screening is recorded Passed, current time is before expiry, no active block exists, and no active reservation exists. Missing/unknown rules fail closed.
- **FR-17 [R, Must]:** Enforce the state transitions in §7. A correction never silently reactivates an issued, discarded, expired, failed, or quarantined unit. A status correction that invalidates a reservation blocks issue and records an audited quarantine/release transition.
- **FR-18 [C, Must]:** Show current stock counts by blood group and component, plus low-stock and expiry warnings derived only from currently eligible stock and seeded demo thresholds.
- **FR-19 [C, Must]:** Provide FEFO ordering by expiry timestamp, then unit ID as a deterministic tie-breaker, only within a human-selected operational candidate set. The system does not determine compatibility or select a clinically compatible unit.
- **FR-20 [R, Must]:** Reservation atomically rechecks unit state, screening, expiry, request ownership, and competing reservations before commit. At most one active reservation can exist per unit.
- **FR-21 [A, Must]:** A reservation expires 30 minutes after creation in the synthetic prototype. Expiry is recorded atomically; release returns a unit to Available only if it is still unissued, unexpired, passed-screening, and otherwise valid.
- **FR-22 [C, Must]:** Technicians record discards with reason, actor, timestamp, and unit. Discarded stock is terminal and unavailable.
- **FR-23 [Should]:** Detailed donor deferral records, reasons, and history are maintained; any active recorded deferral suppresses candidate call-up. Deferral rules and intervals are not inferred by the system.
- **FR-24 [Should]:** Transfer stock between locations only through explicit origin, destination, approval, in-transit, receipt, and cancellation events. In-transit units are not counted as Available at either location.

### Hospital requests, queue, reservations, and issue

- **FR-25 [C/R, Must]:** Hospital Requesters submit requests with requesting hospital, assigned servicing blood bank, requester, requested blood group/component, positive whole-number unit quantity, initial urgency (High or Standard), creation time, and optional non-identifying operational note. No patient name or patient identifier field exists.
- **FR-26 [R, Must]:** Track requested, actively reserved, issued, and remaining quantities separately. Enforce `issued + active reserved <= requested`; quantities cannot be zero, negative, fractional, or silently overwritten.
- **FR-27 [R, Must]:** Use request states Submitted, UnderReview, WaitingForStock, PartiallyReserved, Reserved, PartiallyIssued, Fulfilled, Rejected, CancellationRequested, Cancelled, and ClosedPartiallyFulfilled; only transitions in §7 are valid.
- **FR-28 [C/R, Must]:** Process High urgency before Standard urgency and FIFO within each tier. Order by the time the request entered its current tier, then request ID. Initial tier-entry time is submission time; an authorized priority override creates a new tier-entry time and audit event. A partial remainder keeps its current tier-entry time and urgency.
- **FR-29 [C/R, Must]:** Requester sets initial urgency. Only Blood Bank Manager may override it, with reason and an audit event. The system does not compute clinical priority or silently reorder requests.
- **FR-30 [C, Must]:** A partially fulfilled remainder stays active at its existing priority until fulfilled or explicitly closed under the cancellation rules.
- **FR-31 [R, Must]:** A reservation links one request to one unit and records creator, creation time, expiry, and state. Cancellation/expiry cannot reverse an issue or release a unit that has become blocked.
- **FR-32 [C/R, Must]:** Issue requires a current valid reservation, final state/expiry/screening checks, and two distinct authorized Blood Bank Technician accounts: one initiates and another confirms. Neither confirmation can bypass hard blocks.
- **FR-33 [C/R, Must]:** Blood Bank Manager may authorize a priority override or cancellation/release of a still-valid unissued reservation with a recorded reason. No manager or administrator may override failed/pending screening, expiry, discard, quarantine, or cross-institution restrictions.
- **FR-34 [C, Must]:** Record issue/outcome events against request, unit, reservation, actors, and time. Issued and discarded events are immutable; corrections append a compensating event rather than rewriting the outcome.
- **FR-35 [Should]:** Notify the relevant hospital and staff of request-state changes. Notifications contain no donor identity or patient information.

### Donor filtering and communications

- **FR-36 [C/R, Must]:** Medical Officer In-Charge filters donor candidates using consent/contactability, recorded camp activity or donor response, and elapsed time since the last recorded donation against an explicitly identified synthetic interval rule when used. Candidate results are not a final eligibility decision; no rule set means no eligibility result or campaign recipient set.
- **FR-37 [R, Must]:** An authorized Medical Officer reviews and confirms each campaign recipient set before dispatch. Consent, opt-out, and a minimal Medical-Officer-managed call-up suppression flag (without clinical reason) are enforced in v1; a recorded active deferral is also excluded when deferral data is present. Detailed deferral records and reasons are Should.
- **FR-38 [C/R, Must]:** All call-ups and camp notices use simulated delivery. Track campaign, recipient, template, Queued/SimulatedDelivered/Failed/Suppressed/Replied status, attempts, timestamps, and donor response where provided. `SimulatedDelivered` never implies real SMS delivery.
- **FR-39 [R, Must]:** Deduplicate by campaign and donor; retries are idempotent and do not create multiple logical sends. Recheck consent immediately before each attempt. Messages contain only minimal contact/action information, never screening results, diagnoses, or patient details.
- **FR-40 [Should]:** Send request notifications and support detailed reports and authorized CSV/PDF exports.

### Dashboards, audit, and operations

- **FR-41 [C/R, Must]:** Provide basic dashboards for current stock, expiry/low-stock warnings, donation activity, and the request queue grouped by urgency with elapsed waiting time. Dashboard figures use the same availability rules as inventory operations; the system does not promise response times or automatically change priority.
- **FR-42 [C/R, Must]:** Record audit events for critical data changes and actions: actor, role/institution, timestamp, action, entity/record, outcome, reason when applicable, and minimal old/new values. Include screening changes, priority changes, issue/reservation/discard, account/role changes, and security-sensitive actions.
- **FR-43 [R, Must]:** Audit events are append-only to application roles; the mutation and its audit event commit atomically. Redact secrets and unnecessary donor contact/health details. Log audit viewing and exports; never silently report a successful change if its audit write fails.
- **FR-44 [R, Must]:** Provide a documented synthetic backup/restore procedure and demonstrate restoration of inventory, requests, reservations, and audit history together.
- **FR-45 [Should]:** Admin can create/version operational rules and activate a reviewed version. Each use records the rule-set identifier; earlier versions remain traceable and changes do not silently rewrite existing expiry or eligibility outcomes.
- **FR-46 [Should]:** Provide improved accessibility and localization beyond the baseline responsive English interface. Sinhala/Tamil pages and templates remain optional Could features.

## 6. Workflows

### 6.1 Account and access

1. Admin creates, assigns, disables, or changes staff accounts and institution scope; each change is audited. Donors and sponsors may self-register for their own accounts.
2. User authenticates, receives only the permissions and institution scope assigned to the account, and can log out.
3. Every protected operation rechecks authorization on the server. An account disabled during a session loses access on its next protected operation.
4. V1 account recovery is Admin-initiated for synthetic accounts; the Admin resets rather than reveals credentials. Staff role changes cannot be self-approved. No live email/SMS recovery integration is required.

### 6.2 Camp, registration, and sponsorship

1. Camp Manager creates a Draft with name, dates/times, location, organizer, contact channel, and operational notes that contain no patient data.
2. Camp Manager submits the camp for approval. Medical Officer In-Charge approves it for publication or returns it with a reason.
3. Only Published camps are visible to donors and sponsors. Material date/location changes return the camp to approval; cancellation records a reason and triggers simulated notices to affected registrants.
4. Donors may view Published camps. Preregistration is Should; basic v1 records camp attendance/outcome without requiring preregistration.
5. Sponsor submits or edits a Proposed offer linked to a camp. Camp Manager accepts or declines it; an Accepted offer may be marked Fulfilled or Withdrawn. Sponsor may withdraw only a Proposed offer. All transitions are auditable; no payment is taken or tracked.
6. Camp Manager records camp outcome. Duplicate registrations/offers are rejected or linked to an existing record rather than silently duplicated.

### 6.3 Donation, screening status, and unit

1. Technician records a completed donation linked to a donor and optionally a camp.
2. Technician records a synthetic screening status supplied by the scenario. Pending and Failed do not permit availability; a Passed result is an explicit recorded status, not a system-generated conclusion.
3. Technician registers each resulting unit and links it to the donation. Required unit data and rule version/source are validated.
4. A unit becomes Available only when all FR-16 conditions pass. Otherwise it remains PendingScreening or Quarantined with an actionable reason for authorized staff.
5. Stock counts and alerts update from the committed state. A correction or discard records actor, reason, old/new values where safe, and time.

### 6.4 Candidate review and simulated call-up

1. Medical Officer selects a campaign and applies identified, versioned demo rules plus non-clinical filters.
2. System excludes donors without current consent, opted-out/do-not-contact donors, call-up-suppressed donors, and recorded active deferrals.
3. Medical Officer reviews and confirms the recipient list. The system labels it a candidate list; it never states that a donor is medically eligible.
4. Each logical donor/campaign message is deduplicated. Consent is rechecked at send time. Delivery is recorded as simulated only; failures are not displayed as successes.
5. Donor responses are associated with the campaign and donor account without adding clinical detail.

### 6.5 Request, queue, reservation, and issue

1. Hospital Requester submits a request addressed to an assigned blood bank with a valid quantity, selected group/component, and High or Standard urgency. The system rejects patient identifiers and scopes the record to both the requester's hospital and servicing bank.
2. Technician reviews request completeness and moves it to UnderReview, WaitingForStock, or Rejected with a reason. This is operational review, not clinical compatibility selection.
3. Queue order is High first, then Standard; within each tier, current-tier entry time and request ID determine order. A manager override enters the request at the end of the new tier; partial remainders retain their existing tier position.
4. Authorized staff select an operational candidate set. System validates the unit hard-block rules and sorts the set FEFO; it does not infer compatibility.
5. Reservation atomically verifies request ownership, remaining quantity, unit status, screening, expiry, and absence of another active reservation. A failed/stale attempt commits nothing and returns a recoverable error.
6. Reservation is active for 30 minutes in the prototype. Expiry or permitted cancellation releases only a still-valid, unissued unit; the state change and audit record are atomic.
7. Technician initiates issue; a second distinct authorized technician rechecks request balance, reservation, unit status, screening, and expiry and confirms. The issue event and inventory/request quantities commit atomically.
8. Partial issue keeps the remaining request active at its original priority and queue time. Fulfillment closes the request. A requester may cancel before allocation; after allocation, cancellation is requested and staff release eligible unissued reservations. If units were already issued, the record closes as partially fulfilled without reversing issues.
9. Hospital requester sees status and aggregate availability only. No real unit is issued by the prototype.

### 6.6 Transfer (Should)

Manager-approved transfer records source/destination, unit, sender, receiver, status, and timestamps. Unit is unavailable at the origin while in transit and is not available at the destination until receipt is confirmed. Cancellation returns it to origin only after validation. Transfers cannot bypass unit hard blocks.

## 7. Business rules and state transitions

### 7.1 Inventory and availability

- **BR-01:** A unit is Available only with unique ID, source donation, blood group, component, positive volume and unit, collection time, future expiry, location, Passed screening status, and Available state.
- **BR-02:** Pending/Failed screening, expired, reserved, issued, discarded, quarantined, incomplete, or conflicting units are excluded from stock availability and cannot be reserved/issued.
- **BR-03:** Expiry comes from a named synthetic component rule-set version. If the applicable version is missing or unknown, the unit remains unavailable. Rule changes do not silently rewrite existing outcomes. No supplied rule or demonstration threshold represents clinical guidance.
- **BR-04:** Store event timestamps in UTC and display in Asia/Colombo time. A unit expires when `current_time >= expires_at`; tests cover the exact boundary.
- **BR-05:** Available stock summaries count each unit once and use the same committed data and hard-block predicates as reservation.
- **BR-06:** FEFO orders by `expires_at`, then stable unit ID, within only the human-selected candidate set. No compatibility or clinical eligibility algorithm is permitted.
- **BR-07:** One unit has at most one active reservation. Reservation and issue checks plus state changes are atomic.
- **BR-08:** Issued, discarded, and expired are terminal. Quarantined or failed-screening units require correction through an audited workflow and cannot be restored by an override.

### 7.2 Unit state model

| Current state | Event/condition | Next state | Guard |
|---|---|---|---|
| PendingScreening | Passed result recorded | Available | Required data valid; not expired; authorized synthetic data entry |
| PendingScreening | Failed result or conflicting record | Quarantined | Reason and actor recorded |
| Quarantined | Authorized correction and revalidation requested | PendingScreening | Correction and new screening event are audited; never transition directly to Available |
| Available | Reservation created | Reserved | Atomic unit/request checks; no active reservation |
| Reserved | Issue confirmed | Issued | Two distinct technicians; reservation current; all hard checks pass |
| Reserved | Reservation expires or is cancelled | Available | Only if unissued, unexpired, Passed, and otherwise valid |
| PendingScreening, Available, Reserved, or Quarantined | Discard recorded | Discarded | Reason, actor, time; active reservation closed atomically |
| Any nonterminal state | Expiry reached | Expired | Reservation cannot remain active; no issue after expiry |
| Any nonterminal, nonissued state | Data conflict or screening correction | Quarantined | Block issue; invalidate active reservation; audit and notify staff |
| Issued, Discarded, Expired | Any attempted restoration | No transition | Terminal state; use correction/compensating event, never reactivate |

### 7.3 Request and reservation state model

| State | Allowed next state(s) | Authority/guard |
|---|---|---|
| Submitted | UnderReview, Cancelled, Rejected | Requester creates; requester may cancel before allocation; Technician begins review |
| UnderReview | WaitingForStock, PartiallyReserved, Reserved, Rejected, Cancelled | Technician validates request; cancellation only before allocation |
| WaitingForStock | PartiallyReserved, Reserved, Rejected, CancellationRequested | Technician processes queue; requester requests cancellation |
| PartiallyReserved | Reserved, PartiallyIssued, CancellationRequested | Only valid unissued reservations count; requester cannot erase allocations |
| Reserved | PartiallyIssued, Fulfilled, CancellationRequested | Issue requires two-technician confirmation; Fulfilled only after a committed issue reaches the requested quantity |
| PartiallyIssued | PartiallyIssued, Fulfilled, CancellationRequested | Remaining quantity stays active; already-issued units are immutable; Fulfilled only after the final committed issue reaches the requested quantity |
| CancellationRequested | Cancelled, ClosedPartiallyFulfilled | Technician/Manager releases valid unissued reservations; issued quantity remains |
| Cancelled/Rejected/Fulfilled/ClosedPartiallyFulfilled | No transition | Terminal; correction is a new audited event, not status rewriting |

An active reservation has its own Active, Issued, Cancelled, or Expired state. Request quantity invariant: `issued_quantity + active_reserved_quantity <= requested_quantity`; `remaining_quantity = requested_quantity - issued_quantity - active_reserved_quantity` for allocation purposes. A cancellation after any issue ends as ClosedPartiallyFulfilled if an unissued remainder is not fulfilled.

### 7.4 Queue and other rules

- **BR-09:** Priority is High or Standard; High precedes Standard. FIFO uses current-tier entry time, then immutable request ID. Initial tier entry uses server submission time; an authorized priority change sets a new tier-entry time and is audited. Partial fulfillment does not reset current-tier entry time.
- **BR-10:** Only Blood Bank Manager changes urgency after submission; old/new value, reason, actor, and time are audited. No automatic clinical prioritization or aging-based reordering occurs.
- **BR-11:** Donor candidate filters support human review only. The system never declares final eligibility; current opt-out/do-not-contact, the v1 call-up suppression flag, and any recorded active deferral always suppress call-up. Without an identified active synthetic rule set, no eligibility result or campaign recipient set is produced.
- **BR-12:** Each simulated campaign/donor pair has one logical message; retries do not duplicate it. Consent is checked for each attempt.
- **BR-13:** Hospital views contain aggregate counts and own request fields only. No patient names or donor/unit identifiers are stored in hospital request records or exposed.
- **BR-14:** Critical corrections append actor, timestamp, reason, record ID, and old/new values where safe. Never permanently delete or silently rewrite issued/discarded history.
- **BR-15:** Sponsorship tracking is non-payment activity. V1 stores offers and fulfillment detail, not payment amounts, processing, receipts, or donor rewards.
- **BR-16:** Critical business mutation and audit event are one transaction. If either fails, neither is reported as successful.
- **BR-17:** Reservation default of 30 minutes and two-person issue are synthetic prototype controls, not clinical or institutional policies.
- **BR-18:** Sponsorship transitions are Proposed → Accepted or Declined or Withdrawn; Accepted → Fulfilled or Withdrawn. Declined, Withdrawn, and Fulfilled are terminal. Sponsor controls only their Proposed offer; Camp Manager controls review and fulfillment status.

## 8. Data requirements

These are logical record requirements, not a physical schema. Every record has a stable internal identifier, created/updated timestamps, and an actor reference where applicable. Use UTC for event timestamps; use Asia/Colombo for display and date entry. Store no patient identity.

| Record | Minimum information and relationships | Validation/privacy rules |
|---|---|---|
| **Account and role assignment** | Account ID, login identifier, role, active state, institution scope, created/disabled times, credential-recovery state. | Unique login; only Admin provisions staff; role/scope changes audited; secrets never logged. |
| **Institution** | Institution ID, type (blood bank or hospital), name, active state, and explicitly authorized hospital-to-bank service relationships. | Data isolation applies to every institution-scoped record. A hospital may request from only an assigned bank. Synthetic test fixtures include separate scopes. |
| **Donor** | Donor ID, display name, synthetic contact details, contact preferences, SMS consent/source/time, do-not-contact state, call-up suppression flag/actor/time, and active recorded deferral reference if the Should feature exists. | No real identifiers or unsanitized medical narratives; donor self-service is own-record only. |
| **Sponsor** | Sponsor ID, person/organization type, display name, synthetic contact details, active state. | Sponsors access only their profile and offers. |
| **Camp** | Camp ID, institution, name, schedule, location, contact/organizer, status, capacity if enabled, approval/cancellation reason, outcome, creator/approver and timestamps. | Published only after approval; invalid dates rejected; schedule/location changes and cancellations preserve history. |
| **Camp registration/attendance** | Donor, camp, registration or attendance status, created/updated time. | Unique donor/camp pair; preregistration is Should; only authorized camp roles see minimum necessary contact data. |
| **Sponsorship offer** | Sponsor, camp, offer description, non-monetary quantity/delivery details, status, dates, actor and status history. | No payment amount or transaction; unique identity prevents silent duplicates. |
| **Donation** | Donation ID, blood-bank institution, donor, optional camp, collection time, completion state, recording technician. | Unique stable ID; validate donor/camp institution references; no patient data. |
| **Screening event** | Donation/unit reference, generic Pending/Passed/Failed status, source/scenario reference, actor, timestamp, correction reason/history. | Synthetic prototype status only; no interpretation of lab values or claim of real approval. Failed/pending blocks availability. |
| **Blood unit** | Unit ID, owning blood-bank institution, source donation, blood group, component, positive volume/unit, collection time, expiry time, location, screening reference, lifecycle status, rule-set version, creator. | Unique unit ID; expiry after collection; required values; traceable donation lineage; no hospital exposure of unit ID. |
| **Hospital request** | Request ID, requesting hospital, servicing blood-bank institution, requester, requested group/component, positive integer unit quantity, urgency, status, server submission time, current-tier entry time, non-identifying note, requested/reserved/issued/remaining values. | Scoped to both assigned institutions; no patient name, identifier, or patient narrative; requester sees only own hospital data. |
| **Reservation** | Reservation ID, request, one unit, active state, created/expiry times, creator, cancellation/expiry reason. | One active reservation per unit; quantity invariant checked atomically. |
| **Issue/outcome event** | Issue ID, request, unit, reservation, initiating and confirming technicians, timestamp, outcome/status. | Two distinct authorized users; immutable; no patient identity. |
| **Message/campaign** | Campaign ID, donor, approved template, consent snapshot/reference, status, attempt count, response, timestamps. | One logical donor/campaign message; check current opt-out at each attempt; no sensitive details. |
| **Audit event** | Actor/role/institution, timestamp, action, entity/ID, outcome, reason, safe old/new values, correlation reference. | Append-only to application roles; redact sensitive data; audit reads/exports and critical failures. |
| **Operational rule set** | Rule-set ID/version, name, source/label, effective demo period, values, activation actor/time. | V1 uses seeded synthetic values; configurable editing/versioning is Should; never silently change a rule used by existing records. |

### Data validation rules

- Required identifiers are unique; foreign references must resolve and remain institution-authorized.
- Dates and quantities are validated server-side; expiry precedes neither collection nor the configured synthetic rule.
- A request quantity is a positive whole number. Blood-unit volume is positive with an explicit unit of measure.
- Do not accept patient-identifying fields. Reject or remove patient names from free-text inputs before persistence; do not copy them into logs.
- Each inventory state change checks the prior state and current state in one transaction. Stale writes return a visible conflict rather than overwriting newer state.
- Duplicate donors, registrations, offers, and requests are handled with duplicate detection or idempotent submission; never silently create a second logical operation on retry.
- Exported data, if/when Should features are enabled, uses the same role and institution scope as the source screen and excludes unnecessary personal data.

## 9. Security, privacy, and audit

### Authentication and authorization

- Use secure salted password hashing through an established library; never store or log plaintext passwords or recovery secrets.
- Apply login throttling, session expiry, explicit logout, and account disablement. A disabled account cannot continue protected operations.
- Enforce least privilege and institution scope on the server for every request. UI hiding is not authorization.
- Staff accounts are Admin-provisioned; donors/sponsors may self-register. Role assignment and privilege changes require audit and cannot be self-approved.
- Do not allow Admin to bypass unit safety, screening, request priority, or institution controls.

### Privacy and data minimization

- Synthetic data only in the prototype; mark the environment and seeded data clearly.
- Never store patient names, patient identifiers, or patient clinical narratives.
- Hospital users see aggregate availability and their own request records only. They never see donor identities, unit identifiers, or screening status.
- Donor medical detail is not collected beyond the synthetic statuses required to demonstrate workflow. Donor contact data is visible only to authorized roles for a stated operational need.
- SMS and notifications contain no screening outcomes, diagnoses, patient information, or unnecessary personal detail. Consent and opt-out apply to every attempt.
- Retention/deletion for real donor data is not specified here and requires legal/privacy and NBTS review before real data is used.

### Audit and integrity

- Audit screening, unit/request/reservation/issue/discard/transfer changes, priority overrides, account/role changes, camp approval/cancellation, message outcomes, exports, audit access, and security-relevant failures.
- Include actor, role/scope, event timestamp, action, affected record, outcome, and reason where applicable. Store only necessary old/new values and redact secrets/contact data.
- Application users cannot edit or delete audit history. Audit write failure aborts the critical mutation.
- Corrections append a compensating event; terminal issued/discarded/expired history is not overwritten.
- Errors are explicit. Failed validation, authorization, transaction, network, or scheduled work never returns a success-shaped response.

## 10. Non-functional requirements

- **Safety:** Failed/pending screening, expired, discarded, quarantined, incomplete, or otherwise blocked units cannot be counted Available, reserved, or issued. No safety override exists.
- **Integrity:** Enforce state transitions, referential validity, quantity invariants, uniqueness, atomic reservation/issue, and audit consistency.
- **Concurrency:** Competing reservations or issues for the same unit allow at most one valid commit. Conflicts report a recoverable error and refreshed state.
- **Security:** Server-side RBAC, institution isolation, secure credentials/session behavior, least privilege, audit protection, and input validation.
- **Privacy:** Synthetic-only data; no patient data; donor minimization, consent, opt-out, and scoped visibility.
- **Reliability:** Provide a reproducible backup/restore test; show critical failures clearly; do not report uncommitted operations as successful.
- **Usability:** Responsive web interface, role-appropriate actions, understandable status labels, validation feedback, and English v1 content.
- **Accessibility/localization:** Improved accessibility is Should; optional Sinhala/Tamil donor-facing content is Could. No WCAG conformance claim is made unless separately tested.
- **Testability:** Every functional requirement has an observable acceptance result; seed deterministic synthetic records for role, state, concurrency, privacy, and failure tests.
- **Performance/availability:** No production SLA or numeric response target is specified. The team should record performance on its agreed synthetic demo dataset; no real emergency-response time is promised.

## 11. Error and exception handling

| Scenario | Required behavior |
|---|---|
| Unauthenticated, unauthorized, disabled, or cross-institution access | Deny server-side; disclose no protected record values; record security-relevant event. |
| Missing/invalid unit field, duplicate ID, invalid date, or invalid transition | Reject before commit; explain the field/state conflict to authorized users; preserve audit trail. |
| Pending/failed screening, expiry, discard, quarantine, or stale data at reservation/issue | Block operation and availability count; show a safe actionable reason to authorized staff. |
| Two simultaneous reservations/issues | Atomically allow at most one; reject others with a refreshable conflict and no partial mutation. |
| Screening changes to failed or record becomes disputed while reserved | Quarantine unit, invalidate active reservation atomically, block issue, audit and notify responsible staff. |
| Request quantity is invalid or requested/reserved/issued totals conflict | Reject; retain prior state and quantities; never silently clamp or over-fulfill. |
| Request duplicated, stale, unauthorized, insufficient stock, or rejected | Preserve one logical request; show status/reason and remaining amount; no clinical decision is inferred. |
| Request cancellation before/after allocation or after partial issue | Release only valid, unissued reservations; retain issued units; use Cancelled or ClosedPartiallyFulfilled as appropriate. |
| Reservation expires while issue/cancellation is in progress | Serialize state transition; only one outcome commits; no expired unit can issue. |
| Priority changed without manager authority or reason | Deny and audit; preserve existing order and priority. |
| SMS target opted out, consent revoked, duplicate retry, simulated failure, or response absent | Suppress or record failure truthfully; deduplicate; preserve response/status; do not imply real delivery. |
| Camp rejected, materially changed, over capacity, or cancelled | Prevent publication/duplicate registration as applicable; record reason; notify affected registrants through simulation. |
| Sponsorship duplicated, withdrawn, mislinked, or changed without authority | Preserve status history; reject duplicate logical submission; do not process money. |
| Transfer incomplete or receipt missing | Keep unit unavailable and visible as in transit; never count at both locations; record cancellation/receipt explicitly. |
| Audit persistence, database, network, scheduled operation, or backup/restore fails | Do not claim success; roll back dependent critical mutation; show recoverable error and alert authorized staff for operational failures. |
| Dashboard/alert/report stale or inconsistent | Recalculate from current committed records; display last-updated time; apply the same scope as source records. |

## 12. Acceptance criteria and traceability

The identifiers below are the v1 verification contract. Automated tests are preferred for authorization, state, quantity, idempotency, and concurrency; workflow demonstrations use only synthetic data.

| ID | Acceptance result | Covers |
|---|---|---|
| **AC-01** | All eight roles authenticate; disabled/unauthenticated users cannot access protected operations; Admin reset does not reveal the existing credential. | FR-01, FR-02 |
| **AC-02** | Each role is denied disallowed read/write/approve/export actions at the server boundary. | FR-02, FR-03 |
| **AC-03** | Two synthetic bank scopes and two hospitals demonstrate isolation across record lists, direct IDs, dashboards, audit views, and exports. | FR-03 |
| **AC-04** | Hospital users see only their requests and aggregate availability from assigned banks; no donor, unit, screening, or patient identity is exposed. | FR-04, FR-25 |
| **AC-05** | Donor and sponsor accounts access only their own protected records and permitted public camp data. | FR-07, FR-11 |
| **AC-06** | Camp cannot be published before approval; rejection, material edit, completion, and cancellation follow the defined workflow. If preregistration is implemented, duplicate registration is rejected. | FR-08, FR-09, FR-10 |
| **AC-07** | Sponsorship status history is camp-linked and auditable; no payment amount/transaction can be created. | FR-11, FR-12 |
| **AC-08** | Donation, synthetic screening event, and each resulting unit are linked; pending/failed, incomplete, or rule-unresolved units remain unavailable; discard reasons and quarantine/revalidation history are preserved. | FR-13, FR-14, FR-15, FR-16, FR-17, FR-22 |
| **AC-09** | Unit unique ID, source donation, positive volume, timestamps, location, state, and rule reference are validated. | FR-15–FR-17 |
| **AC-10** | Stock counts and alerts match committed unit state; reserved, expired, failed, discarded, quarantined, and issued units are excluded, including the exact expiry boundary. | FR-16, FR-17, FR-18 |
| **AC-11** | FEFO orders a human-selected valid candidate set by expiry then unit ID and performs no compatibility selection. | FR-19 |
| **AC-12** | Concurrent reservation or issue attempts against one unit produce at most one valid allocation/issue; losers receive a conflict and no partial change. | FR-20, FR-32 |
| **AC-13** | Prototype reservation expiry at 30 minutes is audited; expiry/cancellation releases only a still-valid unissued unit. | FR-21, FR-31 |
| **AC-14** | Queue order is High then Standard, FIFO by current-tier entry time and deterministic tie-break; audited overrides join the new tier in order, and partial remainders keep their place. | FR-26, FR-27, FR-28, FR-29, FR-30 |
| **AC-15** | Invalid quantity, over-reservation, over-issue, duplicate retry, unauthorized cancellation, and stale request update are rejected without corrupting totals. | FR-25–FR-31 |
| **AC-16** | Issue succeeds only for a valid current reservation after two distinct technicians confirm; all hard blocks remain non-overridable. | FR-32, FR-33 |
| **AC-17** | Request cancellation before allocation and after allocation/partial issue releases only valid unissued stock and preserves issued history. | FR-27, FR-31, FR-34 |
| **AC-18** | Donor candidate results require human confirmation; missing rule sets produce no eligibility result or campaign list; current opt-out and the v1 call-up suppression flag suppress messages. If detailed deferrals are implemented, active deferrals also suppress. | FR-05, FR-23, FR-36, FR-37 |
| **AC-19** | Simulated call-ups and camp notices are deduplicated and consent-checked at send/retry; Queued, Suppressed, Failed, SimulatedDelivered, and Replied states are truthful. | FR-38, FR-39 |
| **AC-20** | Critical change and audit event commit together; an audit-write failure leaves the mutation uncommitted; audit is read-only to application roles, sensitive values are redacted, and reads/exports are logged. | FR-42, FR-43 |
| **AC-21** | Backup restoration recovers synthetic inventory, requests, reservations, and audit history consistently. | FR-44 |
| **AC-22** | Dashboard stock and warnings reconcile with inventory state; queue urgency and waiting time are accurate; no dashboard crosses institution boundaries. | FR-03, FR-18, FR-41 |
| **AC-23** | Seeded synthetic records are clearly identified and no test requires real personal/medical data, patient names, live SMS/integration, automated clinical decisions, or real blood issuing. | FR-06; scope constraints |
| **AC-24** | If preregistration/capacity management is included, duplicate registrations are rejected, capacity is not exceeded, and cancellation notices follow the camp workflow. | FR-10 |
| **AC-25** | If detailed deferral management is included, active deferrals and their history are respected by candidate filtering without computing eligibility. | FR-23, FR-37 |
| **AC-26** | If transfers are included, approval, in-transit, receipt, and cancellation preserve a single inventory location and never count the unit at both ends. | FR-24 |
| **AC-27** | If request notifications, reports, or exports are included, each is role/institution-scoped and contains no donor identity or patient data. | FR-03, FR-35, FR-40 |
| **AC-28** | If admin rule editing is included, activation is versioned, prior versions remain traceable, and records retain the rule-set version used. | FR-45 |
| **AC-29** | If accessibility/localization enhancements are included, they have separately agreed criteria and do not weaken authorization or safety messaging. | FR-46 |

Could features remain outside this acceptance baseline; each requires an explicit scope decision and acceptance criteria before implementation.

## 13. Confirmed requirements, adopted recommendations, and assumptions

### Confirmed by the conversation

- Eight roles: Donor, Sponsor, Hospital Requester, Medical Officer In-Charge, Blood Bank Technician, Camp Manager, Blood Bank Manager, and Admin.
- Donor, camp, donation, screening-status, unit, request, issue, sponsor, dashboard, alert, audit, and simulated-call-up capabilities.
- High-priority requests precede standard requests; FIFO applies within each tier; a high-priority partial balance remains active.
- FEFO reservation applies within an operational candidate set; no automated compatibility or final donor-eligibility decision.
- Hospitals see availability counts and their own request statuses. Patient names are never stored.
- Critical corrections retain actor, time, reason, old/new values where safe; failed screening and expiry are non-overridable.
- MoSCoW scope and all Won't-have boundaries in §3.

### Recommendations adopted for the prototype

- An explicit least-privilege role matrix, server-side institution scoping, and cross-scope acceptance tests.
- Camp publication approval by the Medical Officer In-Charge; Camp Manager owns camp operations.
- Distinct technician accounts for issue initiation and confirmation.
- Explicit unit/request/reservation states, cancellation behavior, quantity invariants, and a 30-minute synthetic reservation lifetime.
- Consent and opt-out checked at every simulated send; idempotent campaigns; immutable, transaction-linked audit.
- Synthetic backup/restore verification and no technology-stack commitment.

### Prototype assumptions

- Technician-recorded screening status is permitted only to demonstrate synthetic workflows; it is not clinical authorization.
- Synthetic eligibility, shelf-life, low-stock, and expiry-warning values are test fixtures labelled as nonclinical; no values are supplied or endorsed here.
- UTC event times are displayed in Asia/Colombo time.
- Initial urgency is limited to High or Standard. No automated urgency calculation or emergency response SLA is promised.
- Sponsor tracking contains non-payment offer descriptions and non-monetary delivery details only.

### External validation gates before real-world use

1. **Clinical/institutional:** Qualified local authority, including NBTS as applicable, must confirm donor eligibility/deferral rules, screening and release authority, component shelf-life/handling, request/issue procedures, and operational role delegation. The prototype specification does not supply or infer those rules.
2. **Legal/privacy:** Qualified review must determine applicable Sri Lankan legal obligations, lawful basis/notices, consent, retention/deletion, data-subject rights, access controls, and breach handling before any real personal data is used.
3. **Operational:** A real institution must define emergency/priority response targets, escalation ownership, inventory thresholds, and recovery objectives before production use.

These are not blockers to building and evaluating the synthetic-data university prototype. The project is not approved for real data or operational blood issue until the external gates are satisfied.
