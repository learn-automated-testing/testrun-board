import { http, HttpResponse } from 'msw'
import { history, runs } from './data'

/**
 * Mock API. Every endpoint in src/lib/api.ts needs a handler here
 * (see the add-api-endpoint skill). Shared by Vitest and the dev server.
 */
export const handlers = [
  http.get('/api/runs', () => HttpResponse.json(runs)),
  http.get('/api/history', ({ request }) => {
    const limit = Number(new URL(request.url).searchParams.get('limit') ?? 20)
    return HttpResponse.json(history.map((h) => ({ ...h, runs: h.runs.slice(0, limit) })))
  }),
]
