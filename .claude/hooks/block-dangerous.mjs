// PreToolUse hook for Bash: blocks commands that must never run without a human.
import { block, readHookInput } from './read-input.mjs'

const input = await readHookInput()
const command = input.tool_input?.command ?? ''

const rules = [
  [/\bgit\s+push\b/, 'Pushing is done by a human after review.'],
  [/\bgit\s+reset\s+--hard\b/, 'Hard resets can destroy work. Ask the user.'],
  [/--no-verify\b/, 'Skipping git hooks is not allowed.'],
  [/\brm\s+-[a-z]*r[a-z]*f|\brm\s+-[a-z]*f[a-z]*r/, 'Recursive force delete is not allowed.'],
  [/\bnpm\s+(install|i|add)\s+\S/, 'Adding dependencies needs approval (see AGENTS.md). Ask the user.'],
  [/\bnpm\s+publish\b/, 'Publishing is not allowed.'],
]

for (const [pattern, reason] of rules) {
  if (pattern.test(command)) block(`Blocked by project policy: "${command}". ${reason}`)
}
process.exit(0)
