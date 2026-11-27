import type { HistoryEntry, RunStatus, Suite, TestHistory, TestRunDto } from '../generated/api-types'

export type { HistoryEntry, RunStatus, Suite, TestHistory }

/** A test run as the UI uses it. Mirrors the API contract in docs/api.yaml. */
export type TestRun = TestRunDto
