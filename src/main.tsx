import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'

// نقطة الدخول الرئيسية للتطبيق (Main Entry Point)
// يتم هنا ربط تطبيق React بعنصر HTML الذي يحمل المعرف 'root'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
