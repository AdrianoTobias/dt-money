import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Regras de estilo
      'semi': ['error', 'never'],            // Requer ponto e vírgula
      'quotes': ['error', 'single'],         // Requer aspas
      'indent': ['error', 2],                // Indentação de 2 espaços
      "comma-dangle": ["error", { // Requer vírgula no final de:
        "arrays": "always",
        "objects": "always",
        "imports": "never",
        "exports": "never",
        "functions": "never"
    }],
      'arrow-parens': ['error', 'as-needed'],// Requer parênteses, quando preciso, em arrow functions
    },
  },
)
