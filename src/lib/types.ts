import type { RunStatus, Suite, TestRunDto } from '../generated/api-types'

export type { RunStatus, Suite }

/** A test run as the UI uses it. Mirrors the API contract in docs/api.yaml. */
export type TestRun = TestRunDto
