import { useState } from 'react'
import { CheckCircle2, AlertTriangle, XCircle, TrendingUp, TrendingDown, Minus, BarChart3, Info } from 'lucide-react'

const scorecardCategories = [
  {
    id: 'recurring', label: 'Recurring Revenue', weight: 25, description: 'Higher recurring contract base = lower risk, higher resell multiple.',
    levels: [
      { score: 25, label: '75%+ recurring contracts', color: '#10b981' },
      { score: 20, label: '50–74% recurring', color: '#84cc16' },
      { score: 15, label: '25–49% recurring', color: '#f59e0b' },
      { score: 8, label: 'Under 25% recurring', color: '#ef4444' },
    ],
  },
  {
    id: 'concentration', label: 'Customer Concentration', weight: 20, description: 'No single customer should represent >10% of revenue.',
    levels: [
      { score: 20, label: 'Top customer <5% of revenue', color: '#10b981' },
      { score: 15, label: 'Top customer 5–10%', color: '#84cc16' },
      { score: 10, label: 'Top customer 10–20%', color: '#f59e0b' },
      { score: 5, label: 'Top customer >20%', color: '#ef4444' },
    ],
  },
  {
    id: 'staff', label: 'Staff Tenure & Stability', weight: 20, description: 'Tenured staff reduce transition risk. Key person dependency is a red flag.',
    levels: [
      { score: 20, label: 'Avg tenure 3+ yrs, no key person risk', color: '#10b981' },
      { score: 15, label: 'Avg tenure 2–3 yrs, manageable risk', color: '#84cc16' },
      { score: 10, label: 'Avg tenure 1–2 yrs or key person dependency', color: '#f59e0b' },
      { score: 5, label: 'High turnover or owner-dependent', color: '#ef4444' },
    ],
  },
  {
    id: 'books', label: 'Book Quality', weight: 15, description: 'Clean books signal professionalism and accelerate due diligence.',
    levels: [
      { score: 15, label: 'Professionally prepared, 3+ yrs history', color: '#10b981' },
      { score: 11, label: 'Accountant-reviewed, 2+ yrs', color: '#84cc16' },
      { score: 7, label: 'Owner-prepared, some gaps', color: '#f59e0b' },
      { score: 3, label: 'Incomplete or unreliable', color: '#ef4444' },
    ],
  },
  {
    id: 'growth', label: 'Growth Trajectory', weight: 10, description: 'Revenue trend over trailing 3 years. Declining businesses require more stabilization.',
    levels: [
      { score: 10, label: 'Growing 10%+ annually', color: '#10b981' },
      { score: 7, label: 'Stable (±5%)', color: '#84cc16' },
      { score: 4, label: 'Declining 5–15%', color: '#f59e0b' },
      { score: 2, label: 'Declining >15%', color: '#ef4444' },
    ],
  },
  {
    id: 'territory', label: 'Territory Fit', weight: 10, description: 'How well the business fits within the hub geography and network density strategy.',
    levels: [
      { score: 10, label: 'Core hub geography, fills gap', color: '#10b981' },
      { score: 7, label: 'Adjacent to hub, moderate fit', color: '#84cc16' },
      { score: 4, label: 'Peripheral, limited synergy', color: '#f59e0b' },
      { score: 2, label: 'Outside hub, no network benefit', color: '#ef4444' },
    ],
  },
]

const sampleDeals = [
  { name: 'Sparkle Home Cleaning', scores: { recurring: 25, concentration: 15, staff: 20, books: 15, growth: 7, territory: 10 } },
  { name: 'GreenThumb Yard Care', scores: { recurring: 20, concentration: 20, staff: 15, books: 11, growth: 10, territory: 10 } },
  { name: 'Lakeshore Maids', scores: { recurring: 15, concentration: 15, staff: 15, books: 11, growth: 7, territory: 7 } },
  { name: 'CleanRight Pro', scores: { recurring: 20, concentration: 20, staff: 15, books: 15, growth: 4, territory: 7 } },
  { name: 'Northern Lawns & Gardens', scores: { recurring: 15, concentration: 10, staff: 10, books: 7, growth: 4, territory: 4 } },
]

