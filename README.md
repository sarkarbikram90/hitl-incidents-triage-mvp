# Ajaia AI-Native IT Ticketing & Incident Triage System
### Systems, Security & Compliance Design — Live Interactive Prototype

A responsive, zero-dependency, production-grade interactive prototype and architecture design built for the **Ajaia AI-Native IT Manager Assessment**.

🔗 **Live Prototype:** [Deployable directly on Vercel / GitHub Pages / local browser]

---

## 🎯 Executive Overview & Assessment Fit

Ajaia is scaling rapidly: onboarding cohorts of 25+ distributed team members across regions, managing complex multi-model AI environments (LLMs, copilots, agentic automations), handling sensitive client data across **healthcare (HIPAA)** and **education (FERPA)**, and managing heightened security and compliance obligations.

This project delivers a **practical, lightweight, and scalable IT Ticketing System** designed specifically for this operational reality. Rather than relying on theoretical concepts or complex vendor sprawl, it introduces a unified **Human-in-the-Loop (HITL) AI Operations Architecture** that automates routine tier-1 workflows while enforcing mandatory human attestation on high-blast-radius compliance and identity actions.

---

## 🏛️ System Architecture Design (Addressing Assessment Requirements)

### 1. Ticket Submission Channels
A centralized ingestion bus unifies intake across four primary channels:
- **Slack App (`#it-helpdesk` / `/ticket` / `@IT-Bot`)**: Natural language submission where an AI conversational agent clarifies requirements, collects device/system telemetry, and captures context without context-switching.
- **Role-Based Self-Service Portal**: Adaptive web forms with dynamic fields (e.g., department-specific onboarding requests, AI tool access with BAA requirements, hardware procurement).
- **Email Gateway (`it-support@ajaia.io`)**: Inbound parser with automated DKIM/SPF verification and regex/NER scanning for sensitive data (PHI, PII, API keys) prior to ingestion.
- **Telemetry & Security Webhooks**: Direct alert streams from AWS CloudTrail, Google Workspace DLP, Okta SCIM, GitHub Secret Scanning, and Datadog.

### 2. Categorization & Prioritization Logic
Incoming tickets are processed by a multi-layer evaluation pipeline:
- **Zero-Data-Retention (ZDR) PII/PHI Redaction**: All payload text is sanitized via a local NER scanner before LLM inference to maintain HIPAA and FERPA compliance.
- **Categorization Taxonomy**:
  - `Access & Identity`: Okta, Google Workspace, GitHub, 1Password, SCIM provisioning.
  - `AI Tools & Infrastructure`: Model API keys, GPU instances, LLM integrations, BAA/ZDR compliance checks.
  - `Security & Compliance`: PHI/FERPA exposure, secret leaks, unauthorized integrations, offboarding revocation.
  - `Hardware & Workstation`: Jamf/InTune MDM enrollment, remote hardware logistics, hardware repairs.
  - `General IT & SaaS`: Slack, Zoom, Notion, Jira access, network/VPN issues.
- **Dynamic Prioritization Matrix**:
  - **P1 - Critical**: Active data breach, public PHI/FERPA exposure, production outage, compromised root credential.
  - **P2 - High**: Blocked onboarding cohort, enterprise LLM quota exhaustion impacting production, critical SaaS access loss for department leads.
  - **P3 - Medium**: Single-user software license provisioning, non-urgent hardware request, sandbox AI API access.
  - **P4 - Low**: General IT questions, documentation updates, exploratory SaaS evaluations.

### 3. Routing & Assignment Rules
- **Rule-Based Pre-Filters**: Sensitive security and compliance flags immediately bypass general queues and route to On-Call SecOps (`SecOps-L2` + CISO).
- **Cohort Routing**: Onboarding requests automatically trigger parallel tasks across HR Ops, IT Logistics, and Department Leads.
- **AI-Assisted Skill & Workload Routing**: Evaluates current engineer queue depth, time zone coverage (US, EMEA, APAC), and domain certifications (HIPAA compliance officer, Cloud architect).
- **Automated Escalation Triggers**: Tickets approaching 50% SLA threshold automatically trigger Slack notifications to team leads; tickets reaching 75% trigger PagerDuty alerts.

### 4. Service Level Agreement (SLA) Structure

| Severity | Response Target | Resolution Target | Escalation Pathway | Typical Scenarios |
| :--- | :--- | :--- | :--- | :--- |
| **P1 - Critical** | **15 minutes** | **1 hour** | Immediate PagerDuty page to On-Call Engineer + CISO + Legal Lead | Public PHI link, exposed cloud credentials, system-wide outage |
| **P2 - High** | **30 minutes** | **4 hours** | Auto-escalation to IT Manager after 60 min of inactivity | Cohort onboarding blocked, production AI API quota limit, SSO down |
| **P3 - Medium** | **2 hours** | **24 hours** | Ticket re-queue to follow-the-sun timezone engineer | Individual access requests, new AI sandbox tool approval |
| **P4 - Low** | **4 hours** | **48 hours** | Weekly backlog triage | IT documentation inquiries, non-blocking feature requests |

