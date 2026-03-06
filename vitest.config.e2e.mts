import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    root: './',
    setupFiles: ['./test/setup-e2e.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.turbo/**', '**/.pnpm/**'],
    include: ['**/*.e2e-spec.ts'],
    coverage: {
      enabled: false,
    },
  },

  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})