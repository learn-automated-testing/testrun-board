// PreToolUse hook for Edit/Write: protects generated code and secrets.
import { block, readHookInput } from './read-input.mjs'

const input = await readHookInput()
const file = (input.tool_input?.file_path ?? '').replaceAll('\\', '/')

if (/\/src\/generated\//.test(file)) {
  block(`${file} is generated. Change docs/api.yaml and run "npm run generate:api" instead.`)
}
if (/\/\.env(\.|$)/.test(file)) {
  block('Editing .env files is not allowed.')
}
process.exit(0)
