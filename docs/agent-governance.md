# How we use coding agents

Starter policy from lesson 21. Adapt it in a pull request; review it every quarter.

1. **Ownership**: the person who opens the PR owns the code, whoever wrote it.
2. **Review**: agent-written PRs get the same review as any PR; test changes are reviewed first (docs/review-checklist.md).
3. **Size**: PRs stay reviewable (aim for under ~400 changed lines); split larger work.
4. **Gates**: no merge without green CI; agents never push (enforced by a hook and branch protection).
5. **Data**: no secrets, customer data or production credentials in prompts, memory or MCP configuration.
6. **Tools**: approved harnesses, models, plugins and MCP servers are listed below.
7. **Disclosure**: mention in the PR when an agent did most of the work.
8. **Learning**: a repeated agent mistake becomes a rule (AGENTS.md), skill, hook or test.

## Approved tools
| Kind | Approved | Notes |
|---|---|---|
| Harness | Claude Code, OpenCode | Instructions live in AGENTS.md |
| MCP servers | Playwright (`.mcp.json`) | Local and test environments only |
| Plugins | (none yet) | Evaluate per lesson 10 before adding |
