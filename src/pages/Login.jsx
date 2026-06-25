import { useState } from 'react'
import { LogIn, Loader2, AlertCircle } from 'lucide-react'
import { signIn } from '../lib/auth'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signIn(email, password)
      window.location.href = '/'
    } catch (err) {
      setError(err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-truenorth-500 to-truenorth-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-truenorth-500/20 mx-auto mb-4">TN</div>
          <h1 className="text-2xl font-black text-slate-900">TrueNorth Platform</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-xl p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-truenorth-500/20 focus:border-truenorth-400 outline-none transition-all"
              placeholder="you@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-truenorth-500/20 focus:border-truenorth-400 outline-none transition-all"
              placeholder="Your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-truenorth-500 to-truenorth-600 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-truenorth-500/25 transition-all duration-200 disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <a href="/franchise" className="text-xs text-truenorth-600 hover:text-truenorth-700 font-medium">Interested in a franchise? Learn more →</a>
        </div>
      </div>
    </div>
  )
}
