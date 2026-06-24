import { useState } from 'react'
import { Star, Phone, Mail, MapPin, Award, Clock, Briefcase, DollarSign } from 'lucide-react'
import { brands } from '../data/mockData'

const statusConfig = {
  available: { label: 'Available', dot: 'bg-green-400', bg: 'bg-green-50 text-green-700 border-green-200' },
  on_job: { label: 'On Job', dot: 'bg-blue-400 animate-pulse', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
  off_duty: { label: 'Off Duty', dot: 'bg-slate-300', bg: 'bg-slate-50 text-slate-600 border-slate-200' },
  on_break: { label: 'On Break', dot: 'bg-amber-400', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
}

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export function PeoplePanel({ context }) {
  const { people } = context
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [filterBrand, setFilterBrand] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filtered = people.filter(p => {
    if (filterBrand !== 'all' && p.brandId !== filterBrand) return false
    if (filterStatus !== 'all' && p.status !== filterStatus) return false
    return true
  })

  return (
    <div className="flex h-full gap-5">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">People & Crews</h2>
            <p className="text-xs text-slate-400 mt-0.5">{filtered.length} workers &bull; {filtered.filter(p => p.status === 'available').length} available now</p>
          </div>
          <div className="flex gap-2">
            <select className="border border-slate-200 rounded-xl px-3 py-1.5 text-[13px] bg-white font-medium text-slate-700" value={filterBrand} onChange={e => setFilterBrand(e.target.value)}>
              <option value="all">All Services</option>
              {brands.map(b => <option key={b.id} value={b.id}>{b.service}</option>)}
            </select>
            <select className="border border-slate-200 rounded-xl px-3 py-1.5 text-[13px] bg-white font-medium text-slate-700" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="on_job">On Job</option>
              <option value="off_duty">Off Duty</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 overflow-auto">
          {filtered.map(p => {
            const brand = brands.find(b => b.id === p.brandId)
            const status = statusConfig[p.status]
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPerson(selectedPerson?.id === p.id ? null : p)}
                className={`border rounded-2xl p-4 cursor-pointer transition-all duration-200 group ${
                  selectedPerson?.id === p.id
                    ? 'border-truenorth-400 bg-truenorth-50/30 ring-2 ring-truenorth-500/10 shadow-card-hover'
                    : 'border-slate-100 hover:border-slate-200 hover:shadow-card-hover bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img src={p.photo} alt={p.name} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                    <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${status.dot}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-slate-900 text-[13px] truncate">{p.name}</div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star size={12} className="fill-amber-400" />
                        <span className="text-[12px] font-bold">{p.rating}</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{p.role}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-2 h-2 rounded-full" style={{ background: brand.color }} />
                      <span className="text-[11px] font-medium" style={{ color: brand.color }}>{brand.service}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1"><Briefcase size={11} /> {p.jobsCompleted}</span>
                    <span className="flex items-center gap-1 text-green-600"><DollarSign size={11} />{p.bountyEarned}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-lg font-semibold border ${status.bg}`}>{status.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedPerson && (
        <div className="w-80 shrink-0 border-l border-slate-100 pl-5 overflow-auto">
          <PersonDetail person={selectedPerson} />
        </div>
      )}
    </div>
  )
}

function PersonDetail({ person }) {
  const brand = brands.find(b => b.id === person.brandId)
  const status = statusConfig[person.status]
  return (
    <div>
      <div className="text-center mb-5">
        <div className="relative inline-block">
          <img src={person.photo} alt={person.name} className="w-20 h-20 rounded-2xl object-cover shadow-md mx-auto" />
          <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-3 border-white ${status.dot}`} />
        </div>
        <div className="font-bold text-slate-900 mt-3 text-base">{person.name}</div>
        <div className="text-[13px] text-slate-500">{person.role}</div>
        <div className="flex items-center justify-center gap-1 mt-1">
          <span className="w-2 h-2 rounded-full" style={{ background: brand.color }} />
          <span className="text-[12px] font-medium" style={{ color: brand.color }}>{brand.service}</span>
        </div>
        <div className="flex items-center justify-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < Math.floor(person.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
          ))}
          <span className="text-[12px] font-bold text-slate-700 ml-1">{person.rating}</span>
        </div>
      </div>

      <div className="space-y-2.5 text-[13px]">
        <div className="flex items-center gap-2.5 text-slate-600 bg-slate-50 rounded-xl px-3 py-2"><Phone size={14} className="text-slate-400" /> {person.phone}</div>
        <div className="flex items-center gap-2.5 text-slate-600 bg-slate-50 rounded-xl px-3 py-2"><Mail size={14} className="text-slate-400" /> {person.email}</div>
        <div className="flex items-center gap-2.5 text-slate-600 bg-slate-50 rounded-xl px-3 py-2"><Award size={14} className="text-slate-400" /> Hired {new Date(person.hireDate).toLocaleDateString('en-CA', { month: 'short', year: 'numeric' })}</div>
      </div>

      <div className="mt-5">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Skills</div>
        <div className="flex flex-wrap gap-1.5">
          {person.skills.map(s => (
            <span key={s} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">{s}</span>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-slate-900">{person.jobsCompleted}</div>
          <div className="text-[10px] text-slate-400 font-medium">Jobs Done</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-slate-900">{person.referralsGenerated}</div>
          <div className="text-[10px] text-slate-400 font-medium">Referrals</div>
        </div>
        <div className="bg-green-50 rounded-xl p-3 text-center col-span-2">
          <div className="text-xl font-bold text-green-700">${person.bountyEarned}</div>
          <div className="text-[10px] text-slate-400 font-medium">Total Bounties Earned</div>
        </div>
      </div>

      <div className="mt-5">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Weekly Availability</div>
        <div className="flex gap-1.5">
          {days.map((d, i) => (
            <div key={d} className={`flex-1 h-9 rounded-lg text-[11px] flex items-center justify-center font-semibold transition-colors ${
              person.availability[d] ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-300'
            }`}>
              {dayLabels[i]}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
