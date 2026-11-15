
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  base: '/decision-wheel/',

  server: {
    allowedHosts: [
      'kmsti4-45-131-111-127.a.2na.am',
    ],
  },
});
