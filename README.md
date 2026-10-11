# HITL Incident Triage — Enterprise AI Security Operations Center

A responsive, single-file frontend demonstrating an evidence-backed, human-in-the-loop (HITL) IT incident triage workflow for the **Ajaia IT Manager & AI Consultant Assessment**.

---

## 🌟 Executive Summary & Consultant Architecture

Built from the ground up to reflect **Enterprise AI Consulting & Strategic SOC Advisory Standards**, this prototype illustrates how modern organizations deploy autonomous AI reasoning while guaranteeing strict human accountability, zero-trust attestation, and regulatory defensibility.

### Key Capabilities Demonstrated

1. **Clean Three-Tier Separation of Concerns**:
   - **Tier 1: Deterministic AI Triage Synthesis**: Context-weighted model recommendations, confidence factor decomposition (signal correlation, blast radius certainty, rollback safety), actionable remediation commands with risk categorizations (`SAFE`, `NEEDS APPROVAL`, `HIGH RISK`), and safety rollbacks.
   - **Tier 2: Immutable Telemetry Ground Truth**: Cryptographically verified raw evidence artifacts (`SHA-256` integrity) spanning git patches, Tor egress network telemetry, Google Workspace DLP logs, OAuth consent grants, and HRIS vs. SCIM identity records.
   - **Tier 3: Human Analyst Gatekeeper**: Mandatory pre-flight attestation checklists, editable script overrides, customizable audit notes, and tactile execution dispatching (`Approve & Dispatch`, `Request Changes`, `Reject Case`).

2. **Explainable AI (XAI) & Chain-of-Thought (CoT) Inspector**:
   - Deep-dive drawer revealing model inference parameters (temperature: `0.15`, deterministic profile), step-by-step reasoning tokens, NeMo / LlamaGuard hallucination filters, and Presidio PII scrubbing attestation.

3. **Multi-Persona Executive Perspective Switcher**:
   - **L2 Security Specialist (Technical Lens)**: Deep-dive CLI scripts, reverse-proxy fallbacks, and command-line orchestration.
   - **CISO Executive Lens**: Highlights material business risk, SEC 4-day Item 1.05 disclosure timelines, financial blast radius estimates, and regulatory SLA requirements.
   - **AI Governance & Auditor Lens**: Focuses on token entropy, model calibration, SOC2 CC6.8 access evidence, and prompt injection defense.

4. **Split Command Center & View Modes**:
   - Switch between clean **Tabbed View** and a high-density **3-Pane Live Command Center** to evaluate AI output, raw telemetry, and human judgment side-by-side.

5. **Live Simulated Telemetry Streaming**:
   - Interactive **"Simulate Live Threat Stream"** button that injects a high-priority incident (`INC-8045` Database Mass Egress) in real time with dynamic triage synthesis.

6. **Power Keyboard Shortcuts**:
   - `J` / `K` queue navigation, `Enter` case selection, `1` / `2` / `3` pane switching, `A` approve, `R` request changes, `X` reject, and `?` hotkey reference.

7. **Synthetic Scenarios Tailored to IT & Security Governance**:
   - **INC-8041: Exposed API Credentials**: Production OpenAI key leaked in public GitHub repository with active Tor scraping.
   - **INC-8042: Broad Sharing Permissions**: Confidential payroll and equity sheet shared publicly with anonymous downloads.
   - **INC-8043: Unapproved AI Integrations**: Shadow AI Chrome extension granted unrestricted read access to executive mail and calendars.
   - **INC-8044: Onboarding / Offboarding Gaps**: Terminated contractor retaining active Okta and AWS Production Console SSO access 7 days post-contract.

---

## 🚀 Run locally

Open `index.html` in any modern web browser (Chrome, Safari, Edge, Firefox).

```bash
# Windows:
start index.html

# macOS:
open index.html

# Linux:
xdg-open index.html
```

**No build step, Node.js installation, or package dependencies are required.** The entire application is self-contained in `index.html`.

---

## 🌐 Deploy as a Static Site (Vercel)

1. Import the repository into Vercel.
2. Vercel automatically runs `node build.js` (defined in `package.json`), which populates the `dist/` directory specified in `vercel.json`.
3. The site is served with clean URLs, zero external CDN dependencies, and instant global caching.

---

## 🔒 Important Limitations & Production Architecture Blueprint

> **Interaction Prototype Notice:** All incidents, telemetry, and AI assessments are synthetic simulations. Actions persist in local browser storage (`localStorage`). No live systems, credentials, or ticketing APIs are connected.

### Enterprise Production Checklist (AI Advisory)

1. **Identity & Multi-Party Attestation**: OIDC/SAML2 SSO with four-eyes approval gates for destructive production actions.
2. **Durable Tamper-Evident Audit Vault**: Cryptographically chained WORM storage (AWS S3 Glacier Object Lock) streaming to enterprise SIEM platforms.
3. **Automated Secret & PII Sanitization**: Pre-inference NER pipelines redacting tokens, keys, passwords, and sensitive client data.
4. **Least-Privilege Scoped Connectors**: Scoped service principles enforcing strict boundary conditions across cloud and identity providers.
5. **Idempotent Two-Phase Execution**: Dry-run validations coupled with automated circuit-breaker rollbacks upon health check degradation.
6. **Continuous Adversarial Red-Teaming**: Automated evaluation suites testing against jailbreaks, prompt leakage, and model drift.

---

*Ajaia IT Manager & AI Consultant Assessment — Verified & Deployed October 2026*
