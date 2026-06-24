import { useState } from 'react'
import { UserPlus, AlertTriangle, CheckCircle2, Eye, TrendingUp, TrendingDown } from 'lucide-react'
import { franchisees, brands } from '../../data/mockData'

const statusConf = {
  healthy: { label: 'Healthy', color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  watch: { label: 'Watch', color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  at_risk: { label: 'At Risk', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
}

export function FranchiseeMgmt() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = filter === 'all' ? franchisees : franchisees.filter(f => f.status === filter)
  const healthy = franchisees.filter(f => f.status === 'healthy').length
  const watch = franchisees.filter(f => f.status === 'watch').length
  const atRisk = franchisees.filter(f => f.status === 'at_risk').length

  return (
    <div className="h-full flex gap-5 overflow-hidden">
      {/* List */}
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <UserPlus size={20} className="text-truenorth-500" />
            Franchisee Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Health metrics &bull; Performance tracking</p>
        </div>

        {/* Health summary */}
        <div className="grid grid-cols-3 gap-3">
          <button onClick={() => setFilter(filter === 'healthy' ? 'all' : 'healthy')} className={`p-3 rounded-xl border text-left transition-all ${filter === 'healthy' ? 'border-emerald-300 bg-emerald-50' : 'border-slate-100 bg-white'}`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className="text-[11px] font-semibold text-slate-600">Healthy</span>
            </div>
            <div className="text-xl font-black text-emerald-600 mt-1">{healthy}</div>
          </button>
          <button onClick={() => setFilter(filter === 'watch' ? 'all' : 'watch')} className={`p-3 rounded-xl border text-left transition-all ${filter === 'watch' ? 'border-amber-300 bg-amber-50' : 'border-slate-100 bg-white'}`}>
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-amber-500" />
              <span className="text-[11px] font-semibold text-slate-600">Watch</span>
            </div>
            <div className="text-xl font-black text-amber-600 mt-1">{watch}</div>
          </button>
          <button onClick={() => setFilter(filter === 'at_risk' ? 'all' : 'at_risk')} className={`p-3 rounded-xl border text-left transition-all ${filter === 'at_risk' ? 'border-red-300 bg-red-50' : 'border-slate-100 bg-white'}`}>
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-500" />
              <span className="text-[11px] font-semibold text-slate-600">At Risk</span>
            </div>
            <div className="text-xl font-black text-red-600 mt-1">{atRisk}</div>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-4 flex-1 overflow-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="text-[10px] text-slate-400 uppercase border-b border-slate-100">
                <th className="text-left py-2 font-semibold">Franchisee</th>
                <th className="text-left py-2 font-semibold">Brand</th>
                <th className="text-right py-2 font-semibold">Units</th>
                <th className="text-right py-2 font-semibold">Revenue</th>
                <th className="text-right py-2 font-semibold">NPS</th>
                <th className="text-right py-2 font-semibold">Churn</th>
                <th className="text-right py-2 font-semibold">Obs Rate</th>
                <th className="text-right py-2 font-semibold">Conv %</th>
                <th className="text-left py-2 font-semibold pl-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => {
                const brand = brands.find(b => b.id === f.brandId)
                const conf = statusConf[f.status]
                return (
                  <tr key={f.id} className={`border-b border-slate-50 hover:bg-slate-50/50 cursor-pointer ${selected?.id === f.id ? 'bg-truenorth-50' : ''}`} onClick={() => setSelected(f)}>
                    <td className="py-2.5">
                      <div className="font-semibold text-slate-800">{f.name}</div>
                      <div className="text-[10px] text-slate-400">{f.owner}</div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: brand?.color }} />
                        <span className="text-slate-600">{brand?.service}</span>
                      </div>
                    </td>
                    <td className="text-right font-medium text-slate-700">{f.units}</td>
                    <td className="text-right font-bold text-emerald-600">${(f.monthlyRevenue / 1000).toFixed(0)}k</td>
                    <td className="text-right">
                      <span className={`font-bold ${f.nps >= 70 ? 'text-emerald-600' : f.nps >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{f.nps}</span>
                    </td>
                    <td className="text-right">
                      <span className={`font-bold ${f.churn <= 2 ? 'text-emerald-600' : f.churn <= 4 ? 'text-amber-600' : 'text-red-600'}`}>{f.churn}%</span>
                    </td>
                    <td className="text-right font-medium text-slate-600">{f.observationRate}/wk</td>
                    <td className="text-right font-medium text-slate-600">{f.conversionRate}%</td>
                    <td className="pl-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${conf.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${conf.dot}`} />
                        {conf.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail sidebar */}
      {selected && (
        <div className="w-72 bg-white rounded-2xl border border-slate-100 shadow-card p-5 overflow-auto shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">{selected.name}</h3>
            <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 text-xs">✕</button>
          </div>
          <div className="space-y-3 text-[11px]">
            <DetailRow label="Owner" value={selected.owner} />
            <DetailRow label="Brand" value={brands.find(b => b.id === selected.brandId)?.name} />
            <DetailRow label="Territory" value={selected.territory.toUpperCase()} />
            <DetailRow label="Since" value={selected.since} />
            <DetailRow label="Units" value={selected.units} />
            <DetailRow label="Workers" value={selected.workers} />
            <div className="border-t border-slate-100 pt-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Performance</div>
              <DetailRow label="Monthly Revenue" value={`$${(selected.monthlyRevenue / 1000).toFixed(0)}k`} />
              <DetailRow label="NPS Score" value={selected.nps} good={selected.nps >= 70} bad={selected.nps < 60} />
              <DetailRow label="Churn Rate" value={`${selected.churn}%`} good={selected.churn <= 2} bad={selected.churn > 4} />
              <DetailRow label="Observation Rate" value={`${selected.observationRate}/wk`} />
              <DetailRow label="Lead Conversion" value={`${selected.conversionRate}%`} good={selected.conversionRate >= 30} />
            </div>
            {selected.status === 'at_risk' && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <div className="text-[10px] font-bold text-red-700 flex items-center gap-1"><AlertTriangle size={10} /> Action Required</div>
                <div className="text-[10px] text-red-600 mt-1">High churn and below-target NPS. Schedule performance review.</div>
              </div>
            )}
            {selected.status === 'watch' && (
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <div className="text-[10px] font-bold text-amber-700 flex items-center gap-1"><Eye size={10} /> Monitoring</div>
                <div className="text-[10px] text-amber-600 mt-1">Metrics trending down. Review at next monthly check-in.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function DetailRow({ label, value, good, bad }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className={`font-medium ${good ? 'text-emerald-600' : bad ? 'text-red-600' : 'text-slate-700'}`}>{value}</span>
    </div>
  )
}
