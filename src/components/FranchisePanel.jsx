import { useState, useEffect, useCallback } from 'react'
import { Building2, AlertTriangle, TrendingUp, Users, Eye, DollarSign, ChevronDown, ChevronUp, Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react'
import { brands } from '../data/mockData'
import { franchiseeApi } from '../api'

const statusConfig = {
  healthy: { label: 'Healthy', color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  watch: { label: 'Watch', color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  at_risk: { label: 'At Risk', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
}

const emptyForm = { name: '', owner: '', brandId: 'clean', status: 'healthy', units: 1, workers: 0, monthlyRevenue: 0, churn: 0, nps: 70, observationRate: 0, conversionRate: 0, since: new Date().getFullYear().toString() }

export function FranchisePanel() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterBrand, setFilterBrand] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const [modal, setModal] = useState(null) // null | 'add' | 'edit'
  const [form, setForm] = useState({ ...emptyForm })
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try { setData(await franchiseeApi.list()) } catch (e) { console.error(e) }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openAdd = () => { setForm({ ...emptyForm }); setEditId(null); setModal('add') }
  const openEdit = (f) => {
    setForm({ name: f.name, owner: f.owner, brandId: f.brandId, status: f.status, units: f.units, workers: f.workers, monthlyRevenue: f.monthlyRevenue, churn: f.churn, nps: f.nps, observationRate: f.observationRate, conversionRate: f.conversionRate, since: f.since })
    setEditId(f._id); setModal('edit')
  }
  const closeModal = () => { setModal(null); setEditId(null) }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (modal === 'add') await franchiseeApi.create(form)
      else await franchiseeApi.update(editId, form)
      await load(); closeModal()
    } catch (e) { alert(e.message) }
    setSaving(false)
  }
  const handleDelete = async (id) => {
    if (!confirm('Delete this franchisee?')) return
    try { await franchiseeApi.delete(id); await load() } catch (e) { alert(e.message) }
  }

  const filtered = filterBrand === 'all' ? data : data.filter(f => f.brandId === filterBrand)
  const totalRevenue = filtered.reduce((s, f) => s + f.monthlyRevenue, 0)
  const totalUnits = filtered.reduce((s, f) => s + f.units, 0)
  const totalWorkers = filtered.reduce((s, f) => s + f.workers, 0)
  const avgNPS = filtered.length ? Math.round(filtered.reduce((s, f) => s + f.nps, 0) / filtered.length) : 0

  return (
    <div className="h-full flex flex-col gap-5 overflow-auto">
      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3">
        <SummaryCard icon={Building2} label="Franchisees" value={filtered.length} sub={`${totalUnits} units`} color="blue" />
        <SummaryCard icon={DollarSign} label="Monthly Rev" value={`$${(totalRevenue / 1000).toFixed(0)}k`} sub="combined" color="emerald" />
        <SummaryCard icon={Users} label="Workers" value={totalWorkers} sub="field operators" color="purple" />
        <SummaryCard icon={TrendingUp} label="Avg NPS" value={avgNPS} sub="franchisee health" color={avgNPS >= 70 ? 'emerald' : 'amber'} />
      </div>

      {/* Brand filter tabs + Add button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterBrand('all')}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
            filterBrand === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >All Brands</button>
        {brands.map(b => (
          <button
            key={b.id}
            onClick={() => setFilterBrand(b.id)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors flex items-center gap-1.5 ${
              filterBrand === b.id ? 'text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            style={filterBrand === b.id ? { background: b.color } : {}}
          >
            <span>{b.icon}</span> {b.service}
          </button>
        ))}
        <button onClick={openAdd} className="ml-auto px-3 py-1.5 rounded-lg bg-truenorth-500 text-white text-[12px] font-semibold flex items-center gap-1.5 hover:bg-truenorth-600 transition-colors">
          <Plus size={14} /> Add Franchisee
        </button>
      </div>

      {/* Franchisee table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden flex-1">
        <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-slate-50 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-3">Franchisee</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-center">Units</div>
          <div className="col-span-2 text-center">Revenue</div>
          <div className="col-span-1 text-center">Churn</div>
          <div className="col-span-1 text-center">NPS</div>
          <div className="col-span-1 text-center">Obs Rate</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400"><Loader2 size={24} className="animate-spin" /></div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filtered.map(f => {
              const brand = brands.find(b => b.id === f.brandId) || brands[0]
              const status = statusConfig[f.status] || statusConfig.healthy
              const expanded = expandedId === f._id
              return (
                <div key={f._id}>
                  <div
                    className={`grid grid-cols-12 gap-2 px-5 py-3.5 items-center cursor-pointer hover:bg-slate-50/50 transition-colors ${expanded ? 'bg-slate-50/80' : ''}`}
                    onClick={() => setExpandedId(expanded ? null : f._id)}
                  >
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: brand.color + '15' }}>
                        {brand.icon}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-slate-900">{f.name}</div>
                        <div className="text-[11px] text-slate-400">{f.owner}</div>
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</span>
                    </div>
                    <div className="col-span-1 text-center text-[13px] font-semibold text-slate-700">{f.units}</div>
                    <div className="col-span-2 text-center text-[13px] font-semibold text-slate-700">${(f.monthlyRevenue / 1000).toFixed(0)}k/mo</div>
                    <div className="col-span-1 text-center">
                      <span className={`text-[12px] font-semibold ${f.churn > 4 ? 'text-red-600' : f.churn > 2.5 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {f.churn}%
                      </span>
                    </div>
                    <div className="col-span-1 text-center">
                      <span className={`text-[12px] font-semibold ${f.nps >= 70 ? 'text-emerald-600' : f.nps >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                        {f.nps}
                      </span>
                    </div>
                    <div className="col-span-1 text-center text-[12px] font-semibold text-blue-600">{f.observationRate}</div>
                    <div className="col-span-2 flex justify-center gap-1" onClick={e => e.stopPropagation()}>
                      <button onClick={() => openEdit(f)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Pencil size={13} /></button>
                      <button onClick={() => handleDelete(f._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </div>

                  {expanded && (
                    <div className="px-5 py-4 bg-slate-50/50 border-t border-slate-100">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-3 border border-slate-100">
                          <div className="text-[10px] text-slate-400 font-medium uppercase">Workers</div>
                          <div className="text-lg font-bold text-slate-900 mt-1">{f.workers}</div>
                          <div className="text-[10px] text-slate-400">across {f.units} units</div>
                        </div>
                        <div className="bg-white rounded-xl p-3 border border-slate-100">
                          <div className="text-[10px] text-slate-400 font-medium uppercase">Rev/Unit</div>
                          <div className="text-lg font-bold text-slate-900 mt-1">${(f.monthlyRevenue / (f.units || 1) / 1000).toFixed(1)}k</div>
                          <div className="text-[10px] text-slate-400">per month</div>
                        </div>
                        <div className="bg-white rounded-xl p-3 border border-slate-100">
                          <div className="text-[10px] text-slate-400 font-medium uppercase">Conv %</div>
                          <div className="text-lg font-bold text-purple-600 mt-1">{f.conversionRate}%</div>
                          <div className="text-[10px] text-slate-400">lead conversion</div>
                        </div>
                        <div className="bg-white rounded-xl p-3 border border-slate-100">
                          <div className="text-[10px] text-slate-400 font-medium uppercase">Since</div>
                          <div className="text-lg font-bold text-slate-900 mt-1">{f.since}</div>
                          <div className="text-[10px] text-slate-400">joined platform</div>
                        </div>
                      </div>
                      {f.status === 'at_risk' && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2">
                          <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />
                          <div className="text-[11px] text-red-700">
                            <span className="font-bold">Risk Alert:</span> Churn at {f.churn}% (threshold: 4%). NPS dropped below 65. Schedule franchisee health check.
                          </div>
                        </div>
                      )}
                      {f.status === 'watch' && (
                        <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-2">
                          <Eye size={14} className="text-amber-500 mt-0.5 shrink-0" />
                          <div className="text-[11px] text-amber-700">
                            <span className="font-bold">Watch:</span> Observation rate ({f.observationRate}/worker/mo) or conversion ({f.conversionRate}%) below network average. Consider training intervention.
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-[520px] max-h-[85vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-[15px] font-bold text-slate-900">{modal === 'add' ? 'Add Franchisee' : 'Edit Franchisee'}</h3>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-slate-100"><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Business Name" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} />
                <Field label="Owner" value={form.owner} onChange={v => setForm(p => ({ ...p, owner: v }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Brand</label>
                  <select value={form.brandId} onChange={e => setForm(p => ({ ...p, brandId: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px]">
                    {brands.map(b => <option key={b.id} value={b.id}>{b.icon} {b.service}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px]">
                    <option value="healthy">Healthy</option><option value="watch">Watch</option><option value="at_risk">At Risk</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <NumField label="Units" value={form.units} onChange={v => setForm(p => ({ ...p, units: v }))} />
                <NumField label="Workers" value={form.workers} onChange={v => setForm(p => ({ ...p, workers: v }))} />
                <NumField label="Monthly Revenue ($)" value={form.monthlyRevenue} onChange={v => setForm(p => ({ ...p, monthlyRevenue: v }))} />
              </div>
              <div className="grid grid-cols-4 gap-4">
                <NumField label="Churn %" value={form.churn} onChange={v => setForm(p => ({ ...p, churn: v }))} step="0.1" />
                <NumField label="NPS" value={form.nps} onChange={v => setForm(p => ({ ...p, nps: v }))} />
                <NumField label="Obs Rate" value={form.observationRate} onChange={v => setForm(p => ({ ...p, observationRate: v }))} step="0.1" />
                <NumField label="Conv %" value={form.conversionRate} onChange={v => setForm(p => ({ ...p, conversionRate: v }))} />
              </div>
              <Field label="Since (year)" value={form.since} onChange={v => setForm(p => ({ ...p, since: v }))} />
            </div>
            <div className="flex justify-end gap-2 p-5 border-t border-slate-100">
              <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-[12px] font-semibold">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.name || !form.owner} className="px-4 py-2 rounded-lg bg-truenorth-500 text-white text-[12px] font-semibold disabled:opacity-50 flex items-center gap-1.5">
                {saving && <Loader2 size={14} className="animate-spin" />}{modal === 'add' ? 'Add' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:border-truenorth-400 focus:ring-2 focus:ring-truenorth-100 outline-none" />
    </div>
  )
}

function NumField({ label, value, onChange, step = '1' }) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">{label}</label>
      <input type="number" step={step} value={value} onChange={e => onChange(Number(e.target.value))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:border-truenorth-400 focus:ring-2 focus:ring-truenorth-100 outline-none" />
    </div>
  )
}

function SummaryCard({ icon: Icon, label, value, sub, color }) {
  const colorClasses = {
    emerald: 'text-emerald-600 bg-emerald-50',
    blue: 'text-blue-600 bg-blue-50',
    purple: 'text-purple-600 bg-purple-50',
    amber: 'text-amber-600 bg-amber-50',
  }
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon size={14} />
        </div>
        <span className="text-[11px] font-medium text-slate-500">{label}</span>
      </div>
      <div className="text-xl font-black text-slate-900">{value}</div>
      <div className="text-[10px] text-slate-400 mt-0.5">{sub}</div>
    </div>
  )
}
