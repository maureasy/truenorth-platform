import { useState } from 'react'
import { Building2, Search, User, Clock, TrendingUp, DollarSign, Users, Wrench, CheckCircle2, AlertTriangle, ArrowRight, Timer, Shield, BarChart3, Calendar } from 'lucide-react'

const stages = [
  { id: 'sourcing', label: 'Sourcing', color: '#6366f1', bg: '#eef2ff' },
  { id: 'diligence', label: 'Due Diligence', color: '#0891b2', bg: '#ecfeff' },
  { id: 'acquired', label: 'Acquired', color: '#d97706', bg: '#fffbeb' },
  { id: 'stabilizing', label: 'Stabilizing', color: '#ea580c', bg: '#fff7ed' },
  { id: 'reselling', label: 'Reselling', color: '#16a34a', bg: '#f0fdf4' },
  { id: 'completed', label: 'Completed', color: '#64748b', bg: '#f8fafc' },
]

const deals = [
  {
    id: 'd-1', name: 'Sparkle Home Cleaning', category: 'Cleaning', city: 'Barrie, ON',
    stage: 'completed', ownerName: 'Margaret Haines', ownerAge: 68,
    ebitda: 310000, buyMultiple: 2.8, resellMultiple: 5.0,
    acquiredDate: '2025-03-15', completedDate: '2026-02-01',
    operator: { name: 'David Park', equity: 100, status: 'Owner' },
    swat: { status: 'complete', daysDeployed: 72 },
    cashAtClose: 30, vtb: 35, lpRollover: 10,
    notes: 'First deal — template for all subsequent acquisitions',
  },
  {
    id: 'd-2', name: 'GreenThumb Yard Care', category: 'Lawn & Snow', city: 'Barrie, ON',
    stage: 'reselling', ownerName: 'Robert Fenton', ownerAge: 71,
    ebitda: 280000, buyMultiple: 3.2, resellMultiple: 5.2,
    acquiredDate: '2025-06-01', completedDate: null,
    operator: { name: 'Priya Sharma', equity: 62, status: 'Buying up' },
    swat: { status: 'complete', daysDeployed: 65 },
    cashAtClose: 28, vtb: 32, lpRollover: 12,
    notes: 'Seasonal business — strong summer, snow contracts stabilize winter',
  },
  {
    id: 'd-3', name: 'Lakeshore Maids', category: 'Cleaning', city: 'Orillia, ON',
    stage: 'stabilizing', ownerName: 'Joan Whitfield', ownerAge: 64,
    ebitda: 220000, buyMultiple: 2.5, resellMultiple: 4.8,
    acquiredDate: '2026-01-10', completedDate: null,
    operator: { name: 'Amir Hassan', equity: 15, status: 'Year 1 — operating' },
    swat: { status: 'active', daysDeployed: 48, daysTotal: 90 },
    cashAtClose: 32, vtb: 33, lpRollover: 10,
    notes: 'SWAT team on-site — OS migration 80% complete. Staff retention 92%.',
  },
  {
    id: 'd-4', name: 'Simcoe Lawn Masters', category: 'Lawn & Snow', city: 'Barrie, ON',
    stage: 'acquired', ownerName: 'Dennis Crawford', ownerAge: 66,
    ebitda: 190000, buyMultiple: 3.0, resellMultiple: null,
    acquiredDate: '2026-05-20', completedDate: null,
    operator: { name: 'TBD — matching in progress', equity: 0, status: 'Unmatched' },
    swat: { status: 'scheduled', daysDeployed: 0, daysTotal: 90 },
    cashAtClose: 25, vtb: 35, lpRollover: 15,
    notes: 'Closed last month. Operator bench has 3 candidates — interviews this week.',
  },
  {
    id: 'd-5', name: 'CleanRight Pro', category: 'Cleaning', city: 'Midland, ON',
    stage: 'diligence', ownerName: 'Patricia Gomez', ownerAge: 62,
    ebitda: 260000, buyMultiple: 2.7, resellMultiple: null,
    acquiredDate: null, completedDate: null,
    operator: null,
    swat: null,
    cashAtClose: null, vtb: null, lpRollover: null,
    notes: 'Books look clean. 85% recurring customers. Staff tenured 4+ yrs avg. LOI signed.',
    diligence: { financials: true, legal: true, staff: false, customers: false, scorecard: 78 },
  },
  {
    id: 'd-6', name: 'Northern Lawns & Gardens', category: 'Lawn & Snow', city: 'Collingwood, ON',
    stage: 'sourcing', ownerName: 'Bill Mackey', ownerAge: 69,
    ebitda: 175000, buyMultiple: null, resellMultiple: null,
    acquiredDate: null, completedDate: null,
    operator: null,
    swat: null,
    cashAtClose: null, vtb: null, lpRollover: null,
    notes: 'Referral from accountant. Owner retiring end of year. Initial conversation positive.',
    sourcing: { channel: 'Accountant referral', firstContact: '2026-05-28', temperature: 'warm' },
  },
  {
    id: 'd-7', name: 'Durham Detail Cleaning', category: 'Cleaning', city: 'Oshawa, ON',
    stage: 'sourcing', ownerName: 'Vera Kowalczyk', ownerAge: 63,
    ebitda: 145000, buyMultiple: null, resellMultiple: null,
    acquiredDate: null, completedDate: null,
    operator: null,
    swat: null,
    cashAtClose: null, vtb: null, lpRollover: null,
    notes: 'Inbound — saw "A True North Partner" on competitor van. Wants to learn more.',
    sourcing: { channel: 'Inbound (tagline)', firstContact: '2026-06-12', temperature: 'hot' },
  },
]

