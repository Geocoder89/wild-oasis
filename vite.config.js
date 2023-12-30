import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import circleDependency from 'vite-plugin-circular-dependency'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),eslint(),circleDependency({
    outputFilePath: './circleDep'
  })],
})
