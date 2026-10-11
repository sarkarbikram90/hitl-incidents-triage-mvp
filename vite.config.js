import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for HITL Incident Triage Prototype
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
