# HITL Incident Triage — redesigned demo prototype

A responsive, single-file frontend for demonstrating an evidence-backed, human-in-the-loop IT incident triage workflow in the Ajaia IT Manager assessment.

---

## 📋 What it demonstrates

- **Incident queue with priority and approval filters, search, and case selection**: Filter by severity (P1–P4), approval status (Pending Review, Approved, Changes Requested, Rejected), or scenario category. Includes real-time keyword search and responsive card views.
- **AI triage summary separated from source evidence and analyst judgment**: Clean three-tier separation of concerns:
  1. **AI Triage Synthesis & Recommendations**: Confidence score, executive situation briefing, probable root cause, blast radius estimation, actionable command proposals with risk ratings (`SAFE`, `NEEDS APPROVAL`, `HIGH RISK`), and safety rollback plans.
  2. **Source Ground Truth Evidence**: Immutable raw telemetry artifacts (git diffs, Tor egress network telemetry, Google Workspace DLP audit trails, OAuth token consent payloads, HRIS vs. SCIM identity logs) with cryptographic hash verification and copy tools.
  3. **Human Analyst Judgment & Approval Gate**: Explicit human gatekeeper with mandatory pre-flight attestation checklists, editable remediation scripts, customizable analyst notes, and tactile decision dispatching (`Approve & Dispatch`, `Request Changes`, `Reject Case`).
- **Human approval / request-changes / reject controls with a local demo audit trail**: Real-time simulation of remediation dispatch with live step-by-step console simulation and persistent audit logging.
- **Evidence view, timeline, synthetic incident export, and local ticket intake**:
  - **Timeline**: Chronological history tracking detection, AI evaluation, and analyst interventions.
  - **Local Ticket Intake**: Form with pre-populated scenario presets to inject custom synthetic incident tickets on the fly.
  - **Export JSON**: One-click download of a full incident package including all case states and local audit trails.
- **Clear warning that no live system, credential, permission, or ticketing action is connected**: Prominent top disclaimer banner and an in-app "System Limitations & Production Blueprint" modal detailing architectural requirements for production SOC environments.
- **Synthetic scenario examples** tailored directly to IT & security management:
  1. **Exposed API Credentials** (`INC-8041`): Production OpenAI API key leaked in a public GitHub repository, with active Tor exit node egress scraping detected.
  2. **Broad Sharing Permissions** (`INC-8042`): Confidential HR payroll and equity Google Sheet changed to "Anyone with the link can view", with anonymous external downloads recorded.
  3. **Unapproved AI Integrations** (`INC-8043`): Shadow AI Chrome extension granted unrestricted read access to executive Google Workspace mail and calendars.
  4. **Onboarding / Offboarding Gaps** (`INC-8044`): Terminated contractor retaining active Okta and AWS Production Console SSO access 7 days post-contract.

---

## 🚀 Run locally

Open `index.html` in any modern web browser (Chrome, Safari, Edge, Firefox).

```bash
# You can double click index.html or open via command line:
# Windows:
start index.html

# macOS:
open index.html

# Linux:
xdg-open index.html
```

**No build step, Node.js installation, or package dependencies are required.** The entire application is self-contained in `index.html`.

---

## 🌐 Deploy as a static Vercel site

1. Create a new GitHub repository, or create a branch in the existing repository after backing up the current version.
2. Ensure `index.html` is at the repository root. `README.md` and `vercel.json` are included.
3. Import that repository into Vercel as a **static site**:
   - **Framework Preset**: `Other`
   - **Build Command**: Leave empty / None (or default)
   - **Output Directory**: Root directory (`.`)
4. Test the deployment in an incognito browser and verify mobile layout, filters, approval events, export, and ticket intake.
5. Only point your assessment link at this deployment after checking it yourself.

---

## 🔒 Important limitations

> **This is an interaction prototype, not a production security system.**
> All incidents and AI assessments are sample data; approval events stay in browser memory (`localStorage`) and exports are local JSON files. It has no backend, authentication, authorization, real model call, SIEM/ITSM/IdP integration, server-side audit store, or tool execution. Do not enter real client data, PHI, education records, credentials, or confidential information.

### Production Implementation Blueprint

For a production deployment in an enterprise IT environment, implement:

1. **Server-Side Identity & RBAC**: SAML 2.0 / OIDC single sign-on with multi-factor authentication, enforcing strict role-based access control (L1 Triager vs. L2 Security Analyst vs. SecOps Admin).
2. **Durable Tamper-Evident Audit Logs**: Cryptographically chained, write-once-read-many (WORM) storage (such as AWS S3 Glacier with Object Lock) with forwarding to enterprise SIEM platforms (Splunk, Datadog, Microsoft Sentinel).
3. **Automated Secret & PII Redaction Pipeline**: Server-side regex and NER filtering to scrub API tokens, private keys, passwords, SSNs, credit cards, and HIPAA/FERPA protected data before context is ingested by any LLM.
4. **Least-Privilege Scoped Connectors**: Scoped service principles with tight IAM boundary conditions rather than broad admin credentials for cloud providers, Okta, Google Workspace, and Jira Service Management.
5. **Idempotent Actions & Automated Rollbacks**: Two-phase dry-run commit protocols with health-check monitoring and automatic rollback execution if downstream service degradation occurs.
6. **Continuous Security Auditing**: Independent penetration testing, regular threat modeling, and client-side authorization bypass prevention.

---

*Ajaia IT Manager Assessment — Verified & Deployed October 2026*

