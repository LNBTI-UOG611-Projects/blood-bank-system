# Blood Bank Management System (BBMS)
 
A web-based system for managing blood donors, blood inventory, and blood requests in a Sri Lankan context, built as an IT degree group project at Lanka Nippon Biztech Institute (LNBTI).
 
> [!IMPORTANT]
> This is an academic project. It uses **synthetic (fake) data only**. Do not enter real donor or patient information.
 
---
 
## Table of Contents
 
- [About the Project](#about-the-project)
- [Problem Statement](#problem-statement)
- [Key Features](#key-features)
- [User Roles](#user-roles)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Development Approach](#development-approach)
- [Project Status](#project-status)
- [Team](#team)
- [License](#license)
---
 
## About the Project
 
BBMS helps a blood bank keep track of who donates, what is in stock, and where each unit goes. A blood bank system is **safety-critical**, so the design focuses on:
 
- **Traceability:** which donor, which blood unit, which patient
- **Strict expiry rules:** expired units can never be issued
- **Audit trails:** a record of who did what and when
- **Privacy:** donor data is visible only to people who need it
The system is CRUD-driven (Create, Read, Update, Delete), with all records stored in a database.
 
## Problem Statement

Blood banks that rely on manual records struggle to track donors, monitor expiry dates and respond quickly to emergency requests, which leads to wasted blood and delayed treatment. BBMS provides a single web-based system that tracks every blood unit from donor to patient, enforces expiry and issuing rules, and protects donor privacy.
 
 
## Key Features
 

 
### Donor Management
- Register, view, update and delete donor records
- Track donation history and donor eligibility
### Blood Inventory
- Record each blood unit with blood group, component and collection date
- Track expiry dates and flag units close to expiry
- Prevent issuing of expired units
### Blood Requests and Issuing
- Create and manage blood requests from hospitals
- Handle emergency requests
- Issue the oldest compatible unit first
### Security and Auditing
- Role-based access to features and data
- Audit log of important actions
## User Roles
 

 
| Role | What they can do |
|---|---|
| **Admin** | Manage users, view all records and audit logs |
| **Blood bank staff** | Manage donors, inventory and blood requests |
| **Hospital user** | Submit and track blood requests |
| **Donor** | View own profile and donation history |
 
## Tech Stack
 

 
| Layer | Technology |
|---|---|
| Frontend | _e.g. HTML, CSS, JavaScript_ |
| Backend | _e.g. Laravel / PHP_ |
| Database | _e.g. MySQL_ |
| Version control | Git and GitHub |
 
## Getting Started
 

 
### Prerequisites
 
- _List the software needed (for example PHP, Composer, MySQL, Node.js)_
- Git
### Installation
 
```bash
# 1. Clone the repository
git clone <your-repository-url>
 
# 2. Go into the project folder
cd <project-folder>
 
# 3. Install dependencies
 
# 4. Create your environment file and set the database details
 
# 5. Set up the database
 
# 6. Start the application
```
 
## Project Structure
 

 
blood-bank-system/
│
├── .github/
│
├── backend/
│   ├── .env.example
│   └── src/
│       ├── ...
│       └── ...
│
├── frontend/
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   ├── src/
│   └── vite.config.js
│
├── docs/
│   └── BMAD.md
│
├── .gitignore
└── docker-compose.yml


 
## Documentation
 
| Document | Description |
|---|---|
| [BMAD Method](docs/BMAD.md) | Explains the BMAD method we use to plan and build this project |
 
## Development Approach
 
We use the **BMAD Method** (Breakthrough Method for Agile AI-Driven Development). Instead of prompting an AI to "build a blood inventory page", we write requirements, architecture and acceptance criteria first, and keep every decision in files in this repository. AI assists with drafting and coding, and the team reviews and approves the results.
 
See [docs/BMAD.md](docs/BMAD.md) for details.
 
## Project Status
 

 
**Status:** In development
 
- [x] Requirements
- [x] Design
- [ ] Implementation
- [ ] Testing
- [ ] Final presentation


 
**Institute:** Lanka Nippon Biztech Institute (LNBTI)

 

