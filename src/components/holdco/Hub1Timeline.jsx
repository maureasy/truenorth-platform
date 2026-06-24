import { useState } from 'react'
import { CheckCircle2, Circle, Clock, Building2, Users, Wrench, BarChart3, Rocket, Handshake, GitBranch, Target, Megaphone, FileText, Shield } from 'lucide-react'

const phases = [
  {
    id: 'foundation', label: 'Foundation', months: '1–6', color: '#6366f1', bg: '#eef2ff',
    status: 'complete',
    milestones: [
      { text: 'Form True North GP entity and BridgeCo', done: true },
      { text: 'Establish banking relationship (BDC + chartered bank)', done: true },
      { text: 'Hire SWAT team lead + OS developer', done: true },
      { text: 'Begin deal sourcing in hub city (cleaning + lawn targets)', done: true },
      { text: 'Sign first wave of Tier 1 trade partners — zero cost, pay-per-converted-lead', done: true },
      { text: 'Pre-qualify first cohort of operator candidates', done: true },
    ],
    kpis: [
      { label: 'Tier 1 Partners Signed', value: '8', target: '6–10' },
      { label: 'Operator Bench', value: '3', target: '6–10' },
      { label: 'Deals Sourced', value: '5', target: '3–5' },
      { label: 'BDC Facility', value: '$750K', target: '$500K–1M' },
    ],
  },
  {
    id: 'hub1-live', label: 'Hub 1 Live', months: '6–12', color: '#0891b2', bg: '#ecfeff',
    status: 'active',
    milestones: [
      { text: 'Close first 2–3 acquisitions (cleaning + lawn)', done: true },
      { text: 'Install operators on work-to-own terms', done: true },
      { text: 'Deploy SWAT team for 60–90 day implementation per acquisition', done: true },
      { text: 'Launch True North OS: scheduling, I Spotted, CRM, lead routing', done: true },
      { text: 'Begin live lead generation — route to Tier 1 trade partners', done: false },
      { text: 'Track conversion rates by trade category to inform next acquisition', done: false },
    ],
    kpis: [
      { label: 'Acquisitions Closed', value: '3', target: '2–3' },
      { label: 'Operators Deployed', value: '2', target: '2–3' },
      { label: 'SWAT Deployments', value: '3', target: '2–3' },
      { label: 'Leads Routed', value: '340', target: '200+' },
    ],
  },
  {
    id: 'prove-upgrade', label: 'Prove + Upgrade', months: '12–18', color: '#d97706', bg: '#fffbeb',
    status: 'upcoming',
    milestones: [
      { text: 'Measure cross-trade conversion rates — data reveals next acquisition category', done: false },
      { text: 'Upgrade highest-performing Tier 1 partners to Tier 2 via ROFR', done: false },
      { text: 'Refine deal scorecard from live acquisition and conversion data', done: false },
      { text: 'Build franchise operations manual from lived experience', done: false },
      { text: 'Recruit hub 2 + hub 3 franchisee candidates', done: false },
      { text: 'Begin community infrastructure (events, group buying)', done: false },
    ],
    kpis: [
      { label: 'Tier 2 Upgrades', value: '—', target: '2–4' },
      { label: 'Franchise Manual', value: '—', target: 'v1.0' },
      { label: 'Hub 2/3 Candidates', value: '—', target: '3–5' },
      { label: 'Trade Acq. Target', value: '—', target: 'Data-driven' },
    ],
  },
  {
    id: 'franchise-launch', label: 'Franchise Launch', months: '18–24', color: '#16a34a', bg: '#f0fdf4',
    status: 'upcoming',
    milestones: [
      { text: 'Launch hub 2 + hub 3 simultaneously', done: false },
      { text: 'Sell hub franchise rights: territory fee + OS + seeded Tier 1 network', done: false },
      { text: 'True North retains BridgeCo rights centrally or licenses to hub GP', done: false },
      { text: 'Refine capital model based on hub 1 IRR and lead routing data', done: false },
      { text: 'Begin building national operator and trade partner community', done: false },
    ],
    kpis: [
      { label: 'Hubs Launched', value: '—', target: '2–3' },
      { label: 'Franchise Fee Rev', value: '—', target: '$200K+' },
      { label: 'Hub 1 IRR', value: '—', target: '35%+' },
      { label: 'National Partners', value: '—', target: '20+' },
    ],
  },
]

