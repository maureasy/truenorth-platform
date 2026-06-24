import { useState } from 'react'
import { Home, Calendar, Star, Bell, ChevronRight, Shield, Clock, CheckCircle2, Plus } from 'lucide-react'

export function CustomerMobile() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="h-full flex items-center justify-center gap-10">
      {/* Phone frame */}
      <div className="w-[375px] h-[750px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-slate-900 rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[2.4rem] overflow-hidden flex flex-col">
          {/* Status bar */}
          <div className="h-12 flex items-end justify-between px-6 pb-1 text-[11px] font-semibold text-slate-500">
            <span>9:41</span>
            <span className="flex gap-1">📶 🔋</span>
          </div>

          {/* Header */}
          <div className="px-5 pt-2 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[16px] font-bold text-slate-900">Hi, Alice 👋</div>
                <div className="text-[12px] text-slate-400 mt-0.5">
                  <span className="text-emerald-600 font-semibold">Gold Member</span> &bull; 123 Bloor St W
                </div>
              </div>
              <div className="relative">
                <Bell size={20} className="text-slate-400" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">1</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {activeTab === 'home' && (
              <div className="px-5 pb-5">
                {/* Next visit */}
                <div className="bg-gradient-to-br from-truenorth-500 to-truenorth-600 rounded-2xl p-4 text-white mb-4">
                  <div className="text-[11px] opacity-70 font-medium">NEXT VISIT</div>
                  <div className="text-[16px] font-bold mt-1">Lawn Mow & Edge</div>
                  <div className="flex items-center gap-2 mt-2 text-[12px] opacity-90">
                    <Clock size={13} />
                    <span>Tomorrow, 10:00 AM</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[12px] opacity-90">
                    <span>🌿</span>
                    <span>TrueGreen &bull; Marcus O.</span>
                  </div>
                </div>

                {/* Subscription card */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Shield size={14} className="text-amber-600" />
                        <span className="text-[12px] font-bold text-amber-700">Gold Membership</span>
                      </div>
                      <div className="text-[11px] text-amber-600 mt-1">Lawn + Snow + 10% off all services</div>
                    </div>
                    <ChevronRight size={16} className="text-amber-400" />
                  </div>
                </div>

                {/* Quick actions */}
                <div className="text-[11px] font-bold text-slate-500 uppercase mb-2">Quick Actions</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-center active:bg-slate-100">
                    <Plus size={18} className="text-truenorth-500 mx-auto" />
                    <div className="text-[11px] font-semibold text-slate-700 mt-1">Book a Service</div>
                  </button>
                  <button className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-center active:bg-slate-100">
                    <Calendar size={18} className="text-truenorth-500 mx-auto" />
                    <div className="text-[11px] font-semibold text-slate-700 mt-1">Reschedule</div>
                  </button>
                </div>

                {/* My home status */}
                <div className="text-[11px] font-bold text-slate-500 uppercase mb-2">My Home</div>
                <div className="space-y-2">
                  <HomeItem icon="🌿" service="Lawn Care" status="Active" next="Tomorrow" color="emerald" />
                  <HomeItem icon="🪵" service="Deck" status="Quote sent" next="Pending your approval" color="amber" />
                  <HomeItem icon="✨" service="Cleaning" status="Not subscribed" next="Add service" color="slate" />
                  <HomeItem icon="❄️" service="Snow Removal" status="Seasonal (Nov-Mar)" next="Starts Nov 1" color="blue" />
                </div>

                {/* Recent activity */}
                <div className="text-[11px] font-bold text-slate-500 uppercase mb-2 mt-5">Recent</div>
                <div className="space-y-2.5">
                  <ActivityItem text="Lawn mowed & edged" time="Jun 19" worker="Marcus O." done />
                  <ActivityItem text="DeckRevive quote: $1,240" time="Jun 18" worker="Sent by email" quote />
                  <ActivityItem text="Lawn mowed & edged" time="Jun 12" worker="Marcus O." done />
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="px-5 pb-5">
                <div className="text-[13px] font-bold text-slate-900 mb-3">Available Services</div>
                <div className="space-y-2.5">
                  <ServiceCard icon="🌿" brand="TrueGreen" service="Lawn Care" desc="Weekly mow, edge, and trim" price="$45/visit" subscribed />
                  <ServiceCard icon="✨" brand="SparkleClean" service="House Cleaning" desc="Deep clean or regular maintenance" price="From $120" />
                  <ServiceCard icon="🪵" brand="DeckRevive" service="Deck & Fence" desc="Staining, repair, restoration" price="Get a quote" />
                  <ServiceCard icon="🔧" brand="FixRight" service="Handyman" desc="Repairs, installs, odd jobs" price="$85/hr" />
                  <ServiceCard icon="🚛" brand="CleanSlate" service="Junk Removal" desc="Haul-away and disposal" price="From $150" />
                  <ServiceCard icon="❄️" brand="TrueGreen" service="Snow Removal" desc="Driveway & walkway clearing" price="$55/visit" subscribed />
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="px-5 pb-5">
                <div className="text-[13px] font-bold text-slate-900 mb-3">Visit History</div>
                <div className="space-y-3">
                  {[
                    { date: 'Jun 19', service: 'Lawn Mow & Edge', brand: '🌿', worker: 'Marcus O.', rating: 5 },
                    { date: 'Jun 12', service: 'Lawn Mow & Edge', brand: '🌿', worker: 'Marcus O.', rating: 5 },
                    { date: 'Jun 5', service: 'Lawn Mow & Edge', brand: '🌿', worker: 'Marcus O.', rating: 4 },
                    { date: 'May 29', service: 'Junk Removal', brand: '🚛', worker: 'David P.', rating: 5 },
                    { date: 'May 22', service: 'Lawn Mow & Edge', brand: '🌿', worker: 'Marcus O.', rating: 5 },
                    { date: 'May 15', service: 'Handyman - Fence Fix', brand: '🔧', worker: 'Sarah C.', rating: 5 },
                  ].map((v, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="text-lg">{v.brand}</div>
                      <div className="flex-1">
                        <div className="text-[12px] font-semibold text-slate-900">{v.service}</div>
                        <div className="text-[10px] text-slate-400">{v.worker} &bull; {v.date}</div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: v.rating }).map((_, j) => (
                          <Star key={j} size={10} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom nav bar */}
          <div className="h-16 border-t border-slate-100 flex items-center justify-around px-4">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'services', icon: Plus, label: 'Services' },
              { id: 'history', icon: Clock, label: 'History' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="text-center">
                <tab.icon size={20} className={activeTab === tab.id ? 'text-truenorth-500 mx-auto' : 'text-slate-300 mx-auto'} />
                <div className={`text-[9px] mt-0.5 ${activeTab === tab.id ? 'text-truenorth-600 font-bold' : 'text-slate-400'}`}>{tab.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Description sidebar */}
      <div className="w-72">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Customer Mobile App</h2>
        <p className="text-[13px] text-slate-500 leading-relaxed mb-5">
          The homeowner's single pane of glass for all TrueNorth services — subscription management, booking, and home health tracking.
        </p>
        <div className="space-y-4">
          <Step num={1} title="See what's coming" desc="Next visit, who's coming, and what they'll do" />
          <Step num={2} title="Book more services" desc="One tap to add any sister brand service" />
          <Step num={3} title="Approve quotes" desc="Worker spotted something? Review and approve here" />
          <Step num={4} title="Track home health" desc="See the full history of services on your property" />
        </div>
        <div className="mt-6 p-4 bg-truenorth-50 border border-truenorth-100 rounded-xl">
          <div className="text-[12px] font-bold text-truenorth-700">Customer Value</div>
          <div className="text-[11px] text-truenorth-600 mt-1 space-y-1">
            <div>&bull; One app for all home services</div>
            <div>&bull; No calling around for quotes</div>
            <div>&bull; Trusted workers they already know</div>
            <div>&bull; Membership discounts applied automatically</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HomeItem({ icon, service, status, next, color }) {
  const colors = {
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-700',
    amber: 'bg-amber-50 border-amber-100 text-amber-700',
    slate: 'bg-slate-50 border-slate-100 text-slate-500',
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
  }
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border ${colors[color]}`}>
      <span className="text-lg">{icon}</span>
      <div className="flex-1">
        <div className="text-[12px] font-bold">{service}</div>
        <div className="text-[10px] opacity-70">{next}</div>
      </div>
      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/60">{status}</span>
    </div>
  )
}

function ServiceCard({ icon, brand, service, desc, price, subscribed }) {
  return (
    <div className={`p-3.5 rounded-xl border ${subscribed ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-100 bg-white'}`}>
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <div className="flex-1">
          <div className="text-[12px] font-bold text-slate-900">{service}</div>
          <div className="text-[10px] text-slate-500">{desc}</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] font-bold text-slate-700">{price}</div>
          {subscribed && <div className="text-[9px] text-emerald-600 font-semibold">Active ✓</div>}
        </div>
      </div>
    </div>
  )
}

function ActivityItem({ text, time, worker, done, quote }) {
  return (
    <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-lg">
      {done && <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />}
      {quote && <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shrink-0" />}
      <div className="flex-1">
        <div className="text-[11px] font-medium text-slate-700">{text}</div>
        <div className="text-[10px] text-slate-400">{worker} &bull; {time}</div>
      </div>
    </div>
  )
}

function Step({ num, title, desc }) {
  return (
    <div className="flex gap-3">
      <div className="w-7 h-7 rounded-full bg-truenorth-100 text-truenorth-700 flex items-center justify-center text-[12px] font-bold shrink-0">{num}</div>
      <div>
        <div className="text-[13px] font-semibold text-slate-900">{title}</div>
        <div className="text-[11px] text-slate-500">{desc}</div>
      </div>
    </div>
  )
}
