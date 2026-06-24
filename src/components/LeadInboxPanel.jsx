import { useState } from 'react'
import { Inbox, Eye, Phone, Clock, MapPin, User, Filter, ChevronDown, CheckCircle2, XCircle, ArrowRight, Flame, Calendar, MessageSquare } from 'lucide-react'

const leadTypes = {
  observation: { icon: '👁', label: 'Spotted', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  request:     { icon: '🙋', label: 'Customer Asked', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  brochure:    { icon: '📬', label: 'Brochure', color: 'bg-green-100 text-green-700 border-green-200' },
  neighbor:    { icon: '🏘️', label: 'Neighbor', color: 'bg-violet-100 text-violet-700 border-violet-200' },
  photo:       { icon: '📸', label: 'Photo Only', color: 'bg-slate-100 text-slate-700 border-slate-200' },
}

const statusConfig = {
  new:        { label: 'New', color: 'bg-red-500', dot: 'bg-red-500' },
  reviewing:  { label: 'Reviewing', color: 'bg-amber-500', dot: 'bg-amber-400' },
  contacted:  { label: 'Contacted', color: 'bg-blue-500', dot: 'bg-blue-400' },
  quoted:     { label: 'Quoted', color: 'bg-purple-500', dot: 'bg-purple-400' },
  booked:     { label: 'Booked', color: 'bg-emerald-500', dot: 'bg-emerald-400' },
  lost:       { label: 'Lost', color: 'bg-slate-400', dot: 'bg-slate-400' },
}

const temperatureConfig = {
  hot:  { label: 'Hot', color: 'text-red-600 bg-red-50', icon: '🔥' },
  warm: { label: 'Warm', color: 'text-amber-600 bg-amber-50', icon: '🌡️' },
  cold: { label: 'Cold', color: 'text-blue-600 bg-blue-50', icon: '❄️' },
}

const brands = {
  clean: { icon: '✨', name: 'SparkleClean', color: '#06b6d4' },
  lawn:  { icon: '🌿', name: 'TrueGreen', color: '#22c55e' },
  deck:  { icon: '🪵', name: 'DeckRevive', color: '#f59e0b' },
  handyman: { icon: '🔧', name: 'FixRight', color: '#8b5cf6' },
  junk:  { icon: '🚛', name: 'CleanSlate', color: '#ef4444' },
}

const mockLeads = [
  {
    id: 'L001', type: 'request', status: 'new', temperature: 'hot',
    brand: 'deck', worker: 'Marcus Okafor', customer: 'Lisa Nguyen',
    customerPhone: '(416) 555-0142', address: '88 Queen St W, Toronto',
    text: 'Customer asked about deck staining. Said she wants it done before her BBQ party in 3 weeks.',
    interest: 'Ready to book', wantsCallback: true,
    createdAt: '2026-06-21T14:22:00', jobRef: 'Lawn mow #1247',
    photo: false,
  },
  {
    id: 'L002', type: 'observation', status: 'new', temperature: 'warm',
    brand: 'handyman', worker: 'Marcus Okafor', customer: 'Henry Zhao',
    customerPhone: '(416) 555-0198', address: '45 Dundas St E, Toronto',
    text: 'Fence gate hinge broken, leaning heavily. Customer didn\'t mention it but it\'s a safety issue.',
    urgency: 'Soon', mentioned: 'No',
    createdAt: '2026-06-21T13:45:00', jobRef: 'Lawn mow #1243',
    photo: true,
  },
  {
    id: 'L003', type: 'brochure', status: 'new', temperature: 'cold',
    brand: 'clean', worker: 'Marcus Okafor', customer: 'Alice Montgomery',
    customerPhone: '(416) 555-0155', address: '123 Bloor St W, Toronto',
    text: 'Left SparkleClean brochure on kitchen counter. House could use a deep clean.',
    location: 'Kitchen counter', code: 'MO-2206',
    createdAt: '2026-06-21T11:30:00', jobRef: 'Lawn mow #1240',
    photo: false,
  },
  {
    id: 'L004', type: 'neighbor', status: 'reviewing', temperature: 'cold',
    brand: 'lawn', worker: 'Sarah Chen', customer: null,
    customerPhone: null, address: '125 Bloor St W, Toronto',
    text: 'Completely overgrown lawn, weeds waist-high. No visible service. Great candidate for TrueGreen.',
    createdAt: '2026-06-21T10:15:00', jobRef: 'Near job at 123 Bloor St W',
    photo: true,
  },
  {
    id: 'L005', type: 'request', status: 'contacted', temperature: 'hot',
    brand: 'junk', worker: 'David Patel', customer: 'Emily Park',
    customerPhone: '(416) 555-0177', address: '200 King St W, Toronto',
    text: 'Old hot tub in backyard, customer wants it removed. Asked for a quote on the spot.',
    interest: 'Ready to book', wantsCallback: true,
    createdAt: '2026-06-20T15:30:00', jobRef: 'Handyman #1198',
    photo: true,
  },
  {
    id: 'L006', type: 'observation', status: 'quoted', temperature: 'warm',
    brand: 'deck', worker: 'Marcus Okafor', customer: 'Carol Wu',
    customerPhone: '(416) 555-0133', address: '77 Yonge St, Toronto',
    text: 'Deck stain is peeling on south-facing side. Mentioned it to customer, she said "maybe next month".',
    urgency: 'Routine', mentioned: 'Yes, not interested',
    createdAt: '2026-06-19T09:00:00', jobRef: 'Lawn mow #1235',
    photo: true,
  },
  {
    id: 'L007', type: 'photo', status: 'reviewing', temperature: 'warm',
    brand: 'handyman', worker: 'Sarah Chen', customer: 'Dan Fortier',
    customerPhone: '(416) 555-0166', address: '55 College St, Toronto',
    text: '(Photo submitted — outdoor light fixture hanging loose by front door)',
    createdAt: '2026-06-20T11:00:00', jobRef: 'Cleaning #1201',
    photo: true,
  },
  {
    id: 'L008', type: 'brochure', status: 'booked', temperature: 'cold',
    brand: 'deck', worker: 'Marcus Okafor', customer: 'Henry Zhao',
    customerPhone: '(416) 555-0198', address: '45 Dundas St E, Toronto',
    text: 'Left DeckRevive brochure on front step. Deck showing UV wear. Customer redeemed code MO-2206!',
    location: 'Front door', code: 'MO-2206',
    createdAt: '2026-06-14T09:30:00', jobRef: 'Lawn mow #1210',
    photo: false,
  },
  {
    id: 'L009', type: 'request', status: 'booked', temperature: 'hot',
    brand: 'handyman', worker: 'David Patel', customer: 'Grace Lee',
    customerPhone: '(416) 555-0188', address: '330 Bay St, Toronto',
    text: 'Asked if we could fix her wobbly deck railing while I was there. Booked for next Tuesday.',
    interest: 'Ready to book', wantsCallback: false,
    createdAt: '2026-06-15T14:00:00', jobRef: 'Cleaning #1190',
    photo: false,
  },
]

export function LeadInboxPanel() {
  const [filter, setFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedLead, setSelectedLead] = useState(null)

  const filtered = mockLeads
    .filter(l => filter === 'all' || l.status === filter)
    .filter(l => typeFilter === 'all' || l.type === typeFilter)

  const newCount = mockLeads.filter(l => l.status === 'new').length
  const hotCount = mockLeads.filter(l => l.temperature === 'hot').length
  const bookedCount = mockLeads.filter(l => l.status === 'booked').length
  const totalValue = bookedCount * 285

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white">
            <Inbox size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Lead Inbox</h2>
            <p className="text-[11px] text-slate-400">Worker-generated leads from the field</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {newCount > 0 && (
            <span className="px-2.5 py-1 bg-red-500 text-white text-[11px] font-bold rounded-full animate-pulse">{newCount} new</span>
          )}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
          <div className="text-xl font-black text-red-600">{newCount}</div>
          <div className="text-[10px] text-red-500 font-medium">New</div>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-center">
          <div className="text-xl font-black text-orange-600">{hotCount}</div>
          <div className="text-[10px] text-orange-500 font-medium">🔥 Hot</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
          <div className="text-xl font-black text-emerald-600">{bookedCount}</div>
          <div className="text-[10px] text-emerald-500 font-medium">Booked</div>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-center">
          <div className="text-xl font-black text-purple-600">${totalValue}</div>
          <div className="text-[10px] text-purple-500 font-medium">Revenue</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-3 flex-wrap">
        <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
          {['all', 'new', 'reviewing', 'contacted', 'quoted', 'booked', 'lost'].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all capitalize ${filter === s ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>
              {s === 'all' ? 'All' : statusConfig[s]?.label || s}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-1.5 mb-4">
        {['all', 'observation', 'request', 'brochure', 'neighbor', 'photo'].map(t => (
          <button key={t} onClick={() => setTypeFilter(t)} className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${typeFilter === t ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
            {t === 'all' ? 'All types' : `${leadTypes[t].icon} ${leadTypes[t].label}`}
          </button>
        ))}
      </div>

      {/* Lead list + detail split */}
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filtered.map(lead => {
            const lt = leadTypes[lead.type]
            const temp = temperatureConfig[lead.temperature]
            const st = statusConfig[lead.status]
            const brand = brands[lead.brand]
            const isSelected = selectedLead?.id === lead.id
            const isNew = lead.status === 'new'
            const timeSince = getTimeSince(lead.createdAt)
            return (
              <button
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${isSelected ? 'border-purple-300 bg-purple-50/50 shadow-sm' : isNew ? 'border-red-200 bg-red-50/30 hover:bg-red-50/60' : 'border-slate-100 bg-white hover:bg-slate-50'}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0" style={{ background: brand.color + '15' }}>
                    {brand.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${lt.color}`}>{lt.icon} {lt.label}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${temp.color}`}>{temp.icon}</span>
                      </div>
                      <span className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                        <span className="text-[10px] font-medium text-slate-500">{st.label}</span>
                      </span>
                    </div>
                    <div className="text-[12px] font-bold text-slate-900 truncate mt-1">{lead.customer || 'Unknown (neighbor)'}</div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">{lead.text}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1"><User size={10} /> {lead.worker}</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock size={10} /> {timeSince}</span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">No leads match filters</div>
          )}
        </div>

        {/* Detail panel */}
        {selectedLead && (
          <div className="w-96 shrink-0 bg-white border border-slate-100 rounded-xl p-5 overflow-y-auto">
            <LeadDetail lead={selectedLead} />
          </div>
        )}
      </div>
    </div>
  )
}

function LeadDetail({ lead }) {
  const lt = leadTypes[lead.type]
  const temp = temperatureConfig[lead.temperature]
  const st = statusConfig[lead.status]
  const brand = brands[lead.brand]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${lt.color}`}>{lt.icon} {lt.label}</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${temp.color}`}>{temp.icon} {temp.label}</span>
      </div>

      <div>
        <h3 className="text-[15px] font-bold text-slate-900">{lead.customer || 'Unknown Property'}</h3>
        <div className="flex items-center gap-1.5 text-[12px] text-slate-500 mt-1">
          <MapPin size={12} /> {lead.address}
        </div>
        {lead.customerPhone && (
          <div className="flex items-center gap-1.5 text-[12px] text-slate-500 mt-0.5">
            <Phone size={12} /> {lead.customerPhone}
          </div>
        )}
      </div>

      {/* Brand */}
      <div className="flex items-center gap-2 p-2.5 rounded-lg" style={{ background: brand.color + '10' }}>
        <span className="text-lg">{brand.icon}</span>
        <div>
          <div className="text-[12px] font-bold" style={{ color: brand.color }}>{brand.name}</div>
          <div className="text-[10px] text-slate-500">Recommended service</div>
        </div>
      </div>

      {/* Lead description */}
      <div className="bg-slate-50 rounded-lg p-3">
        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Worker Notes</div>
        <p className="text-[12px] text-slate-700 leading-relaxed">{lead.text}</p>
      </div>

      {/* Type-specific info */}
      {lead.type === 'observation' && (
        <div className="space-y-2">
          <InfoRow label="Urgency" value={lead.urgency} />
          <InfoRow label="Mentioned to customer" value={lead.mentioned} />
          {lead.photo && <InfoRow label="Photo" value="📷 Attached" />}
        </div>
      )}
      {lead.type === 'request' && (
        <div className="space-y-2">
          <InfoRow label="Interest level" value={lead.interest} highlight={lead.interest === 'Ready to book'} />
          <InfoRow label="Wants callback" value={lead.wantsCallback ? '✅ Yes' : 'No'} highlight={lead.wantsCallback} />
        </div>
      )}
      {lead.type === 'brochure' && (
        <div className="space-y-2">
          <InfoRow label="Placement" value={lead.location} />
          <InfoRow label="Discount code" value={lead.code} mono />
        </div>
      )}
      {lead.type === 'neighbor' && (
        <div className="p-2.5 bg-violet-50 border border-violet-200 rounded-lg">
          <p className="text-[11px] text-violet-700 font-medium">⚠️ Non-customer — no contact info. Requires door-knock or mailer.</p>
        </div>
      )}
      {lead.photo && (
        <div className="rounded-lg overflow-hidden">
          <img src={`/images/leads/${lead.id}.jpg`} alt="Worker observation photo" className="w-full h-40 object-cover rounded-lg" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="h-32 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm">[Photo not available]</div>'; }} />
        </div>
      )}

      {/* Source info */}
      <div className="text-[11px] text-slate-400 space-y-1 border-t border-slate-100 pt-3">
        <div className="flex justify-between"><span>Submitted by:</span> <span className="font-medium text-slate-600">{lead.worker}</span></div>
        <div className="flex justify-between"><span>During job:</span> <span className="font-medium text-slate-600">{lead.jobRef}</span></div>
        <div className="flex justify-between"><span>Time:</span> <span className="font-medium text-slate-600">{new Date(lead.createdAt).toLocaleString()}</span></div>
      </div>

      {/* Action buttons */}
      <div className="space-y-2 pt-2">
        {lead.status === 'new' && (
          <>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-lg text-[12px] font-bold hover:bg-blue-700 transition-colors">
              <Phone size={14} /> Call Customer Now
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-purple-600 text-white rounded-lg text-[12px] font-bold hover:bg-purple-700 transition-colors">
              <Calendar size={14} /> Schedule Assessment
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[12px] font-semibold hover:bg-slate-50 transition-colors">
              <MessageSquare size={14} /> Send Email Campaign
            </button>
          </>
        )}
        {lead.status === 'reviewing' && (
          <>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white rounded-lg text-[12px] font-bold hover:bg-blue-700 transition-colors">
              <Phone size={14} /> Contact Customer
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-[12px] font-semibold hover:bg-slate-200 transition-colors">
              <ArrowRight size={14} /> Assign to {brands[lead.brand]?.name}
            </button>
          </>
        )}
        {(lead.status === 'contacted' || lead.status === 'quoted') && (
          <>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-lg text-[12px] font-bold hover:bg-emerald-700 transition-colors">
              <CheckCircle2 size={14} /> Mark as Booked
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[12px] font-semibold hover:bg-slate-50 transition-colors">
              <XCircle size={14} /> Mark as Lost
            </button>
          </>
        )}
        {lead.status === 'booked' && (
          <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span className="text-[12px] font-bold text-emerald-700">Converted! Bounty paid to {lead.worker}.</span>
          </div>
        )}
      </div>
    </div>
  )
}

function InfoRow({ label, value, highlight, mono }) {
  return (
    <div className="flex items-center justify-between py-1.5 px-3 bg-slate-50 rounded-lg">
      <span className="text-[11px] text-slate-500">{label}</span>
      <span className={`text-[11px] font-semibold ${highlight ? 'text-red-600' : 'text-slate-700'} ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  )
}

function getTimeSince(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}
