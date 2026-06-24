import { useState } from 'react'
import { Phone, Mail, MapPin, Crown, DollarSign } from 'lucide-react'
import { brands, bookings } from '../data/mockData'

export function CustomerPanel({ context }) {
  const { customers } = context
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [filterMember, setFilterMember] = useState('all')

  const filtered = customers.filter(c => {
    if (filterMember === 'member' && !c.member) return false
    if (filterMember === 'non-member' && c.member) return false
    return true
  })

  return (
    <div className="flex h-full gap-4">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Customers</h2>
          <select className="border border-slate-300 rounded-md px-2 py-1 text-sm bg-white" value={filterMember} onChange={e => setFilterMember(e.target.value)}>
            <option value="all">All Customers</option>
            <option value="member">Members Only</option>
            <option value="non-member">Non-Members</option>
          </select>
        </div>
        <div className="space-y-3 overflow-auto">
          {filtered.map(c => (
            <div
              key={c.id}
              onClick={() => setSelectedCustomer(selectedCustomer?.id === c.id ? null : c)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedCustomer?.id === c.id ? 'border-truenorth-500 bg-truenorth-50 ring-1 ring-truenorth-200' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">
                    {c.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{c.name}</span>
                      {c.member && <Crown size={14} className="text-amber-500 fill-amber-200" />}
                    </div>
                    <div className="text-xs text-slate-500">{c.address}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900">${c.totalSpend.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">total spend</div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3">
                {c.servicesUsed.map(sid => {
                  const brand = brands.find(b => b.id === sid)
                  return brand ? (
                    <span key={sid} className="text-xs px-2 py-0.5 rounded-full font-medium text-white" style={{ background: brand.color }}>
                      {brand.service}
                    </span>
                  ) : null
                })}
                <span className="text-xs text-slate-400 ml-auto">Last: {c.lastService}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCustomer && (
        <div className="w-72 shrink-0 border-l border-slate-200 pl-4 overflow-auto">
          <CustomerDetail customer={selectedCustomer} />
        </div>
      )}
    </div>
  )
}

function CustomerDetail({ customer }) {
  const customerBookings = bookings.filter(b => b.customerId === customer.id)

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg">
          {customer.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-bold text-slate-900">{customer.name}</div>
          {customer.member && <div className="text-xs text-amber-600 font-medium flex items-center gap-1"><Crown size={12} /> Member since {customer.memberSince}</div>}
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-slate-600"><Phone size={14} /> {customer.phone}</div>
        <div className="flex items-center gap-2 text-slate-600"><Mail size={14} /> {customer.email}</div>
        <div className="flex items-center gap-2 text-slate-600"><MapPin size={14} /> {customer.address}</div>
        <div className="flex items-center gap-2 text-slate-600"><DollarSign size={14} /> ${customer.totalSpend.toLocaleString()} lifetime</div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-semibold text-slate-700 mb-2">Services Used</div>
        <div className="flex flex-wrap gap-1">
          {customer.servicesUsed.map(sid => {
            const brand = brands.find(b => b.id === sid)
            return brand ? (
              <span key={sid} className="text-xs px-2 py-1 rounded-full font-medium text-white" style={{ background: brand.color }}>
                {brand.service}
              </span>
            ) : null
          })}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs font-semibold text-slate-700 mb-2">Booking History</div>
        <div className="space-y-2">
          {customerBookings.length === 0 && <div className="text-xs text-slate-400">No bookings found</div>}
          {customerBookings.map(b => {
            const brand = brands.find(br => br.id === b.brandId)
            return (
              <div key={b.id} className="border border-slate-100 rounded p-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium" style={{ color: brand?.color }}>{brand?.service}</span>
                  <span className="text-slate-400">{b.date}</span>
                </div>
                <div className="text-slate-500 mt-1">{b.status} • {b.duration} min</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
