import path from 'node:path'
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    swc.vite({
      module: {
        type: 'es6',
      },
    }),
  ],
  test: {
    globals: true,
    root: path.resolve(__dirname),
    exclude: ['**/node_modules/**', '**/dist/**', '**/data/**'],
  },
})