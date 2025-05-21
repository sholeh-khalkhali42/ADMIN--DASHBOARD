import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // افزایش محدودیت هشدار سایز chunk
    rollupOptions: {
      output: {
        manualChunks: {
          // جدا کردن کتابخانه‌های اصلی به فایل‌های مستقل برای کاهش سایز باندل اولیه
          react: ['react', 'react-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          ui: ['bootstrap']
        }
      }
    }
  }
});
