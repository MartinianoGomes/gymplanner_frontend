import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import App from './App.tsx'

import "../src/assets/styles/index.css"
import { UserProvider } from './services/contexts/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
)
