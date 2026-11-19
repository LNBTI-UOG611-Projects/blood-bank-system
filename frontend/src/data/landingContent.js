// Sample content for the landing page.
// Later, stock and camps will come from the API (GET /api/stock, GET /api/camps?upcoming=true).

export const STOCK = [
  { group: "A+", units: 96, level: "ok" },
  { group: "A-", units: 18, level: "watch" },
  { group: "B+", units: 84, level: "ok" },
  { group: "B-", units: 11, level: "watch" },
  { group: "O+", units: 121, level: "ok" },
  { group: "O-", units: 6, level: "low" },
  { group: "AB+", units: 33, level: "ok" },
  { group: "AB-", units: 3, level: "low" },
];

export const IMPACT = [
  { value: "1 donation", label: "can help up to 3 patients" },
  { value: "450 ml", label: "collected in one donation" },
  { value: "4 months", label: "between whole-blood donations" },
  { value: "About 10 min", label: "for the donation itself" },
];

export const STEPS = [
  { title: "Register once", text: "Create a donor account with your blood group and district.", tone: "red" },
  { title: "Pre-register for a camp", text: "Pick a nearby camp and a time slot that suits you.", tone: "teal" },
  { title: "Quick health check", text: "Staff check your weight and haemoglobin before you donate.", tone: "blue" },
  { title: "Donate and get updates", text: "We record each donation and tell you when you can give again.", tone: "amber" },
];

export const CAMPS = [
  {
    day: "22", month: "NOV", venue: "Town Hall, Colombo 07",
    where: "Colombo · 8:30 AM – 3:00 PM", sponsor: "Lanka Foods (Pvt) Ltd",
    slots: "42 slots left", slotTone: "green",
  },
  {
    day: "29", month: "NOV", venue: "University of Colombo",
    where: "Colombo · 9:00 AM – 2:00 PM", sponsor: "City Print House",
    slots: "12 slots left", slotTone: "amber",
  },
  {
    day: "06", month: "DEC", venue: "Gampaha Sports Complex",
    where: "Gampaha · 8:00 AM – 1:00 PM", sponsor: "Gampaha Traders",
    slots: "60 slots left", slotTone: "green",
  },
];

export const ROLES = [
  { title: "Donors", text: "Register, pre-register for camps, see your history and choose your SMS alerts.", tone: "red" },
  { title: "Hospitals", text: "Request blood by group and component, and follow each request until it is issued.", tone: "blue" },
  { title: "Camps and sponsors", text: "Plan camps, get approval, notify donors and bring in sponsors for food and publicity.", tone: "teal" },
  { title: "Blood bank staff", text: "Screen donors, register and test units, manage stock and approve requests.", tone: "amber" },
];
