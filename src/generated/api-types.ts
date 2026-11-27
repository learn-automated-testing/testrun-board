// GENERATED from docs/api.yaml. Do not edit by hand.
// Regenerate with: npm run generate:api

export type Suite = "unit" | "api" | "e2e"

export type RunStatus = "passed" | "failed" | "flaky"

export interface TestRunDto {
  id: string
  file: string
  suite: Suite
  status: RunStatus
  durationMs: number
  startedAt: string
}
