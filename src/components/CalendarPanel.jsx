import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { brands, people, customers } from '../data/mockData'

const hours = Array.from({ length: 12 }, (_, i) => i + 7)

export function CalendarPanel({ context }) {
  const { bookings } = context
  const [currentDate, setCurrentDate] = useState('2026-06-20')
  const [viewMode, setViewMode] = useState('day')

  const dates = viewMode === 'day'
    ? [currentDate]
    : Array.from({ length: 7 }, (_, i) => {
        const d = new Date(currentDate)
        d.setDate(d.getDate() - d.getDay() + i + 1)
        return d.toISOString().split('T')[0]
      })

  const dayBookings = (date) => bookings.filter(b => b.date === date)

  const prevDay = () => {
    const d = new Date(currentDate)
    d.setDate(d.getDate() - (viewMode === 'day' ? 1 : 7))
    setCurrentDate(d.toISOString().split('T')[0])
  }
  const nextDay = () => {
    const d = new Date(currentDate)
    d.setDate(d.getDate() + (viewMode === 'day' ? 1 : 7))
    setCurrentDate(d.toISOString().split('T')[0])
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Schedule</h2>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button onClick={() => setViewMode('day')} className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === 'day' ? 'bg-white shadow-sm font-medium' : 'text-slate-600'}`}>Day</button>
            <button onClick={() => setViewMode('week')} className={`px-3 py-1 text-sm rounded-md transition-colors ${viewMode === 'week' ? 'bg-white shadow-sm font-medium' : 'text-slate-600'}`}>Week</button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prevDay} className="p-1 hover:bg-slate-100 rounded"><ChevronLeft size={18} /></button>
            <span className="text-sm font-medium text-slate-700 min-w-[120px] text-center">{currentDate}</span>
            <button onClick={nextDay} className="p-1 hover:bg-slate-100 rounded"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto border border-slate-200 rounded-lg">
        <div className="flex min-w-0">
          <div className="w-16 shrink-0 border-r border-slate-100">
            <div className="h-10 border-b border-slate-100"></div>
            {hours.map(h => (
              <div key={h} className="h-16 border-b border-slate-50 flex items-start justify-end pr-2 pt-1">
                <span className="text-xs text-slate-400">{h}:00</span>
              </div>
            ))}
          </div>

          <div className={`flex-1 grid ${viewMode === 'week' ? 'grid-cols-7' : 'grid-cols-1'}`}>
            {dates.map(date => (
              <div key={date} className="border-r border-slate-100 last:border-r-0 min-w-0">
                <div className="h-10 border-b border-slate-100 flex items-center justify-center">
                  <span className={`text-xs font-medium ${date === '2026-06-20' ? 'text-truenorth-600' : 'text-slate-600'}`}>
                    {new Date(date + 'T00:00:00').toLocaleDateString('en', { weekday: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="relative">
                  {hours.map(h => (
                    <div key={h} className="h-16 border-b border-slate-50"></div>
                  ))}
                  {dayBookings(date).map(b => {
                    const brand = brands.find(br => br.id === b.brandId)
                    const worker = people.find(p => p.id === b.workerId)
                    const customer = customers.find(c => c.id === b.customerId)
                    const startHour = parseInt(b.time.split(':')[0])
                    const startMin = parseInt(b.time.split(':')[1])
                    const top = (startHour - 7) * 64 + (startMin / 60) * 64
                    const height = Math.max((b.duration / 60) * 64, 32)
                    return (
                      <div
                        key={b.id}
                        className="absolute left-1 right-1 rounded-md px-2 py-1 text-xs text-white overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        style={{ background: brand.color, top: `${top}px`, height: `${height}px` }}
                        title={`${brand.service} - ${customer?.name}\n${worker?.name || 'Unassigned'}\n${b.time} (${b.duration}min)`}
                      >
                        <div className="font-medium truncate">{brand.service}</div>
                        {height > 40 && <div className="truncate opacity-80">{customer?.name}</div>}
                        {height > 56 && <div className="truncate opacity-70">{worker?.name || 'Unassigned'}</div>}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
