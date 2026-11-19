// DEMO ONLY: fixed accounts so each role can log in before the backend exists.
// Every demo account uses the same password, shown on the login page.
// Delete this file when real login (backend + database) is connected.

export const DEMO_PASSWORD = "Demo@123";

export const DEMO_USERS = [
  {
    username: "donor",
    email: "donor@bbdms.lk",
    role: "DONOR",
    fullName: "Kasuni Silva",
    workplace: "Donor · O+",
  },
  {
    username: "sponsor",
    email: "sponsor@bbdms.lk",
    role: "SPONSOR",
    fullName: "Lanka Foods (Pvt) Ltd",
    workplace: "Sponsor organisation",
  },
  {
    username: "hospital",
    email: "hospital@bbdms.lk",
    role: "HOSPITAL",
    fullName: "Dr. N. Perera",
    workplace: "Colombo South Teaching Hospital",
  },
  {
    username: "technician",
    email: "technician@bbdms.lk",
    role: "TECHNICIAN",
    fullName: "Sachini Dias",
    workplace: "National Blood Centre, Narahenpita",
  },
  {
    username: "medofficer",
    email: "medofficer@bbdms.lk",
    role: "MEDICAL_OFFICER",
    fullName: "Dr. R. Fernando",
    workplace: "National Blood Centre, Narahenpita",
  },
  {
    username: "campmanager",
    email: "campmanager@bbdms.lk",
    role: "CAMP_MANAGER",
    fullName: "Amal Wickrama",
    workplace: "National Blood Centre, Narahenpita",
  },
  {
    username: "manager",
    email: "manager@bbdms.lk",
    role: "MANAGER",
    fullName: "S. Gunawardena",
    workplace: "National Blood Centre, Narahenpita",
  },
  {
    username: "admin",
    email: "admin@bbdms.lk",
    role: "ADMIN",
    fullName: "System Admin",
    workplace: "BBDMS",
  },
];
