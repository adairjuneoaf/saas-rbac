import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import onlyWarn from 'eslint-plugin-only-warn';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import turboPlugin from 'eslint-plugin-turbo';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettier,
  ...tseslint.configs.recommended,
  { languageOptions: { globals: globals.node } },
  {
    plugins: {
      onlyWarn,
      turbo: turboPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: 'req|res|next|__',
          destructuredArrayIgnorePattern: '__',
        },
      ],
      semi: ['warn', 'always'],
      'semi-spacing': 'error',
      quotes: ['error', 'single'],
      'no-console': ['warn', { allow: ['error', 'info'] }],
      'no-undef': 'error',
    },
    ignores: [
      'dist/**',
      'prisma/**',
      'build',
      'coverage',
      'drizzle',
      'node_modules',
      'dist-ssr',
      '.env',
      '*.local',
      '.vscode/*',
    ],
  },
];
