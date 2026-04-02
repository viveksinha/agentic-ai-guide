# AgentAtlas

**Navigate the World of AI Agents.**

A living, open-source reference covering AI agent tools, LLM models, agent frameworks, no-code builders, and real working examples — for developers, business users, and curious minds.

**Live site → [viveksinha.github.io/agent-atlas](https://viveksinha.github.io/agent-atlas/)**

---

## What's Inside

| Page | What you'll find |
|------|-----------------|
| **[Home](https://viveksinha.github.io/agent-atlas/)** | Overview of AI agents, what LLMs are, and how to navigate the atlas. |
| **[Resources](https://viveksinha.github.io/agent-atlas/resources.html)** | Curated articles, newsletters, threads, and a glossary — filtered by audience (laymen / techies). |
| **[Tools](https://viveksinha.github.io/agent-atlas/tools.html)** | Directory of LLMs, agent builders, frameworks, hosting platforms, and specialized apps. |
| **[Examples](https://viveksinha.github.io/agent-atlas/examples.html)** | Step-by-step, real-world examples across industries (insurance, HR, sales, healthcare, legal, and more). |
| **[Deep Tech](https://viveksinha.github.io/agent-atlas/deep-tech.html)** | Research papers, benchmarks, and technical deep dives for practitioners. |

## Project Structure

```
agent-atlas/
├── index.html              # Home page
├── resources.html          # Curated resources & glossary
├── tools.html              # Tool & framework directory
├── examples.html           # Example index with filters
├── deep-tech.html          # Papers & benchmarks
├── css/
│   └── style.css           # Global stylesheet (dark/light theme)
├── js/
│   └── main.js             # Theme toggle, tabs, nav highlighting
└── examples/
    ├── claims-fnol.html
    ├── contract-review.html
    ├── customer-triage.html
    ├── doc-qa.html
    ├── hr-onboarding.html
    ├── insurance.html
    ├── lead-qualifier.html
    ├── meeting-summarizer.html
    ├── patient-intake.html
    ├── policy-renewal.html
    └── sales-outreach.html
```

## Tech Stack

Plain **HTML + CSS + vanilla JavaScript** — no build step, no frameworks, no dependencies.

## Running Locally

Clone the repo and open it with any static file server:

```bash
git clone https://github.com/viveksinha/agent-atlas.git
cd agent-atlas

# Option 1 — Python
python3 -m http.server 8000

# Option 2 — Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deployment

The site is deployed via **GitHub Pages** from the `main` branch (root `/`). Every push to `main` automatically updates the live site at:

> **https://viveksinha.github.io/agent-atlas/**

## Contributing

Contributions are welcome — whether it's adding a new tool, writing an example, or fixing a typo. Open an issue or submit a pull request.

## License

Open source. Built with care for the community.
