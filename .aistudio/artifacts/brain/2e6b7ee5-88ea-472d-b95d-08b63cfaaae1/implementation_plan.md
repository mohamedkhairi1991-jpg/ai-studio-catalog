# Unified Physician-Facing Entrance & Email-Based Role Routing Plan

## 1. Objective
Redesign the Pharamty authentication experience (`Sign In` & `Sign Up`) and top navigation so that **Healthcare Professionals (Doctors)**—the primary target audience—experience a clean, dedicated clinical portal without seeing internal **Company** or **Admin** login tabs, role switchers, or governance workspace tabs.

At the same time, **Pharmaceutical Companies** and **Platform Administrators** sign in through the **exact same email and password entrance**, and the platform automatically detects their assigned email address and routes them directly to their respective workspace:
- **Assigned Company Email** (e.g., `iraq.medinfo@astrazeneca.local` or any Admin-assigned company email) $\rightarrow$ Automatically authenticates and opens that company's **Company Workspace / Company Page**.
- **Platform Admin Email** (e.g., `admin.demo@pharmaconnect.local` or `admin@pharamty.iq`) $\rightarrow$ Automatically authenticates and opens the **Admin Governance Workspace** for the entire application.
- **Doctor Email** (registered via Sign Up or pre-existing physician email) $\rightarrow$ Authenticates as a Healthcare Professional and opens the **Official Iraq Clinical Catalog** (or the Section 9.1 Pending Verification screen if awaiting approval).

---

## 2. Key Architectural & UX Changes

### A. Unified Doctor-Facing Sign In & Sign Up Portal (`activeWorkspace === 'auth'`)
1. **Remove Role Tabs & Session Switchers from the Entrance**:
   - Remove the `[Doctor | Company | Admin]` selector tabs, the company dropdown selector, and the right-column "Quick Role & Company Session Switcher" from the Sign In / Sign Up view so doctors never see internal company or administrative portals.
2. **Two Clean Modes (`Sign In` | `Doctor Sign Up`)**:
   - **Sign In Tab**:
     - Single unified **Professional Email Address** and **Password** form.
     - Intelligent **Email-to-Role Resolution Engine** on submit:
       1. Checks if the entered email matches a **Platform Admin** email (`admin.demo@pharmaconnect.local`, `admin@pharamty.iq`, `catalog.admin@pharamty.iq`). If matched, signs in as `PlatformRole.Admin` and routes to `Admin Governance`.
       2. Checks if the entered email matches any **Pharmaceutical Company's** assigned login email (`company.contactEmail` or assigned portal email in `companiesList`, such as `iraq.medinfo@astrazeneca.local` for AstraZeneca Iraq). If matched, signs in as `PlatformRole.CompanyUser` for that specific `companyId` and opens their **Company Workspace**.
       3. Checks if the entered email matches a registered **Healthcare Professional** account (either approved or pending verification) or treats any other clinical email as a Doctor login, routing to the **Doctor Catalog**.
   - **Doctor Sign Up Tab**:
     - Dedicated registration form for Iraq Healthcare Professionals:
       - **Full Name** (e.g., `Dr. Ahmed Al-Bayati`)
       - **Profession & Medical Specialty** (Cardiology, Pulmonology, Endocrinology, Gastroenterology, Oncology, etc.)
       - **Iraq Medical Syndicate / Practice License Number**
       - **Primary Hospital / Clinical Workplace**
       - **Professional Email Address & Password**
       - **Registration Verification Mode (for testing)**: Toggle allowing the registering doctor to either enter immediately as a **Verified Physician** (instant catalog access) or register in **Pending Verification** (queued for Admin approval in the Admin Governance workspace).

### B. Role-Isolated Top Navigation Bar
- **Strict Role Visibility**:
  - When signed in as a **Doctor**, the header displays **only** the **Official Catalog** view and the signed-in physician's profile badge + **Sign Out** button. `Company Workspace`, `Admin Review`, and internal readiness tabs are completely hidden from Doctors.
  - When signed in as a **Pharmaceutical Company**, the header displays their **Company Workspace** (and option to preview the Doctor Catalog) + **Sign Out** button.
  - When signed in as the **Platform Admin**, the header displays **Admin Governance**, **Company Workspace**, **Doctor Catalog**, and **Launch Readiness**, plus **Sign Out**.
  - When on the **Sign In / Sign Up** page (`auth`), only the clean brand header is shown without exposing internal workspace buttons.

### C. Admin Governance: Company Login Email & Doctor Verification Management
- **Company Login Email Assignment**:
  - In the Admin Governance workspace (`Company Pages & Ad Space` / `Credentials`), allow the Admin to view and edit the **Assigned Login Email** (`contactEmail`) for each pharmaceutical company (e.g., `iraq.medinfo@astrazeneca.local` for AstraZeneca Iraq) and copy it with one click for testing in the unified Sign In screen.
- **Doctor Verification Queue**:
  - Doctors who sign up with "Pending Verification" appear in an **Admin Physician Verification Queue** inside Admin Governance where the Admin can approve their license with one click, upgrading their status to `approved`.

---

## 3. Verification Plan
1. **Doctor Flow**: Sign up as a new Doctor (both Verified and Pending modes) and sign in via the unified entrance; confirm `Company Workspace` and `Admin Review` tabs are hidden.
2. **Company Email Flow**: Sign out and sign in at the same entrance using `iraq.medinfo@astrazeneca.local`; confirm automatic routing to the **AstraZeneca Iraq Company Workspace**.
3. **Admin Email Flow**: Sign out and sign in at the same entrance using `admin.demo@pharmaconnect.local` (or `admin@pharamty.iq`); confirm automatic routing to the **Admin Governance Workspace** with full access to all companies, products, and doctor approvals.
4. **Build Verification**: Run `compile_applet` to ensure zero TypeScript or build issues.
