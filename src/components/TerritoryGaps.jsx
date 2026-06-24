import { Crosshair, TrendingUp, DollarSign, Users, MapPin, AlertTriangle } from 'lucide-react'
import { brands, postalCoverage, acceleratorFund } from '../data/mockData'

export function TerritoryGaps() {
  const gtaCodes = postalCoverage.filter(p => p.city === 'gta')
  const calCodes = postalCoverage.filter(p => p.city === 'cal')

  // Gap analysis by brand
  const brandGaps = brands.map(b => {
    const gtaMissing = gtaCodes.filter(pc => pc.gap.includes(b.id))
    const calMissing = calCodes.filter(pc => pc.gap.includes(b.id))
    return { brand: b, gtaMissing: gtaMissing.length, calMissing: calMissing.length, total: gtaMissing.length + calMissing.length }
  }).sort((a, b) => b.total - a.total)

  const deployed = acceleratorFund.deployed
  const total = acceleratorFund.totalCapital
  const pctDeployed = Math.round((deployed / total) * 100)

  return (
    <div className="h-full flex flex-col gap-5 overflow-auto">
      {/* Accelerator Fund Summary */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-truenorth-900 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[16px] font-bold">Growth Accelerator Fund</h2>
            <p className="text-[12px] text-slate-300 mt-0.5">Internal capital pool for territory infill</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black">${(deployed / 1000000).toFixed(2)}M</div>
            <div className="text-[11px] text-slate-300">of ${(total / 1000000).toFixed(1)}M deployed</div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-truenorth-400 to-emerald-400 rounded-full transition-all" style={{ width: `${pctDeployed}%` }} />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-slate-400">
          <span>{pctDeployed}% deployed</span>
          <span>${((total - deployed) / 1000).toFixed(0)}k remaining</span>
        </div>

        {/* Fund stats */}
        <div className="grid grid-cols-5 gap-3 mt-5">
          <FundStat label="Active Loans" value={acceleratorFund.activeLoans} />
          <FundStat label="Work-to-Own" value={acceleratorFund.workToOwn} />
          <FundStat label="Lender-Backed" value={acceleratorFund.lenderBacked} />
          <FundStat label="Avg Loan Size" value={`$${(acceleratorFund.avgLoanSize / 1000).toFixed(0)}k`} />
          <FundStat label="Repayment" value={`${acceleratorFund.repaymentRate}%`} />
        </div>
      </div>

      {/* Territory fill progress */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Crosshair size={16} className="text-truenorth-500" />
            <h3 className="text-sm font-bold text-slate-900">Territory Fill Rate</h3>
          </div>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-black text-slate-900">{acceleratorFund.territoriesFilled}</div>
            <div className="text-slate-400 text-lg font-medium pb-0.5">/ {acceleratorFund.territoriesTarget}</div>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-truenorth-500 rounded-full" style={{ width: `${(acceleratorFund.territoriesFilled / acceleratorFund.territoriesTarget) * 100}%` }} />
          </div>
          <div className="text-[11px] text-slate-400 mt-2">{acceleratorFund.territoriesTarget - acceleratorFund.territoriesFilled} territories need franchisees</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">Biggest Service Gaps</h3>
          </div>
          <div className="space-y-2.5">
            {brandGaps.slice(0, 4).map(({ brand, total }) => (
              <div key={brand.id} className="flex items-center gap-3">
                <span className="text-lg">{brand.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-slate-700">{brand.service}</span>
                    <span className="text-[11px] text-red-500 font-bold">{total} zones</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: `${(total / 12) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed postal code gaps table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 flex-1 overflow-auto">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <MapPin size={14} className="text-truenorth-500" />
          Underserved Postal Codes — Franchise Recruitment Targets
        </h3>
        <div className="space-y-2">
          {postalCoverage.filter(pc => pc.gap.length >= 2).sort((a, b) => b.gap.length - a.gap.length).map(pc => (
            <div key={pc.code} className="flex items-center gap-4 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-12 text-center">
                <div className="text-[14px] font-black text-slate-900">{pc.code}</div>
                <div className="text-[9px] text-slate-400 uppercase">{pc.city === 'gta' ? 'Toronto' : 'Calgary'}</div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[10px] text-slate-400 font-medium w-16">Has:</span>
                  {pc.services.map(sId => {
                    const brand = brands.find(b => b.id === sId)
                    return <span key={sId} className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">{brand.icon} {brand.service}</span>
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate-400 font-medium w-16">Needs:</span>
                  {pc.gap.map(sId => {
                    const brand = brands.find(b => b.id === sId)
                    return <span key={sId} className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-600 font-medium border border-red-100">{brand.icon} {brand.service}</span>
                  })}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[13px] font-bold text-slate-900">{pc.activeHomes}</div>
                <div className="text-[9px] text-slate-400">homes</div>
              </div>
              <button className="px-3 py-1.5 bg-truenorth-500 text-white text-[10px] font-bold rounded-lg hover:bg-truenorth-600 transition-colors shrink-0">
                Recruit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FundStat({ label, value }) {
  return (
    <div className="text-center">
      <div className="text-[16px] font-bold text-white">{value}</div>
      <div className="text-[9px] text-slate-400 mt-0.5">{label}</div>
    </div>
  )
}
