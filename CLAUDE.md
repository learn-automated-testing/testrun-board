@AGENTS.md

## Claude Code specific
- Skills in `.claude/skills/`: `add-api-endpoint` (any change to src/lib/api.ts) and `write-spec` (new features)
- After any change under tests/, ask the `test-reviewer` subagent to review it
- Hooks in `.claude/settings.json` lint every edited file and block dangerous commands and edits
  to protected paths. If a hook blocks you, read its message and adapt; do not work around it
- Test conventions are in `.claude/rules/testing.md` (loaded when you work in tests/)