export function DealScorecard() {
  const [selectedDeal, setSelectedDeal] = useState(sampleDeals[0])

  const totalScore = Object.values(selectedDeal.scores).reduce((s, v) => s + v, 0)
  const maxScore = scorecardCategories.reduce((s, c) => s + c.weight, 0)
  const pct = Math.round((totalScore / maxScore) * 100)

  const getGrade = (pct) => {
    if (pct >= 85) return { label: 'A — Excellent', color: '#10b981', desc: 'Premium valuation. Cash at close 30–35%.' }
    if (pct >= 70) return { label: 'B — Strong', color: '#3b82f6', desc: 'Standard terms. Cash at close 25–30%.' }
    if (pct >= 55) return { label: 'C — Acceptable', color: '#f59e0b', desc: 'Requires stabilization focus. Cash at close 20–25%.' }
    return { label: 'D — Risky', color: '#ef4444', desc: 'Below threshold. Reconsider or renegotiate heavily.' }
  }

  const grade = getGrade(pct)

  const getCashAtClose = (pct) => {
    if (pct >= 85) return '30–35%'
    if (pct >= 70) return '25–30%'
    if (pct >= 55) return '20–25%'
    return '15–20%'
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">Deal Quality Scorecard</h2>
          <p className="text-xs text-slate-400 mt-0.5">Objective, scorecard-driven assessment. Sellers compare notes — the framework must hold up.</p>
        </div>
      </div>

      {/* Deal selector */}
      <div className="flex gap-2 mb-5">
        {sampleDeals.map(deal => {
          const score = Object.values(deal.scores).reduce((s, v) => s + v, 0)
          const g = getGrade(Math.round((score / maxScore) * 100))
          return (
            <button
              key={deal.name}
              onClick={() => setSelectedDeal(deal)}
              className={`flex-1 p-3 rounded-xl border text-left transition-all ${
                selectedDeal.name === deal.name ? 'border-truenorth-400 bg-truenorth-50 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-slate-800 truncate">{deal.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-black" style={{ color: g.color }}>{score}</span>
                <span className="text-[10px] text-slate-400">/{maxScore}</span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex-1 flex gap-5 overflow-auto">
        {/* Scorecard breakdown */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 p-5 overflow-auto">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-slate-800">{selectedDeal.name}</h3>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-black" style={{ color: grade.color }}>{totalScore}<span className="text-sm text-slate-400">/{maxScore}</span></div>
                <div className="text-[10px] font-bold" style={{ color: grade.color }}>{grade.label}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {scorecardCategories.map(cat => {
              const score = selectedDeal.scores[cat.id]
              const level = cat.levels.find(l => l.score === score) || cat.levels[cat.levels.length - 1]
              const barPct = (score / cat.weight) * 100
              return (
                <div key={cat.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700">{cat.label}</span>
                      <span className="text-[9px] text-slate-400">({cat.weight} pts max)</span>
                    </div>
                    <span className="text-sm font-black" style={{ color: level.color }}>{score}<span className="text-[10px] text-slate-400">/{cat.weight}</span></span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-1">
                    <div className="h-full rounded-full transition-all" style={{ width: `${barPct}%`, background: level.color }} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {barPct >= 75 ? <CheckCircle2 size={10} className="text-emerald-500" /> :
                     barPct >= 50 ? <Minus size={10} className="text-amber-500" /> :
                     <AlertTriangle size={10} className="text-red-500" />}
                    <span className="text-[10px] text-slate-500">{level.label}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary panel */}
        <div className="w-72 shrink-0 space-y-4">
          {/* Grade card */}
          <div className="rounded-2xl border-2 p-5 text-center" style={{ borderColor: grade.color, background: grade.color + '08' }}>
            <div className="text-4xl font-black" style={{ color: grade.color }}>{grade.label.split(' — ')[0]}</div>
            <div className="text-sm font-bold mt-1" style={{ color: grade.color }}>{grade.label.split(' — ')[1]}</div>
            <div className="text-xs text-slate-500 mt-2">{grade.desc}</div>
          </div>

          {/* Deal terms implication */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Implied Deal Terms</div>
            <TermRow label="Cash at Close" value={getCashAtClose(pct)} />
            <TermRow label="VTB Note" value="30–35%" />
            <TermRow label="LP Rollover" value="10–15%" />
            <TermRow label="Target Close" value="45–60 days" />
          </div>

          {/* Multiplier impact */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Multiple Impact</div>
            <div className="text-xs text-slate-500 space-y-1.5">
              <div className="flex items-center gap-2"><TrendingUp size={12} className="text-emerald-500" /> <span>Recurring contracts push multiple up</span></div>
              <div className="flex items-center gap-2"><TrendingUp size={12} className="text-emerald-500" /> <span>Low concentration = lower risk premium</span></div>
              <div className="flex items-center gap-2"><TrendingUp size={12} className="text-emerald-500" /> <span>Tenured staff = smooth transition</span></div>
              <div className="flex items-center gap-2"><TrendingDown size={12} className="text-red-500" /> <span>Owner-dependent ops = discount</span></div>
              <div className="flex items-center gap-2"><TrendingDown size={12} className="text-red-500" /> <span>Declining revenue = lower buy price</span></div>
            </div>
          </div>

          {/* Scoring guide */}
          <div className="bg-slate-50 rounded-xl border border-slate-100 p-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase mb-2"><Info size={10} /> Scoring Guide</div>
            <div className="space-y-1 text-[10px]">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500" /> <span className="text-slate-600">85–100: A — Premium</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500" /> <span className="text-slate-600">70–84: B — Strong</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500" /> <span className="text-slate-600">55–69: C — Acceptable</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500" /> <span className="text-slate-600">Below 55: D — Risky</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TermRow({ label, value }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-slate-400">{label}</span>
      <span className="font-bold text-slate-800">{value}</span>
    </div>
  )
}
