import { useState, useEffect, useCallback } from 'react'
import { Truck, Wrench, Hammer, Package, User, Calendar, Plus, Pencil, Trash2, X, Loader2, DollarSign } from 'lucide-react'
import { brands } from '../data/mockData'
import { assetApi } from '../api'

const statusConfig = {
  available:   { label: 'Available', bg: 'bg-green-50 text-green-700 border-green-200' },
  in_use:      { label: 'In Use', bg: 'bg-blue-50 text-blue-700 border-blue-200' },
  maintenance: { label: 'Maintenance', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
  retired:     { label: 'Retired', bg: 'bg-red-50 text-red-600 border-red-200' },
}
const typeIcons = { vehicle: Truck, equipment: Wrench, tool: Hammer, other: Package }

const emptyForm = { name: '', type: 'vehicle', brandId: 'clean', status: 'available', assignedTo: '', serialNumber: '', purchaseDate: '', lastService: '', value: 0, notes: '' }

export function AssetPanel() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState('all')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ ...emptyForm })
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try { setData(await assetApi.list()) } catch (e) { console.error(e) }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openAdd = () => { setForm({ ...emptyForm }); setEditId(null); setModal('add') }
  const openEdit = (a) => {
    setForm({ name: a.name, type: a.type, brandId: a.brandId, status: a.status, assignedTo: a.assignedTo || '', serialNumber: a.serialNumber || '', purchaseDate: a.purchaseDate || '', lastService: a.lastService || '', value: a.value || 0, notes: a.notes || '' })
    setEditId(a._id); setModal('edit')
  }
  const closeModal = () => { setModal(null); setEditId(null) }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (modal === 'add') await assetApi.create(form)
      else await assetApi.update(editId, form)
      await load(); closeModal()
    } catch (e) { alert(e.message) }
    setSaving(false)
  }
  const handleDelete = async (id) => {
    if (!confirm('Delete this asset?')) return
    try { await assetApi.delete(id); await load() } catch (e) { alert(e.message) }
  }

  const filtered = filterType === 'all' ? data : data.filter(a => a.type === filterType)
  const totalValue = data.reduce((s, a) => s + (a.value || 0), 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Assets & Fleet</h2>
          <p className="text-xs text-slate-400 mt-0.5">{data.length} items &bull; {data.filter(a => a.status === 'in_use').length} active &bull; ${(totalValue / 1000).toFixed(0)}k total value</p>
        </div>
        <button onClick={openAdd} className="px-3 py-1.5 rounded-lg bg-truenorth-500 text-white text-[12px] font-semibold flex items-center gap-1.5 hover:bg-truenorth-600 transition-colors">
          <Plus size={14} /> Add Asset
        </button>
      </div>

      {/* Type filters */}
      <div className="flex items-center gap-2 mb-4">
        {['all', 'vehicle', 'equipment', 'tool', 'other'].map(t => (
          <button key={t} onClick={() => setFilterType(t)} className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors capitalize ${filterType === t ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {t === 'all' ? 'All Types' : t + 's'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-slate-400" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(a => {
            const brand = brands.find(b => b.id === a.brandId) || brands[0]
            const status = statusConfig[a.status] || statusConfig.available
            const Icon = typeIcons[a.type] || Package
            return (
              <div key={a._id} className="border border-slate-100 rounded-2xl overflow-hidden hover:shadow-card-hover hover:border-slate-200 transition-all duration-200 bg-white group">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: brand.color + '15', color: brand.color }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-[13px]">{a.name}</div>
                        <div className="text-[11px] text-slate-500 capitalize">{a.type} &bull; {brand.service}</div>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${status.bg}`}>{status.label}</span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5"><User size={11} /> {a.assignedTo || 'Unassigned'}</div>
                    {a.lastService && <div className="flex items-center gap-1.5"><Calendar size={11} /> Last service: {a.lastService}</div>}
                    {a.value > 0 && <div className="flex items-center gap-1.5"><DollarSign size={11} /> Value: ${a.value.toLocaleString()}</div>}
                    {a.serialNumber && <div className="text-[10px] text-slate-400">S/N: {a.serialNumber}</div>}
                  </div>
                  <div className="flex gap-1 mt-3 pt-3 border-t border-slate-100">
                    <button onClick={() => openEdit(a)} className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"><Pencil size={11} /> Edit</button>
                    <button onClick={() => handleDelete(a._id)} className="py-1.5 px-3 rounded-lg text-[11px] font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"><Trash2 size={11} /></button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-[480px] max-h-[85vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-[15px] font-bold text-slate-900">{modal === 'add' ? 'Add Asset' : 'Edit Asset'}</h3>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-slate-100"><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="p-5 space-y-4">
              <Field label="Asset Name" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px]">
                    <option value="vehicle">Vehicle</option>
                    <option value="equipment">Equipment</option>
                    <option value="tool">Tool</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Brand</label>
                  <select value={form.brandId} onChange={e => setForm(p => ({ ...p, brandId: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px]">
                    {brands.map(b => <option key={b.id} value={b.id}>{b.icon} {b.service}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px]">
                    <option value="available">Available</option>
                    <option value="in_use">In Use</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>
                <Field label="Assigned To" value={form.assignedTo} onChange={v => setForm(p => ({ ...p, assignedTo: v }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Serial Number" value={form.serialNumber} onChange={v => setForm(p => ({ ...p, serialNumber: v }))} />
                <NumField label="Value ($)" value={form.value} onChange={v => setForm(p => ({ ...p, value: v }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Purchase Date" value={form.purchaseDate} onChange={v => setForm(p => ({ ...p, purchaseDate: v }))} />
                <Field label="Last Service" value={form.lastService} onChange={v => setForm(p => ({ ...p, lastService: v }))} />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Notes</label>
                <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px] h-16 resize-none focus:border-truenorth-400 outline-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 p-5 border-t border-slate-100">
              <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-[12px] font-semibold">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.name} className="px-4 py-2 rounded-lg bg-truenorth-500 text-white text-[12px] font-semibold disabled:opacity-50 flex items-center gap-1.5">
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

function NumField({ label, value, onChange }) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">{label}</label>
      <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:border-truenorth-400 focus:ring-2 focus:ring-truenorth-100 outline-none" />
    </div>
  )
}
