import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        digitalGrowth: resolve(__dirname, 'digital-growth.html'),
        intelligentAutomation: resolve(__dirname, 'intelligent-automation.html'),
        powerfulWebsites: resolve(__dirname, 'powerful-websites.html'),
        founderMessage: resolve(__dirname, 'founder-message.html'),
        roiCalculator: resolve(__dirname, 'roi-calculator.html'),
        caseStudies: resolve(__dirname, 'case-studies.html'),
        faq: resolve(__dirname, 'faq.html'),
        freeAudit: resolve(__dirname, 'free-audit.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
});
