import { TrendingUp, Building2, Users, MapPin, DollarSign, ArrowUpRight, BarChart3 } from 'lucide-react'
import { brands, franchisees, acceleratorFund, territories } from '../../data/mockData'

export function PlatformAnalytics() {
  const totalRevenue = franchisees.reduce((s, f) => s + f.monthlyRevenue, 0)
  const totalWorkers = franchisees.reduce((s, f) => s + f.workers, 0)
  const totalUnits = franchisees.reduce((s, f) => s + f.units, 0)
  const avgNPS = Math.round(franchisees.reduce((s, f) => s + f.nps, 0) / franchisees.length)
  const avgChurn = (franchisees.reduce((s, f) => s + f.churn, 0) / franchisees.length).toFixed(1)
  const healthyCount = franchisees.filter(f => f.status === 'healthy').length
  const atRiskCount = franchisees.filter(f => f.status === 'at_risk' || f.status === 'watch').length

  const brandRollup = brands.map(b => {
    const bFranchisees = franchisees.filter(f => f.brandId === b.id)
    return {
      ...b,
      franchiseeCount: bFranchisees.length,
      totalRevenue: bFranchisees.reduce((s, f) => s + f.monthlyRevenue, 0),
      totalWorkers: bFranchisees.reduce((s, f) => s + f.workers, 0),
      totalUnits: bFranchisees.reduce((s, f) => s + f.units, 0),
      avgNPS: bFranchisees.length ? Math.round(bFranchisees.reduce((s, f) => s + f.nps, 0) / bFranchisees.length) : 0,
    }
  })

  const activeCities = [...new Set(franchisees.map(f => f.territory))].length
  const yearlyProjectedRevenue = totalRevenue * 12
  const platformEBITDA = Math.round(yearlyProjectedRevenue * 0.22)

  return (
    <div className="h-full flex flex-col gap-5 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 size={20} className="text-truenorth-500" />
            Platform Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">HoldCo roll-up &bull; All brands, all cities</p>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-100">{franchisees.length} franchisees</span>
          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg border border-blue-100">{activeCities} cities</span>
          <span className="px-2.5 py-1 bg-violet-50 text-violet-700 font-bold rounded-lg border border-violet-100">{brands.length} brands</span>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-5 gap-3">
        <KPICard label="Monthly Revenue" value={`$${(totalRevenue / 1000).toFixed(0)}k`} sub="All franchisees" color="emerald" icon={DollarSign} trend="+12% MoM" />
        <KPICard label="Projected Annual" value={`$${(yearlyProjectedRevenue / 1000000).toFixed(1)}M`} sub="Run-rate" color="blue" icon={TrendingUp} trend="+18% YoY" />
        <KPICard label="Platform EBITDA" value={`$${(platformEBITDA / 1000).toFixed(0)}k`} sub="22% margin" color="violet" icon={BarChart3} trend="Target: $31.2M Y5" />
        <KPICard label="Total Workers" value={totalWorkers} sub={`${totalUnits} units`} color="amber" icon={Users} trend={`${healthyCount} healthy`} />
        <KPICard label="Avg NPS" value={avgNPS} sub={`${avgChurn}% churn`} color="slate" icon={ArrowUpRight} trend={`${atRiskCount} at-risk`} />
      </div>

      {/* Brand roll-up table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Building2 size={14} className="text-truenorth-500" />
          Brand Roll-Up
        </h3>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-[10px] text-slate-400 uppercase border-b border-slate-100">
              <th className="text-left py-2 font-semibold">Brand</th>
              <th className="text-right py-2 font-semibold">Franchisees</th>
              <th className="text-right py-2 font-semibold">Units</th>
              <th className="text-right py-2 font-semibold">Workers</th>
              <th className="text-right py-2 font-semibold">Monthly Rev</th>
              <th className="text-right py-2 font-semibold">Avg NPS</th>
              <th className="text-right py-2 font-semibold">Rev Share</th>
            </tr>
          </thead>
          <tbody>
            {brandRollup.map(b => (
              <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: b.color }} />
                    <span className="font-semibold text-slate-800">{b.name}</span>
                  </div>
                </td>
                <td className="text-right font-medium text-slate-700">{b.franchiseeCount}</td>
                <td className="text-right font-medium text-slate-700">{b.totalUnits}</td>
                <td className="text-right font-medium text-slate-700">{b.totalWorkers}</td>
                <td className="text-right font-bold text-emerald-600">${(b.totalRevenue / 1000).toFixed(0)}k</td>
                <td className="text-right">
                  <span className={`font-bold ${b.avgNPS >= 70 ? 'text-emerald-600' : b.avgNPS >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{b.avgNPS}</span>
                </td>
                <td className="text-right text-slate-500">{totalRevenue ? Math.round(b.totalRevenue / totalRevenue * 100) : 0}%</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-200">
              <td className="py-2.5 font-bold text-slate-900">Total</td>
              <td className="text-right font-bold text-slate-900">{franchisees.length}</td>
              <td className="text-right font-bold text-slate-900">{totalUnits}</td>
              <td className="text-right font-bold text-slate-900">{totalWorkers}</td>
              <td className="text-right font-black text-emerald-700">${(totalRevenue / 1000).toFixed(0)}k</td>
              <td className="text-right font-bold text-slate-900">{avgNPS}</td>
              <td className="text-right font-bold text-slate-900">100%</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* City breakdown */}
      <div className="grid grid-cols-3 gap-4">
        {territories.map(t => {
          const cityFranchisees = franchisees.filter(f => f.territory === t.id)
          const cityRevenue = cityFranchisees.reduce((s, f) => s + f.monthlyRevenue, 0)
          const cityWorkers = cityFranchisees.reduce((s, f) => s + f.workers, 0)
          const cityBrands = [...new Set(cityFranchisees.map(f => f.brandId))]
          return (
            <div key={t.id} className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} className="text-truenorth-500" />
                <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Franchisees</span>
                  <span className="font-bold text-slate-700">{cityFranchisees.length}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Monthly Revenue</span>
                  <span className="font-bold text-emerald-600">${(cityRevenue / 1000).toFixed(0)}k</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Workers</span>
                  <span className="font-bold text-slate-700">{cityWorkers}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Brands active</span>
                  <div className="flex gap-1">
                    {cityBrands.map(bId => {
                      const b = brands.find(x => x.id === bId)
                      return <div key={bId} className="w-3 h-3 rounded-full" style={{ background: b?.color }} title={b?.name} />
                    })}
                  </div>
                </div>
              </div>
              {cityFranchisees.length === 0 && (
                <div className="mt-3 text-[10px] text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded">Not yet launched</div>
              )}
            </div>
          )
        })}
      </div>

      {/* Accelerator snapshot */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Growth Accelerator Fund Snapshot</h3>
        <div className="grid grid-cols-4 gap-4">
          <MiniStat label="Total Capital" value={`$${(acceleratorFund.totalCapital / 1000000).toFixed(1)}M`} />
          <MiniStat label="Deployed" value={`$${(acceleratorFund.deployed / 1000000).toFixed(2)}M`} sub={`${Math.round(acceleratorFund.deployed / acceleratorFund.totalCapital * 100)}%`} />
          <MiniStat label="Territories Filled" value={`${acceleratorFund.territoriesFilled}/${acceleratorFund.territoriesTarget}`} />
          <MiniStat label="Repayment Rate" value={`${acceleratorFund.repaymentRate}%`} />
        </div>
      </div>
    </div>
  )
}

function KPICard({ label, value, sub, color, icon: Icon, trend }) {
  const colors = {
    emerald: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
    violet: 'from-violet-500 to-violet-600',
    amber: 'from-amber-500 to-amber-600',
    slate: 'from-slate-500 to-slate-600',
  }
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center`}>
          <Icon size={14} className="text-white" />
        </div>
        {trend && <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">{trend}</span>}
      </div>
      <div className="text-xl font-black text-slate-900">{value}</div>
      <div className="text-[10px] text-slate-400 font-medium mt-0.5">{sub}</div>
      <div className="text-[10px] text-slate-500 mt-1">{label}</div>
    </div>
  )
}

function MiniStat({ label, value, sub }) {
  return (
    <div className="text-center">
      <div className="text-lg font-black text-slate-900">{value}</div>
      {sub && <div className="text-[10px] text-emerald-600 font-semibold">{sub}</div>}
      <div className="text-[10px] text-slate-400 mt-0.5">{label}</div>
    </div>
  )
}
