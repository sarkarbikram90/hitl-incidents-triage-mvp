import React, { useState, useEffect } from "react";

// Initial synthetic scenarios for Ajaia IT Manager Assessment
const INITIAL_INCIDENTS = [
  {
    id: "INC-8041",
    title: "Production OpenAI API Key Leaked in Public GitHub Repository",
    severity: "P1",
    category: "Exposed API Credentials",
    source: "GitHub Secret Scanning & GitGuardian Webhook",
    affectedEntity: "repo: ajaia-org/customer-portal-v2 (David Miller)",
    created: "2026-10-11T14:32:00Z",
    approvalStatus: "Pending Review",
    description: "GitGuardian and GitHub Secret Scanning detected an active OpenAI Enterprise API key committed to public branch feature/support-bot in customer-portal-v2. Exposure window is ~18 minutes. Threat telemetry observed 4,200 token calls from unrecognized Tor exit node IPs.",
    aiSummary: {
      model: "Ajaia-SecOps-Triage (v4.2)",
      confidence: 96,
      confidenceRationale: "High confidence due to direct cryptographic match against active OpenAI token pattern and concurrent anomalous token billing spikes in SIEM telemetry.",
      riskLevel: "HIGH RISK",
      executiveSummary: "Production AI API key with unrestricted billing tier exposed in a publicly accessible GitHub commit. External automated scrapers have already begun issuing programmatic queries. Immediate credential revocation, repo sanitization, and token usage auditing required.",
      rootCause: "Hardcoded credential committed directly to repository rather than sourcing from AWS Secrets Manager during local developer debugging.",
      impactScope: [
        "OpenAI Enterprise Account (Monthly limit: $10,000)",
        "Repository: ajaia-org/customer-portal-v2",
        "Downstream Support Bot Microservice",
        "Compliance: SOC2 CC6.1 (Logical Access Controls)"
      ],
      actionPlan: [
        "Immediately revoke and rotate the exposed API key via OpenAI Organization Admin API.",
        "Deploy replacement secret to AWS Secrets Manager (/prod/customer-portal/openai-key).",
        "Run git-filter-repo to purge commit a7f9c2d from git history and force push.",
        "Query OpenAI usage logs to identify whether proprietary prompt templates or customer data were leaked."
      ],
      commands: [
        {
          id: "cmd-8041-1",
          label: "Audit Recent Token Consumption",
          cmd: 'curl -s -H "Authorization: Bearer $OPENAI_ADMIN" "https://api.openai.com/v1/organization/usage?date=today"',
          risk: "SAFE",
          selected: true,
          description: "Read-only query to measure token spike and extract caller IP addresses."
        },
        {
          id: "cmd-8041-2",
          label: "Revoke and Rotate Compromised API Key",
          cmd: "python3 -m ajaia_sec.creds rotate --provider openai --key-id sk-proj-9mF0x... --env production --auto-update-secrets-manager",
          risk: "NEEDS APPROVAL",
          selected: true,
          description: "Revokes token in OpenAI and writes fresh rotated secret to AWS Secrets Manager."
        },
        {
          id: "cmd-8041-3",
          label: "Purge Commit from Git Remote History",
          cmd: "gh repo clone ajaia-org/customer-portal-v2 /tmp/repo && cd /tmp/repo && git filter-repo --invert-paths --path server/config/openai.js && git push origin --force --all",
          risk: "HIGH RISK",
          selected: false,
          description: "Destructive git rewrite to eliminate token string from all public commit objects."
        }
      ],
      rollbackPlan: "In the event of application startup failure after key rotation, activate proxy fallback model cache and revert to previous secret version in Secrets Manager."
    },
    evidence: [
      {
        id: "ev-8041-1",
        title: "Git Commit Diff Patch",
        source: "GitHub Enterprise Webhook",
        timestamp: "2026-10-11T14:32:15Z",
        hash: "sha256:4d8a1e2f93bc67e0...",
        content: `commit a7f9c2d8471b0e32049e7a83301fbdf929e013a2\nAuthor: David Miller <d.miller@ajaia.internal>\nDate:   Sun Oct 11 14:31:40 2026 -0400\n\n    feat: add streaming chat client for customer support bot\n\ndiff --git a/server/config/openai.js b/server/config/openai.js\n--- a/server/config/openai.js\n+++ b/server/config/openai.js\n@@ -1,4 +1,7 @@\n-const apiKey = process.env.OPENAI_API_KEY;\n+// FIXME: temporary hardcode for local dev testing\n+const apiKey = "sk-proj-9mF0xKl84b901Zl9xT209Yw1xKv99824nL";\n+export const openaiClient = new OpenAI({ apiKey });`
      }
    ],
    checklist: [
      { id: "chk-1", label: "Source evidence verified against GitHub commit tree", checked: true },
      { id: "chk-2", label: "Confirmed credential validity in OpenAI developer dashboard", checked: true },
      { id: "chk-3", label: "Blast radius assessed: No customer data in training prompts", checked: false },
      { id: "chk-4", label: "Remediation plan reviewed for customer bot availability", checked: false }
    ],
    timeline: [
      { time: "14:31:40", title: "Commit Pushed", desc: "Developer d.miller pushed commit a7f9c2d to feature/support-bot", actor: "System", type: "system" },
      { time: "14:32:00", title: "Secret Detected", desc: "GitGuardian webhook flagged exposed production token pattern", actor: "GitGuardian", type: "warning" },
      { time: "14:32:05", title: "AI Triage Ingestion", desc: "Ajaia Triage Bot ingested incident, parsed diff, generated confidence score (96%)", actor: "AI Bot", type: "ai" }
    ]
  },
  {
    id: "INC-8042",
    title: "Confidential Payroll & Equity Sheet Shared with 'Anyone with Link'",
    severity: "P2",
    category: "Broad Sharing Permissions",
    source: "Google Workspace Security Center / DLP Monitor",
    affectedEntity: "Google Drive: 'Ajaia_Q4_Compensation_and_Equity_Grants.xlsx'",
    created: "2026-10-11T13:45:00Z",
    approvalStatus: "Pending Review",
    description: "Google Workspace DLP flagged an internal compensation sheet containing 142 employee names, SSNs, and executive equity grant percentages. Access control list modified to 'Anyone on internet with link can view and download'. 3 anonymous external downloads detected.",
    aiSummary: {
      model: "Ajaia-SecOps-Triage (v4.2)",
      confidence: 94,
      confidenceRationale: "High confidence based on direct Google Drive Admin Audit log match and DLP regex triggers for SSN patterns.",
      riskLevel: "NEEDS APPROVAL",
      executiveSummary: "Confidential HR document exposed to the public internet via Google Drive link sharing. Three anonymous IP downloads recorded. Revert public access immediately, invalidate active link tokens, and export download forensics.",
      rootCause: "Accidental selection of 'Anyone with the link' option when preparing to share file with external executive compensation auditor.",
      impactScope: [
        "142 Employee Records (Names, Tax IDs, Base Salaries)",
        "Executive Equity Cap Table",
        "Drive Folder: HR-Executive-Vault",
        "Compliance: SOC2 CC6.3 & State PII Privacy Statutes"
      ],
      actionPlan: [
        "Revoke 'anyoneWithLink' ACL on document ID 1z9KfM_88xQ_CompQ4.",
        "Revert file permissions to restricted group: hr-leadership@ajaia.internal.",
        "Extract IP addresses and timestamps of the 3 anonymous download sessions."
      ],
      commands: [
        {
          id: "cmd-8042-1",
          label: "Inspect Current File ACLs",
          cmd: 'gam user s.jenkins@ajaia.internal show drivefileacl "1z9KfM_88xQ_CompQ4" format json',
          risk: "SAFE",
          selected: true,
          description: "Read-only inspection of active drive permissions."
        },
        {
          id: "cmd-8042-2",
          label: "Delete Public Link Permission",
          cmd: 'gam user s.jenkins@ajaia.internal delete drivefileacl "1z9KfM_88xQ_CompQ4" "anyoneWithLink"',
          risk: "NEEDS APPROVAL",
          selected: true,
          description: "Removes public link access while preserving direct owner permissions."
        }
      ],
      rollbackPlan: "If authorized collaborator access is severed, re-grant domain-specific view access via Google Groups (hr-leadership@ajaia.internal)."
    },
    evidence: [],
    checklist: [],
    timeline: []
  },
  {
    id: "INC-8043",
    title: "Shadow AI Browser Extension Granted Full Mail & Calendar Scopes",
    severity: "P2",
    category: "Unapproved AI Integrations",
    source: "Google Workspace OAuth Monitor & CASB Alert",
    affectedEntity: "User: r.chen@ajaia.internal (Head of Product) • App: 'QuickNotes AI Summarizer'",
    created: "2026-10-11T12:15:00Z",
    approvalStatus: "Pending Review",
    description: "Cloud Access Security Broker (CASB) detected an unauthorized OAuth token grant for third-party extension 'QuickNotes AI'. The app requested full mail.readonly, calendar.events, and drive.readonly scopes. Vendor domain was registered 18 days ago with no SOC2 certification and privacy policy permitting training on user content.",
    aiSummary: {
      model: "Ajaia-SecOps-Triage (v4.2)",
      confidence: 91,
      confidenceRationale: "Verified active OAuth grant in Google Workspace directory and cross-referenced vendor against unvetted third-party software registry.",
      riskLevel: "NEEDS APPROVAL",
      executiveSummary: "Unvetted shadow AI tool installed by executive product lead granted excessive read permissions into corporate emails and roadmap calendars. Revoke OAuth grant, block app domain-wide, and offer vetted enterprise AI alternative.",
      rootCause: "Employee bypassed IT software procurement and installed unvetted Chrome marketplace extension for meeting summarization.",
      impactScope: [
        "Executive Gmail Inbox & Drafts (r.chen@ajaia.internal)",
        "Internal Strategic Product Roadmap Calendars",
        "Compliance: SOC2 CC6.6 (Logical Boundaries)"
      ],
      actionPlan: [
        "Revoke OAuth token grant across Google Workspace organization for QuickNotes AI.",
        "Add OAuth Client ID 7782194-quicknotes-ai to domain-wide blocklist."
      ],
      commands: [
        {
          id: "cmd-8043-1",
          label: "Revoke QuickNotes AI OAuth Token",
          cmd: "gam oauth revoke user r.chen@ajaia.internal clientid 7782194-quicknotes-ai.apps.googleusercontent.com",
          risk: "NEEDS APPROVAL",
          selected: true,
          description: "Terminates the third-party refresh token immediately."
        }
      ],
      rollbackPlan: "Restore OAuth permissions if vendor completes enterprise third-party risk assessment."
    },
    evidence: [],
    checklist: [],
    timeline: []
  },
  {
    id: "INC-8044",
    title: "Contractor Retained Production AWS & Okta Access 7 Days Post-Contract",
    severity: "P3",
    category: "Onboarding Gaps",
    source: "Identity Governance (BambooHR vs. Okta/AWS IAM Reconciliation)",
    affectedEntity: "Identity: alex.turner@contractor.ajaia.internal (Apex Technical)",
    created: "2026-10-11T09:00:00Z",
    approvalStatus: "Pending Review",
    description: "Automated weekly identity reconciliation found a discrepancy: Contractor Alex Turner's engagement ended on 2026-10-04 per HRIS records, but Okta identity remains in 'Active' status with SSO entitlements for AWS Production Console (ReadOnly) and Jira.",
    aiSummary: {
      model: "Ajaia-SecOps-Triage (v4.2)",
      confidence: 95,
      confidenceRationale: "Mismatched state between authoritative HRIS record (terminated) and directory state (active) confirmed via SCIM API logs.",
      riskLevel: "NEEDS APPROVAL",
      executiveSummary: "Offboarding automation failure left contractor with active production AWS console access for 7 days post-contract. Suspend Okta identity and revoke active STS sessions immediately.",
      rootCause: "HR ticket in Jira Service Management was closed before Okta SCIM deprovisioning webhook completed due to a gateway timeout.",
      impactScope: [
        "Okta Identity (alex.turner@contractor.ajaia.internal)",
        "AWS Production Console (ReadOnlyAccess Role)",
        "Compliance: SOC2 CC6.3 (Timely Deprovisioning)"
      ],
      actionPlan: [
        "Immediately suspend Okta account for alex.turner@contractor.ajaia.internal.",
        "Revoke all active AWS IAM temporary sessions and STS tokens."
      ],
      commands: [
        {
          id: "cmd-8044-1",
          label: "Suspend Okta Directory Account",
          cmd: 'okta-cli user suspend --id 00u8x92k4Lp9 --reason "HITL Offboarding Remediation"',
          risk: "NEEDS APPROVAL",
          selected: true,
          description: "Instantly revokes SSO access across all connected SaaS and cloud applications."
        }
      ],
      rollbackPlan: "Un-suspend Okta user if contractor engagement was extended by hiring manager."
    },
    evidence: [],
    checklist: [],
    timeline: []
  }
];

