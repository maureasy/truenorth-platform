import { useState } from 'react'
import { DollarSign, Trophy, Eye, ArrowUpRight, CheckCircle2, Clock, Calendar, TrendingUp } from 'lucide-react'
import { people, brands } from '../data/mockData'

const payRuns = [
  { id: 'PR-026', period: 'Jun 16-22, 2026', status: 'processing', totalWages: 12400, totalBounties: 840, totalCommission: 620, workers: 6 },
  { id: 'PR-025', period: 'Jun 9-15, 2026', status: 'paid', totalWages: 11800, totalBounties: 560, totalCommission: 480, workers: 6, paidAt: '2026-06-16T09:00:00' },
  { id: 'PR-024', period: 'Jun 2-8, 2026', status: 'paid', totalWages: 13200, totalBounties: 720, totalCommission: 540, workers: 6, paidAt: '2026-06-09T09:00:00' },
  { id: 'PR-023', period: 'May 26-Jun 1, 2026', status: 'paid', totalWages: 10900, totalBounties: 480, totalCommission: 380, workers: 5, paidAt: '2026-06-02T09:00:00' },
]

const workerPayouts = [
  { workerId: 'p1', hoursWorked: 38, hourlyRate: 22, wages: 836, jobsCompleted: 14, bountySubmissions: 4, bountyConversions: 2, bountyEarned: 120, commission: 95, totalPay: 1051 },
  { workerId: 'p2', hoursWorked: 42, hourlyRate: 24, wages: 1008, jobsCompleted: 18, bountySubmissions: 8, bountyConversions: 4, bountyEarned: 240, commission: 180, totalPay: 1428 },
  { workerId: 'p3', hoursWorked: 35, hourlyRate: 28, wages: 980, jobsCompleted: 6, bountySubmissions: 2, bountyConversions: 1, bountyEarned: 60, commission: 140, totalPay: 1180 },
  { workerId: 'p4', hoursWorked: 30, hourlyRate: 25, wages: 750, jobsCompleted: 10, bountySubmissions: 3, bountyConversions: 1, bountyEarned: 80, commission: 65, totalPay: 895 },
  { workerId: 'p5', hoursWorked: 36, hourlyRate: 22, wages: 792, jobsCompleted: 12, bountySubmissions: 5, bountyConversions: 2, bountyEarned: 140, commission: 80, totalPay: 1012 },
  { workerId: 'p6', hoursWorked: 40, hourlyRate: 20, wages: 800, jobsCompleted: 16, bountySubmissions: 3, bountyConversions: 1, bountyEarned: 60, commission: 60, totalPay: 920 },
]

const bountyLedger = [
  { id: 'b1', workerId: 'p2', type: 'submission', description: 'Fence gate broken — Henry Zhao', amount: 30, date: '2026-06-21T13:45:00', status: 'paid' },
  { id: 'b2', workerId: 'p2', type: 'conversion', description: 'Fence repair quote accepted — Henry Zhao', amount: 60, date: '2026-06-21T16:00:00', status: 'pending' },
  { id: 'b3', workerId: 'p1', type: 'submission', description: 'Overgrown lawn — 125 Bloor St W', amount: 30, date: '2026-06-21T10:15:00', status: 'paid' },
  { id: 'b4', workerId: 'p2', type: 'submission', description: 'Deck stain peeling — Carol Wu', amount: 30, date: '2026-06-19T09:00:00', status: 'paid' },
  { id: 'b5', workerId: 'p5', type: 'conversion', description: 'Deep clean booked — Alice Montgomery', amount: 60, date: '2026-06-20T14:00:00', status: 'paid' },
  { id: 'b6', workerId: 'p1', type: 'submission', description: 'Light fixture loose — Dan Fortier', amount: 30, date: '2026-06-20T11:00:00', status: 'paid' },
  { id: 'b7', workerId: 'p2', type: 'submission', description: 'Brochure left — Lisa Nguyen', amount: 15, date: '2026-06-21T14:22:00', status: 'paid' },
  { id: 'b8', workerId: 'p4', type: 'conversion', description: 'Handyman repair booked — Emily Park', amount: 60, date: '2026-06-20T16:30:00', status: 'pending' },
]

