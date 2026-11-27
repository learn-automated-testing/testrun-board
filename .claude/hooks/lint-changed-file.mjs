// PostToolUse hook for Edit/Write: lints the file that was just changed.
// On lint errors it exits with 2, so the agent sees the errors and fixes them.
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { block, readHookInput } from './read-input.mjs'

const input = await readHookInput()
const file = input.tool_input?.file_path ?? ''

if (!/\.(ts|tsx|js|mjs)$/.test(file) || !existsSync(file) || file.includes('/src/generated/')) {
  process.exit(0)
}
try {
  execFileSync('npx', ['eslint', '--no-warn-ignored', file], { stdio: 'pipe', encoding: 'utf8' })
} catch (error) {
  block(`ESLint found problems in ${file}:\n${error.stdout ?? ''}${error.stderr ?? ''}`)
}
process.exit(0)
