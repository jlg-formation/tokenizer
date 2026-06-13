import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import wasm from 'vite-plugin-wasm'

export default defineConfig({
  plugins: [wasm(), react(), tailwindcss()],
  base: process.env.NODE_ENV === 'production' ? '/tokenizer/' : '/',
})
