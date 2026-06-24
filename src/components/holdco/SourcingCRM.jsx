import { useState } from 'react'
import { Search, Phone, Mail, Calendar, User, Building2, MapPin, Flame, Clock, CheckCircle2, AlertTriangle, ArrowRight, Filter, Plus, MessageSquare, ExternalLink, BarChart3 } from 'lucide-react'

const channels = [
  { id: 'accountant', label: 'Accountant Referral', icon: '📊', color: '#6366f1' },
  { id: 'broker', label: 'Business Broker', icon: '🤝', color: '#0891b2' },
  { id: 'inbound', label: 'Inbound (Tagline)', icon: '🔍', color: '#16a34a' },
  { id: 'direct', label: 'Direct Outreach', icon: '📞', color: '#d97706' },
  { id: 'community', label: 'Community Referral', icon: '👥', color: '#7c3aed' },
]

const leads = [
  {
    id: 'l-1', name: 'Bill Mackey', business: 'Northern Lawns & Gardens', category: 'Lawn & Snow',
    city: 'Collingwood, ON', channel: 'accountant', temperature: 'warm', stage: 'initial_contact',
    ownerAge: 69, ebitdaEst: 175000, employees: 8, yearsInBusiness: 22,
    firstContact: '2026-05-28', lastContact: '2026-06-10', nextAction: 'Site visit scheduled Jun 28',
    notes: 'Referral from his accountant (Sandra Kim). Retiring end of year. Wife wants to travel. Business solid but no succession plan. Open to conversation.',
    activities: [
      { date: '2026-06-10', type: 'call', text: 'Follow-up call — confirmed interest. Wants to meet in person.' },
      { date: '2026-05-30', type: 'email', text: 'Sent intro package + True North overview deck.' },
      { date: '2026-05-28', type: 'referral', text: 'Sandra Kim (accountant) introduced via email.' },
    ],
  },
  {
    id: 'l-2', name: 'Vera Kowalczyk', business: 'Durham Detail Cleaning', category: 'Cleaning',
    city: 'Oshawa, ON', channel: 'inbound', temperature: 'hot', stage: 'meeting_scheduled',
    ownerAge: 63, ebitdaEst: 145000, employees: 12, yearsInBusiness: 15,
    firstContact: '2026-06-12', lastContact: '2026-06-18', nextAction: 'Discovery meeting Jun 25',
    notes: 'Saw "A True North Partner" on competitor van. Called us directly. Very motivated — partner health issues accelerating timeline.',
    activities: [
      { date: '2026-06-18', type: 'call', text: 'Pre-meeting call. Confirmed she wants to exit within 6 months. Partner health is primary driver.' },
      { date: '2026-06-14', type: 'email', text: 'Sent NDA + preliminary questionnaire.' },
      { date: '2026-06-12', type: 'inbound', text: 'Inbound call — found us via tagline on Sparkle Home van.' },
    ],
  },
  {
    id: 'l-3', name: 'Frank DeLuca', business: 'Prestige Lawn Care', category: 'Lawn & Snow',
    city: 'Newmarket, ON', channel: 'broker', temperature: 'warm', stage: 'initial_contact',
    ownerAge: 67, ebitdaEst: 220000, employees: 14, yearsInBusiness: 19,
    firstContact: '2026-06-05', lastContact: '2026-06-15', nextAction: 'Waiting for financials from broker',
    notes: 'Listed with Peak Business Brokers. Asking 4.2x — likely negotiable to 3.5x. Good territory fit for hub expansion.',
    activities: [
      { date: '2026-06-15', type: 'email', text: 'Broker sending 3-year financials + customer list summary this week.' },
      { date: '2026-06-05', type: 'referral', text: 'Peak Business Brokers (Jim Park) flagged this listing as matching our profile.' },
    ],
  },
  {
    id: 'l-4', name: 'Linda Morrison', business: 'Morrison Cleaning Services', category: 'Cleaning',
    city: 'Peterborough, ON', channel: 'direct', temperature: 'cold', stage: 'researching',
    ownerAge: 61, ebitdaEst: 130000, employees: 6, yearsInBusiness: 11,
    firstContact: '2026-06-20', lastContact: '2026-06-20', nextAction: 'Send intro letter + follow up in 2 weeks',
    notes: 'Identified via LinkedIn. Matches retirement profile. No response yet — needs warming.',
    activities: [
      { date: '2026-06-20', type: 'email', text: 'Cold outreach via LinkedIn + follow-up email.' },
    ],
  },
  {
    id: 'l-5', name: 'George Pappas', business: 'Pappas Property Maintenance', category: 'Lawn & Snow',
    city: 'Barrie, ON', channel: 'community', temperature: 'warm', stage: 'initial_contact',
    ownerAge: 72, ebitdaEst: 195000, employees: 10, yearsInBusiness: 28,
    firstContact: '2026-06-08', lastContact: '2026-06-16', nextAction: 'Coffee meeting this Thursday',
    notes: 'Referred by David Park (Sparkle Home operator). George is David\'s neighbour. Very trusting of the referral. Longest-running business in our pipeline.',
    activities: [
      { date: '2026-06-16', type: 'call', text: 'Chatted for 20 min. Very proud of his business. Wants someone who will "take care of the guys".' },
      { date: '2026-06-08', type: 'referral', text: 'David Park introduced George at a neighbourhood BBQ.' },
    ],
  },
  {
    id: 'l-6', name: 'Susan Chen', business: 'Bright Side Home Cleaning', category: 'Cleaning',
    city: 'Markham, ON', channel: 'accountant', temperature: 'hot', stage: 'nda_signed',
    ownerAge: 65, ebitdaEst: 280000, employees: 18, yearsInBusiness: 17,
    firstContact: '2026-05-15', lastContact: '2026-06-19', nextAction: 'Financials under review — scorecard pending',
    notes: 'Strong business. 80% recurring. Well-documented books. Husband (co-owner) passed last year. Ready to sell. Highest EBITDA in pipeline.',
    activities: [
      { date: '2026-06-19', type: 'email', text: 'Received full 3-year financials + tax returns. Under review.' },
      { date: '2026-06-10', type: 'call', text: 'NDA signed. Agreed to share financials.' },
      { date: '2026-05-22', type: 'meeting', text: 'In-person discovery meeting. Very organized, transparent.' },
      { date: '2026-05-15', type: 'referral', text: 'Referral from her accountant (Wayne Ho at BDO).' },
    ],
  },
]

