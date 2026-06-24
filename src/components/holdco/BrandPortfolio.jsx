import { useState } from 'react'
import { ShoppingBag, CheckCircle2, Clock, Target, TrendingUp, Calendar } from 'lucide-react'
import { brands, franchisees } from '../../data/mockData'

const acquisitionPipeline = [
  { id: 'a1', name: 'SparkleClean Canada', service: 'Cleaning', units: 45, ebitda: 2800000, status: 'integrated', acquired: '2024-03', askMultiple: 4.8, city: 'GTA', founder: 'Janet Liu' },
  { id: 'a2', name: 'GreenEdge Lawn & Snow', service: 'Lawn/Snow', units: 62, ebitda: 3200000, status: 'integrated', acquired: '2024-06', askMultiple: 5.0, city: 'GTA + Calgary', founder: 'Bill Murray' },
  { id: 'a3', name: 'DeckRevive Inc.', service: 'Deck/Fence', units: 38, ebitda: 3500000, status: 'integrating', acquired: '2025-04', askMultiple: 4.5, city: 'Ontario', founder: 'Mike Oduya' },
  { id: 'a4', name: 'FixRight Handyman', service: 'Handyman', units: 28, ebitda: 1800000, status: 'integrating', acquired: '2025-06', askMultiple: 5.2, city: 'GTA', founder: 'Rachel Wong' },
  { id: 'a5', name: 'CleanSlate Junk', service: 'Junk Removal', units: 22, ebitda: 1400000, status: 'due_diligence', acquired: null, askMultiple: 4.2, city: 'GTA', founder: 'Steve Bello' },
  { id: 'a6', name: 'PureShine Windows', service: 'Window Cleaning', units: 35, ebitda: 2100000, status: 'loi', acquired: null, askMultiple: 4.8, city: 'Ontario + BC', founder: 'Karen Patel' },
  { id: 'a7', name: 'ProPaint Canada', service: 'Interior Painting', units: 42, ebitda: 2600000, status: 'prospect', acquired: null, askMultiple: null, city: 'National', founder: 'Doug Frasier' },
  { id: 'a8', name: 'GutterGuard Co.', service: 'Gutters & Eaves', units: 18, ebitda: 1100000, status: 'prospect', acquired: null, askMultiple: null, city: 'Ontario', founder: 'Sam Okafor' },
]

const statusConfig = {
  integrated: { label: 'Integrated', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  integrating: { label: 'Integrating', color: 'bg-blue-100 text-blue-700', icon: Clock },
  due_diligence: { label: 'Due Diligence', color: 'bg-amber-100 text-amber-700', icon: Target },
  loi: { label: 'LOI Signed', color: 'bg-violet-100 text-violet-700', icon: TrendingUp },
  prospect: { label: 'Prospect', color: 'bg-slate-100 text-slate-600', icon: Calendar },
}

export function BrandPortfolio() {
  const [selected, setSelected] = useState(null)
  const stages = ['integrated', 'integrating', 'due_diligence', 'loi', 'prospect']

  const totalDeployed = acquisitionPipeline.filter(a => a.acquired).reduce((s, a) => s + a.ebitda * (a.askMultiple || 5), 0)
  const totalEBITDA = acquisitionPipeline.filter(a => a.status === 'integrated' || a.status === 'integrating').reduce((s, a) => s + a.ebitda, 0)

  return (
    <div className="h-full flex flex-col gap-5 overflow-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag size={20} className="text-truenorth-500" />
            Brand Portfolio
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Acquisition pipeline &bull; Deal tracker</p>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-100">
            Platform EBITDA: ${(totalEBITDA / 1000000).toFixed(1)}M
          </span>
        </div>
      </div>

      {/* Pipeline funnel */}
      <div className="grid grid-cols-5 gap-3">
        {stages.map(stage => {
          const conf = statusConfig[stage]
          const Icon = conf.icon
          const items = acquisitionPipeline.filter(a => a.status === stage)
          const value = items.reduce((s, a) => s + a.ebitda, 0)
          return (
            <div key={stage} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${conf.color}`}>
                  <Icon size={12} />
                </div>
                <span className="text-[11px] font-semibold text-slate-700">{conf.label}</span>
              </div>
              <div className="text-lg font-black text-slate-900">{items.length}</div>
              <div className="text-[10px] text-slate-400">${(value / 1000000).toFixed(1)}M EBITDA</div>
            </div>
          )
        })}
      </div>

      {/* Deal table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 flex-1">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-[10px] text-slate-400 uppercase border-b border-slate-100">
              <th className="text-left py-2 font-semibold">Brand</th>
              <th className="text-left py-2 font-semibold">Service</th>
              <th className="text-right py-2 font-semibold">Units</th>
              <th className="text-right py-2 font-semibold">EBITDA</th>
              <th className="text-right py-2 font-semibold">Multiple</th>
              <th className="text-right py-2 font-semibold">EV</th>
              <th className="text-left py-2 font-semibold pl-4">Status</th>
              <th className="text-left py-2 font-semibold">Market</th>
              <th className="text-left py-2 font-semibold">Founder</th>
            </tr>
          </thead>
          <tbody>
            {acquisitionPipeline.map(deal => {
              const conf = statusConfig[deal.status]
              const ev = deal.askMultiple ? deal.ebitda * deal.askMultiple : null
              return (
                <tr key={deal.id} className="border-b border-slate-50 hover:bg-slate-50/50 cursor-pointer" onClick={() => setSelected(deal)}>
                  <td className="py-2.5 font-semibold text-slate-800">{deal.name}</td>
                  <td className="text-slate-600">{deal.service}</td>
                  <td className="text-right font-medium text-slate-700">{deal.units}</td>
                  <td className="text-right font-bold text-emerald-600">${(deal.ebitda / 1000000).toFixed(1)}M</td>
                  <td className="text-right font-medium text-slate-600">{deal.askMultiple ? `${deal.askMultiple}×` : '—'}</td>
                  <td className="text-right font-bold text-blue-600">{ev ? `$${(ev / 1000000).toFixed(1)}M` : '—'}</td>
                  <td className="pl-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${conf.color}`}>
                      {conf.label}
                    </span>
                  </td>
                  <td className="text-slate-600">{deal.city}</td>
                  <td className="text-slate-500">{deal.founder}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Deal structure reminder */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
        <h4 className="text-[11px] font-bold text-slate-500 uppercase mb-3">Standard Deal Structure</h4>
        <div className="grid grid-cols-2 gap-4 text-[11px]">
          <div>
            <div className="font-bold text-slate-700 mb-1">Tier 1 (Foundational)</div>
            <div className="text-slate-500 space-y-0.5">
              <div>30% cash &bull; 25% seller note &bull; 20% rollover &bull; 25% performance</div>
            </div>
          </div>
          <div>
            <div className="font-bold text-slate-700 mb-1">Tier 2 (Add-on)</div>
            <div className="text-slate-500 space-y-0.5">
              <div>40% cash &bull; 20% seller note &bull; 15% rollover &bull; 25% performance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
