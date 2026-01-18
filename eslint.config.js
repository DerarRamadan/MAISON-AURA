import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// إعدادات ESLint لضمان جودة الكود وتجنب الأخطاء الشائعة
export default defineConfig([
  globalIgnores(['dist']), // تجاهل مجلد المخرجات
  {
    files: ['**/*.{ts,tsx}'], // الملفات المستهدفة بالفحص
    extends: [
      js.configs.recommended, // القواعد الموصى بها لـ Javascript
      tseslint.configs.recommended, // القواعد الموصى بها لـ TypeScript
      reactHooks.configs.flat.recommended, // قواعد React Hooks
      reactRefresh.configs.vite, // قواعد React Refresh (Hot Reload)
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // تعريف متغيرات المتصفح العالمية
    },
  },
])
