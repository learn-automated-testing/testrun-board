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

export interface HistoryEntry {
  runId: string
  status: "passed" | "failed"
  startedAt: string
}

export interface TestHistory {
  file: string
  runs: HistoryEntry[]
}
