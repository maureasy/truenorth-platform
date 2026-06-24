import { useState } from 'react'
import { Users, Home } from 'lucide-react'
import { SubscriberPanel } from './SubscriberPanel'
import { HomesPanel } from './HomesPanel'

export function CustomersPanel() {
  const [tab, setTab] = useState('list')

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users size={20} className="text-truenorth-500" />
            Customers
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Subscribers, prospects &bull; Home intelligence</p>
        </div>
        <div className="flex bg-slate-100 rounded-xl p-1 gap-0.5">
          <button
            onClick={() => setTab('list')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
              tab === 'list' ? 'bg-white text-truenorth-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Users size={12} /> Directory
          </button>
          <button
            onClick={() => setTab('homes')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
              tab === 'homes' ? 'bg-white text-truenorth-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Home size={12} /> Properties
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {tab === 'list' && <SubscriberPanel />}
        {tab === 'homes' && (
          <div className="h-full bg-white rounded-2xl shadow-card border border-slate-100 p-5 overflow-auto">
            <HomesPanel />
          </div>
        )}
      </div>
    </div>
  )
}
