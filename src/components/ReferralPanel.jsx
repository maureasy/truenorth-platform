import { useState } from 'react'
import { CheckCircle, XCircle, ArrowRight, DollarSign } from 'lucide-react'
import { brands, customers, people, observations } from '../data/mockData'

const statusStyles = {
  sent: 'bg-slate-100 text-slate-700',
  accepted: 'bg-amber-100 text-amber-700',
  converted: 'bg-green-100 text-green-700',
  declined: 'bg-red-100 text-red-700',
}

export function ReferralPanel({ context }) {
  const { referrals, selectedReferral, setSelectedReferral } = context
  const [localReferrals, setLocalReferrals] = useState(referrals)
  const [filterStatus, setFilterStatus] = useState('all')

  const filtered = localReferrals.filter(r => filterStatus === 'all' || r.status === filterStatus)

  const updateStatus = (id, newStatus) => {
    setLocalReferrals(localReferrals.map(r => r.id === id ? { ...r, status: newStatus } : r))
  }

  return (
    <div className="flex h-full gap-4">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Referrals</h2>
          <select className="border border-slate-300 rounded-md px-2 py-1 text-sm bg-white" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="converted">Converted</option>
            <option value="declined">Declined</option>
          </select>
        </div>
        <div className="space-y-3 overflow-auto">
          {filtered.map(r => {
            const fromBrand = brands.find(b => b.id === r.fromBrandId)
            const toBrand = brands.find(b => b.id === r.toBrandId)
            const customer = customers.find(c => c.id === r.customerId)
            return (
              <div
                key={r.id}
                onClick={() => setSelectedReferral(selectedReferral?.id === r.id ? null : r)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedReferral?.id === r.id ? 'border-truenorth-500 bg-truenorth-50 ring-1 ring-truenorth-200' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium" style={{ color: fromBrand.color }}>{fromBrand.service}</span>
                    <ArrowRight size={14} className="text-slate-400" />
                    <span className="font-medium" style={{ color: toBrand.color }}>{toBrand.service}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[r.status]}`}>{r.status}</span>
                </div>
                <div className="text-sm text-slate-700 mt-2">{customer.name} • {customer.address}</div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Est. ${r.value.toLocaleString()}</span>
                    <span className="flex items-center gap-1 text-green-600"><DollarSign size={12} />{r.bounty} bounty</span>
                    <span>{new Date(r.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                  </div>
                  {r.status === 'sent' && (
                    <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                      <button onClick={() => updateStatus(r.id, 'accepted')} className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-medium hover:bg-green-100 flex items-center gap-1"><CheckCircle size={12} /> Accept</button>
                      <button onClick={() => updateStatus(r.id, 'declined')} className="px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded text-xs font-medium hover:bg-red-100 flex items-center gap-1"><XCircle size={12} /> Decline</button>
                    </div>
                  )}
                  {r.status === 'accepted' && (
                    <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                      <button onClick={() => updateStatus(r.id, 'converted')} className="px-2 py-1 bg-truenorth-50 text-truenorth-700 border border-truenorth-200 rounded text-xs font-medium hover:bg-truenorth-100 flex items-center gap-1"><CheckCircle size={12} /> Mark Converted</button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedReferral && (
        <div className="w-72 shrink-0 border-l border-slate-200 pl-4 overflow-auto">
          <ReferralDetail referral={localReferrals.find(r => r.id === selectedReferral.id) || selectedReferral} />
        </div>
      )}
    </div>
  )
}

function ReferralDetail({ referral }) {
  const fromBrand = brands.find(b => b.id === referral.fromBrandId)
  const toBrand = brands.find(b => b.id === referral.toBrandId)
  const customer = customers.find(c => c.id === referral.customerId)
  const obs = observations.find(o => o.id === referral.observationId)
  const worker = obs ? people.find(p => p.id === obs.workerId) : null

  return (
    <div>
      <h3 className="font-bold text-slate-900 mb-4">Referral Details</h3>

      <div className="space-y-4 text-sm">
        <div>
          <div className="text-xs font-semibold text-slate-500 mb-1">Flow</div>
          <div className="flex items-center gap-2">
            <span className="font-medium" style={{ color: fromBrand.color }}>{fromBrand.service}</span>
            <ArrowRight size={14} className="text-slate-400" />
            <span className="font-medium" style={{ color: toBrand.color }}>{toBrand.service}</span>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-500 mb-1">Customer</div>
          <div className="text-slate-900">{customer.name}</div>
          <div className="text-xs text-slate-500">{customer.address}</div>
        </div>

        {worker && (
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-1">Spotted by</div>
            <div className="text-slate-900">{worker.name}</div>
          </div>
        )}

        {obs && (
          <div>
            <div className="text-xs font-semibold text-slate-500 mb-1">Observation</div>
            <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-700">{obs.text}</div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-slate-900">${referral.value.toLocaleString()}</div>
            <div className="text-xs text-slate-500">Est. Value</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-700">${referral.bounty}</div>
            <div className="text-xs text-slate-500">Bounty</div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-500 mb-1">Status</div>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[referral.status]}`}>{referral.status}</span>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-500 mb-1">Created</div>
          <div className="text-slate-700">{new Date(referral.createdAt).toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}
