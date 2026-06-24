import { useState } from 'react'
import { CheckCircle2, Circle, Clock, LogIn, LogOut, Camera, Send } from 'lucide-react'
import { brands, people, customers, observations } from '../data/mockData'

const statusStyles = {
  pending: 'bg-slate-100 text-slate-700',
  in_progress: 'bg-green-100 text-green-700',
  completed: 'bg-blue-100 text-blue-700',
}

export function WorkOrderPanel({ context }) {
  const { workOrders } = context
  const [selectedWO, setSelectedWO] = useState(null)

  return (
    <div className="flex h-full gap-4">
      <div className="flex-1 flex flex-col min-w-0">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Work Orders</h2>
        <div className="space-y-3 overflow-auto">
          {workOrders.map(wo => {
            const brand = brands.find(b => b.id === wo.brandId)
            const worker = people.find(p => p.id === wo.workerId)
            const customer = customers.find(c => c.id === wo.customerId)
            const tasksComplete = wo.tasks.filter(t => t.done).length
            return (
              <div
                key={wo.id}
                onClick={() => setSelectedWO(selectedWO?.id === wo.id ? null : wo)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedWO?.id === wo.id ? 'border-truenorth-500 bg-truenorth-50 ring-1 ring-truenorth-200' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: brand.color }} />
                    <span className="font-medium text-slate-900">{brand.service}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[wo.status]}`}>{wo.status.replace('_', ' ')}</span>
                </div>
                <div className="text-sm text-slate-700 mt-2">{customer.name}</div>
                <div className="text-xs text-slate-500 mt-1">{worker.name}</div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${(tasksComplete / wo.tasks.length) * 100}%` }} />
                  </div>
                  <span className="text-xs text-slate-500">{tasksComplete}/{wo.tasks.length}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedWO && (
        <div className="w-80 shrink-0 border-l border-slate-200 pl-4 overflow-auto">
          <WorkOrderDetail workOrder={selectedWO} />
        </div>
      )}
    </div>
  )
}

function WorkOrderDetail({ workOrder }) {
  const brand = brands.find(b => b.id === workOrder.brandId)
  const worker = people.find(p => p.id === workOrder.workerId)
  const customer = customers.find(c => c.id === workOrder.customerId)
  const relatedObs = observations.filter(o => o.bookingId === workOrder.bookingId)
  const [tasks, setTasks] = useState(workOrder.tasks)

  const toggleTask = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t))
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-4 h-4 rounded-full" style={{ background: brand.color }} />
        <h3 className="font-bold text-slate-900">{brand.service}</h3>
      </div>

      <div className="space-y-2 text-sm mb-4">
        <div className="text-slate-600"><span className="font-medium">Customer:</span> {customer.name}</div>
        <div className="text-slate-600"><span className="font-medium">Worker:</span> {worker.name}</div>
      </div>

      <div className="flex gap-2 mb-4">
        <button className="flex items-center gap-1 px-3 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors">
          <LogIn size={14} /> {workOrder.checkedInAt ? `In: ${new Date(workOrder.checkedInAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}` : 'Check In'}
        </button>
        <button className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors">
          <LogOut size={14} /> {workOrder.checkedOutAt ? `Out: ${new Date(workOrder.checkedOutAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}` : 'Check Out'}
        </button>
      </div>

      <div className="mb-4">
        <div className="text-xs font-semibold text-slate-700 mb-2">Task Checklist</div>
        <div className="space-y-2">
          {tasks.map(t => (
            <button
              key={t.id}
              onClick={() => toggleTask(t.id)}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                t.done ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {t.done ? <CheckCircle2 size={16} className="text-green-600 shrink-0" /> : <Circle size={16} className="text-slate-400 shrink-0" />}
              <span className={t.done ? 'line-through opacity-70' : ''}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs font-semibold text-slate-700 mb-2">Capture Observation</div>
        <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-truenorth-400 transition-colors cursor-pointer">
          <Camera size={24} className="mx-auto text-slate-400 mb-2" />
          <div className="text-xs text-slate-500">Tap to add photo + notes</div>
        </div>
      </div>

      {relatedObs.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-slate-700 mb-2">Observations ({relatedObs.length})</div>
          <div className="space-y-2">
            {relatedObs.map(o => (
              <div key={o.id} className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs">
                <div className="text-slate-700">{o.text}</div>
                <div className="flex items-center gap-2 mt-2 text-slate-500">
                  {o.photo && <span className="bg-amber-100 px-1.5 py-0.5 rounded">Photo</span>}
                  <span>{new Date(o.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                  <button className="ml-auto flex items-center gap-1 text-truenorth-600 font-medium hover:text-truenorth-700">
                    <Send size={12} /> Create Referral
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
