// One entry per role. The dashboard page reads everything it shows from here,
// so adding or changing a role's dashboard means editing only this file.
// The keys (DONOR, SPONSOR, ...) must match USERS.role in the database.

export const ROLES = {
  DONOR: {
    label: "Donor",
    slug: "donor",
    menu: ["Dashboard", "Upcoming camps", "My donations", "SMS preferences", "Profile"],
    welcome: "Here is your donation summary.",
    stats: [
      { label: "Next eligible date", value: "02 Dec 2026", note: "In 14 days", tone: "teal" },
      { label: "Total donations", value: "6", note: "Since 2022", tone: "red" },
      { label: "Next appointment", value: "22 Nov", note: "Town Hall, Colombo 07", tone: "blue" },
    ],
    actions: ["Find a camp", "View my donations", "Update SMS preferences"],
  },
  SPONSOR: {
    label: "Sponsor",
    slug: "sponsor",
    menu: ["Dashboard", "Offer sponsorship", "My sponsorships", "Upcoming camps", "Organisation profile"],
    welcome: "Thank you for supporting donation camps.",
    stats: [
      { label: "Camps supported", value: "9", note: "Since 2025", tone: "red" },
      { label: "Pending offers", value: "1", note: "Waiting for camp manager", tone: "amber" },
      { label: "Donors reached", value: "1,240", note: "Across supported camps", tone: "teal" },
    ],
    actions: ["Offer sponsorship", "Find camps to support", "View my sponsorships"],
  },
  HOSPITAL: {
    label: "Hospital requester",
    slug: "hospital",
    menu: ["Dashboard", "New request", "My requests", "Blood stock", "Profile"],
    welcome: "Request blood and track every request here.",
    stats: [
      { label: "Open requests", value: "3", note: "Waiting for approval", tone: "amber" },
      { label: "Approved", value: "2", note: "Being prepared", tone: "blue" },
      { label: "Issued this month", value: "14", note: "Units received", tone: "teal" },
    ],
    actions: ["New blood request", "Track my requests", "Check blood stock"],
  },
  TECHNICIAN: {
    label: "Blood bank technician",
    slug: "technician",
    menu: ["Dashboard", "Pre-check & donation", "Blood units", "Issue units", "Deferrals"],
    welcome: "Today's donations, units and tasks.",
    stats: [
      { label: "Today's appointments", value: "42", note: "Pre-registered donors", tone: "blue" },
      { label: "Under screening", value: "34", note: "Waiting for results", tone: "amber" },
      { label: "Collected today", value: "15", note: "Units created", tone: "teal" },
    ],
    actions: ["Start pre-check", "Register a blood unit", "Issue units"],
  },
  MEDICAL_OFFICER: {
    label: "Medical Officer In-charge",
    slug: "medical-officer",
    menu: ["Dashboard", "Donor records", "Approve camps", "Call-up campaigns", "Find eligible donors"],
    welcome: "Camp approvals, donor records and call-ups.",
    stats: [
      { label: "Camps to approve", value: "3", note: "Waiting for review", tone: "amber" },
      { label: "Low stock groups", value: "2", note: "O- and AB-", tone: "red" },
      { label: "Active donors", value: "3,820", note: "Opted in to SMS", tone: "teal" },
    ],
    actions: ["Approve camps", "Start an SMS call-up", "Find eligible donors"],
  },
  CAMP_MANAGER: {
    label: "Camp manager",
    slug: "camp-manager",
    menu: ["Dashboard", "Plan camp", "Registrations", "Camp SMS", "Camp outcomes", "Sponsors"],
    welcome: "Plan camps and keep donors informed.",
    stats: [
      { label: "Upcoming camps", value: "3", note: "Next on 22 Nov", tone: "teal" },
      { label: "Pending approval", value: "1", note: "Sent to Medical Officer", tone: "amber" },
      { label: "Pre-registered donors", value: "214", note: "Across upcoming camps", tone: "blue" },
    ],
    actions: ["Plan a new camp", "View registrations", "Send camp SMS"],
  },
  MANAGER: {
    label: "Blood bank manager",
    slug: "manager",
    menu: ["Dashboard", "Inventory", "Hospital requests", "Unit transfers", "Camps", "Reports"],
    welcome: "Stock, requests and transfers at a glance.",
    stats: [
      { label: "Total units", value: "412", note: "Across all components", tone: "red" },
      { label: "Pending requests", value: "7", note: "2 emergency", tone: "amber" },
      { label: "Expiring in 7 days", value: "9", note: "Issue these first", tone: "blue" },
    ],
    actions: ["Approve hospital requests", "View inventory", "Generate a report"],
  },
  ADMIN: {
    label: "Admin",
    slug: "admin",
    menu: ["Dashboard", "Users", "Banks & hospitals", "Rule settings", "Audit log"],
    welcome: "Manage users, places and system rules.",
    stats: [
      { label: "User accounts", value: "24", note: "1 disabled", tone: "blue" },
      { label: "Blood banks", value: "5", note: "1 central, 4 regional", tone: "red" },
      { label: "Hospitals", value: "18", note: "Linked to the system", tone: "teal" },
    ],
    actions: ["Add a user", "Edit rule settings", "View the audit log"],
  },
};

/** URL of a role's dashboard, e.g. "/dashboard/manager". */
export function dashboardPath(role) {
  const config = ROLES[role];
  return config ? `/dashboard/${config.slug}` : "/login";
}

/** Find a role key from its URL slug, e.g. "medical-officer" → "MEDICAL_OFFICER". */
export function roleFromSlug(slug) {
  return Object.keys(ROLES).find((key) => ROLES[key].slug === slug);
}

/** "Upcoming camps" → "upcoming-camps" (used for menu page URLs). */
export function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
