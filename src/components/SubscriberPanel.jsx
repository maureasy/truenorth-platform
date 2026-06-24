import { useState, useEffect, useCallback } from 'react'
import { Crown, Users, Plus, Pencil, Trash2, X, Loader2, Search, Mail, Phone } from 'lucide-react'
import { brands } from '../data/mockData'
import { subscriberApi } from '../api'

const tierConfig = {
  none:       { label: 'No Plan', color: 'bg-slate-50 text-slate-500 border border-slate-200', price: '—' },
  basic:      { label: 'Basic', color: 'bg-slate-100 text-slate-700', price: '$49/mo' },
  pro:        { label: 'Pro', color: 'bg-blue-100 text-blue-700', price: '$129/mo' },
  total_home: { label: 'Total Home', color: 'bg-emerald-100 text-emerald-700', price: '$249/mo' },
}
const statusConfig = {
  prospect:  { label: 'Prospect', color: 'bg-purple-100 text-purple-700' },
  active:    { label: 'Active', color: 'bg-emerald-100 text-emerald-700' },
  paused:    { label: 'Paused', color: 'bg-amber-100 text-amber-700' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
}

const emptyForm = { name: '', email: '', phone: '', address: '', tier: 'none', status: 'prospect', totalSpend: 0, servicesUsed: [], notes: '' }

export function SubscriberPanel() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterTier, setFilterTier] = useState('all')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ ...emptyForm })
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try { setData(await subscriberApi.list()) } catch (e) { console.error(e) }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openAdd = () => { setForm({ ...emptyForm }); setEditId(null); setModal('add') }
  const openEdit = (s) => {
    setForm({ name: s.name, email: s.email, phone: s.phone, address: s.address, tier: s.tier, status: s.status, totalSpend: s.totalSpend, servicesUsed: s.servicesUsed || [], notes: s.notes || '' })
    setEditId(s._id); setModal('edit')
  }
  const closeModal = () => { setModal(null); setEditId(null) }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (modal === 'add') await subscriberApi.create(form)
      else await subscriberApi.update(editId, form)
      await load(); closeModal()
    } catch (e) { alert(e.message) }
    setSaving(false)
  }
  const handleDelete = async (id) => {
    if (!confirm('Remove this subscriber?')) return
    try { await subscriberApi.delete(id); await load(); if (selectedId === id) setSelectedId(null) } catch (e) { alert(e.message) }
  }

  const toggleService = (sId) => {
    setForm(p => ({
      ...p,
      servicesUsed: p.servicesUsed.includes(sId) ? p.servicesUsed.filter(x => x !== sId) : [...p.servicesUsed, sId]
    }))
  }

  const filtered = data
    .filter(s => filterTier === 'all' || (filterTier === 'prospect' ? s.status === 'prospect' : s.tier === filterTier))
    .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()))

  const selected = data.find(s => s._id === selectedId)

  const prospects = data.filter(s => s.status === 'prospect').length
  const members = data.filter(s => s.tier !== 'none').length
  const tierCounts = { basic: data.filter(s => s.tier === 'basic').length, pro: data.filter(s => s.tier === 'pro').length, total_home: data.filter(s => s.tier === 'total_home').length }
  const totalMRR = data.reduce((s, sub) => s + ({ basic: 49, pro: 129, total_home: 249 }[sub.tier] || 0), 0)

  return (
    <div className="h-full flex flex-col gap-5 overflow-auto">
      {/* Summary */}
      <div className="grid grid-cols-6 gap-3">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="text-[10px] text-slate-400 font-medium uppercase">Total</div>
          <div className="text-xl font-black text-slate-900">{data.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="text-[10px] text-slate-400 font-medium uppercase">Prospects</div>
          <div className="text-xl font-black text-purple-600">{prospects}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="text-[10px] text-slate-400 font-medium uppercase">Members</div>
          <div className="text-xl font-black text-truenorth-600">{members}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="text-[10px] text-slate-400 font-medium uppercase">Basic</div>
          <div className="text-xl font-black text-slate-600">{tierCounts.basic}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="text-[10px] text-slate-400 font-medium uppercase">Pro / Total</div>
          <div className="text-xl font-black text-blue-600">{tierCounts.pro + tierCounts.total_home}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="text-[10px] text-slate-400 font-medium uppercase">MRR</div>
          <div className="text-xl font-black text-slate-900">${(totalMRR / 1000).toFixed(1)}k</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search name or email..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-[12px] focus:border-truenorth-400 outline-none" />
        </div>
        {['all', 'prospect', 'none', 'basic', 'pro', 'total_home'].map(t => (
          <button key={t} onClick={() => setFilterTier(t === 'prospect' ? 'prospect' : t)} className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${filterTier === t ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {t === 'all' ? 'All' : t === 'prospect' ? 'Prospects' : tierConfig[t]?.label || t}
          </button>
        ))}
        <button onClick={openAdd} className="ml-auto px-3 py-1.5 rounded-lg bg-truenorth-500 text-white text-[12px] font-semibold flex items-center gap-1.5 hover:bg-truenorth-600 transition-colors">
          <Plus size={14} /> Add Subscriber
        </button>
      </div>

      {/* List + detail */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* List */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-card overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20"><Loader2 size={24} className="animate-spin text-slate-400" /></div>
          ) : (
            <div className="divide-y divide-slate-50">
              {filtered.map(s => {
                const tier = tierConfig[s.tier] || tierConfig.basic
                const st = statusConfig[s.status] || statusConfig.active
                return (
                  <div key={s._id} onClick={() => setSelectedId(s._id)} className={`flex items-center gap-4 px-5 py-3.5 cursor-pointer hover:bg-slate-50/50 transition-colors ${selectedId === s._id ? 'bg-truenorth-50/30 border-l-2 border-l-truenorth-500' : ''}`}>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-truenorth-400 to-truenorth-600 flex items-center justify-center text-white text-[13px] font-bold shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold text-slate-900 truncate">{s.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{s.email}</div>
                    </div>
                        {s.tier !== 'none' && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tier.color}`}>{tier.label}</span>}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${st.color}`}>{st.label}</span>
                    <div className="flex gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                      <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Pencil size={13} /></button>
                      <button onClick={() => handleDelete(s._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13} /></button>
                    </div>
                  </div>
                )
              })}
              {filtered.length === 0 && <div className="py-12 text-center text-[13px] text-slate-400">No subscribers found</div>}
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-slate-100 shadow-card p-5 overflow-auto">
          {selected ? (
            <>
              <div className="text-center pb-4 border-b border-slate-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-truenorth-400 to-truenorth-600 flex items-center justify-center text-white text-xl font-bold mx-auto">
                  {selected.name.charAt(0)}
                </div>
                <div className="text-[15px] font-bold text-slate-900 mt-2">{selected.name}</div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${(tierConfig[selected.tier] || tierConfig.none).color}`}>{(tierConfig[selected.tier] || tierConfig.none).label}{selected.tier !== 'none' ? ` — ${(tierConfig[selected.tier] || tierConfig.none).price}` : ''}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 ${(statusConfig[selected.status] || statusConfig.prospect).color}`}>{(statusConfig[selected.status] || statusConfig.prospect).label}</span>
              </div>
              <div className="py-4 space-y-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-[12px]"><Mail size={13} className="text-slate-400" /><span className="text-slate-600">{selected.email}</span></div>
                <div className="flex items-center gap-2 text-[12px]"><Phone size={13} className="text-slate-400" /><span className="text-slate-600">{selected.phone || '—'}</span></div>
                <div className="text-[12px] text-slate-600">{selected.address || '—'}</div>
              </div>
              <div className="py-4 border-b border-slate-100">
                <div className="text-[10px] font-semibold text-slate-500 uppercase mb-2">Services</div>
                <div className="flex flex-wrap gap-1">
                  {(selected.servicesUsed || []).map(sId => {
                    const b = brands.find(br => br.id === sId)
                    return b ? <span key={sId} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: b.color + '15', color: b.color }}>{b.icon} {b.service}</span> : null
                  })}
                  {(!selected.servicesUsed || selected.servicesUsed.length === 0) && <span className="text-[11px] text-slate-400">None</span>}
                </div>
              </div>
              <div className="py-4 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Total Spend</div>
                  <div className="text-[16px] font-bold text-slate-900">${selected.totalSpend.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Member Since</div>
                  <div className="text-[13px] font-semibold text-slate-700">{selected.memberSince ? new Date(selected.memberSince).toLocaleDateString() : '—'}</div>
                </div>
              </div>
              {selected.notes && (
                <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600">{selected.notes}</div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-center text-slate-400">
              <div><Crown size={32} className="mx-auto opacity-40 mb-2" /><div className="text-[12px]">Select a subscriber</div></div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={closeModal}>
          <div className="bg-white rounded-2xl shadow-2xl w-[500px] max-h-[85vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-[15px] font-bold text-slate-900">{modal === 'add' ? 'Add Subscriber' : 'Edit Subscriber'}</h3>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-slate-100"><X size={18} className="text-slate-400" /></button>
            </div>
            <div className="p-5 space-y-4">
              <Field label="Full Name" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Email" value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} />
                <Field label="Phone" value={form.phone} onChange={v => setForm(p => ({ ...p, phone: v }))} />
              </div>
              <Field label="Address" value={form.address} onChange={v => setForm(p => ({ ...p, address: v }))} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Tier</label>
                  <select value={form.tier} onChange={e => setForm(p => ({ ...p, tier: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px]">
                    <option value="none">No Plan (Prospect)</option>
                    <option value="basic">Basic ($49/mo)</option>
                    <option value="pro">Pro ($129/mo)</option>
                    <option value="total_home">Total Home ($249/mo)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px]">
                    <option value="prospect">Prospect</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Services</label>
                <div className="flex flex-wrap gap-2">
                  {brands.map(b => (
                    <button key={b.id} type="button" onClick={() => toggleService(b.id)} className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-colors border ${form.servicesUsed.includes(b.id) ? 'border-truenorth-400 bg-truenorth-50 text-truenorth-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                      {b.icon} {b.service}
                    </button>
                  ))}
                </div>
              </div>
              <NumField label="Total Spend ($)" value={form.totalSpend} onChange={v => setForm(p => ({ ...p, totalSpend: v }))} />
              <div>
                <label className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">Notes</label>
                <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px] h-16 resize-none focus:border-truenorth-400 outline-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 p-5 border-t border-slate-100">
              <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-[12px] font-semibold">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.name || !form.email} className="px-4 py-2 rounded-lg bg-truenorth-500 text-white text-[12px] font-semibold disabled:opacity-50 flex items-center gap-1.5">
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
