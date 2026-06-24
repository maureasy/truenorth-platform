import { useState } from 'react'
import { CreditCard, FileText, CheckCircle2, Clock, AlertTriangle, Send, Download, DollarSign } from 'lucide-react'
import { customers, brands, workOrders } from '../data/mockData'

const invoices = [
  { id: 'INV-1247', customerId: 'c1', brandId: 'lawn', workOrderId: 'wo1', amount: 45, tax: 5.85, total: 50.85, status: 'paid', issuedAt: '2026-06-21T16:00:00', paidAt: '2026-06-21T16:05:00', paymentMethod: 'Visa •••• 4242', items: [{ desc: 'Weekly lawn mow & edge', qty: 1, rate: 45 }] },
  { id: 'INV-1246', customerId: 'c3', brandId: 'clean', workOrderId: 'wo2', amount: 180, tax: 23.40, total: 203.40, status: 'paid', issuedAt: '2026-06-21T14:30:00', paidAt: '2026-06-21T15:12:00', paymentMethod: 'Mastercard •••• 8811', items: [{ desc: 'Deep clean — 3BR home', qty: 1, rate: 150 }, { desc: 'Inside oven clean (add-on)', qty: 1, rate: 30 }] },
  { id: 'INV-1245', customerId: 'c5', brandId: 'deck', workOrderId: 'wo3', amount: 2800, tax: 364, total: 3164, status: 'sent', issuedAt: '2026-06-20T09:00:00', paidAt: null, paymentMethod: null, items: [{ desc: 'Composite deck build — 12×16', qty: 1, rate: 2400 }, { desc: 'Railing package — aluminum', qty: 1, rate: 400 }] },
  { id: 'INV-1244', customerId: 'c2', brandId: 'handyman', workOrderId: 'wo4', amount: 255, tax: 33.15, total: 288.15, status: 'paid', issuedAt: '2026-06-19T11:00:00', paidAt: '2026-06-19T11:30:00', paymentMethod: 'e-Transfer', items: [{ desc: 'Handyman — 3 hours', qty: 3, rate: 85 }] },
  { id: 'INV-1243', customerId: 'c4', brandId: 'lawn', workOrderId: 'wo5', amount: 45, tax: 5.85, total: 50.85, status: 'overdue', issuedAt: '2026-06-14T10:00:00', paidAt: null, paymentMethod: null, items: [{ desc: 'Weekly lawn mow & edge', qty: 1, rate: 45 }], dueDate: '2026-06-21' },
  { id: 'INV-1242', customerId: 'c1', brandId: 'junk', workOrderId: 'wo6', amount: 350, tax: 45.50, total: 395.50, status: 'paid', issuedAt: '2026-06-18T14:00:00', paidAt: '2026-06-18T14:10:00', paymentMethod: 'Visa •••• 4242', items: [{ desc: 'Junk removal — half truck load', qty: 1, rate: 350 }] },
  { id: 'INV-1241', customerId: 'c3', brandId: 'clean', workOrderId: 'wo7', amount: 120, tax: 15.60, total: 135.60, status: 'sent', issuedAt: '2026-06-20T16:00:00', paidAt: null, paymentMethod: null, items: [{ desc: 'Bi-weekly maintenance clean', qty: 1, rate: 120 }] },
  { id: 'INV-1240', customerId: 'c5', brandId: 'lawn', workOrderId: 'wo8', amount: 55, tax: 7.15, total: 62.15, status: 'draft', issuedAt: null, paidAt: null, paymentMethod: null, items: [{ desc: 'Lawn mow + fertilizer application', qty: 1, rate: 55 }] },
]