const operatorBench = [
  { name: 'Sarah Lindstrom', background: 'Ex-regional manager, Telus', status: 'Pre-qualified', readySince: '2026-04' },
  { name: 'Jason Okafor', background: 'Ex-ops director, logistics', status: 'Pre-qualified', readySince: '2026-03' },
  { name: 'Michelle Tremblay', background: 'Ex-branch manager, TD Bank', status: 'In assessment', readySince: '—' },
]

export function BridgeCoPipeline() {
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [view, setView] = useState('kanban')

  const totalDeployed = deals.filter(d => ['acquired', 'stabilizing', 'reselling'].includes(d.stage)).reduce((s, d) => s + d.ebitda * d.buyMultiple, 0)
  const totalEbitda = deals.filter(d => ['acquired', 'stabilizing', 'reselling', 'completed'].includes(d.stage)).reduce((s, d) => s + d.ebitda, 0)
  const avgSpread = deals.filter(d => d.buyMultiple && d.resellMultiple).reduce((s, d) => s + (d.resellMultiple - d.buyMultiple), 0) / deals.filter(d => d.buyMultiple && d.resellMultiple).length

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">BridgeCo Deal Pipeline</h2>
          <p className="text-xs text-slate-400 mt-0.5">Acquire → Stabilize → Systematize → Resell. Retain platform economics forever.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            <button onClick={() => setView('kanban')} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${view === 'kanban' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}>Pipeline</button>
            <button onClick={() => setView('bench')} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${view === 'bench' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}>Operator Bench</button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-6 gap-3 mb-4">
        <Kpi label="Active Deals" value={deals.filter(d => !['completed', 'sourcing'].includes(d.stage)).length} sub="In pipeline" icon={Building2} color="#6366f1" />
        <Kpi label="Capital Deployed" value={`$${(totalDeployed / 1000000).toFixed(1)}M`} sub="BridgeCo" icon={DollarSign} color="#d97706" />
        <Kpi label="Portfolio EBITDA" value={`$${(totalEbitda / 1000).toFixed(0)}k`} sub="Annual combined" icon={TrendingUp} color="#10b981" />
        <Kpi label="Avg Spread" value={`${avgSpread.toFixed(1)}x`} sub="Buy → Resell" icon={BarChart3} color="#0891b2" />
        <Kpi label="Operator Bench" value={operatorBench.length} sub={`${operatorBench.filter(o => o.status === 'Pre-qualified').length} ready`} icon={Users} color="#7c3aed" />
        <Kpi label="SWAT Active" value={deals.filter(d => d.swat?.status === 'active').length} sub="On deployment" icon={Shield} color="#ea580c" />
      </div>

      {view === 'bench' ? (
        <OperatorBenchView />
      ) : (
        <div className="flex-1 flex gap-3 overflow-hidden">
          {/* Kanban */}
          <div className="flex-1 flex gap-2.5 overflow-x-auto pb-2">
            {stages.map(stage => {
              const stageDeals = deals.filter(d => d.stage === stage.id)
              return (
                <div key={stage.id} className="w-56 shrink-0 flex flex-col">
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: stage.color }} />
                    <span className="text-[11px] font-bold text-slate-600 uppercase">{stage.label}</span>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{stageDeals.length}</span>
                  </div>
                  <div className="flex-1 space-y-2 overflow-auto">
                    {stageDeals.map(deal => (
                      <button
                        key={deal.id}
                        onClick={() => setSelectedDeal(deal)}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                          selectedDeal?.id === deal.id ? 'bg-truenorth-50 border-truenorth-300 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-800 truncate">{deal.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{deal.category} · {deal.city}</div>
                        {deal.ebitda && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-[10px] font-bold text-emerald-600">${(deal.ebitda / 1000).toFixed(0)}k EBITDA</span>
                            {deal.buyMultiple && <span className="text-[10px] text-slate-400">{deal.buyMultiple}x</span>}
                          </div>
                        )}
                        {deal.operator && (
                          <div className="mt-2">
                            <div className="text-[10px] text-slate-400">{deal.operator.name}</div>
                            {deal.operator.equity > 0 && (
                              <div className="mt-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-truenorth-400 to-truenorth-600 transition-all" style={{ width: `${deal.operator.equity}%` }} />
                              </div>
                            )}
                          </div>
                        )}
                        {deal.swat?.status === 'active' && (
                          <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-orange-600">
                            <Shield size={10} /> SWAT Day {deal.swat.daysDeployed}/{deal.swat.daysTotal}
                          </div>
                        )}
                        {deal.sourcing && (
                          <div className="mt-2">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                              deal.sourcing.temperature === 'hot' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                            }`}>{deal.sourcing.temperature}</span>
                          </div>
                        )}
                        {deal.diligence && (
                          <div className="mt-2 flex gap-1">
                            {['financials', 'legal', 'staff', 'customers'].map(item => (
                              <span key={item} className={`w-4 h-4 rounded flex items-center justify-center text-[8px] ${deal.diligence[item] ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                {deal.diligence[item] ? '✓' : '·'}
                              </span>
                            ))}
                            <span className="text-[10px] font-bold text-slate-500 ml-1">{deal.diligence.scorecard}/100</span>
                          </div>
                        )}
                      </button>
                    ))}
                    {stageDeals.length === 0 && (
                      <div className="text-[10px] text-slate-300 text-center py-6 border border-dashed border-slate-200 rounded-xl">No deals</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Detail */}
          <div className="w-80 shrink-0 overflow-auto">
            {selectedDeal ? (
              <DealDetail deal={selectedDeal} />
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 h-full flex flex-col items-center justify-center text-center">
                <Building2 size={32} className="text-slate-300 mb-3" />
                <div className="text-sm font-semibold text-slate-400">Select a deal</div>
                <div className="text-xs text-slate-300 mt-1">View financials, operator, SWAT status</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function DealDetail({ deal }) {
  const stage = stages.find(s => s.id === deal.stage)
  const enterpriseValue = deal.buyMultiple ? deal.ebitda * deal.buyMultiple : null
  const projectedResale = deal.resellMultiple ? deal.ebitda * deal.resellMultiple : null
  const grossGain = enterpriseValue && projectedResale ? projectedResale - enterpriseValue : null

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: stage.color }} />
          <span className="text-[10px] font-bold uppercase" style={{ color: stage.color }}>{stage.label}</span>
        </div>
        <h3 className="text-base font-bold text-slate-900">{deal.name}</h3>
        <div className="text-xs text-slate-400">{deal.category} · {deal.city}</div>
      </div>

      {/* Seller */}
      <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Seller</div>
        <div className="text-sm font-semibold text-slate-800">{deal.ownerName}</div>
        <div className="text-xs text-slate-400">Age {deal.ownerAge} · Retiring</div>
      </div>

      {/* Financials */}
      {deal.ebitda && (
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Deal Economics</div>
          <div className="grid grid-cols-2 gap-2">
            <MiniStat label="EBITDA" value={`$${(deal.ebitda / 1000).toFixed(0)}k`} />
            <MiniStat label="Buy Multiple" value={deal.buyMultiple ? `${deal.buyMultiple}x` : '—'} />
            <MiniStat label="Enterprise Value" value={enterpriseValue ? `$${(enterpriseValue / 1000).toFixed(0)}k` : '—'} />
            <MiniStat label="Resell Multiple" value={deal.resellMultiple ? `${deal.resellMultiple}x` : 'TBD'} />
            {projectedResale && <MiniStat label="Projected Resale" value={`$${(projectedResale / 1000).toFixed(0)}k`} highlight />}
            {grossGain && <MiniStat label="Gross Gain" value={`$${(grossGain / 1000).toFixed(0)}k`} highlight />}
          </div>
        </div>
      )}

      {/* Deal Structure */}
      {deal.cashAtClose && (
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Deal Structure</div>
          <div className="flex gap-1 h-5 rounded-full overflow-hidden">
            <div className="flex items-center justify-center text-[8px] font-bold text-white" style={{ width: `${deal.cashAtClose}%`, background: '#10b981' }}>{deal.cashAtClose}%</div>
            <div className="flex items-center justify-center text-[8px] font-bold text-white" style={{ width: `${deal.vtb}%`, background: '#0891b2' }}>{deal.vtb}%</div>
            <div className="flex items-center justify-center text-[8px] font-bold text-white" style={{ width: `${deal.lpRollover}%`, background: '#7c3aed' }}>{deal.lpRollover}%</div>
            <div className="flex items-center justify-center text-[8px] font-bold text-white" style={{ width: `${100 - deal.cashAtClose - deal.vtb - deal.lpRollover}%`, background: '#64748b' }}></div>
          </div>
          <div className="flex gap-3 mt-1.5 text-[9px] text-slate-500">
            <span><span className="inline-block w-2 h-2 rounded-sm bg-emerald-500 mr-1" />Cash at close</span>
            <span><span className="inline-block w-2 h-2 rounded-sm bg-cyan-600 mr-1" />VTB note</span>
            <span><span className="inline-block w-2 h-2 rounded-sm bg-violet-600 mr-1" />LP rollover</span>
          </div>
        </div>
      )}

      {/* Operator */}
      {deal.operator && (
        <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
          <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1">Operator (LP → GP)</div>
          <div className="text-sm font-semibold text-slate-800">{deal.operator.name}</div>
          <div className="text-xs text-indigo-600 font-medium">{deal.operator.status}</div>
          {deal.operator.equity > 0 && (
            <div className="mt-2">
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-slate-500">Equity owned</span>
                <span className="font-bold text-indigo-700">{deal.operator.equity}%</span>
              </div>
              <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all" style={{ width: `${deal.operator.equity}%` }} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* SWAT Team */}
      {deal.swat && (
        <div className={`rounded-lg p-3 border ${
          deal.swat.status === 'active' ? 'bg-orange-50 border-orange-200' :
          deal.swat.status === 'complete' ? 'bg-emerald-50 border-emerald-200' :
          'bg-slate-50 border-slate-200'
        }`}>
          <div className="text-[10px] font-bold uppercase mb-1" style={{
            color: deal.swat.status === 'active' ? '#ea580c' : deal.swat.status === 'complete' ? '#16a34a' : '#64748b'
          }}>SWAT Implementation Team</div>
          {deal.swat.status === 'active' && (
            <>
              <div className="flex items-center gap-1.5 text-xs font-bold text-orange-700">
                <Timer size={12} /> Day {deal.swat.daysDeployed} of {deal.swat.daysTotal}
              </div>
              <div className="mt-2 h-2 bg-orange-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600" style={{ width: `${(deal.swat.daysDeployed / deal.swat.daysTotal) * 100}%` }} />
              </div>
              <div className="mt-1.5 grid grid-cols-3 gap-1 text-[9px]">
                <span className="text-center bg-white rounded px-1 py-0.5 border border-orange-100">Systems</span>
                <span className="text-center bg-white rounded px-1 py-0.5 border border-orange-100">Operations</span>
                <span className="text-center bg-white rounded px-1 py-0.5 border border-orange-100">Finance</span>
              </div>
            </>
          )}
          {deal.swat.status === 'complete' && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 size={12} /> Completed in {deal.swat.daysDeployed} days
            </div>
          )}
          {deal.swat.status === 'scheduled' && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock size={12} /> Scheduled — awaiting operator assignment
            </div>
          )}
        </div>
      )}

      {/* Due Diligence checklist */}
      {deal.diligence && (
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Due Diligence Checklist</div>
          <div className="space-y-1.5">
            {[
              { key: 'financials', label: 'Financial review' },
              { key: 'legal', label: 'Legal & compliance' },
              { key: 'staff', label: 'Staff interviews' },
              { key: 'customers', label: 'Customer analysis' },
            ].map(item => (
              <div key={item.key} className="flex items-center gap-2 text-xs">
                {deal.diligence[item.key]
                  ? <CheckCircle2 size={12} className="text-emerald-500" />
                  : <AlertTriangle size={12} className="text-slate-300" />}
                <span className={deal.diligence[item.key] ? 'text-slate-700 font-medium' : 'text-slate-400'}>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="text-slate-400">Quality Scorecard:</span>
            <span className={`font-bold ${deal.diligence.scorecard >= 75 ? 'text-emerald-600' : 'text-amber-600'}`}>{deal.diligence.scorecard}/100</span>
          </div>
        </div>
      )}

      {/* Sourcing info */}
      {deal.sourcing && (
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Sourcing</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-slate-400">Channel</span><span className="font-medium text-slate-700">{deal.sourcing.channel}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">First contact</span><span className="font-medium text-slate-700">{deal.sourcing.firstContact}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Temperature</span>
              <span className={`font-bold ${deal.sourcing.temperature === 'hot' ? 'text-red-600' : 'text-amber-600'}`}>{deal.sourcing.temperature}</span>
            </div>
          </div>
        </div>
      )}

      {deal.notes && (
        <div className="text-[11px] text-slate-500 italic border-l-2 border-truenorth-300 pl-3">{deal.notes}</div>
      )}

      {deal.acquiredDate && (
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <Calendar size={10} /> Acquired {deal.acquiredDate}
          {deal.completedDate && <> · Completed {deal.completedDate}</>}
        </div>
      )}
    </div>
  )
}

function OperatorBenchView() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Operator Bench</h3>
            <p className="text-xs text-slate-400 mt-0.5">Pre-qualified displaced managers waiting for a business match. Pillar 4 of the operating model.</p>
          </div>
          <span className="text-[10px] font-bold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-1 rounded-lg">{operatorBench.filter(o => o.status === 'Pre-qualified').length} ready to deploy</span>
        </div>

        <div className="space-y-3">
          {operatorBench.map((op, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-sm font-bold text-indigo-600">
                {op.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-800">{op.name}</div>
                <div className="text-xs text-slate-400">{op.background}</div>
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                  op.status === 'Pre-qualified' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>{op.status}</span>
                {op.readySince !== '—' && <div className="text-[10px] text-slate-400 mt-1">Ready since {op.readySince}</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
          <div className="text-xs font-bold text-indigo-800 mb-2">Matching Criteria</div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-indigo-600">
            <div>• Relevant ops experience</div>
            <div>• Blue-collar labour mgmt</div>
            <div>• Financial stability (3-5 yr)</div>
            <div>• Cultural fit with target biz</div>
          </div>
        </div>

        {/* Active operators */}
        <div className="mt-6">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-3">Currently Deployed Operators</div>
          <div className="space-y-2">
            {deals.filter(d => d.operator && d.operator.name !== 'TBD — matching in progress').map(deal => (
              <div key={deal.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-800">{deal.operator.name}</div>
                  <div className="text-[10px] text-slate-400">{deal.name} · {deal.operator.status}</div>
                </div>
                <div className="w-24">
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-truenorth-400 to-truenorth-600" style={{ width: `${deal.operator.equity}%` }} />
                  </div>
                  <div className="text-[9px] text-right text-slate-400 mt-0.5">{deal.operator.equity}% equity</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Kpi({ label, value, sub, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm">
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: color + '15' }}>
          <Icon size={12} style={{ color }} />
        </div>
        <span className="text-[10px] font-semibold text-slate-400 uppercase">{label}</span>
      </div>
      <div className="text-lg font-black text-slate-900">{value}</div>
      <div className="text-[10px] text-slate-400 mt-0.5">{sub}</div>
    </div>
  )
}

function MiniStat({ label, value, highlight }) {
  return (
    <div className="bg-slate-50 rounded-lg p-2 text-center">
      <div className={`text-sm font-black ${highlight ? 'text-emerald-600' : 'text-slate-800'}`}>{value}</div>
      <div className="text-[9px] text-slate-400">{label}</div>
    </div>
  )
}
