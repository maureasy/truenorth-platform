import { useState } from 'react'
import { Camera, Send, Flame, DollarSign, Bell, ChevronRight, Star, CheckCircle2 } from 'lucide-react'
import { brands, people, earningsData } from '../data/mockData'

export function WorkerMobile() {
  const [activeTab, setActiveTab] = useState('capture')
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const worker = people[0] // Sarah Chen
  const earnings = earningsData[0]

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setSelectedBrand(null) }, 2000)
  }

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
                <div className="text-[16px] font-bold text-slate-900">Hey, {worker.name.split(' ')[0]} 👋</div>
                <div className="text-[12px] text-slate-400 mt-0.5">
                  {earnings.streak > 0 && <span className="text-orange-500 font-semibold"><Flame size={11} className="inline" /> {earnings.streak}-week streak</span>}
                </div>
              </div>
              <div className="relative">
                <Bell size={20} className="text-slate-400" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold">2</span>
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex border-b border-slate-100 px-5">
            {[{ id: 'capture', label: 'Spot Issue' }, { id: 'earnings', label: 'My Earnings' }].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 text-[13px] font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id ? 'text-truenorth-600 border-truenorth-500' : 'text-slate-400 border-transparent'
                }`}
              >{tab.label}</button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {activeTab === 'capture' && (
              <div className="p-5 flex flex-col h-full">
                {submitted ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} className="text-emerald-600" />
                    </div>
                    <div className="text-[16px] font-bold text-slate-900">Submitted!</div>
                    <div className="text-[13px] text-slate-500 mt-1">You'll earn a bounty if this converts.</div>
                  </div>
                ) : (
                  <>
                    {/* Camera viewfinder placeholder */}
                    <div className="bg-slate-100 rounded-2xl h-48 flex items-center justify-center border-2 border-dashed border-slate-200 mb-4">
                      <div className="text-center">
                        <Camera size={32} className="text-slate-300 mx-auto" />
                        <div className="text-[12px] text-slate-400 mt-2">Tap to take photo</div>
                      </div>
                    </div>

                    {/* Brand selector */}
                    <div className="text-[12px] font-semibold text-slate-500 mb-2 uppercase">What type of issue?</div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {brands.filter(b => b.id !== worker.brandId).map(b => (
                        <button
                          key={b.id}
                          onClick={() => setSelectedBrand(b.id)}
                          className={`p-3 rounded-xl text-center transition-all border-2 ${
                            selectedBrand === b.id ? 'border-truenorth-500 bg-truenorth-50 shadow-sm' : 'border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <span className="text-lg">{b.icon}</span>
                          <div className="text-[10px] font-medium text-slate-600 mt-1">{b.service}</div>
                        </button>
                      ))}
                    </div>

                    {/* Note field */}
                    <textarea
                      placeholder="Quick note (optional)..."
                      className="w-full border border-slate-200 rounded-xl p-3 text-[13px] resize-none h-20 focus:border-truenorth-400 focus:ring-2 focus:ring-truenorth-100 outline-none"
                    />

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      disabled={!selectedBrand}
                      className={`mt-4 w-full py-3.5 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 transition-all ${
                        selectedBrand ? 'bg-truenorth-500 text-white shadow-lg shadow-truenorth-500/30 active:scale-[0.98]' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Send size={16} /> Submit Observation
                    </button>

                    {selectedBrand && (
                      <div className="text-center text-[11px] text-emerald-600 font-medium mt-2">
                        Potential bounty: ${brands.find(b => b.id === selectedBrand).id === 'deck' ? '150' : brands.find(b => b.id === selectedBrand).id === 'handyman' ? '80' : '50'}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="p-5">
                {/* Earnings hero */}
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white text-center mb-5">
                  <div className="text-[11px] opacity-70">This Month</div>
                  <div className="text-3xl font-black mt-1">${earnings.bounties}</div>
                  <div className="text-[12px] opacity-80 mt-1">{earnings.conversions} conversions from {earnings.observations} spots</div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <div className="text-[16px] font-bold text-slate-900">{earnings.observations}</div>
                    <div className="text-[10px] text-slate-400">Spotted</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <div className="text-[16px] font-bold text-emerald-600">{earnings.conversions}</div>
                    <div className="text-[10px] text-slate-400">Converted</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <div className="text-[16px] font-bold text-orange-500 flex items-center justify-center gap-0.5">
                      <Flame size={14} />{earnings.streak}
                    </div>
                    <div className="text-[10px] text-slate-400">Streak</div>
                  </div>
                </div>

                {/* Recent bounties */}
                <div className="text-[12px] font-semibold text-slate-500 mb-2 uppercase">Recent Bounties</div>
                <div className="space-y-2">
                  {[
                    { service: 'Junk Removal', customer: 'Alice M.', amount: 40, date: 'Today' },
                    { service: 'Deck/Fence', customer: 'Emily P.', amount: 150, date: 'Jun 15' },
                    { service: 'Handyman', customer: 'Carol W.', amount: 80, date: 'Jun 12' },
                  ].map((b, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <DollarSign size={14} className="text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[12px] font-semibold text-slate-900">{b.service}</div>
                        <div className="text-[10px] text-slate-400">{b.customer} &bull; {b.date}</div>
                      </div>
                      <span className="text-[14px] font-bold text-emerald-600">+${b.amount}</span>
                    </div>
                  ))}
                </div>

                {/* All-time stats */}
                <div className="mt-5 p-4 bg-slate-50 rounded-xl text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-medium">All-Time Earnings</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">${worker.bountyEarned}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{worker.referralsGenerated} referrals generated</div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom nav bar */}
          <div className="h-16 border-t border-slate-100 flex items-center justify-around px-4">
            <div className="text-center">
              <Camera size={20} className={activeTab === 'capture' ? 'text-truenorth-500 mx-auto' : 'text-slate-300 mx-auto'} />
              <div className={`text-[9px] mt-0.5 ${activeTab === 'capture' ? 'text-truenorth-600 font-bold' : 'text-slate-400'}`}>Spot</div>
            </div>
            <div className="text-center">
              <DollarSign size={20} className={activeTab === 'earnings' ? 'text-truenorth-500 mx-auto' : 'text-slate-300 mx-auto'} />
              <div className={`text-[9px] mt-0.5 ${activeTab === 'earnings' ? 'text-truenorth-600 font-bold' : 'text-slate-400'}`}>Earn</div>
            </div>
            <div className="text-center">
              <Star size={20} className="text-slate-300 mx-auto" />
              <div className="text-[9px] mt-0.5 text-slate-400">Jobs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Description sidebar */}
      <div className="w-72">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Worker Mobile App</h2>
        <p className="text-[13px] text-slate-500 leading-relaxed mb-5">
          The 30-second observation flow that turns every field visit into a lead-gen opportunity.
        </p>
        <div className="space-y-4">
          <Step num={1} title="Snap a photo" desc="Worker sees an issue outside their brand's scope" />
          <Step num={2} title="Tag the service" desc="One tap to categorize (deck, lawn, junk, etc.)" />
          <Step num={3} title="Submit" desc="Routes to sister brand instantly. Worker sees potential bounty." />
          <Step num={4} title="Earn" desc="If observation converts to a completed job, bounty is auto-paid." />
        </div>
        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
          <div className="text-[12px] font-bold text-emerald-700">Key Metrics</div>
          <div className="text-[11px] text-emerald-600 mt-1 space-y-1">
            <div>&bull; Avg 30 seconds per observation</div>
            <div>&bull; 48% team conversion rate</div>
            <div>&bull; $740 bounties paid this month</div>
            <div>&bull; Top earner: $230/mo extra income</div>
          </div>
        </div>
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
