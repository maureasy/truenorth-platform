import { useState } from 'react'
import { MessageSquare, CheckCircle2, XCircle, Clock, FileText, ArrowRight, Phone, DollarSign } from 'lucide-react'
import { brands, customers, quotePipeline } from '../data/mockData'

const stageConfig = {
  consent_pending: { label: 'Consent Pending', color: 'bg-amber-100 text-amber-700', icon: Clock },
  consent_declined: { label: 'Declined', color: 'bg-red-100 text-red-700', icon: XCircle },
  quote_sent: { label: 'Quote Sent', color: 'bg-blue-100 text-blue-700', icon: FileText },
  quote_accepted: { label: 'Accepted', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
}

const stageOrder = ['consent_pending', 'quote_sent', 'quote_accepted', 'completed']

export function ConsentFlow() {
  const [selectedQuote, setSelectedQuote] = useState(null)

  const byStage = {
    consent_pending: quotePipeline.filter(q => q.stage === 'consent_pending'),
    quote_sent: quotePipeline.filter(q => q.stage === 'quote_sent'),
    quote_accepted: quotePipeline.filter(q => q.stage === 'quote_accepted'),
    completed: quotePipeline.filter(q => q.stage === 'completed'),
    consent_declined: quotePipeline.filter(q => q.stage === 'consent_declined'),
  }

  const totalValue = quotePipeline.reduce((s, q) => s + q.value, 0)
  const activeValue = quotePipeline.filter(q => !['consent_declined'].includes(q.stage)).reduce((s, q) => s + q.value, 0)

  return (
    <div className="h-full flex flex-col gap-5 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Quote & Consent Pipeline</h2>
          <p className="text-xs text-slate-400 mt-0.5">Observation → Consent → Quote → Booking → Complete</p>
        </div>
        <div className="flex items-center gap-3 text-[12px]">
          <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg">
            <span className="text-emerald-600 font-bold">${(activeValue / 1000).toFixed(1)}k</span>
            <span className="text-emerald-500 ml-1">in pipeline</span>
          </div>
          <div className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
            <span className="font-bold text-slate-700">{quotePipeline.length}</span>
            <span className="text-slate-500 ml-1">quotes</span>
          </div>
        </div>
      </div>

      {/* Stage flow visualization */}
      <div className="grid grid-cols-4 gap-3">
        {stageOrder.map((stage, idx) => {
          const conf = stageConfig[stage]
          const Icon = conf.icon
          const items = byStage[stage] || []
          const value = items.reduce((s, q) => s + q.value, 0)
          return (
            <div key={stage} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 relative">
              {idx < 3 && <ArrowRight size={14} className="absolute -right-2 top-1/2 -translate-y-1/2 text-slate-300 z-10" />}
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${conf.color}`}>
                  <Icon size={12} />
                </div>
                <span className="text-[11px] font-semibold text-slate-600">{conf.label}</span>
              </div>
              <div className="text-xl font-black text-slate-900">{items.length}</div>
              <div className="text-[10px] text-slate-400">${(value / 1000).toFixed(1)}k value</div>
            </div>
          )
        })}
      </div>

      {/* Quote cards */}
      <div className="flex-1 flex gap-4 min-h-0">
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-card p-4 overflow-auto">
          <div className="space-y-2">
            {quotePipeline.map(q => {
              const customer = customers.find(c => c.id === q.customerId)
              const brand = brands.find(b => b.id === q.brandId)
              const conf = stageConfig[q.stage]
              const Icon = conf.icon
              const isSelected = selectedQuote?.id === q.id
              return (
                <div
                  key={q.id}
                  onClick={() => setSelectedQuote(q)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected ? 'border-truenorth-400 bg-truenorth-50/30' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background: brand.color + '15' }}>
                        {brand.icon}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-slate-900">{customer?.name || 'Unknown'}</div>
                        <div className="text-[11px] text-slate-400">{brand.service} &bull; {new Date(q.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[14px] font-bold text-slate-900">${q.value.toLocaleString()}</div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${conf.color}`}>{conf.label}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Detail panel */}
        {selectedQuote ? (
          <QuoteDetail quote={selectedQuote} />
        ) : (
          <div className="w-80 shrink-0 bg-white rounded-2xl border border-slate-100 shadow-card p-5 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <FileText size={32} className="mx-auto opacity-40" />
              <div className="text-[12px] mt-2">Select a quote to view details</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function QuoteDetail({ quote }) {
  const customer = customers.find(c => c.id === quote.customerId)
  const brand = brands.find(b => b.id === quote.brandId)
  const conf = stageConfig[quote.stage]

  return (
    <div className="w-80 shrink-0 bg-white rounded-2xl border border-slate-100 shadow-card p-5 overflow-auto">
      {/* Customer header */}
      <div className="text-center pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-lg font-bold text-slate-500">
          {customer?.name?.charAt(0) || '?'}
        </div>
        <div className="text-[15px] font-bold text-slate-900 mt-2">{customer?.name}</div>
        <div className="text-[11px] text-slate-400">{customer?.address}</div>
      </div>

      {/* Service & value */}
      <div className="py-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">{brand.icon}</span>
            <span className="text-[13px] font-semibold" style={{ color: brand.color }}>{brand.service}</span>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${conf.color}`}>{conf.label}</span>
        </div>
        <div className="text-2xl font-black text-slate-900">${quote.value.toLocaleString()}</div>
        <div className="text-[11px] text-slate-400 mt-0.5">Estimated quote value</div>
      </div>

      {/* Timeline */}
      <div className="py-4 border-b border-slate-100">
        <div className="text-[11px] font-semibold text-slate-500 uppercase mb-3">Journey</div>
        <div className="space-y-3">
          <TimelineStep label="Observation spotted" time={quote.createdAt} done />
          <TimelineStep label="SMS sent to customer" time={quote.createdAt} done />
          <TimelineStep label="Customer consent" time={quote.consentAt} done={!!quote.consentAt} />
          <TimelineStep label="Quote delivered" time={quote.stage !== 'consent_pending' ? quote.consentAt : null} done={['quote_sent', 'quote_accepted', 'completed'].includes(quote.stage)} />
          <TimelineStep label="Quote accepted" time={null} done={['quote_accepted', 'completed'].includes(quote.stage)} />
          <TimelineStep label="Job completed" time={null} done={quote.stage === 'completed'} />
        </div>
      </div>

      {/* SMS Preview */}
      <div className="py-4">
        <div className="text-[11px] font-semibold text-slate-500 uppercase mb-3">SMS Preview</div>
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div className="flex items-start gap-2">
            <MessageSquare size={14} className="text-truenorth-500 mt-0.5 shrink-0" />
            <div className="text-[11px] text-slate-600 leading-relaxed">
              "Hi {customer?.name?.split(' ')[0]}! During today's visit, our team noticed your {brand.service.toLowerCase()} may need attention.
              We can send a specialist for a free assessment. Reply YES to schedule, or NO to opt out."
            </div>
          </div>
        </div>
        {quote.stage === 'consent_pending' && (
          <div className="mt-3 flex gap-2">
            <button className="flex-1 py-2 rounded-lg bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center gap-1">
              <Phone size={12} /> Follow Up
            </button>
            <button className="flex-1 py-2 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-bold">
              Remind Later
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function TimelineStep({ label, time, done }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-emerald-500' : 'bg-slate-200'}`}>
        {done && <CheckCircle2 size={12} className="text-white" />}
      </div>
      <div className="flex-1">
        <div className={`text-[12px] ${done ? 'font-semibold text-slate-900' : 'text-slate-400'}`}>{label}</div>
        {time && <div className="text-[10px] text-slate-400">{new Date(time).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>}
      </div>
    </div>
  )
}
