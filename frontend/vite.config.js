import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
if (process.env.NODE_ENV === 'production') {
  console.warn = () => {};
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5002,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
      },
    },
  },
});
