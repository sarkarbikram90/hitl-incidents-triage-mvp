# HITL Incidents Triage MVP

> **Human-In-The-Loop Incident Triage System** – An AI-assisted infrastructure incident management interface that combines LLM-powered root cause analysis with human expert review.

![React](https://img.shields.io/badge/react-19.2.0-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/vite-7.3.1-646cff?style=flat-square&logo=vite)
![Node](https://img.shields.io/badge/node-ES%20modules-green?style=flat-square)
![License](https://img.shields.io/badge/license-Apache%202.0-orange?style=flat-square)

---

## 📋 Overview

HITL Incidents Triage is a minimum viable product (MVP) designed to streamline infrastructure incident response by leveraging AI analysis while maintaining human oversight. The system helps on-call engineers triage complex infrastructure incidents faster by:

- **Automated AI Analysis**: LLM-powered root cause detection and correlation with historical incidents
- **Knowledge Base Integration**: Automated matching of incidents with relevant runbooks, SOPs, and past resolutions
- **Step-by-Step Workflows**: Intelligent remediation recommendations with risk assessment
- **Command Execution Safety**: Dry-run simulations, approval workflows, and rollback procedures

### Target Use Cases

- **Production incident response**: Redis OOM, Kubernetes pod failures, database connection exhaustion
- **On-call triage**: Quick incident severity assessment and initial remediation suggestions  
- **Knowledge propagation**: Automatically surface similar past incidents and proven solutions
- **Learning & training**: Build incident patterns and improve response procedures over time

---

## ✨ Key Features

### 1. **Incident Queue Management**
- View open incidents with severity levels (P1-P4)
- Quick access to incident metadata: environment, application, host, and status
- Direct navigation to detailed incident analysis

### 2. **AI-Powered Root Cause Analysis**
- Summarize complex incident symptoms and logs
- Identify probable root causes with confidence scores
- Correlate with incident component dependencies
- Dynamically recommend remediation steps

### 3. **Contextual Intelligence**
- **Knowledge Base Matching**: Auto-surface relevant KB articles, runbooks, and SOPs based on incident tags
- **Historical Incident Correlation**: Find similar past incidents with similarity scores and proven resolutions
- **Monitoring Context**: Pull relevant monitoring dashboards and metrics (extensible)

### 4. **Guided Remediation Workflows**
- Step-by-step remediation guidance with visual progress tracking
- Risk-categorized commands:
  - **SAFE**: No-risk diagnostic commands
  - **NEEDS APPROVAL**: Requires human review before execution
  - **HIGH RISK**: Potential service disruption
- **Dry-run simulations** to preview impact before execution
- **Rollback procedures** for safe recovery from missteps

### 5. **Human-In-The-Loop Design**
- Human engineers maintain final approval over all remediation actions
- Clear audit trail of recommendations and decisions
- Side-by-side comparison of AI suggestions vs. expert knowledge

---

## 🛠 Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | ^19.2.0 | UI framework with hooks and DOM utilities |
| **Vite** | ^7.3.1 | Lightning-fast bundler and dev server |
| **React DOM** | ^19.2.0 | DOM rendering for React components |
| **ESLint** | ^9.39.1 | Code quality and style enforcement |
| **Node.js** | ES Modules | Modern JavaScript runtime |

### Development Tools

- **@vitejs/plugin-react**: Fast refresh and JSX transformation
- **eslint-plugin-react-hooks**: React Hooks linting rules
- **eslint-plugin-react-refresh**: Hot module replacement linting

---

## 📁 Project Structure

```
hitl-incidents-triage-mvp/
├── src/
│   ├── App.jsx              # Main application component & incident triage UI
│   ├── App.css              # Application styling
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles
│   └── assets/              # Static assets (images, icons, etc.)
├── public/                  # Static files served as-is
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── package.json             # Project metadata and dependencies
├── LICENSE                  # Apache 2.0 License
└── README.md                # This file
```

### Key Source Files

- **[src/App.jsx](src/App.jsx)** – Main application component
  - `MOCK_KB` – Knowledge base articles (runbooks, SOPs)
  - `MOCK_PAST` – Historical incident database with resolutions
  - `MOCK_TICKETS` – Active incident queue
  - `LLM_ANALYSIS` – AI-generated recommendations per incident
  - React components: `TicketList`, `ContextFetch`, `AnalysisView`, `CommandExecutor`

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 16.0 (ES Modules support)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hitl-incidents-triage-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify ESLint configuration**
   ```bash
   npm run lint
   ```

---

## 📖 Running the Application

### Development Server
Start the Vite development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

**Features:**
- ⚡ Instant module updates on file changes
- 🔍 Source maps for debugging
- 🎯 React Fast Refresh for quick iteration

### Production Build
Bundle optimized assets for deployment:

```bash
npm run build
```

**Output:**
- Minified, tree-shaken JavaScript bundle
- Optimized CSS
- Generated in `dist/` directory

### Preview Production Build
Test the production bundle locally:

```bash
npm run preview
```

Serves the built assets from `dist/` at a local URL.

---

## 💻 Development Workflow

### Code Quality

Run linting to check code style and quality:

```bash
npm run lint
```

ESLint configuration enforces:
- React best practices (via `eslint-plugin-react-hooks`)
- ES2020+ modern JavaScript
- Code formatting consistency

### Component Structure

The main `App.jsx` is organized into logical sub-components:

```javascript
// Sub-views (logical components)
<TicketList />          // Incident queue display
<ContextFetch />        // Knowledge base & historical incident fetcher
<AnalysisView />        // AI analysis & recommendations display
<CommandExecutor />     // Remediation command execution UI
<DryRunResult />        // Simulation output viewer
<ApprovalWorkflow />    // Human approval for high-risk commands
<Completion />          // Success summary & metrics
```

### Mock Data

The application uses mock data for demonstration:

- **Knowledge Base (KB)**: Infrastructure runbooks tagged by component (Redis, K8s, PostgreSQL)
- **Historical Incidents**: Past tickets with similarity scores and proven resolutions
- **Active Tickets**: Current incidents with severity, logs, and metadata
- **LLM Analysis**: AI-generated summaries, root causes, and remediation steps

To connect to real data sources:
1. Replace `MOCK_KB` with API calls to your KB system
2. Replace `MOCK_PAST` with queries to your incident database
3. Replace `LLM_ANALYSIS` with calls to your LLM/analysis service

---

## 🎨 UI/UX Design

### Visual Design System

- **Dark theme** optimized for incident response (reduces eye strain during urgent situations)
- **Color-coded severity levels**: P1 (red) → P4 (gray)
- **Risk indicators**: Color-coded command risk levels (green/safe, yellow/approval, red/high-risk)
- **Step-by-step workflows**: Visual progress indicators for remediation steps
- **Typewriter effect**: Gradual reveal of AI analysis text for engagement

### Example Incident Types

1. **Redis OOM (Out of Memory)**: Memory exhaustion triggering incident cascade
2. **Kubernetes Pod CrashLoop**: Application failure due to code issues or config mismatch
3. **PostgreSQL Connection Pool Exhaustion**: Database connectivity collapse under load

---

## 🔄 Typical Workflow

```
1. [Incident Queue]
   ↓ Engineer selects incident
2. [Context Fetch]
   ↓ Load KB, past incidents, monitoring data
3. [AI Analysis]
   ↓ Generate summary, root cause, recommendations
4. [Review & Approve]
   ↓ Engineer reviews suggestions
5. [Dry Run]
   ↓ Simulate execution, preview impact
6. [Execute (with approval)]
   ↓ Run approved commands
7. [Completion]
   ↓ Document resolution, update KB
```

---

## 📚 API Integration Points (Future)

To integrate with real systems, replace mock data with API calls:

```javascript
// Example: Replace MOCK_KB with real KB API
async function fetchKnowledgeBase(tags) {
  const response = await fetch(`/api/kb?tags=${tags.join(',')}`);
  return response.json();
}

// Example: Replace LLM_ANALYSIS with LLM service
async function getLLMAnalysis(incident) {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    body: JSON.stringify(incident)
  });
  return response.json();
}
```

---

## 🚦 Incident Severity Levels

| Level | Color | Typical Response Time | Example |
|-------|-------|----------------------|---------|
| **P1** | 🔴 Red | 15-30 minutes | Production-wide outage, data loss |
| **P2** | 🟠 Orange | 1-2 hours | Degraded service, partial outage |
| **P3** | 🟡 Yellow | 4-8 hours | Minor issues, cosmetic problems |
| **P4** | ⚪ Gray | Next business day | Improvement requests, future work |

---

## 🔐 Security Considerations

- **Command approval workflows** prevent accidental destructive commands
- **Dry-run simulations** preview impact before execution
- **Risk categorization** flags high-risk operations
- **Audit trail** logs all recommendations and approvals (future enhancement)
- **Rollback procedures** enable safe recovery from missteps

---

## 📈 Future Enhancements

- [ ] Real-time connecting to incident management systems (PagerDuty, VictorOps)
- [ ] Integration with LLM APIs (OpenAI, Claude, Gemini) for dynamic analysis
- [ ] Connection to knowledge base systems (Confluence, Notion)
- [ ] Monitoring dashboard integration (DataDog, Prometheus, Grafana)
- [ ] Command execution engine with SSH/API backends
- [ ] Audit logging and analytics dashboard
- [ ] Team collaboration features (shared analysis, comments)
- [ ] Incident pattern learning and recommendations improvement

---

## 🤝 Contributing

This is an MVP project. Contributions are welcome for:

- Feature additions (new incident types, analysis improvements)
- UX/Design enhancements
- Performance optimizations
- Documentation improvements
- Bug fixes

Please open an issue or pull request with your contributions.

---

## 📝 License

Licensed under the **Apache License 2.0**. See [LICENSE](LICENSE) for details.

---

## 📧 Support

For questions, issues, or feedback:
- Open an issue on the repository
- Contact the incident response team
- Review the [project documentation](docs/)

---

## 🎯 Quick Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install project dependencies |
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Test production bundle locally |
| `npm run lint` | Check code quality with ESLint |

---

**Built with ❤️ for on-call engineers managing critical infrastructure incidents.**
