import { useState } from 'react'
import { Building2, Phone, Mail, Calendar, CheckCircle2, Clock, XCircle, FileText, MapPin } from 'lucide-react'
import { brands } from '../../data/mockData'

const prospects = [
  { id: 'fs1', name: 'Robert Kim', email: 'rkim@email.com', phone: '416-555-2201', city: 'Toronto', interest: ['clean', 'lawn'], capital: '$80-120k', experience: 'Former restaurant manager, 15 years', stage: 'application', score: 82, appliedAt: '2026-06-18', notes: 'Strong operational background. Interested in Scarborough territory.' },
  { id: 'fs2', name: 'Patricia Okafor', email: 'pokafor@email.com', phone: '403-555-3301', city: 'Calgary', interest: ['lawn'], capital: '$60-90k', experience: 'Landscaping business owner, 8 years', stage: 'interview', score: 91, appliedAt: '2026-06-12', notes: 'Already runs small lawn company. Wants to convert to franchise model. Excellent fit.' },
  { id: 'fs3', name: 'Jean-Pierre Dubois', email: 'jpdubois@email.com', phone: '604-555-4401', city: 'Vancouver', interest: ['clean'], capital: '$100-150k', experience: 'Property management, 10 years', stage: 'discovery', score: 75, appliedAt: '2026-06-20', notes: 'Inquiry through website. Wants to explore Vancouver market.' },
  { id: 'fs4', name: 'Samantha Lee', email: 'slee@email.com', phone: '416-555-5501', city: 'Toronto', interest: ['handyman', 'junk'], capital: '$50-80k', experience: 'General contractor, 6 years', stage: 'approved', score: 88, appliedAt: '2026-05-28', notes: 'Approved for Etobicoke territory. Accelerator funding in process.' },
  { id: 'fs5', name: 'Marcus Chen', email: 'mchen@email.com', phone: '416-555-6601', city: 'Toronto', interest: ['deck'], capital: '$120-180k', experience: 'Deck building company owner, 12 years', stage: 'interview', score: 85, appliedAt: '2026-06-15', notes: 'Existing deck builder. Interested in franchise support & lead-gen platform.' },
  { id: 'fs6', name: 'Angela Rivera', email: 'arivera@email.com', phone: '403-555-7701', city: 'Calgary', interest: ['clean', 'handyman'], capital: '$70-100k', experience: 'Hotel housekeeping manager, 9 years', stage: 'declined', score: 45, appliedAt: '2026-06-01', notes: 'Insufficient capital. Invited to reapply when ready.' },
  { id: 'fs7', name: 'Trevor Singh', email: 'tsingh@email.com', phone: '416-555-8801', city: 'Toronto', interest: ['lawn', 'junk'], capital: '$90-130k', experience: 'Fleet management, 7 years', stage: 'application', score: 78, appliedAt: '2026-06-19', notes: 'Good fleet experience. Could cover North York territory.' },
]

const stageConf = {
  discovery: { label: 'Discovery', color: 'bg-slate-100 text-slate-600', icon: Phone },
  application: { label: 'Application', color: 'bg-blue-100 text-blue-700', icon: FileText },
  interview: { label: 'Interview', color: 'bg-violet-100 text-violet-700', icon: Calendar },
  approved: { label: 'Approved', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  declined: { label: 'Declined', color: 'bg-red-100 text-red-700', icon: XCircle },
}

export function FranchiseSales() {
  const [selected, setSelected] = useState(null)
  const stageOrder = ['discovery', 'application', 'interview', 'approved', 'declined']

  return (
    <div className="h-full flex gap-5 overflow-hidden">
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 size={20} className="text-truenorth-500" />
            Franchise Sales CRM
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Prospect pipeline &bull; New franchisee applications</p>
        </div>

        {/* Pipeline stages */}
        <div className="grid grid-cols-5 gap-3">
          {stageOrder.map(stage => {
            const conf = stageConf[stage]
            const Icon = conf.icon
            const count = prospects.filter(p => p.stage === stage).length
            return (
              <div key={stage} className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center ${conf.color}`}>
                    <Icon size={10} />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-600">{conf.label}</span>
                </div>
                <div className="text-lg font-black text-slate-900">{count}</div>
              </div>
            )
          })}
        </div>

        {/* Prospect list */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-4 flex-1 overflow-auto">
          <div className="space-y-2">
            {prospects.map(p => {
              const conf = stageConf[p.stage]
              const Icon = conf.icon
              return (
                <div key={p.id} onClick={() => setSelected(p)} className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all ${selected?.id === p.id ? 'border-truenorth-300 bg-truenorth-50' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'}`}>
                  <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
                    {p.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-slate-800">{p.name}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2">
                      <MapPin size={9} /> {p.city}
                      <span>&bull;</span>
                      Capital: {p.capital}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.interest.map(bId => {
                      const b = brands.find(x => x.id === bId)
                      return <div key={bId} className="w-4 h-4 rounded-full" style={{ background: b?.color }} title={b?.name} />
                    })}
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${conf.color}`}>
                      <Icon size={9} /> {conf.label}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Score: {p.score}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="w-72 bg-white rounded-2xl border border-slate-100 shadow-card p-5 overflow-auto shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">{selected.name}</h3>
            <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 text-xs">✕</button>
          </div>
          <div className="space-y-3 text-[11px]">
            <Row label="Email" value={selected.email} />
            <Row label="Phone" value={selected.phone} />
            <Row label="City" value={selected.city} />
            <Row label="Capital" value={selected.capital} />
            <Row label="Experience" value={selected.experience} />
            <Row label="Applied" value={selected.appliedAt} />
            <Row label="Score" value={`${selected.score}/100`} />
            <div className="border-t border-slate-100 pt-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Interested In</div>
              <div className="flex gap-1.5">
                {selected.interest.map(bId => {
                  const b = brands.find(x => x.id === bId)
                  return (
                    <span key={bId} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: b?.color + '20', color: b?.color }}>
                      {b?.service}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="border-t border-slate-100 pt-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Notes</div>
              <div className="text-[11px] text-slate-600 leading-relaxed">{selected.notes}</div>
            </div>
            {selected.stage !== 'declined' && selected.stage !== 'approved' && (
              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-2 rounded-lg bg-truenorth-500 text-white text-[10px] font-bold">Advance Stage</button>
                <button className="py-2 px-3 rounded-lg border border-slate-200 text-slate-600 text-[10px] font-bold">Decline</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-slate-700 text-right max-w-[60%]">{value}</span>
    </div>
  )
}