const stageConfig = {
  researching: { label: 'Researching', color: '#94a3b8', order: 0 },
  initial_contact: { label: 'Initial Contact', color: '#6366f1', order: 1 },
  meeting_scheduled: { label: 'Meeting Scheduled', color: '#0891b2', order: 2 },
  nda_signed: { label: 'NDA Signed', color: '#d97706', order: 3 },
  financials_review: { label: 'Financials Review', color: '#ea580c', order: 4 },
  loi_sent: { label: 'LOI Sent', color: '#16a34a', order: 5 },
}

const tempConfig = {
  hot: { label: 'Hot', color: '#ef4444', bg: '#fef2f2' },
  warm: { label: 'Warm', color: '#f59e0b', bg: '#fffbeb' },
  cold: { label: 'Cold', color: '#64748b', bg: '#f8fafc' },
}

export function SourcingCRM() {
  const [selectedLead, setSelectedLead] = useState(null)
  const [filterChannel, setFilterChannel] = useState('all')
  const [filterTemp, setFilterTemp] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = leads.filter(l => {
    if (filterChannel !== 'all' && l.channel !== filterChannel) return false
    if (filterTemp !== 'all' && l.temperature !== filterTemp) return false
    if (search && !l.business.toLowerCase().includes(search.toLowerCase()) && !l.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  }).sort((a, b) => {
    const tempOrder = { hot: 0, warm: 1, cold: 2 }
    return tempOrder[a.temperature] - tempOrder[b.temperature]
  })

  const totalEbitda = leads.reduce((s, l) => s + l.ebitdaEst, 0)

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">Deal Sourcing</h2>
          <p className="text-xs text-slate-400 mt-0.5">Proactive, relationship-driven, off-market. Not waiting for sellers to find us.</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-6 gap-3 mb-4">
        <Kpi label="Pipeline" value={leads.length} sub="Active leads" icon={Building2} color="#6366f1" />
        <Kpi label="Pipeline EBITDA" value={`$${(totalEbitda / 1000).toFixed(0)}k`} sub="Combined estimate" icon={BarChart3} color="#10b981" />
        <Kpi label="Hot" value={leads.filter(l => l.temperature === 'hot').length} sub="Ready to move" icon={Flame} color="#ef4444" />
        <Kpi label="Warm" value={leads.filter(l => l.temperature === 'warm').length} sub="In conversation" icon={Flame} color="#f59e0b" />
        <Kpi label="Avg Owner Age" value={Math.round(leads.reduce((s, l) => s + l.ownerAge, 0) / leads.length)} sub="Silver tsunami" icon={User} color="#7c3aed" />
        <Kpi label="Channels" value={new Set(leads.map(l => l.channel)).size} sub="Active sources" icon={MessageSquare} color="#0891b2" />
      </div>

      {/* Channel breakdown */}
      <div className="flex gap-2 mb-4">
        {channels.map(ch => {
          const count = leads.filter(l => l.channel === ch.id).length
          return (
            <button
              key={ch.id}
              onClick={() => setFilterChannel(filterChannel === ch.id ? 'all' : ch.id)}
              className={`flex-1 p-2 rounded-lg border text-center transition-all ${
                filterChannel === ch.id ? 'border-2 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
              style={{ borderColor: filterChannel === ch.id ? ch.color : undefined, background: filterChannel === ch.id ? ch.color + '10' : undefined }}
            >
              <div className="text-sm">{ch.icon}</div>
              <div className="text-[10px] font-bold text-slate-600 mt-0.5">{ch.label}</div>
              <div className="text-xs font-black text-slate-800">{count}</div>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-truenorth-500/20 focus:border-truenorth-400 outline-none" />
        </div>
        <select value={filterTemp} onChange={e => setFilterTemp(e.target.value)}
          className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white font-medium text-slate-600">
          <option value="all">All Temps</option>
          <option value="hot">Hot</option>
          <option value="warm">Warm</option>
          <option value="cold">Cold</option>
        </select>
      </div>

      {/* Main */}
      <div className="flex-1 flex gap-5 overflow-hidden">
        {/* Lead list */}
        <div className="flex-1 overflow-auto space-y-2">
          {filtered.map(lead => {
            const temp = tempConfig[lead.temperature]
            const stage = stageConfig[lead.stage]
            const isSelected = selectedLead?.id === lead.id
            return (
              <button
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                  isSelected ? 'bg-truenorth-50 border-truenorth-300 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-800 truncate">{lead.business}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: temp.bg, color: temp.color }}>{temp.label}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100" style={{ color: stage.color }}>{stage.label}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{lead.name}, {lead.ownerAge} · {lead.city} · {lead.category}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-emerald-600">${(lead.ebitdaEst / 1000).toFixed(0)}k</div>
                    <div className="text-[10px] text-slate-400">est. EBITDA</div>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-400">
                  <Clock size={10} /> Next: {lead.nextAction}
                </div>
              </button>
            )
          })}
        </div>

        {/* Detail */}
        <div className="w-80 shrink-0 overflow-auto">
          {selectedLead ? (
            <LeadDetail lead={selectedLead} />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 h-full flex flex-col items-center justify-center text-center">
              <Building2 size={32} className="text-slate-300 mb-3" />
              <div className="text-sm font-semibold text-slate-400">Select a lead</div>
              <div className="text-xs text-slate-300 mt-1">View owner details, notes, and activity log</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function LeadDetail({ lead }) {
  const temp = tempConfig[lead.temperature]
  const stage = stageConfig[lead.stage]
  const channel = channels.find(c => c.id === lead.channel)

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: temp.bg, color: temp.color }}>{temp.label}</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100" style={{ color: stage.color }}>{stage.label}</span>
        </div>
        <h3 className="text-base font-bold text-slate-900">{lead.business}</h3>
        <div className="text-xs text-slate-400">{lead.category} · {lead.city}</div>
      </div>

      {/* Owner */}
      <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Owner</div>
        <div className="text-sm font-semibold text-slate-800">{lead.name}</div>
        <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
          <div><span className="text-slate-400">Age:</span> <span className="font-medium text-slate-700">{lead.ownerAge}</span></div>
          <div><span className="text-slate-400">Employees:</span> <span className="font-medium text-slate-700">{lead.employees}</span></div>
          <div><span className="text-slate-400">Years:</span> <span className="font-medium text-slate-700">{lead.yearsInBusiness}</span></div>
          <div><span className="text-slate-400">Est. EBITDA:</span> <span className="font-bold text-emerald-600">${(lead.ebitdaEst / 1000).toFixed(0)}k</span></div>
        </div>
      </div>

      {/* Channel */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-lg">{channel.icon}</span>
        <div>
          <div className="font-semibold text-slate-700">{channel.label}</div>
          <div className="text-[10px] text-slate-400">First contact: {lead.firstContact}</div>
        </div>
      </div>

      {/* Next action */}
      <div className="p-3 bg-truenorth-50 border border-truenorth-200 rounded-lg">
        <div className="text-[10px] font-bold text-truenorth-600 uppercase mb-1">Next Action</div>
        <div className="text-xs font-medium text-truenorth-800">{lead.nextAction}</div>
      </div>

      {/* Notes */}
      <div className="text-[11px] text-slate-500 italic border-l-2 border-slate-300 pl-3 leading-relaxed">{lead.notes}</div>

      {/* Activity log */}
      <div>
        <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Activity Log</div>
        <div className="space-y-3">
          {lead.activities.map((a, i) => (
            <div key={i} className="relative pl-4">
              <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-slate-300" />
              {i < lead.activities.length - 1 && <div className="absolute left-[3px] top-3 bottom-0 w-0.5 bg-slate-100" />}
              <div className="text-[10px] text-slate-400 font-medium">{a.date}</div>
              <div className="text-xs text-slate-600 mt-0.5">{a.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 pt-2 border-t border-slate-100">
        <button className="flex-1 py-2 text-[10px] font-bold text-truenorth-700 bg-truenorth-50 border border-truenorth-200 rounded-lg hover:bg-truenorth-100 transition-all flex items-center justify-center gap-1">
          <Phone size={10} /> Log Call
        </button>
        <button className="flex-1 py-2 text-[10px] font-bold text-truenorth-700 bg-truenorth-50 border border-truenorth-200 rounded-lg hover:bg-truenorth-100 transition-all flex items-center justify-center gap-1">
          <Mail size={10} /> Log Email
        </button>
        <button className="flex-1 py-2 text-[10px] font-bold text-truenorth-700 bg-truenorth-50 border border-truenorth-200 rounded-lg hover:bg-truenorth-100 transition-all flex items-center justify-center gap-1">
          <Calendar size={10} /> Schedule
        </button>
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
