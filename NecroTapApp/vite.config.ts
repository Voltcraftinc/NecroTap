import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',  // Set base to root, adjust if you're using a custom subdirectory.
  plugins: [react()],
});
