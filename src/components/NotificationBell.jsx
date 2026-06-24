import { useState } from 'react'
import { Bell, Share2, Calendar, AlertTriangle, CheckCircle, MapPin } from 'lucide-react'
import { notifications } from '../data/mockData'

const typeIcons = {
  referral: Share2,
  booking: Calendar,
  sla: AlertTriangle,
  conversion: CheckCircle,
  checkin: MapPin,
}

const typeColors = {
  referral: 'text-purple-600 bg-purple-50',
  booking: 'text-blue-600 bg-blue-50',
  sla: 'text-red-600 bg-red-50',
  conversion: 'text-green-600 bg-green-50',
  checkin: 'text-slate-600 bg-slate-50',
}

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const unread = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl hover:bg-slate-100 transition-all duration-150"
      >
        <Bell size={19} className="text-slate-500" strokeWidth={1.8} />
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold ring-2 ring-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 w-96 bg-white border border-slate-200/80 rounded-2xl shadow-elevated z-50 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">Notifications</span>
              <span className="text-[11px] text-truenorth-500 font-semibold cursor-pointer hover:text-truenorth-700 transition-colors">Mark all read</span>
            </div>
            <div className="max-h-[420px] overflow-auto">
              {notifications.map(n => {
                const Icon = typeIcons[n.type] || Bell
                return (
                  <div key={n.id} className={`px-5 py-3.5 border-b border-slate-50 hover:bg-slate-50/80 cursor-pointer transition-colors ${!n.read ? 'bg-truenorth-50/20' : ''}`}>
                    <div className="flex gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${typeColors[n.type]}`}>
                        <Icon size={15} strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-semibold text-slate-900">{n.title}</span>
                          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-truenorth-500" />}
                        </div>
                        <div className="text-[12px] text-slate-500 mt-0.5 leading-relaxed">{n.message}</div>
                        <div className="text-[11px] text-slate-400 mt-1 font-medium">{new Date(n.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
