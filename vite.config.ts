import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // Ensure correct relative paths
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