export default function App() {
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState("ai");

  const selectedIncident = incidents.find((i) => i.id === selectedId);

  const handleDecision = (id, decision) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id
          ? {
              ...inc,
              approvalStatus:
                decision === "approve"
                  ? "Approved"
                  : decision === "request_changes"
                  ? "Changes Requested"
                  : "Rejected"
            }
          : inc
      )
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#090d16", color: "#f8fafc", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" }}>
      {/* Top Disclaimer Banner */}
      <div style={{ background: "linear-gradient(90deg, #1e1b4b 0%, #172554 100%)", borderBottom: "1px solid #3730a3", padding: "10px 24px", fontSize: "13px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span><strong>DEMO PROTOTYPE ONLY</strong> — Simulated environment for Ajaia IT Manager assessment. No live infrastructure or credentials are touched.</span>
        <a href="/" style={{ color: "#93c5fd", textDecoration: "underline", fontSize: "12px" }}>Open Single-File View</a>
      </div>

      {/* Header */}
      <header style={{ background: "#0f172a", borderBottom: "1px solid #1e293b", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => setSelectedId(null)}>
          <div style={{ width: "32px", height: "32px", background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold" }}>⚡</div>
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>HITL Incident Triage</span>
          <span style={{ background: "rgba(99, 102, 241, 0.2)", border: "1px solid rgba(99, 102, 241, 0.4)", color: "#a5b4fc", fontSize: "10px", padding: "2px 6px", borderRadius: "12px" }}>AJAIA DEMO</span>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
        {!selectedIncident ? (
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>Incident Queue</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {incidents.map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => { setSelectedId(inc.id); setActiveTab("ai"); }}
                  style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "10px", padding: "16px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#93c5fd", fontWeight: "bold" }}>{inc.id}</span>
                      <span style={{ background: inc.severity === "P1" ? "rgba(239,68,68,0.2)" : "rgba(245,158,11,0.2)", color: inc.severity === "P1" ? "#ef4444" : "#f59e0b", padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" }}>{inc.severity}</span>
                      <span style={{ background: "#1e293b", color: "#cbd5e1", padding: "2px 6px", borderRadius: "4px", fontSize: "11px" }}>{inc.category}</span>
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: "600", color: "#f8fafc" }}>{inc.title}</div>
                    <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>{inc.affectedEntity}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "12px", color: inc.approvalStatus === "Approved" ? "#34d399" : "#fbbf24", fontWeight: "bold" }}>{inc.approvalStatus}</div>
                    <div style={{ fontSize: "11px", color: "#c084fc", marginTop: "4px" }}>🤖 {inc.aiSummary.confidence}% Match</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Breadcrumb */}
            <div style={{ marginBottom: "16px", fontSize: "13px", color: "#94a3b8" }}>
              <span onClick={() => setSelectedId(null)} style={{ color: "#6366f1", cursor: "pointer", fontWeight: "bold" }}>&larr; Incident Queue</span>
              <span> / </span>
              <span style={{ color: "#93c5fd" }}>{selectedIncident.id}</span>
            </div>

            {/* Incident Header */}
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "10px", padding: "20px", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>{selectedIncident.title}</h2>
              <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "12px" }}>{selectedIncident.description}</p>
              <div style={{ display: "flex", gap: "10px", fontSize: "12px", color: "#cbd5e1" }}>
                <span><strong>Target:</strong> {selectedIncident.affectedEntity}</span>
                <span>&bull;</span>
                <span><strong>Source:</strong> {selectedIncident.source}</span>
                <span>&bull;</span>
                <span style={{ color: selectedIncident.approvalStatus === "Approved" ? "#34d399" : "#fbbf24" }}><strong>Status:</strong> {selectedIncident.approvalStatus}</span>
              </div>
            </div>

            {/* Separated Three-Tier Tabs */}
            <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid #1e293b", marginBottom: "20px" }}>
              <button
                onClick={() => setActiveTab("ai")}
                style={{ background: "none", border: "none", borderBottom: activeTab === "ai" ? "2px solid #6366f1" : "none", color: activeTab === "ai" ? "#6366f1" : "#94a3b8", padding: "10px 16px", fontWeight: "bold", cursor: "pointer" }}
              >
                1. AI Triage Summary
              </button>
              <button
                onClick={() => setActiveTab("evidence")}
                style={{ background: "none", border: "none", borderBottom: activeTab === "evidence" ? "2px solid #6366f1" : "none", color: activeTab === "evidence" ? "#6366f1" : "#94a3b8", padding: "10px 16px", fontWeight: "bold", cursor: "pointer" }}
              >
                2. Source Ground Truth Evidence
              </button>
              <button
                onClick={() => setActiveTab("hitl")}
                style={{ background: "none", border: "none", borderBottom: activeTab === "hitl" ? "2px solid #6366f1" : "none", color: activeTab === "hitl" ? "#6366f1" : "#94a3b8", padding: "10px 16px", fontWeight: "bold", cursor: "pointer" }}
              >
                3. Human Analyst Gate
              </button>
            </div>

            {/* Tab Contents */}
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "10px", padding: "20px" }}>
              {activeTab === "ai" && (
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: "bold", color: "#c084fc", marginBottom: "10px" }}>🤖 AI Assessment ({selectedIncident.aiSummary.confidence}% Confidence)</h3>
                  <p style={{ fontSize: "13px", lineHeight: "1.6", marginBottom: "16px" }}>{selectedIncident.aiSummary.executiveSummary}</p>
                  <div style={{ background: "#070a12", borderLeft: "4px solid #f59e0b", padding: "12px", borderRadius: "4px", fontSize: "13px", marginBottom: "16px" }}>
                    <strong>Root Cause:</strong> {selectedIncident.aiSummary.rootCause}
                  </div>
                  <h4 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "8px" }}>Proposed Actions:</h4>
                  <ul style={{ paddingLeft: "18px", fontSize: "13px", color: "#cbd5e1", lineHeight: "1.6" }}>
                    {selectedIncident.aiSummary.actionPlan.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "evidence" && (
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: "bold", color: "#38bdf8", marginBottom: "10px" }}>🔒 Ground Truth Telemetry</h3>
                  {selectedIncident.evidence && selectedIncident.evidence.length > 0 ? (
                    <div>
                      <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }}>
                        Source: {selectedIncident.evidence[0].source} &bull; Hash: {selectedIncident.evidence[0].hash}
                      </div>
                      <pre style={{ background: "#030712", border: "1px solid #1e293b", padding: "14px", borderRadius: "6px", fontSize: "12px", color: "#a7f3d0", overflowX: "auto" }}>
                        {selectedIncident.evidence[0].content}
                      </pre>
                    </div>
                  ) : (
                    <p style={{ fontSize: "13px", color: "#94a3b8" }}>Raw telemetry artifacts preserved in secure telemetry store.</p>
                  )}
                </div>
              )}

              {activeTab === "hitl" && (
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: "bold", color: "#10b981", marginBottom: "10px" }}>👤 Human-In-The-Loop Approval Gate</h3>
                  <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "16px" }}>
                    Review evidence and confirm action plan before authorizing execution.
                  </p>
                  <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button
                      onClick={() => handleDecision(selectedIncident.id, "approve")}
                      style={{ background: "#10b981", color: "#064e3b", border: "none", borderRadius: "6px", padding: "10px 18px", fontWeight: "bold", cursor: "pointer" }}
                    >
                      ✓ Approve & Dispatch
                    </button>
                    <button
                      onClick={() => handleDecision(selectedIncident.id, "request_changes")}
                      style={{ background: "#f59e0b", color: "#78350f", border: "none", borderRadius: "6px", padding: "10px 18px", fontWeight: "bold", cursor: "pointer" }}
                    >
                      ✎ Request Changes
                    </button>
                    <button
                      onClick={() => handleDecision(selectedIncident.id, "reject")}
                      style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", padding: "10px 18px", fontWeight: "bold", cursor: "pointer" }}
                    >
                      ✕ Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