export function Hub1Timeline() {
  const [expandedPhase, setExpandedPhase] = useState('hub1-live')

  const totalMilestones = phases.reduce((s, p) => s + p.milestones.length, 0)
  const completedMilestones = phases.reduce((s, p) => s + p.milestones.filter(m => m.done).length, 0)
  const overallProgress = Math.round((completedMilestones / totalMilestones) * 100)

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">Hub 1 Build-Out Timeline</h2>
          <p className="text-xs text-slate-400 mt-0.5">24-month sequencing plan — Foundation → Live → Prove → Franchise Launch</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-lg font-black text-slate-900">{overallProgress}%</div>
            <div className="text-[10px] text-slate-400">{completedMilestones}/{totalMilestones} milestones</div>
          </div>
          <div className="w-20 h-20 relative">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="#6366f1" strokeWidth="3"
                strokeDasharray={`${overallProgress * 0.942} 100`} strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Phase progress bar */}
      <div className="flex gap-1 mb-5 h-2 rounded-full overflow-hidden bg-slate-100">
        {phases.map(phase => {
          const phasePct = phase.milestones.filter(m => m.done).length / phase.milestones.length
          return (
            <div key={phase.id} className="flex-1 relative rounded-full overflow-hidden" style={{ background: phase.bg }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${phasePct * 100}%`, background: phase.color }} />
            </div>
          )
        })}
      </div>

      {/* Phase labels */}
      <div className="flex gap-1 mb-5">
        {phases.map(phase => {
          const isExpanded = expandedPhase === phase.id
          const donePct = Math.round((phase.milestones.filter(m => m.done).length / phase.milestones.length) * 100)
          return (
            <button
              key={phase.id}
              onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
              className={`flex-1 p-3 rounded-xl border transition-all text-left ${
                isExpanded ? 'border-2 shadow-sm' : 'border hover:shadow-sm'
              }`}
              style={{
                borderColor: isExpanded ? phase.color : '#e2e8f0',
                background: isExpanded ? phase.bg : 'white',
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {phase.status === 'complete' ? <CheckCircle2 size={12} style={{ color: phase.color }} /> :
                 phase.status === 'active' ? <Clock size={12} style={{ color: phase.color }} /> :
                 <Circle size={12} className="text-slate-300" />}
                <span className="text-[10px] font-bold uppercase" style={{ color: phase.status !== 'upcoming' ? phase.color : '#94a3b8' }}>{phase.label}</span>
              </div>
              <div className="text-xs font-semibold text-slate-600">Months {phase.months}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{donePct}% complete</div>
            </button>
          )
        })}
      </div>

      {/* Expanded phase detail */}
      <div className="flex-1 overflow-auto">
        {phases.filter(p => expandedPhase === p.id).map(phase => (
          <div key={phase.id} className="flex gap-5">
            {/* Milestones */}
            <div className="flex-1 bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ background: phase.color }} />
                <h3 className="text-sm font-bold text-slate-800">{phase.label} — Months {phase.months}</h3>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ml-auto ${
                  phase.status === 'complete' ? 'bg-emerald-100 text-emerald-700' :
                  phase.status === 'active' ? 'bg-blue-100 text-blue-700' :
                  'bg-slate-100 text-slate-500'
                }`}>{phase.status === 'complete' ? 'COMPLETE' : phase.status === 'active' ? 'IN PROGRESS' : 'UPCOMING'}</span>
              </div>
              <div className="space-y-2.5">
                {phase.milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {m.done
                        ? <CheckCircle2 size={16} className="text-emerald-500" />
                        : <Circle size={16} className="text-slate-200" />}
                    </div>
                    <span className={`text-sm leading-relaxed ${m.done ? 'text-slate-700' : 'text-slate-400'}`}>{m.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div className="w-64 shrink-0 space-y-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Phase KPIs</div>
              {phase.kpis.map((kpi, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-100 p-3">
                  <div className="text-[10px] text-slate-400 font-medium">{kpi.label}</div>
                  <div className="flex items-end justify-between mt-1">
                    <span className={`text-lg font-black ${kpi.value !== '—' ? 'text-slate-900' : 'text-slate-300'}`}>{kpi.value}</span>
                    <span className="text-[10px] text-slate-400">Target: {kpi.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {!expandedPhase && (
          <div className="h-full flex items-center justify-center text-sm text-slate-400">
            Click a phase above to view milestones and KPIs
          </div>
        )}
      </div>
    </div>
  )
}
