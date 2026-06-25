import { useState, useEffect } from 'react'
import { Building2, Phone, Mail, Calendar, CheckCircle2, Clock, XCircle, FileText, MapPin, UserPlus, Loader2, Link2, Download, Eye, Upload } from 'lucide-react'
import { brands } from '../../data/mockData'
import { supabase } from '../../lib/supabase'

const stageConf = {
  submitted: { label: 'Submitted', color: 'bg-slate-100 text-slate-600', icon: FileText, next: 'under_review' },
  under_review: { label: 'Under Review', color: 'bg-blue-100 text-blue-700', icon: Phone, next: 'qualified' },
  qualified: { label: 'Qualified', color: 'bg-violet-100 text-violet-700', icon: Calendar, next: 'approved' },
  approved: { label: 'Approved', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2, next: null },
  rejected: { label: 'Declined', color: 'bg-red-100 text-red-700', icon: XCircle, next: null },
}

export function FranchiseSales() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [docs, setDocs] = useState([])
  const [docsLoading, setDocsLoading] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const stageOrder = ['submitted', 'under_review', 'qualified', 'approved', 'rejected']

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('franchise_applications')
      .select('*')
      .order('submitted_at', { ascending: false })
    if (!error && data) setApplications(data)
    setLoading(false)
  }

  useEffect(() => { fetchApplications() }, [])

  useEffect(() => {
    if (selected?.id) fetchDocs(selected.id)
    else setDocs([])
  }, [selected?.id])

  const fetchDocs = async (appId) => {
    setDocsLoading(true)
    const { data } = await supabase
      .from('application_documents')
      .select('*')
      .eq('application_id', appId)
      .order('created_at', { ascending: true })
    setDocs(data || [])
    setDocsLoading(false)
  }

  const copyUploadLink = (app) => {
    const url = `${window.location.origin}/upload?token=${app.upload_token}`
    navigator.clipboard.writeText(url)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const updateDocStatus = async (docId, status) => {
    await supabase
      .from('application_documents')
      .update({ status })
      .eq('id', docId)
    if (selected?.id) fetchDocs(selected.id)
  }

  const downloadDoc = async (doc) => {
    const { data } = await supabase.storage
      .from('application-docs')
      .createSignedUrl(doc.storage_path, 60)
    if (data?.signedUrl) window.open(data.signedUrl, '_blank')
  }

  const updateStatus = async (id, newStatus) => {
    setActionLoading(true)
    const { error } = await supabase
      .from('franchise_applications')
      .update({ status: newStatus })
      .eq('id', id)
    if (!error) {
      await fetchApplications()
      setSelected(prev => prev ? { ...prev, status: newStatus } : null)
    }
    setActionLoading(false)
  }

  const advanceStage = (app) => {
    const conf = stageConf[app.status]
    if (conf?.next) updateStatus(app.id, conf.next)
  }

  const declineApp = (app) => updateStatus(app.id, 'rejected')

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-truenorth-500" />
      </div>
    )
  }

  return (
    <div className="h-full flex gap-5 overflow-hidden">
      <div className="flex-1 flex flex-col gap-4 overflow-auto">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 size={20} className="text-truenorth-500" />
            Franchise Sales CRM
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Prospect pipeline &bull; Live from Supabase</p>
        </div>

        {/* Pipeline stages */}
        <div className="grid grid-cols-5 gap-3">
          {stageOrder.map(stage => {
            const conf = stageConf[stage]
            const Icon = conf.icon
            const count = applications.filter(p => p.status === stage).length
            return (
              <div key={stage} className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center ${conf.color}`}>
                    <Icon size={10} />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-600">{conf.label}</span>
                </div>
                <div className="text-lg font-black text-slate-900">{count}</div>
              </div>
            )
          })}
        </div>

        {/* Application list */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-4 flex-1 overflow-auto">
          {applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <UserPlus size={32} className="mb-2" />
              <p className="text-sm font-medium">No applications yet</p>
              <p className="text-xs mt-1">Applications from /apply will appear here</p>
            </div>
          ) : (
            <div className="space-y-2">
              {applications.map(p => {
                const conf = stageConf[p.status] || stageConf.submitted
                const Icon = conf.icon
                const name = `${p.first_name || ''} ${p.last_name || ''}`.trim() || 'Unknown'
                const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
                return (
                  <div key={p.id} onClick={() => setSelected(p)} className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all ${selected?.id === p.id ? 'border-truenorth-300 bg-truenorth-50' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'}`}>
                    <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold text-slate-800">{name}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2">
                        <MapPin size={9} /> {p.city || 'N/A'}
                        {p.preferred_territory && <><span>&bull;</span> {p.preferred_territory}</>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {(p.preferred_brands || []).map(bId => {
                        const b = brands.find(x => x.id === bId)
                        return b ? <div key={bId} className="w-4 h-4 rounded-full" style={{ background: b.color }} title={b.name} /> : null
                      })}
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${conf.color}`}>
                        <Icon size={9} /> {conf.label}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{p.submitted_at ? new Date(p.submitted_at).toLocaleDateString() : ''}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="w-80 bg-white rounded-2xl border border-slate-100 shadow-card p-5 overflow-auto shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">{selected.first_name} {selected.last_name}</h3>
            <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 text-xs">✕</button>
          </div>
          <div className="space-y-3 text-[11px]">
            <Row label="Email" value={selected.email} />
            <Row label="Phone" value={selected.phone} />
            <Row label="City" value={selected.city} />
            <Row label="Province" value={selected.province} />
            <Row label="Occupation" value={selected.occupation} />
            <Row label="Employer" value={selected.employer} />
            <Row label="Credit Score" value={selected.credit_score} />
            <Row label="Timeline" value={selected.start_timeline} />
            <Row label="Full-time" value={selected.full_time ? 'Yes' : 'No'} />
            <Row label="Financing" value={selected.financing_needed ? 'Yes' : 'No'} />

            {selected.preferred_brands?.length > 0 && (
              <div className="border-t border-slate-100 pt-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Preferred Brands</div>
                <div className="flex gap-1.5 flex-wrap">
                  {selected.preferred_brands.map(bId => {
                    const b = brands.find(x => x.id === bId)
                    return b ? (
                      <span key={bId} className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: b.color + '20', color: b.color }}>
                        {b.service}
                      </span>
                    ) : null
                  })}
                </div>
              </div>
            )}

            {selected.industry_experience && (
              <div className="border-t border-slate-100 pt-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Industry Experience</div>
                <div className="text-[11px] text-slate-600 leading-relaxed">{selected.industry_experience}</div>
              </div>
            )}

            <div className="border-t border-slate-100 pt-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</div>
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${(stageConf[selected.status] || stageConf.submitted).color}`}>
                {(stageConf[selected.status] || stageConf.submitted).label}
              </div>
            </div>

            {selected.status !== 'rejected' && selected.status !== 'approved' && (
              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => advanceStage(selected)}
                  disabled={actionLoading}
                  className="flex-1 py-2 rounded-lg bg-truenorth-500 text-white text-[10px] font-bold hover:bg-truenorth-600 disabled:opacity-50 transition-colors"
                >
                  {actionLoading ? 'Updating...' : `Advance to ${stageConf[stageConf[selected.status]?.next]?.label || 'Next'}`}
                </button>
                <button
                  onClick={() => declineApp(selected)}
                  disabled={actionLoading}
                  className="py-2 px-3 rounded-lg border border-red-200 text-red-600 text-[10px] font-bold hover:bg-red-50 disabled:opacity-50 transition-colors"
                >
                  Decline
                </button>
              </div>
            )}

            {selected.status === 'approved' && (
              <div className="pt-2 border-t border-slate-100">
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-[10px] font-bold text-emerald-700 mb-1">✓ Approved</div>
                  <div className="text-[10px] text-emerald-600">Account invite will be sent to {selected.email}</div>
                </div>
              </div>
            )}

            {/* Document Checklist */}
            <div className="border-t border-slate-100 pt-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Documents</div>
                <button
                  onClick={() => copyUploadLink(selected)}
                  className="flex items-center gap-1 text-[10px] font-semibold text-truenorth-600 hover:text-truenorth-700"
                >
                  <Link2 size={10} />
                  {linkCopied ? 'Copied!' : 'Copy upload link'}
                </button>
              </div>

              {docsLoading ? (
                <div className="flex items-center justify-center py-3">
                  <Loader2 size={12} className="animate-spin text-slate-300" />
                </div>
              ) : docs.length === 0 ? (
                <div className="text-[10px] text-slate-400 py-2">No documents uploaded yet. Send the upload link to the applicant.</div>
              ) : (
                <div className="space-y-1.5">
                  {docs.map(doc => (
                    <div key={doc.id} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <FileText size={12} className={doc.status === 'approved' ? 'text-emerald-500' : doc.status === 'rejected' ? 'text-red-500' : 'text-slate-400'} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-semibold text-slate-700 truncate">{doc.file_name}</div>
                        <div className="text-[9px] text-slate-400">{doc.doc_type.replace(/_/g, ' ')} &bull; {(doc.file_size / 1024).toFixed(0)} KB</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => downloadDoc(doc)} className="p-1 rounded hover:bg-slate-200" title="Download">
                          <Download size={10} className="text-slate-500" />
                        </button>
                        {doc.status === 'uploaded' && (
                          <>
                            <button onClick={() => updateDocStatus(doc.id, 'approved')} className="p-1 rounded hover:bg-emerald-100" title="Approve">
                              <CheckCircle2 size={10} className="text-emerald-500" />
                            </button>
                            <button onClick={() => updateDocStatus(doc.id, 'rejected')} className="p-1 rounded hover:bg-red-100" title="Reject">
                              <XCircle size={10} className="text-red-500" />
                            </button>
                          </>
                        )}
                        {doc.status === 'approved' && <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">OK</span>}
                        {doc.status === 'rejected' && <span className="text-[8px] font-bold text-red-600 bg-red-50 px-1 rounded">REJ</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }) {
  if (!value) return null
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-slate-700 text-right max-w-[60%]">{value}</span>
    </div>
  )
}