export function PayoutsPanel() {
  const [tab, setTab] = useState('overview')

  const currentRun = payRuns[0]
  const totalWages = workerPayouts.reduce((s, w) => s + w.wages, 0)
  const totalBounties = workerPayouts.reduce((s, w) => s + w.bountyEarned, 0)
  const totalCommission = workerPayouts.reduce((s, w) => s + w.commission, 0)
  const totalPay = workerPayouts.reduce((s, w) => s + w.totalPay, 0)

  return (
    <div className="h-full flex flex-col gap-4 overflow-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <DollarSign size={20} className="text-truenorth-500" />
            Worker Payouts
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Wages &bull; Bounties &bull; Commission</p>
        </div>
        <div className="flex bg-slate-100 rounded-lg p-0.5">
          {['overview', 'bounty_ledger', 'pay_runs'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all ${tab === t ? 'bg-white text-truenorth-600 shadow-sm' : 'text-slate-500'}`}>
              {t === 'overview' ? 'This Week' : t === 'bounty_ledger' ? 'Bounty Ledger' : 'Pay Runs'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="text-[10px] text-slate-400">Total Payroll</div>
          <div className="text-lg font-black text-slate-900">${totalPay.toLocaleString()}</div>
          <div className="text-[9px] text-slate-400 mt-0.5">{currentRun.period}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="text-[10px] text-slate-400">Base Wages</div>
          <div className="text-lg font-black text-blue-600">${totalWages.toLocaleString()}</div>
          <div className="text-[9px] text-blue-500 mt-0.5">{Math.round(totalWages / totalPay * 100)}% of total</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="text-[10px] text-slate-400">Bounties</div>
          <div className="text-lg font-black text-emerald-600">${totalBounties.toLocaleString()}</div>
          <div className="text-[9px] text-emerald-500 mt-0.5">$30/obs + $60/conv</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="text-[10px] text-slate-400">Commission</div>
          <div className="text-lg font-black text-violet-600">${totalCommission.toLocaleString()}</div>
          <div className="text-[9px] text-violet-500 mt-0.5">% of job value</div>
        </div>
      </div>

      {tab === 'overview' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 flex-1 overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Worker Breakdown — {currentRun.period}</h3>
            <span className="text-[10px] px-2 py-1 bg-amber-100 text-amber-700 font-semibold rounded-lg flex items-center gap-1"><Clock size={10} /> Processing</span>
          </div>
          <table className="w-full text-[12px]">
            <thead>
              <tr className="text-[10px] text-slate-400 uppercase border-b border-slate-100">
                <th className="text-left py-2 font-semibold">Worker</th>
                <th className="text-right py-2 font-semibold">Hours</th>
                <th className="text-right py-2 font-semibold">Rate</th>
                <th className="text-right py-2 font-semibold">Wages</th>
                <th className="text-right py-2 font-semibold">Jobs</th>
                <th className="text-right py-2 font-semibold">Obs/Conv</th>
                <th className="text-right py-2 font-semibold">Bounties</th>
                <th className="text-right py-2 font-semibold">Commission</th>
                <th className="text-right py-2 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {workerPayouts.map(wp => {
                const worker = people.find(p => p.id === wp.workerId)
                const brand = brands.find(b => b.id === worker?.brandId)
                return (
                  <tr key={wp.workerId} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <img src={worker?.photo} alt="" className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <div className="font-semibold text-slate-800">{worker?.name}</div>
                          <div className="text-[9px] text-slate-400">{worker?.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right text-slate-600">{wp.hoursWorked}h</td>
                    <td className="text-right text-slate-600">${wp.hourlyRate}</td>
                    <td className="text-right font-medium text-blue-600">${wp.wages}</td>
                    <td className="text-right text-slate-600">{wp.jobsCompleted}</td>
                    <td className="text-right text-slate-600">{wp.bountySubmissions}/{wp.bountyConversions}</td>
                    <td className="text-right font-medium text-emerald-600">${wp.bountyEarned}</td>
                    <td className="text-right font-medium text-violet-600">${wp.commission}</td>
                    <td className="text-right font-black text-slate-900">${wp.totalPay}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-200">
                <td className="py-2.5 font-bold text-slate-900">Total</td>
                <td className="text-right text-slate-600">{workerPayouts.reduce((s, w) => s + w.hoursWorked, 0)}h</td>
                <td></td>
                <td className="text-right font-bold text-blue-700">${totalWages}</td>
                <td className="text-right text-slate-600">{workerPayouts.reduce((s, w) => s + w.jobsCompleted, 0)}</td>
                <td></td>
                <td className="text-right font-bold text-emerald-700">${totalBounties}</td>
                <td className="text-right font-bold text-violet-700">${totalCommission}</td>
                <td className="text-right font-black text-slate-900">${totalPay}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {tab === 'bounty_ledger' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 flex-1 overflow-auto">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Bounty Ledger</h3>
          <div className="space-y-2">
            {bountyLedger.map(b => {
              const worker = people.find(p => p.id === b.workerId)
              return (
                <div key={b.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${b.type === 'submission' ? 'bg-blue-100' : 'bg-emerald-100'}`}>
                    {b.type === 'submission' ? <Eye size={14} className="text-blue-600" /> : <Trophy size={14} className="text-emerald-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-semibold text-slate-800">{b.description}</div>
                    <div className="text-[10px] text-slate-400">
                      {worker?.name} &bull; {b.type === 'submission' ? 'Observation submitted' : 'Lead converted'} &bull; {new Date(b.date).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-[12px] font-bold ${b.type === 'submission' ? 'text-blue-600' : 'text-emerald-600'}`}>+${b.amount}</div>
                    <div className={`text-[9px] font-semibold ${b.status === 'paid' ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {b.status === 'paid' ? '✓ Paid' : '⏳ Pending'}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {tab === 'pay_runs' && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 flex-1 overflow-auto">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Pay Run History</h3>
          <div className="space-y-3">
            {payRuns.map(pr => (
              <div key={pr.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pr.status === 'paid' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                  {pr.status === 'paid' ? <CheckCircle2 size={18} className="text-emerald-600" /> : <Clock size={18} className="text-amber-600" />}
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-bold text-slate-800">{pr.id}</div>
                  <div className="text-[11px] text-slate-400">{pr.period} &bull; {pr.workers} workers</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-right">
                  <div>
                    <div className="text-[10px] text-slate-400">Wages</div>
                    <div className="text-[11px] font-bold text-blue-600">${pr.totalWages.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Bounties</div>
                    <div className="text-[11px] font-bold text-emerald-600">${pr.totalBounties.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Total</div>
                    <div className="text-[11px] font-black text-slate-900">${(pr.totalWages + pr.totalBounties + pr.totalCommission).toLocaleString()}</div>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${pr.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {pr.status === 'paid' ? 'Paid' : 'Processing'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
