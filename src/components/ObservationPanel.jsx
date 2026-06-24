import { brands, customers, people } from '../data/mockData'

export function ObservationPanel({ context }) {
  const { observations, selectedObservation, setSelectedObservation } = context

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900 mb-4">Field Observations</h2>
      <div className="space-y-3">
        {observations.map(o => {
          const brand = brands.find(b => b.id === o.brandId)
          const worker = people.find(p => p.id === o.workerId)
          const customer = customers.find(c => c.id === o.customerId)
          return (
            <div
              key={o.id}
              onClick={() => setSelectedObservation(selectedObservation?.id === o.id ? null : o)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedObservation?.id === o.id ? 'border-truenorth-500 bg-truenorth-50' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: brand.color }} />
                  <span className="font-medium text-slate-900">{brand.service}</span>
                  {o.photo && <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Photo</span>}
                </div>
                <span className="text-xs text-slate-400">{new Date(o.createdAt).toLocaleString()}</span>
              </div>
              <div className="text-sm text-slate-700 mt-2">{o.text}</div>
              <div className="text-xs text-slate-500 mt-2">
                {worker.name} at {customer.name} • {customer.address}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
