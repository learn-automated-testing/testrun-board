---
paths:
  - "tests/**/*.ts"
  - "tests/**/*.tsx"
---

# Test conventions

- Locate elements by role, label or text (getByRole, getByLabelText); never by CSS class or test id
- One behaviour per test, named after the behaviour: "shows an empty state when there are no runs"
- Use the fixtures in tests/mocks/data.ts; override an endpoint per test with server.use(...)
- Assert exact values (toBe, toEqual, toHaveTextContent with the real text); avoid toBeDefined/toBeTruthy
- Every page test covers loading, error and empty states as well as the happy path
- E2E tests wait for content (expect(...).toBeVisible()), never for a fixed timeout
