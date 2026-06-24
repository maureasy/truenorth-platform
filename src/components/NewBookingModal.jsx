import { useState } from 'react'
import { X } from 'lucide-react'
import { brands, customers, people } from '../data/mockData'

export function NewBookingModal({ onClose }) {
  const [form, setForm] = useState({
    customerId: '',
    brandId: '',
    workerId: '',
    date: '2026-06-22',
    time: '09:00',
    duration: 60,
    notes: '',
  })

  const availableWorkers = people.filter(p => !form.brandId || p.brandId === form.brandId)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Booking created!\n\n${JSON.stringify(form, null, 2)}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/30 glass" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-elevated w-full max-w-md p-7 z-10 border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">New Booking</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors"><X size={18} className="text-slate-400" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Customer</label>
            <select className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-truenorth-500/20 focus:border-truenorth-400 outline-none transition-all" value={form.customerId} onChange={e => setForm({ ...form, customerId: e.target.value })} required>
              <option value="">Select customer...</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name} — {c.address}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Service</label>
            <select className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-truenorth-500/20 focus:border-truenorth-400 outline-none transition-all" value={form.brandId} onChange={e => setForm({ ...form, brandId: e.target.value, workerId: '' })} required>
              <option value="">Select service...</option>
              {brands.map(b => <option key={b.id} value={b.id}>{b.service}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Assign Worker</label>
            <select className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-truenorth-500/20 focus:border-truenorth-400 outline-none transition-all" value={form.workerId} onChange={e => setForm({ ...form, workerId: e.target.value })}>
              <option value="">Auto-assign (or pick below)</option>
              {availableWorkers.map(p => <option key={p.id} value={p.id}>{p.name} — {p.role}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Date</label>
              <input type="date" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-truenorth-500/20 focus:border-truenorth-400 outline-none transition-all" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Time</label>
              <input type="time" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-truenorth-500/20 focus:border-truenorth-400 outline-none transition-all" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Duration</label>
              <select className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-truenorth-500/20 focus:border-truenorth-400 outline-none transition-all" value={form.duration} onChange={e => setForm({ ...form, duration: parseInt(e.target.value) })}>
                <option value={30}>30 min</option>
                <option value={60}>1 hr</option>
                <option value={90}>1.5 hr</option>
                <option value={120}>2 hr</option>
                <option value={180}>3 hr</option>
                <option value={240}>4 hr</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Notes</label>
            <textarea className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-truenorth-500/20 focus:border-truenorth-400 outline-none transition-all h-20 resize-none" placeholder="Special instructions..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          </div>

          <div className="flex gap-3 pt-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-truenorth-500 to-truenorth-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-truenorth-500/25 transition-all duration-200">Create Booking</button>
          </div>
        </form>
      </div>
    </div>
  )
}
