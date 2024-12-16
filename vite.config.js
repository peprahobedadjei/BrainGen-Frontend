import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT || '5173'),
    host: true,
  },
  define: {
    global: {},
    process: {
      env: {
        PORT: JSON.stringify(process.env.PORT || '5173'),
      },
    },
  },
});
