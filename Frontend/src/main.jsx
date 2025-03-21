import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CustomThemeProvider } from './Contexts/CustomThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomThemeProvider >
      <App />
    </CustomThemeProvider>
  </StrictMode>,
)