### 5. How AI Triages, Suggests Solutions, and Reduces Workload

```mermaid
flowchart TD
    A["Raw Inbound Request\n(Slack / Portal / Email / Webhook)"] --> B["Local NER & DLP Filter\n(Sanitize PHI, PII, API Keys)"]
    B --> C["AI Triage Engine\n(Intent, Category, SLA, Blast Radius)"]
    C --> D{"Risk & Compliance Gate"}
    D -- "Low Risk (Self-Service)" --> E["Autonomous Execution\n(Reset PW, Standard SaaS Grant)\nZero Human Overhead"]
    D -- "Elevated Risk / Compliance" --> F["HITL Copilot Workbench\n1. Pre-drafted employee response\n2. Dry-run automation script\n3. Evidence & compliance audit trail"]
    F --> G["Human IT Specialist Review\n(One-Click Attestation / Edit / Reject)"]
    G --> H["Automated Idempotent Dispatch\n(Okta / Google / AWS / Slack)"]
    H --> I["Immutable Audit Record\n(Timestamp, Approver, Diff, SHA-256)"]
```

1. **Intelligent Self-Service & Zero-Touch Resolution (40% Workload Reduction)**:
   - For routine tier-1 requests (password resets, standard software approvals from pre-approved catalogs, WiFi configurations), the AI validates identity and executes changes autonomously without human intervention.
2. **Context Synthesis & Pre-Drafted Remediation (35% Time-to-Resolution Reduction)**:
   - For complex tickets, the AI digests logs, cross-references internal documentation, generates a 2-sentence executive summary, and prepares a personalized employee reply with next steps.
3. **Executable Action Scripts with Safe / Approval Gates**:
   - The AI drafts precise API payloads and CLI commands (e.g., Google Drive ACL revocation, Okta group assignments, Claude API provision via Terraform). Low-risk scripts are executed immediately; high-risk actions require one-click human attestation.
4. **Explainable AI (XAI) & Audit Defense**:
   - Every AI triage decision exposes its Chain-of-Thought (CoT) reasoning, signal confidence factors, and compliance checklist (HIPAA/FERPA/SOC 2), ensuring regulatory defensibility.

---

## 💻 Interactive Prototype Features

The single-file web application in `index.html` showcases this exact operational system:

- **Multi-Channel Filter Bar**: Filter tickets by channel (`Slack #it-helpdesk`, `Self-Service Portal`, `Email`, `Telemetry Webhook`) and status.
- **Realistic Ajaia Scenarios**:
  - `TICK-1041` (P1): HIPAA PHI Leak on Google Drive (Public export link).
  - `TICK-1042` (P2): Batch Onboarding Cohort (8 Remote Engineers across UK, Singapore, and Berlin).
  - `TICK-1043` (P3): AI Copilot Access Request (Claude 3.5 Sonnet & GPT-4o with BAA/ZDR compliance check).
  - `TICK-1044` (P2): FERPA LMS Integration Compliance Review (Canvas API token request).
  - `TICK-1045` (P1): Exposed Cloudflare API Token (Detected on public developer gist).
- **System Architecture & SLAs Modal**: Full in-app technical reference detailing submission channels, routing rules, and SLA tables (click **"System Architecture & SLAs"** in the top navigation).
- **Live Ticket Intake Generator**: Test custom ticket submissions across any channel and observe real-time AI triage and routing.
- **Executive Persona Switcher**: Switch between **IT Specialist (Operations)**, **CISO (Compliance & Risk)**, and **AI Governance Auditor** lenses.
- **3-Pane Command Center**: Toggle between focused tabbed views and a high-density side-by-side operations dashboard.
- **Explainable AI Drawer**: View model temperature, token entropy, Presidio PII scrubbing certification, and step-by-step reasoning tokens.
- **Power Keyboard Shortcuts**: Navigate queues with `J`/`K`, select with `Enter`, switch panes with `1`/`2`/`3`, approve with `A`, request changes with `R`, and reject with `X`.

---

## 🛠️ Run Locally & Deploy

### Run Locally (No Dependencies Required)
Open `index.html` in any modern web browser:
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Deploy to Vercel
1. Push repository to GitHub.
2. Import project into Vercel.
3. Vercel automatically runs `node build.js` to build into `dist/`.
4. Output directory is set to `dist/` in `vercel.json`.

---

## 📄 License & Attribution
Designed and built for the **Ajaia AI-Native IT Manager Assessment**. Free to evaluate and inspect.
