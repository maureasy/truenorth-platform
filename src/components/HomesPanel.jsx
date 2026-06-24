import { useState } from 'react'
import { Home, AlertTriangle, CheckCircle2, Clock, TrendingUp, Calendar, MapPin, Sparkles } from 'lucide-react'
import { brands, customers, people, homes } from '../data/mockData'

const severityColors = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-slate-100 text-slate-600 border-slate-200',
}

const statusColors = {
  referral_sent: { label: 'Referral Sent', color: 'text-blue-600 bg-blue-50' },
  converted: { label: 'Converted', color: 'text-emerald-600 bg-emerald-50' },
  booked: { label: 'Booked', color: 'text-purple-600 bg-purple-50' },
  resolved: { label: 'Resolved', color: 'text-slate-500 bg-slate-50' },
  no_action: { label: 'No Action', color: 'text-slate-400 bg-slate-50' },
}

function HealthBadge({ score }) {
  const color = score >= 80 ? 'from-emerald-400 to-emerald-600' : score >= 60 ? 'from-amber-400 to-amber-600' : 'from-red-400 to-red-600'
  return (
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-black text-base shadow-sm`}>
      {score}
    </div>
  )
}

export function HomesPanel() {
  const [selectedHome, setSelectedHome] = useState(null)

  return (
    <div className="flex h-full gap-5">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Home Intelligence</h2>
            <p className="text-xs text-slate-400 mt-0.5">{homes.length} properties &bull; {homes.filter(h => h.issues.length > 0).length} with active issues</p>
          </div>
        </div>

        <div className="space-y-3 overflow-auto flex-1">
          {homes.map(home => {
            const customer = customers.find(c => c.id === home.customerId)
            const activeIssues = home.issues.filter(i => i.status !== 'resolved' && i.status !== 'no_action')
            return (
              <div
                key={home.id}
                onClick={() => setSelectedHome(selectedHome?.id === home.id ? null : home)}
                className={`border rounded-2xl p-4 cursor-pointer transition-all duration-200 ${
                  selectedHome?.id === home.id
                    ? 'border-truenorth-400 bg-truenorth-50/30 ring-2 ring-truenorth-500/10 shadow-card-hover'
                    : 'border-slate-100 hover:border-slate-200 hover:shadow-card-hover bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <HealthBadge score={home.healthScore} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[14px] text-slate-900">{customer.name}</span>
                      {customer.member && <span className="text-[9px] font-bold bg-truenorth-100 text-truenorth-700 px-1.5 py-0.5 rounded">MEMBER</span>}
                    </div>
                    <div className="text-[12px] text-slate-500 mt-0.5 flex items-center gap-1"><MapPin size={11} /> {home.address}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[11px] text-slate-400">{home.type} &bull; {home.sqft} sqft &bull; Built {home.yearBuilt}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 justify-end">
                      {home.servicesActive.map(sId => {
                        const brand = brands.find(b => b.id === sId)
                        return <span key={sId} className="text-sm" title={brand.service}>{brand.icon}</span>
                      })}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">{home.totalVisits} visits</div>
                    {activeIssues.length > 0 && (
                      <div className="text-[10px] font-semibold text-amber-600 mt-1 flex items-center gap-1 justify-end">
                        <AlertTriangle size={10} /> {activeIssues.length} issue{activeIssues.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>

                {/* Predicted needs preview */}
                {home.predictedNeeds.length > 0 && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                    <Sparkles size={11} className="text-purple-400 shrink-0" />
                    <div className="flex gap-2 overflow-hidden">
                      {home.predictedNeeds.slice(0, 2).map((need, i) => {
                        const brand = brands.find(b => b.id === need.brandId)
                        return (
                          <span key={i} className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-lg whitespace-nowrap">
                            {brand.icon} {need.service} <span className="text-purple-500 font-bold">{need.confidence}%</span>
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {selectedHome && <HomeDetail home={selectedHome} />}
    </div>
  )
}

function HomeDetail({ home }) {
  const customer = customers.find(c => c.id === home.customerId)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const maxSpend = Math.max(...home.monthlySpend)

  return (
    <div className="w-80 shrink-0 border-l border-slate-100 pl-5 overflow-auto">
      {/* Header */}
      <div className="text-center mb-5">
        <HealthBadge score={home.healthScore} />
        <div className="font-bold text-slate-900 mt-3 text-base">{customer.name}</div>
        <div className="text-[12px] text-slate-500">{home.address}</div>
        <div className="text-[11px] text-slate-400 mt-1">{home.type} &bull; {home.sqft} sqft &bull; Built {home.yearBuilt}</div>
        <div className="flex items-center justify-center gap-2 mt-2">
          {home.servicesActive.map(sId => {
            const brand = brands.find(b => b.id === sId)
            return (
              <span key={sId} className="text-[10px] font-medium px-2 py-0.5 rounded-lg" style={{ background: brand.color + '15', color: brand.color }}>
                {brand.icon} {brand.service}
              </span>
            )
          })}
        </div>
      </div>

      {/* Issues */}
      {home.issues.length > 0 && (
        <div className="mb-5">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Known Issues</div>
          <div className="space-y-2">
            {home.issues.map(issue => {
              const brand = brands.find(b => b.id === issue.brandId)
              const worker = people.find(p => p.id === issue.detectedBy)
              const status = statusColors[issue.status]
              return (
                <div key={issue.id} className={`border rounded-xl p-3 ${severityColors[issue.severity]}`}>
                  <div className="flex items-start justify-between">
                    <div className="text-[12px] font-semibold">{issue.title}</div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${status.color}`}>{status.label}</span>
                  </div>
                  <div className="text-[10px] mt-1 opacity-70">
                    {brand.icon} {brand.service} &bull; Spotted by {worker.name} &bull; {issue.detectedAt}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Predicted needs */}
      <div className="mb-5">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Sparkles size={11} className="text-purple-400" /> Predicted Needs
        </div>
        <div className="space-y-2">
          {home.predictedNeeds.map((need, i) => {
            const brand = brands.find(b => b.id === need.brandId)
            return (
              <div key={i} className="flex items-center gap-2 bg-purple-50/50 border border-purple-100 rounded-xl p-2.5">
                <span className="text-base">{brand.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold text-slate-800 truncate">{need.service}</div>
                  <div className="text-[10px] text-slate-400">{need.monthDue}</div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] font-black text-purple-600">{need.confidence}%</div>
                  <div className="text-[9px] text-slate-400">confidence</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Monthly spend chart */}
      <div className="mb-5">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Monthly Spend</div>
        <div className="flex items-end gap-1 h-20">
          {home.monthlySpend.map((amount, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-gradient-to-t from-truenorth-400 to-truenorth-500 transition-all"
                style={{ height: `${maxSpend > 0 ? (amount / maxSpend) * 60 : 0}px` }}
              />
              <span className="text-[8px] text-slate-400">{months[i].charAt(0)}</span>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-slate-400 text-center mt-1">
          Avg: ${Math.round(home.monthlySpend.reduce((a, b) => a + b, 0) / 12)}/mo
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-slate-900">{home.totalVisits}</div>
          <div className="text-[10px] text-slate-400 font-medium">Total Visits</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-slate-900">${(customer.totalSpend / 1000).toFixed(1)}k</div>
          <div className="text-[10px] text-slate-400 font-medium">Lifetime Value</div>
        </div>
      </div>
    </div>
  )
}
