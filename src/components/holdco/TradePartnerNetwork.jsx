import { useState } from 'react'
import { ArrowUpRight, ArrowRight, Shield, Star, Crown, Users, TrendingUp, DollarSign, Clock, CheckCircle2, AlertTriangle, Zap, Filter, Search } from 'lucide-react'

const tradePartners = [
  // Tier 3 — Acquired Operators
  { id: 'tp-1', name: 'ProElectric GTA', category: 'Electrical', tier: 3, status: 'active', owner: 'Marcus Chen', leadsRouted: 142, converted: 118, conversionRate: 83, avgTicket: 2400, monthlyRevenue: 38200, responseTime: '0.8 hrs', rating: 4.9, sinceDate: '2025-08', onOS: true, cobranded: true, notes: 'First trade acquisition — flagship performer' },
  { id: 'tp-2', name: 'Solid Foundations Paving', category: 'Concrete & Paving', tier: 3, status: 'active', owner: 'Diane Kowalski', leadsRouted: 87, converted: 71, conversionRate: 82, avgTicket: 5800, monthlyRevenue: 41200, responseTime: '1.1 hrs', rating: 4.8, sinceDate: '2025-11', onOS: true, cobranded: true, notes: 'High ticket — excellent on driveways + walkways' },
  // Tier 2 — Network Partners
  { id: 'tp-3', name: 'Riverdale Plumbing Co', category: 'Plumbing', tier: 2, status: 'active', owner: 'James O\'Brien', leadsRouted: 196, converted: 147, conversionRate: 75, avgTicket: 1800, monthlyRevenue: 22400, responseTime: '1.4 hrs', rating: 4.7, sinceDate: '2025-03', onOS: true, cobranded: true, notes: 'Approaching Tier 3 ROFR threshold', rofrEligible: true },
  { id: 'tp-4', name: 'GreenDeck Builds', category: 'Decks & Fencing', tier: 2, status: 'active', owner: 'Sarah Tremblay', leadsRouted: 134, converted: 94, conversionRate: 70, avgTicket: 8500, monthlyRevenue: 27100, responseTime: '1.8 hrs', rating: 4.6, sinceDate: '2025-05', onOS: true, cobranded: true, notes: 'Seasonal peak performer — deck builds in summer' },
  { id: 'tp-5', name: 'AirPro HVAC', category: 'HVAC', tier: 2, status: 'active', owner: 'Kevin Patel', leadsRouted: 108, converted: 76, conversionRate: 70, avgTicket: 3200, monthlyRevenue: 20800, responseTime: '1.6 hrs', rating: 4.5, sinceDate: '2025-06', onOS: true, cobranded: true },
  // Tier 1 — Standard Partners
  { id: 'tp-6', name: 'QuickFix Roofing', category: 'Roofing', tier: 1, status: 'active', owner: 'Tom Baxter', leadsRouted: 64, converted: 38, conversionRate: 59, avgTicket: 7200, monthlyRevenue: 8640, responseTime: '14 hrs', rating: 4.2, sinceDate: '2026-01', onOS: false, cobranded: false, notes: 'High potential — upgrading to Tier 2 in review' },
  { id: 'tp-7', name: 'Maple Flooring Inc', category: 'Flooring', tier: 1, status: 'active', owner: 'Anna Novak', leadsRouted: 52, converted: 33, conversionRate: 63, avgTicket: 4100, monthlyRevenue: 5400, responseTime: '18 hrs', rating: 4.3, sinceDate: '2026-02', onOS: false, cobranded: false },
  { id: 'tp-8', name: 'ClearView Windows', category: 'Windows & Doors', tier: 1, status: 'active', owner: 'Derek Chan', leadsRouted: 41, converted: 22, conversionRate: 54, avgTicket: 6500, monthlyRevenue: 4700, responseTime: '22 hrs', rating: 4.0, sinceDate: '2026-03', onOS: false, cobranded: false },
  { id: 'tp-9', name: 'NorthStar Painters', category: 'Painting', tier: 1, status: 'active', owner: 'Lisa Fontaine', leadsRouted: 78, converted: 51, conversionRate: 65, avgTicket: 2800, monthlyRevenue: 7140, responseTime: '9 hrs', rating: 4.4, sinceDate: '2025-12', onOS: false, cobranded: false, notes: 'Strong performer — Tier 2 candidate' },
  { id: 'tp-10', name: 'Eastside Gutters', category: 'Gutters & Eaves', tier: 1, status: 'pending', owner: 'Raj Mehta', leadsRouted: 0, converted: 0, conversionRate: 0, avgTicket: 1200, monthlyRevenue: 0, responseTime: '—', rating: 0, sinceDate: '2026-06', onOS: false, cobranded: false, notes: 'New sign-up — pending first lead' },
]

