import { Clock, User, Wrench } from 'lucide-react'
import { brands, people, customers, assets } from '../data/mockData'

const statusStyles = {
  pending: 'bg-slate-100 text-slate-600',
  scheduled: 'bg-amber-50 text-amber-700 border border-amber-200/60',
  in_progress: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
  completed: 'bg-blue-50 text-blue-700 border border-blue-200/60',
  cancelled: 'bg-red-50 text-red-600 border border-red-200/60',
}

const statusLabels = {
  pending: 'Pending',
  scheduled: 'Scheduled',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export function BookingPanel({ context, compact }) {
  const { bookings, selectedBooking, setSelectedBooking } = context

  return (
    <div className="space-y-3">
      {!compact && <h2 className="text-lg font-bold text-slate-900 mb-4">Bookings</h2>}
      {bookings.map(b => {
        const brand = brands.find(x => x.id === b.brandId)
        const customer = customers.find(c => c.id === b.customerId)
        const worker = people.find(p => p.id === b.workerId)
        const assetNames = b.assetIds.map(id => assets.find(a => a.id === id)?.name).filter(Boolean).join(', ')
        return (
          <div
            key={b.id}
            onClick={() => setSelectedBooking(selectedBooking?.id === b.id ? null : b)}
            className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
              selectedBooking?.id === b.id
                ? 'border-truenorth-400 bg-truenorth-50/50 ring-2 ring-truenorth-500/10 shadow-card-hover'
                : 'border-slate-100 hover:border-slate-200 hover:shadow-card-hover bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm" style={{ background: brand.color }} />
                <span className="font-semibold text-slate-900 text-[13px]">{brand.service}</span>
                <span className="text-[11px] text-slate-400 font-medium">{b.date} &bull; {b.time}</span>
              </div>
              <span className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold ${statusStyles[b.status]}`}>{statusLabels[b.status]}</span>
            </div>
            <div className="text-[13px] text-slate-700 mt-2 font-medium">{customer.name} <span className="text-slate-400 font-normal">&bull; {b.address}</span></div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
              <span className="flex items-center gap-1"><User size={11} /> {worker ? worker.name : <span className="text-amber-500">Unassigned</span>}</span>
              {assetNames && <span className="flex items-center gap-1"><Wrench size={11} /> {assetNames}</span>}
              <span className="flex items-center gap-1"><Clock size={11} /> {b.duration} min</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
