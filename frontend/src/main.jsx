import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {ThemeProvider} from './components/ui/theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  </ThemeProvider>
)
