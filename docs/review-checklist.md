# Review checklist for agent-written changes

Read `git diff --stat` first, then every change under tests/, then the rest.

| Failure mode | Signal in the diff | What to do |
|---|---|---|
| Hallucination | Imports, options or API fields you have never seen | Typecheck, run it, ask for the docs link |
| Silent regression | Changes in shared helpers (src/lib) or defaults | Check tests on the old behaviour; run `npm run mutation:changed` |
| False green | Test changes in a "fix the code" task; .skip/.only; looser assertions; snapshot updates | Reject unless the reason is in the PR |
| Scope drift | Files unrelated to the task | Ask to split the PR |
| Unannounced rewrite | Large deletions in working files | Ask why; compare behaviour before and after |

Also check:
- Every acceptance criterion in the spec maps to a test
- No new dependency without the `new-dependency` label
- Nothing in src/generated/ changed without a matching change in docs/api.yaml
