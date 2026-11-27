import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'reports', 'playwright-report', 'test-results', '.stryker-tmp', 'public/mockServiceWorker.js'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    // AGENTS.md rule, enforced: no focused or skipped tests in the repository
    files: ['tests/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-properties': ['error',
        { object: 'it', property: 'only' }, { object: 'it', property: 'skip' },
        { object: 'test', property: 'only' }, { object: 'test', property: 'skip' },
        { object: 'describe', property: 'only' }, { object: 'describe', property: 'skip' },
      ],
    },
  },
)
