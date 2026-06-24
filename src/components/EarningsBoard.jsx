import { Trophy, Flame, Eye, DollarSign, TrendingUp, Star } from 'lucide-react'
import { people, brands, earningsData, pipelineStats } from '../data/mockData'

export function EarningsBoard() {
  const totalBounty = earningsData.reduce((s, e) => s + e.bounties, 0)
  const totalObs = earningsData.reduce((s, e) => s + e.observations, 0)
  const totalConv = earningsData.reduce((s, e) => s + e.conversions, 0)

  return (
    <div className="h-full flex flex-col gap-5 overflow-auto">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white">
          <DollarSign size={20} className="opacity-60 mb-2" />
          <div className="text-2xl font-black">${totalBounty}</div>
          <div className="text-[11px] opacity-80 mt-1">Bounties this month</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
          <Eye size={20} className="opacity-60 mb-2" />
          <div className="text-2xl font-black">{totalObs}</div>
          <div className="text-[11px] opacity-80 mt-1">Observations made</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white">
          <TrendingUp size={20} className="opacity-60 mb-2" />
          <div className="text-2xl font-black">{Math.round(totalConv / totalObs * 100)}%</div>
          <div className="text-[11px] opacity-80 mt-1">Team conversion rate</div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 flex-1">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">Worker Leaderboard</h3>
          </div>
          <span className="text-[11px] text-slate-400">June 2026</span>
        </div>

        <div className="space-y-3">
          {earningsData.map((entry, i) => {
            const worker = people.find(p => p.id === entry.workerId)
            const brand = brands.find(b => b.id === worker.brandId)
            const isTop3 = i < 3
            const medalColors = ['from-amber-300 to-amber-500', 'from-slate-300 to-slate-400', 'from-orange-300 to-orange-500']

            return (
              <div key={entry.workerId} className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                isTop3 ? 'bg-gradient-to-r from-slate-50 to-white border border-slate-100' : 'hover:bg-slate-50'
              }`}>
                {/* Rank */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-black ${
                  isTop3 ? `bg-gradient-to-br ${medalColors[i]} text-white shadow-sm` : 'bg-slate-100 text-slate-500'
                }`}>
                  {entry.rank}
                </div>

                {/* Worker photo + info */}
                <img src={worker.photo} alt={worker.name} className="w-10 h-10 rounded-xl object-cover shadow-sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[13px] text-slate-900">{worker.name}</span>
                    {entry.streak > 0 && (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-orange-500">
                        <Flame size={10} /> {entry.streak}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    <span style={{ color: brand.color }}>{brand.icon} {brand.service}</span>
                    <span className="text-slate-300 mx-1">•</span>
                    <Star size={10} className="inline text-amber-400 fill-amber-400" /> {worker.rating}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-5 text-center shrink-0">
                  <div>
                    <div className="text-[14px] font-bold text-slate-900">{entry.observations}</div>
                    <div className="text-[9px] text-slate-400 font-medium">SPOTS</div>
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-emerald-600">{entry.conversions}</div>
                    <div className="text-[9px] text-slate-400 font-medium">CONVERTS</div>
                  </div>
                  <div className="w-20 text-right">
                    <div className="text-[14px] font-black text-emerald-600">${entry.bounties}</div>
                    <div className="text-[9px] text-slate-400 font-medium">EARNED</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Incentive structure */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Bounty Structure</h3>
        <div className="grid grid-cols-5 gap-2">
          {brands.map(brand => (
            <div key={brand.id} className="text-center p-3 rounded-xl border border-slate-100">
              <span className="text-lg">{brand.icon}</span>
              <div className="text-[10px] font-semibold text-slate-700 mt-1">{brand.service}</div>
              <div className="text-[12px] font-black text-emerald-600 mt-0.5">
                ${brand.id === 'deck' ? '150' : brand.id === 'handyman' ? '80' : brand.id === 'junk' ? '40' : brand.id === 'lawn' ? '60' : '50'}
              </div>
              <div className="text-[9px] text-slate-400">per convert</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
