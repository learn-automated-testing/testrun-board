import type { TestHistory, TestRun } from './types'

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(path)
  if (!response.ok) {
    throw new ApiError(response.status, `GET ${path} failed with ${response.status}`)
  }
  return (await response.json()) as T
}

/** GET /api/runs: the test runs of the latest pipeline run. */
export function fetchRuns(): Promise<TestRun[]> {
  return getJson<TestRun[]>('/api/runs')
}

/** GET /api/history: the latest runs per test file, newest first. */
export function fetchHistory(limit = 20): Promise<TestHistory[]> {
  return getJson<TestHistory[]>(`/api/history?limit=${limit}`)
}
