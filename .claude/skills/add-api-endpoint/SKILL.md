---
name: add-api-endpoint
description: Use when adding or changing an endpoint in src/lib/api.ts or the API contract in docs/api.yaml. Covers the contract, generated types, mock handler and tests.
---

# Add or change an API endpoint

1. Update the contract in `docs/api.yaml` (path, response schema, new schemas under components)
2. Run `npm run generate:api` to regenerate `src/generated/api-types.ts`; re-export new types from `src/lib/types.ts`
3. Add one typed function to `src/lib/api.ts` that uses `getJson` (no `any`, no direct fetch elsewhere)
4. Add a matching handler to `tests/mocks/handlers.ts` and fixtures to `tests/mocks/data.ts`
5. Write tests: the happy path and one error status (override with `server.use(...)` in the test)
6. Run `npm run check`; fix until green

## Do not
- call fetch() from a component or page directly
- edit `src/generated/` by hand (a hook blocks it)
- invent fields that are not in `docs/api.yaml`
