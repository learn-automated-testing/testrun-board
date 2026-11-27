// Shared helper: Claude Code passes the hook input as JSON on stdin.
export async function readHookInput() {
  let raw = ''
  for await (const chunk of process.stdin) raw += chunk
  try {
    return JSON.parse(raw || '{}')
  } catch {
    return {}
  }
}

/** Exit code 2 blocks the tool call (PreToolUse) or reports back (PostToolUse); stderr goes to the agent. */
export function block(message) {
  process.stderr.write(message + '\n')
  process.exit(2)
}
