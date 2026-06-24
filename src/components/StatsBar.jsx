import { CalendarDays, DollarSign, TrendingUp, Truck, Users } from 'lucide-react'

export function StatsBar({ stats }) {
  const items = [
    { label: 'Active Bookings', value: stats.activeBookings, icon: CalendarDays, iconColor: 'text-blue-500', bg: 'bg-blue-50', accent: 'from-blue-400 to-blue-600' },
    { label: 'Open Referrals', value: stats.openReferrals, icon: TrendingUp, iconColor: 'text-violet-500', bg: 'bg-violet-50', accent: 'from-violet-400 to-violet-600' },
    { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: Users, iconColor: 'text-emerald-500', bg: 'bg-emerald-50', accent: 'from-emerald-400 to-emerald-600' },
    { label: 'Today Revenue', value: `$${stats.todayRevenue.toLocaleString()}`, icon: DollarSign, iconColor: 'text-amber-500', bg: 'bg-amber-50', accent: 'from-amber-400 to-amber-600' },
    { label: 'Fleet Utilization', value: `${stats.fleetUtilization}%`, icon: Truck, iconColor: 'text-slate-500', bg: 'bg-slate-50', accent: 'from-slate-400 to-slate-600' },
  ]

  return (
    <div className="bg-white/60 glass border-b border-slate-200/40 px-6 py-2.5 grid grid-cols-5 gap-6 shrink-0">
      {items.map(item => (
        <div key={item.label} className="flex items-center gap-3 group">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.bg} ${item.iconColor} transition-transform duration-200 group-hover:scale-110`}>
            <item.icon size={17} strokeWidth={2} />
          </div>
          <div>
            <div className="text-base font-bold text-slate-900 tracking-tight">{item.value}</div>
            <div className="text-[11px] text-slate-400 font-medium">{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