const statusConf = {
  draft: { label: 'Draft', color: 'bg-slate-100 text-slate-600', icon: FileText },
  sent: { label: 'Sent', color: 'bg-blue-100 text-blue-700', icon: Send },
  paid: { label: 'Paid', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  overdue: { label: 'Overdue', color: 'bg-red-100 text-red-700', icon: AlertTriangle },
}

export function BillingPanel() {
  const [tab, setTab] = useState('invoices')
  const [selectedInv, setSelectedInv] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0)
  const totalOutstanding = invoices.filter(i => i.status === 'sent' || i.status === 'overdue').reduce((s, i) => s + i.total, 0)
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.total, 0)

  const filtered = statusFilter === 'all' ? invoices : invoices.filter(i => i.status === statusFilter)

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CreditCard size={20} className="text-truenorth-500" />
            Billing
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Invoices &bull; Payments &bull; Accounts receivable</p>
        </div>
        <div className="flex bg-slate-100 rounded-lg p-0.5">
          {['invoices', 'payments'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-md text-[11px] font-semibold transition-all ${tab === t ? 'bg-white text-truenorth-600 shadow-sm' : 'text-slate-500'}`}>
              {t === 'invoices' ? 'Invoices' : 'Payment History'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="text-[10px] text-slate-400">Collected (June)</div>
          <div className="text-lg font-black text-emerald-600">${totalPaid.toFixed(2)}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="text-[10px] text-slate-400">Outstanding</div>
          <div className="text-lg font-black text-blue-600">${totalOutstanding.toFixed(2)}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="text-[10px] text-slate-400">Overdue</div>
          <div className="text-lg font-black text-red-600">${totalOverdue.toFixed(2)}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="text-[10px] text-slate-400">Total Invoices</div>
          <div className="text-lg font-black text-slate-900">{invoices.length}</div>
        </div>
      </div>

      {tab === 'invoices' && (
        <div className="flex gap-4 flex-1 min-h-0">
          {/* Invoice list */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-card p-4 overflow-auto">
            <div className="flex gap-1.5 mb-3">
              {['all', 'draft', 'sent', 'paid', 'overdue'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${statusFilter === s ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {s === 'all' ? 'All' : statusConf[s].label}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {filtered.map(inv => {
                const customer = customers.find(c => c.id === inv.customerId)
                const brand = brands.find(b => b.id === inv.brandId)
                const conf = statusConf[inv.status]
                const Icon = conf.icon
                return (
                  <div key={inv.id} onClick={() => setSelectedInv(inv)} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedInv?.id === inv.id ? 'border-truenorth-300 bg-truenorth-50' : 'border-slate-100 hover:border-slate-200'}`}>
                    <div className="w-2 h-full rounded-full shrink-0" style={{ background: brand?.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-bold text-slate-800">{inv.id}</span>
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${conf.color}`}>
                          <Icon size={8} /> {conf.label}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {customer?.name || 'Unknown'} &bull; {brand?.service}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-black text-slate-900">${inv.total.toFixed(2)}</div>
                      <div className="text-[9px] text-slate-400">
                        {inv.issuedAt ? new Date(inv.issuedAt).toLocaleDateString() : 'Not issued'}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Invoice detail */}
          {selectedInv && (
            <div className="w-80 bg-white rounded-2xl border border-slate-100 shadow-card p-5 overflow-auto shrink-0">
              <InvoiceDetail inv={selectedInv} onClose={() => setSelectedInv(null)} />
            </div>
          )}
        </div>
      )}

      {tab === 'payments' && (
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-card p-5 overflow-auto">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Recent Payments</h3>
          <div className="space-y-2">
            {invoices.filter(i => i.status === 'paid').map(inv => {
              const customer = customers.find(c => c.id === inv.customerId)
              const brand = brands.find(b => b.id === inv.brandId)
              return (
                <div key={inv.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <div className="flex-1">
                    <div className="text-[12px] font-semibold text-slate-800">{inv.id} — {customer?.name}</div>
                    <div className="text-[10px] text-slate-400">{brand?.service} &bull; {inv.paymentMethod}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[12px] font-bold text-emerald-600">+${inv.total.toFixed(2)}</div>
                    <div className="text-[9px] text-slate-400">{new Date(inv.paidAt).toLocaleString()}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function InvoiceDetail({ inv, onClose }) {
  const customer = customers.find(c => c.id === inv.customerId)
  const brand = brands.find(b => b.id === inv.brandId)
  const conf = statusConf[inv.status]

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">{inv.id}</h3>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold mt-1 ${conf.color}`}>{conf.label}</span>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xs">✕</button>
      </div>

      <div className="space-y-3 text-[11px]">
        <div className="flex justify-between"><span className="text-slate-400">Customer</span><span className="font-medium text-slate-700">{customer?.name}</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Service</span><span className="font-medium" style={{ color: brand?.color }}>{brand?.name}</span></div>
        {inv.issuedAt && <div className="flex justify-between"><span className="text-slate-400">Issued</span><span className="font-medium text-slate-700">{new Date(inv.issuedAt).toLocaleDateString()}</span></div>}
        {inv.paidAt && <div className="flex justify-between"><span className="text-slate-400">Paid</span><span className="font-medium text-emerald-600">{new Date(inv.paidAt).toLocaleString()}</span></div>}
        {inv.paymentMethod && <div className="flex justify-between"><span className="text-slate-400">Method</span><span className="font-medium text-slate-700">{inv.paymentMethod}</span></div>}

        <div className="border-t border-slate-100 pt-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Line Items</div>
          {inv.items.map((item, i) => (
            <div key={i} className="flex justify-between py-1.5 border-b border-slate-50">
              <div>
                <div className="text-slate-700">{item.desc}</div>
                <div className="text-[9px] text-slate-400">Qty: {item.qty}</div>
              </div>
              <span className="font-medium text-slate-700">${(item.qty * item.rate).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between py-1.5 text-slate-500">
            <span>Subtotal</span><span>${inv.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1.5 text-slate-500">
            <span>HST (13%)</span><span>${inv.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 font-bold text-slate-900 border-t border-slate-200">
            <span>Total</span><span>${inv.total.toFixed(2)}</span>
          </div>
        </div>

        {inv.status === 'draft' && (
          <button className="w-full py-2.5 rounded-xl bg-truenorth-500 text-white text-[11px] font-bold flex items-center justify-center gap-1.5">
            <Send size={12} /> Send Invoice
          </button>
        )}
        {inv.status === 'sent' && (
          <button className="w-full py-2.5 rounded-xl bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center gap-1.5">
            <DollarSign size={12} /> Record Payment
          </button>
        )}
        {inv.status === 'overdue' && (
          <div className="space-y-2">
            <div className="p-2.5 bg-red-50 border border-red-100 rounded-lg text-[10px] text-red-700 font-medium flex items-center gap-1.5">
              <AlertTriangle size={10} /> Payment overdue since {inv.dueDate}
            </div>
            <button className="w-full py-2.5 rounded-xl bg-red-500 text-white text-[11px] font-bold flex items-center justify-center gap-1.5">
              <Send size={12} /> Send Reminder
            </button>
          </div>
        )}
      </div>
    </>
  )
}
