import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // One copy of astronomy-engine, the CommonJS build. Its `exports` map sends
      // `import` to esm/astronomy.js and `require` to astronomy.js; the panchang
      // engine `require`s it while our code would `import` it, and two copies
      // mean two `Observer` classes — the engine's `instanceof` check then throws
      // "Not an instance of the Observer class". The app hit exactly this on
      // device (see the app's CLAUDE.md, Panchang Engine).
      'astronomy-engine': require.resolve('astronomy-engine'),
    },
  },
})
