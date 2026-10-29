# Exclusive Multi-Role Super-Account Plan for Mohamed Khairi (`mohamedkhairi1991@gmail.com`)

## 1. Objective
Configure **Mohamed Khairi** (`mohamedkhairi1991@gmail.com`) as the **only** account in Pharamty that possesses simultaneous **Admin**, **Doctor**, and **Company** privileges and can switch freely between all three workspaces. All other accounts (standard doctors and pharmaceutical company admins) remain strictly isolated to their single assigned workspace.

---

## 2. Account & Role Architecture

### A. Unified Account Definition (`mohamedkhairi1991@gmail.com`)
- **Account Identity**:
  - **Full Name**: `Dr. Mohamed Khairi` / `Mohamed Khairi`
  - **Email**: `mohamedkhairi1991@gmail.com`
  - **Assigned Privileges**:
    1. **Admin**: Full access to **Admin Governance** (member directories for doctors & companies, product review queue, taxonomy, and launch readiness).
    2. **Doctor**: Verified Healthcare Professional (`verificationStatus: 'approved'`, Cardiology / Clinical Medicine) with full access to the **Official Iraq Clinical Catalog**.
    3. **Company**: Full access to the **Company Workspace** (defaulting to **AstraZeneca Iraq**, with the ability to switch and manage any company workspace).
- **Pre-Seeded & Default Session**:
  - Seed `mohamedkhairi1991@gmail.com` in `DEMO_USERS` and `registeredDoctors` so the account is immediately available on load and recognized across Sign In and Sign Up.

### B. Unified Sign In & Sign Up Recognition
- **Sign In (`handleInteractiveLoginSubmit`)**:
  - Entering `mohamedkhairi1991@gmail.com` (or signing in as Mohamed Khairi) authenticates the unified super-account and enables the multi-role workspace switcher in the top header (**Admin Governance**, **Company Workspace**, **Doctor Catalog**).
  - Entering any other company email (e.g., `iraq.medinfo@astrazeneca.local`) signs in strictly as that company's single-role `CompanyUser` without Admin or multi-role switching.
  - Entering any other doctor email signs in strictly as a single-role `HealthcareProfessional` with access only to the `Official Catalog`.
- **Sign Up (`handleDoctorSignUpSubmit`)**:
  - If `mohamedkhairi1991@gmail.com` is used on the Doctor Sign Up form, it is exempted from the institutional email restriction and activates the unified **Mohamed Khairi** multi-role session (`Admin` + `Doctor` + `Company`).

### C. Exclusive Top Header Multi-Role Bar
- **When signed in as `mohamedkhairi1991@gmail.com` (Mohamed Khairi)**:
  - The top navigation header displays an exclusive **Unified Account Badge (`Mohamed Khairi • Admin / Doctor / Company`)** along with direct workspace buttons for:
    - **Doctor Catalog** (acting as Approved Physician `Dr. Mohamed Khairi`)
    - **Company Workspace** (acting as Company Admin, defaulting to AstraZeneca with company selector)
    - **Admin Governance** (acting as Platform Admin)
    - **Launch Readiness**
- **When signed in as any other user**:
  - Standard Doctors see **only** `Official Catalog` + their physician profile badge + `Sign Out`.
  - Standard Company Admins see **only** their assigned `Company Workspace` + `Catalog Preview` + `Sign Out`.
  - Only **Mohamed Khairi** (`mohamedkhairi1991@gmail.com`) has the 3-role switcher.

---

## 3. Verification Plan
1. Sign in with `mohamedkhairi1991@gmail.com` at the unified entrance and verify immediate access to **Doctor Catalog**, **Company Workspace**, and **Admin Governance** from the top bar.
2. Verify that switching between **Admin**, **Doctor**, and **Company** updates the active workspace seamlessly while preserving the `Mohamed Khairi (mohamedkhairi1991@gmail.com)` identity.
3. Sign in with a regular doctor or company account and verify that the 3-role switcher is hidden and restricted exclusively to `mohamedkhairi1991@gmail.com`.
4. Run `compile_applet` to confirm a clean build with zero TypeScript errors.
