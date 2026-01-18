import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// إعدادات Vite لمشروع React مع Tailwind CSS
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), // إضافة دعم React
    tailwindcss(), // إضافة دعم Tailwind CSS الإصدار الرابع الـ (Vite Plugin)
  ],
})
