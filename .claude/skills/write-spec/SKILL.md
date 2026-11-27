---
name: write-spec
description: Use when the user asks for a new feature that touches more than one file, or asks to write or review a spec. Produces a spec in docs/specs/ from the template.
---

# Write a feature spec

1. Read `docs/specs/_template.md` and one existing spec in `docs/specs/` for the level of detail
2. Ask the user up to five questions about goal, users, edge cases and what is out of scope.
   Do not guess answers to questions the user has not answered
3. Write `docs/specs/<feature-name>.md` with numbered, observable acceptance criteria
   (concrete numbers and exact UI texts), including empty, error and loading states
4. Fill "Done when": map every criterion to a unit, component or e2e test
5. List anything you are unsure about under "Open questions" and stop. Do not start implementing
