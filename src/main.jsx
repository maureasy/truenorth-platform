import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CorporateLanding } from './pages/CorporateLanding.jsx'
import { CustomerLanding } from './pages/CustomerLanding.jsx'
import { FranchiseLanding } from './pages/FranchiseLanding.jsx'
import { FranchiseApply } from './pages/FranchiseApply.jsx'
import { DocumentUpload } from './pages/DocumentUpload.jsx'
import { Login } from './pages/Login.jsx'
import { AuthProvider, useAuth } from './lib/auth.jsx'
import './index.css'

function Router() {
  const path = window.location.pathname

  // Public routes — no auth required
  if (path === '/corporate') return <CorporateLanding />
  if (path === '/customer') return <CustomerLanding />
  if (path === '/franchise') return <FranchiseLanding />
  if (path === '/apply') return <FranchiseApply />
  if (path === '/upload') return <DocumentUpload />
  if (path === '/login') return <Login />

  // Protected route — main platform
  return <ProtectedApp />
}

function ProtectedApp() {
  const { session, loading, profile } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-truenorth-500 to-truenorth-700 animate-pulse" />
      </div>
    )
  }

  // Not logged in — redirect to login
  if (!session) {
    window.location.href = '/login'
    return null
  }

  // Logged in — show the platform with role context
  return <App userRole={profile?.role || 'franchisee'} franchiseeId={profile?.franchisee_id} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
)
