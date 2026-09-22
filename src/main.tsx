import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './lib/rendimiento'
import './estilos/base.css'
import './estilos/ui.css'
import './estilos/pantallas.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
