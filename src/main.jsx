import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CorporateLanding } from './pages/CorporateLanding.jsx'
import { CustomerLanding } from './pages/CustomerLanding.jsx'
import { FranchiseLanding } from './pages/FranchiseLanding.jsx'
import { FranchiseApply } from './pages/FranchiseApply.jsx'
import './index.css'

function Router() {
  const path = window.location.pathname
  if (path === '/corporate') return <CorporateLanding />
  if (path === '/customer') return <CustomerLanding />
  if (path === '/franchise') return <FranchiseLanding />
  if (path === '/apply') return <FranchiseApply />
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
