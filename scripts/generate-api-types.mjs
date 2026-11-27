#!/usr/bin/env node
// Generates src/generated/api-types.ts from components.schemas in docs/api.yaml.
// Supports: string, integer, number, boolean, enum, array, object, $ref.
import { readFileSync, writeFileSync } from 'node:fs'
import { parse } from 'yaml'

const spec = parse(readFileSync('docs/api.yaml', 'utf8'))
const schemas = spec.components?.schemas ?? {}
const nameOf = (ref) => ref.split('/').pop()
const nameMap = { TestRun: 'TestRunDto' }
const tsName = (n) => nameMap[n] ?? n

function type(s) {
  if (s.$ref) return tsName(nameOf(s.$ref))
  if (s.enum) return s.enum.map((v) => JSON.stringify(v)).join(' | ')
  switch (s.type) {
    case 'string': return 'string'
    case 'integer': case 'number': return 'number'
    case 'boolean': return 'boolean'
    case 'array': return `${type(s.items)}[]`
    case 'object': return objectBody(s)
    default: throw new Error(`Unsupported schema: ${JSON.stringify(s)}`)
  }
}

function objectBody(s, indent = '') {
  const req = new Set(s.required ?? [])
  const lines = Object.entries(s.properties ?? {}).map(
    ([k, v]) => `${indent}  ${k}${req.has(k) ? '' : '?'}: ${type(v)}`,
  )
  return `{\n${lines.join('\n')}\n${indent}}`
}

let out = '// GENERATED from docs/api.yaml. Do not edit by hand.\n// Regenerate with: npm run generate:api\n'
for (const [name, s] of Object.entries(schemas)) {
  out += s.type === 'object'
    ? `\nexport interface ${tsName(name)} ${objectBody(s)}\n`
    : `\nexport type ${tsName(name)} = ${type(s)}\n`
}
writeFileSync('src/generated/api-types.ts', out)
console.log(`Generated ${Object.keys(schemas).length} types into src/generated/api-types.ts`)
