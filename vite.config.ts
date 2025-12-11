import { defineConfig } from 'vite';

export default defineConfig({
  // Base path for the application. 
  // Should be './' to work with both Vercel (root) and GitHub Pages (subdirectory).
  base: './',
  build: {
    // Output directory for the build
    outDir: 'dist',
    // Size warning limit (in KB) - optional, but good for tracking large bundles
    chunkSizeWarningLimit: 1500,
    // Explicitly include common static asset types if they aren't caught by default,
    // though 'public' folder contents are always copied.
    assetsDir: 'assets',
  },
  // Ensure we can import static assets in code if needed
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg'],
  server: {
    port: 3000,
    open: true,
  }
});
