import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/dptech-trainings/', // Replace with your repository name
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});