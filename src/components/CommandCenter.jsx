import { ArrowUpRight, ArrowDownRight, Eye, Send, CheckCircle2, DollarSign, TrendingUp, Zap, Home } from 'lucide-react'
import { brands, people, observations, referrals, pipelineStats, homes, customers } from '../data/mockData'

const funnelStages = [
  { key: 'observations', label: 'Spotted', color: 'bg-slate-500' },
  { key: 'referralsSent', label: 'Sent', color: 'bg-blue-500' },
  { key: 'accepted', label: 'Accepted', color: 'bg-indigo-500' },
  { key: 'booked', label: 'Booked', color: 'bg-purple-500' },
  { key: 'completed', label: 'Complete', color: 'bg-emerald-500' },
]

export function CommandCenter() {
  const ps = pipelineStats.thisMonth
  const psLast = pipelineStats.lastMonth
  const revenueGrowth = ((ps.revenue - psLast.revenue) / psLast.revenue * 100).toFixed(0)
  const maxFunnel = ps.observations

  return (
    <div className="h-full flex flex-col gap-5 overflow-auto">
      {/* Hero metrics row */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Cross-Sell Revenue" value={`$${(ps.revenue / 1000).toFixed(1)}k`} sub="this month" trend={+revenueGrowth} color="emerald" />
        <MetricCard label="Observations" value={ps.observations} sub="issues spotted" trend={Math.round((ps.observations - psLast.observations) / psLast.observations * 100)} color="blue" />
        <MetricCard label="Conversion Rate" value={`${Math.round(ps.completed / ps.observations * 100)}%`} sub="observation → complete" trend={Math.round((ps.completed / ps.observations - psLast.completed / psLast.observations) / (psLast.completed / psLast.observations) * 100)} color="purple" />
        <MetricCard label="Bounties Paid" value={`$${(ps.bountyPaid / 1000).toFixed(1)}k`} sub="to workers" trend={Math.round((ps.bountyPaid - psLast.bountyPaid) / psLast.bountyPaid * 100)} color="amber" />
      </div>

      {/* Main content: Funnel + Live Feed */}
      <div className="flex gap-5 flex-1 min-h-0">
        {/* Referral Funnel */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Referral Funnel</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Observation → Revenue pipeline this month</p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
              {Math.round(ps.completed / ps.observations * 100)}% end-to-end
            </span>
          </div>

          {/* Visual funnel */}
          <div className="space-y-3">
            {funnelStages.map((stage, i) => {
              const value = ps[stage.key]
              const pct = (value / maxFunnel) * 100
              const dropoff = i > 0 ? ps[funnelStages[i - 1].key] - value : 0
              return (
                <div key={stage.key} className="flex items-center gap-3">
                  <div className="w-20 text-right">
                    <span className="text-[12px] font-semibold text-slate-700">{stage.label}</span>
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-full h-8 relative overflow-hidden">
                    <div className={`h-full rounded-full ${stage.color} transition-all duration-700 flex items-center justify-end pr-3`} style={{ width: `${pct}%` }}>
                      <span className="text-[11px] font-bold text-white">{value}</span>
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    {i > 0 && <span className="text-[10px] text-slate-400">-{dropoff}</span>}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Brand cross-sell matrix */}
          <div className="mt-6">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Top Cross-Sell Paths</div>
            <div className="space-y-2">
              {pipelineStats.conversionByBrand.slice(0, 5).map((row, i) => {
                const fromBrand = brands.find(b => b.id === row.from)
                const toBrand = brands.find(b => b.id === row.to)
                return (
                  <div key={i} className="flex items-center gap-2 text-[12px]">
                    <span className="w-5 text-center">{fromBrand.icon}</span>
                    <span className="text-slate-400">→</span>
                    <span className="w-5 text-center">{toBrand.icon}</span>
                    <span className="flex-1 text-slate-600">{fromBrand.service} → {toBrand.service}</span>
                    <span className="font-bold text-slate-900">{row.rate}%</span>
                    <div className="w-16 bg-slate-100 rounded-full h-1.5">
                      <div className="h-full rounded-full bg-emerald-400" style={{ width: `${row.rate}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right column: Live observations + Home health alerts */}
        <div className="w-80 flex flex-col gap-4">
          {/* Live observations feed */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-card p-4 overflow-auto">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Eye size={14} className="text-truenorth-500" />
              Live Observations
            </h3>
            <div className="space-y-3">
              {observations.map(o => {
                const worker = people.find(p => p.id === o.workerId)
                const brand = brands.find(b => b.id === o.brandId)
                const ref = referrals.find(r => r.observationId === o.id)
                return (
                  <div key={o.id} className="border border-slate-100 rounded-xl p-3 hover:border-slate-200 transition-colors">
                    <div className="flex items-center gap-2">
                      <img src={worker.photo} alt={worker.name} className="w-7 h-7 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-semibold text-slate-900 truncate">{worker.name}</div>
                        <div className="text-[10px] text-slate-400">{new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                      {ref && (
                        <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                          ref.status === 'converted' ? 'bg-emerald-100 text-emerald-700'
                          : ref.status === 'accepted' ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                        }`}>{ref.status}</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">{o.text}</p>
                    {ref && (
                      <div className="flex items-center gap-2 mt-2 text-[10px]">
                        <span style={{ color: brands.find(b => b.id === ref.toBrandId).color }} className="font-semibold">
                          → {brands.find(b => b.id === ref.toBrandId).service}
                        </span>
                        {ref.status === 'converted' && <span className="text-emerald-600 font-bold">${ref.bounty} bounty</span>}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Home health alerts */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-4">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Home size={14} className="text-amber-500" />
              Homes Needing Attention
            </h3>
            <div className="space-y-2">
              {homes.filter(h => h.healthScore < 75).sort((a, b) => a.healthScore - b.healthScore).map(home => {
                const customer = customers.find(c => c.id === home.customerId)
                return (
                  <div key={home.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-[12px] font-bold text-white ${
                      home.healthScore < 60 ? 'bg-red-500' : 'bg-amber-500'
                    }`}>
                      {home.healthScore}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold text-slate-900 truncate">{customer.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{home.issues.length} issue{home.issues.length !== 1 ? 's' : ''} • {home.servicesActive.length} service{home.servicesActive.length !== 1 ? 's' : ''}</div>
                    </div>
                    <ArrowUpRight size={14} className="text-slate-300" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, sub, trend, color }) {
  const isPositive = trend >= 0
  const colors = {
    emerald: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    amber: 'from-amber-500 to-amber-600',
  }
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-4 flex flex-col">
      <div className="text-[11px] font-medium text-slate-500">{label}</div>
      <div className="text-2xl font-black text-slate-900 mt-1">{value}</div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[10px] text-slate-400">{sub}</span>
        <span className={`text-[10px] font-bold flex items-center gap-0.5 ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {Math.abs(trend)}%
        </span>
      </div>
      <div className={`h-1 rounded-full bg-gradient-to-r ${colors[color]} mt-3 opacity-60`} />
    </div>
  )
}
