import { http, HttpResponse } from 'msw'
import { runs } from './data'

/**
 * Mock API. Every endpoint in src/lib/api.ts needs a handler here
 * (see the add-api-endpoint skill). Shared by Vitest and the dev server.
 */
export const handlers = [
  http.get('/api/runs', () => HttpResponse.json(runs)),
]