const tierConfig = {
  3: { label: 'Tier 3 — Acquired', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', icon: Crown, desc: 'Full BridgeCo acquisition. On True North OS. GP/LP work-to-own.' },
  2: { label: 'Tier 2 — Network', color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc', icon: Shield, desc: 'ROFR exercised. Priority routing. Co-branded. Monthly platform fee.' },
  1: { label: 'Tier 1 — Standard', color: '#d97706', bg: '#fffbeb', border: '#fde68a', icon: Star, desc: 'Pay-per-converted-lead. No upfront cost. 24hr response window.' },
}

const tierUpgradeRequirements = {
  '1→2': [
    { label: 'Conversion rate ≥ 65%', key: 'conversionRate', threshold: 65 },
    { label: 'Response time ≤ 12 hrs', key: 'responseTime', threshold: 12 },
    { label: 'Rating ≥ 4.3', key: 'rating', threshold: 4.3 },
    { label: '50+ leads converted', key: 'converted', threshold: 50 },
    { label: '6+ months active', key: 'months', threshold: 6 },
  ],
  '2→3': [
    { label: 'Conversion rate ≥ 75%', key: 'conversionRate', threshold: 75 },
    { label: 'Response time ≤ 2 hrs', key: 'responseTime', threshold: 2 },
    { label: 'Rating ≥ 4.6', key: 'rating', threshold: 4.6 },
    { label: '100+ leads converted', key: 'converted', threshold: 100 },
    { label: '12+ months as Tier 2', key: 'months', threshold: 12 },
    { label: 'ROFR accepted by partner', key: 'rofr', threshold: true },
  ],
}

export function TradePartnerNetwork() {
  const [filterTier, setFilterTier] = useState('all')
  const [selectedPartner, setSelectedPartner] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = tradePartners.filter(p => {
    if (filterTier !== 'all' && p.tier !== Number(filterTier)) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.category.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const tier3 = tradePartners.filter(p => p.tier === 3)
  const tier2 = tradePartners.filter(p => p.tier === 2)
  const tier1 = tradePartners.filter(p => p.tier === 1)
  const totalRevenue = tradePartners.reduce((sum, p) => sum + p.monthlyRevenue, 0)
  const totalLeads = tradePartners.reduce((sum, p) => sum + p.leadsRouted, 0)
  const avgConversion = Math.round(tradePartners.filter(p => p.leadsRouted > 0).reduce((sum, p) => sum + p.conversionRate, 0) / tradePartners.filter(p => p.leadsRouted > 0).length)

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-black text-slate-900">Trade Partner Network</h2>
          <p className="text-xs text-slate-400 mt-0.5">Tiered routing: Tier 3 first → Tier 2 → Tier 1. Revenue engine of the flywheel.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search partners..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-truenorth-500/20 focus:border-truenorth-400 outline-none w-48"
            />
          </div>
          <select
            value={filterTier}
            onChange={e => setFilterTier(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white font-medium text-slate-600"
          >
            <option value="all">All Tiers</option>
            <option value="3">Tier 3 — Acquired</option>
            <option value="2">Tier 2 — Network</option>
            <option value="1">Tier 1 — Standard</option>
          </select>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-6 gap-3 mb-5">
        <KpiCard label="Total Partners" value={tradePartners.length} sub={`${tier3.length} T3 · ${tier2.length} T2 · ${tier1.length} T1`} icon={Users} color="#6366f1" />
        <KpiCard label="Monthly Revenue" value={`$${(totalRevenue / 1000).toFixed(0)}k`} sub="From lead routing" icon={DollarSign} color="#10b981" />
        <KpiCard label="Leads Routed" value={totalLeads} sub="Last 30 days" icon={Zap} color="#f59e0b" />
        <KpiCard label="Avg Conversion" value={`${avgConversion}%`} sub="Across all tiers" icon={TrendingUp} color="#0891b2" />
        <KpiCard label="ROFR Eligible" value={tradePartners.filter(p => p.rofrEligible).length} sub="Ready for Tier 3" icon={ArrowUpRight} color="#7c3aed" />
        <KpiCard label="Pending Signup" value={tradePartners.filter(p => p.status === 'pending').length} sub="Awaiting first lead" icon={Clock} color="#64748b" />
      </div>

      {/* Routing Priority Visual */}
      <div className="bg-gradient-to-r from-violet-50 via-cyan-50 to-amber-50 rounded-xl border border-slate-200 p-4 mb-5 flex items-center gap-4">
        <div className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Lead Routing Priority</div>
        <div className="flex items-center gap-0 flex-1">
          <div className="flex-1 h-8 bg-violet-100 border border-violet-300 rounded-l-lg flex items-center justify-center text-xs font-bold text-violet-700">
            <Crown size={12} className="mr-1" /> Tier 3 — Owned
          </div>
          <ArrowRight size={16} className="text-slate-400 mx-1" />
          <div className="flex-1 h-8 bg-cyan-100 border border-cyan-300 flex items-center justify-center text-xs font-bold text-cyan-700">
            <Shield size={12} className="mr-1" /> Tier 2 — Network
          </div>
          <ArrowRight size={16} className="text-slate-400 mx-1" />
          <div className="flex-1 h-8 bg-amber-100 border border-amber-300 rounded-r-lg flex items-center justify-center text-xs font-bold text-amber-700">
            <Star size={12} className="mr-1" /> Tier 1 — Standard
          </div>
        </div>
        <div className="text-[10px] text-slate-500 shrink-0 text-right leading-tight">
          Higher tiers get<br/>leads first
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex gap-5 overflow-hidden">
        {/* Partner List */}
        <div className="flex-1 overflow-auto">
          <div className="space-y-2">
            {filtered.map(partner => {
              const tc = tierConfig[partner.tier]
              const TierIcon = tc.icon
              const isSelected = selectedPartner?.id === partner.id
              return (
                <button
                  key={partner.id}
                  onClick={() => setSelectedPartner(partner)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                    isSelected ? 'bg-truenorth-50 border-truenorth-300 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: tc.bg, border: `1px solid ${tc.border}` }}>
                      <TierIcon size={14} style={{ color: tc.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-800 truncate">{partner.name}</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>T{partner.tier}</span>
                        {partner.rofrEligible && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200">ROFR</span>}
                        {partner.status === 'pending' && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">PENDING</span>}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{partner.category} · {partner.owner}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-black text-slate-800">${(partner.monthlyRevenue / 1000).toFixed(1)}k<span className="text-[9px] font-medium text-slate-400">/mo</span></div>
                      <div className="text-[10px] text-slate-400">{partner.conversionRate}% conv</div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="w-80 shrink-0 overflow-auto">
          {selectedPartner ? (
            <PartnerDetail partner={selectedPartner} />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 h-full flex flex-col items-center justify-center text-center">
              <Users size={32} className="text-slate-300 mb-3" />
              <div className="text-sm font-semibold text-slate-400">Select a partner</div>
              <div className="text-xs text-slate-300 mt-1">View details, metrics, and upgrade eligibility</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PartnerDetail({ partner }) {
  const tc = tierConfig[partner.tier]
  const TierIcon = tc.icon
  const upgradeKey = partner.tier < 3 ? `${partner.tier}→${partner.tier + 1}` : null
  const requirements = upgradeKey ? tierUpgradeRequirements[upgradeKey] : null

  const monthsActive = () => {
    const start = new Date(partner.sinceDate + '-01')
    const now = new Date()
    return Math.floor((now - start) / (30 * 24 * 60 * 60 * 1000))
  }

  const checkRequirement = (req) => {
    if (req.key === 'months') return monthsActive() >= req.threshold
    if (req.key === 'rofr') return partner.rofrEligible === true
    if (req.key === 'responseTime') return parseFloat(partner.responseTime) <= req.threshold
    if (req.key === 'conversionRate') return partner.conversionRate >= req.threshold
    if (req.key === 'rating') return partner.rating >= req.threshold
    if (req.key === 'converted') return partner.converted >= req.threshold
    return false
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: tc.bg, border: `1px solid ${tc.border}` }}>
          <TierIcon size={18} style={{ color: tc.color }} />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-slate-900">{partner.name}</h3>
          <div className="text-xs text-slate-400">{partner.category} · {partner.owner}</div>
          <div className="text-[10px] font-semibold mt-1 px-2 py-0.5 rounded-full w-fit" style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>
            {tc.label}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="text-[11px] text-slate-500 bg-slate-50 rounded-lg p-3 border border-slate-100">{tc.desc}</div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-2">
        <MetricBox label="Leads Routed" value={partner.leadsRouted} />
        <MetricBox label="Converted" value={partner.converted} />
        <MetricBox label="Conversion" value={`${partner.conversionRate}%`} highlight={partner.conversionRate >= 75} />
        <MetricBox label="Avg Ticket" value={`$${partner.avgTicket.toLocaleString()}`} />
        <MetricBox label="Monthly Rev" value={`$${(partner.monthlyRevenue / 1000).toFixed(1)}k`} highlight />
        <MetricBox label="Response" value={partner.responseTime} />
        <MetricBox label="Rating" value={partner.rating > 0 ? `${partner.rating} ★` : '—'} />
        <MetricBox label="Active Since" value={partner.sinceDate} />
      </div>

      {/* Status indicators */}
      <div className="flex gap-2 flex-wrap">
        {partner.onOS && <StatusBadge label="On True North OS" positive />}
        {partner.cobranded && <StatusBadge label="Co-branded" positive />}
        {!partner.onOS && <StatusBadge label="Not on OS" />}
        {partner.rofrEligible && <StatusBadge label="ROFR Eligible" positive highlight />}
      </div>

      {partner.notes && (
        <div className="text-[11px] text-slate-500 italic border-l-2 border-truenorth-300 pl-3">{partner.notes}</div>
      )}

      {/* Upgrade Requirements */}
      {requirements && (
        <div className="border-t border-slate-100 pt-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Upgrade to Tier {partner.tier + 1} Requirements</div>
          <div className="space-y-1.5">
            {requirements.map((req, i) => {
              const met = checkRequirement(req)
              return (
                <div key={i} className="flex items-center gap-2 text-xs">
                  {met ? <CheckCircle2 size={12} className="text-emerald-500 shrink-0" /> : <AlertTriangle size={12} className="text-slate-300 shrink-0" />}
                  <span className={met ? 'text-slate-700 font-medium' : 'text-slate-400'}>{req.label}</span>
                </div>
              )
            })}
          </div>
          {requirements.every(r => checkRequirement(r)) && (
            <button className="mt-3 w-full py-2 bg-gradient-to-r from-violet-500 to-violet-700 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all">
              Initiate Tier {partner.tier + 1} Upgrade →
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function KpiCard({ label, value, sub, icon: Icon, color }) {
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

function MetricBox({ label, value, highlight }) {
  return (
    <div className="bg-slate-50 rounded-lg p-2 text-center">
      <div className={`text-sm font-black ${highlight ? 'text-emerald-600' : 'text-slate-800'}`}>{value}</div>
      <div className="text-[9px] text-slate-400 mt-0.5">{label}</div>
    </div>
  )
}

function StatusBadge({ label, positive, highlight }) {
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
      highlight ? 'bg-violet-50 text-violet-700 border-violet-200' :
      positive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
      'bg-slate-50 text-slate-400 border-slate-200'
    }`}>{label}</span>
  )
}
