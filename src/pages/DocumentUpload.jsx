import { useState, useEffect, useRef } from 'react'
import { Upload, CheckCircle2, FileText, Loader2, AlertCircle, X, Eye } from 'lucide-react'
import { supabase } from '../lib/supabase'

const REQUIRED_DOCS = [
  { type: 'government_id', label: 'Government ID', desc: 'Driver\'s license or passport', required: true },
  { type: 'proof_of_funds', label: 'Proof of Funds', desc: 'Bank statement or investment account', required: true },
  { type: 'credit_report', label: 'Credit Report', desc: 'Recent credit report or signed consent form', required: true },
  { type: 'resume', label: 'Resume / CV', desc: 'Your professional background', required: true },
  { type: 'business_plan', label: 'Business Plan', desc: 'Optional — if you have one prepared', required: false },
]

export function DocumentUpload() {
  const params = new URLSearchParams(window.location.search)
  const token = params.get('token')

  const [application, setApplication] = useState(null)
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [uploading, setUploading] = useState(null)

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing upload link.')
      setLoading(false)
      return
    }
    fetchData()
  }, [token])

  async function fetchData() {
    setLoading(true)
    const { data: app, error: appErr } = await supabase
      .from('franchise_applications')
      .select('*')
      .eq('upload_token', token)
      .single()

    if (appErr || !app) {
      setError('Application not found. This link may be invalid or expired.')
      setLoading(false)
      return
    }

    setApplication(app)

    const { data: docs } = await supabase
      .from('application_documents')
      .select('*')
      .eq('application_id', app.id)
      .order('created_at', { ascending: true })

    setDocuments(docs || [])
    setLoading(false)
  }

  async function handleUpload(docType, file) {
    if (!application) return
    setUploading(docType)

    try {
      const ext = file.name.split('.').pop()
      const storagePath = `${application.id}/${docType}_${Date.now()}.${ext}`

      const { error: uploadErr } = await supabase.storage
        .from('application-docs')
        .upload(storagePath, file, { upsert: false })

      if (uploadErr) throw uploadErr

      const { error: insertErr } = await supabase
        .from('application_documents')
        .insert({
          application_id: application.id,
          doc_type: docType,
          file_name: file.name,
          file_size: file.size,
          mime_type: file.type,
          storage_path: storagePath,
          uploaded_by: 'applicant',
          status: 'uploaded',
        })

      if (insertErr) throw insertErr

      await fetchData()
    } catch (err) {
      console.error('Upload error:', err)
      alert('Upload failed: ' + (err.message || 'Unknown error'))
    } finally {
      setUploading(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-truenorth-50/30 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-truenorth-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-truenorth-50/30 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Link Invalid</h1>
          <p className="text-sm text-slate-500 mt-2">{error}</p>
          <a href="/franchise" className="inline-block mt-6 text-sm font-semibold text-truenorth-600 hover:text-truenorth-700">← Back to franchise info</a>
        </div>
      </div>
    )
  }

  const uploadedTypes = documents.map(d => d.doc_type)
  const allRequiredUploaded = REQUIRED_DOCS.filter(d => d.required).every(d => uploadedTypes.includes(d.type))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-truenorth-50/30 flex flex-col">
      {/* Header */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 shrink-0">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-truenorth-500 to-truenorth-700 flex items-center justify-center text-white font-bold text-xs shadow-md">TN</div>
          <span className="text-sm font-bold text-slate-900">TrueNorth</span>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">Document Upload</span>
        </div>
      </nav>

      <div className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-slate-900">Upload Your Documents</h1>
            <p className="text-sm text-slate-500 mt-1">
              Hi <strong>{application.first_name}</strong>, please upload the following documents to continue your franchise application review.
            </p>
          </div>

          {/* Progress */}
          {allRequiredUploaded && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
              <CheckCircle2 size={20} className="text-emerald-600" />
              <div>
                <div className="text-sm font-bold text-emerald-800">All required documents uploaded</div>
                <div className="text-xs text-emerald-600">Our team will review them within 48 hours.</div>
              </div>
            </div>
          )}

          {/* Document list */}
          <div className="space-y-3">
            {REQUIRED_DOCS.map(doc => {
              const uploaded = documents.filter(d => d.doc_type === doc.type)
              const isUploading = uploading === doc.type
              const hasUpload = uploaded.length > 0

              return (
                <div key={doc.type} className={`bg-white rounded-xl border p-4 transition-all ${hasUpload ? 'border-emerald-200' : 'border-slate-200'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${hasUpload ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                        {hasUpload ? <CheckCircle2 size={16} className="text-emerald-600" /> : <FileText size={16} className="text-slate-400" />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">
                          {doc.label}
                          {doc.required && <span className="text-red-400 ml-1">*</span>}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{doc.desc}</div>
                        {uploaded.map(u => (
                          <div key={u.id} className="mt-2 flex items-center gap-2 text-xs">
                            <span className="text-emerald-600 font-medium">{u.file_name}</span>
                            <span className="text-slate-300">({(u.file_size / 1024).toFixed(0)} KB)</span>
                            {u.status === 'reviewed' && <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-[10px] font-semibold">Reviewed</span>}
                            {u.status === 'approved' && <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-semibold">Approved</span>}
                            {u.status === 'rejected' && <span className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded text-[10px] font-semibold">Re-upload needed</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <FileInput
                      onFile={(file) => handleUpload(doc.type, file)}
                      loading={isUploading}
                      hasUpload={hasUpload}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-[11px] text-slate-400 mt-6">
            Accepted formats: PDF, JPG, PNG. Max file size: 10MB. All documents are stored securely and encrypted.
          </p>
        </div>
      </div>
    </div>
  )
}

function FileInput({ onFile, loading, hasUpload }) {
  const ref = useRef(null)

  return (
    <>
      <input
        ref={ref}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFile(file)
          e.target.value = ''
        }}
      />
      <button
        onClick={() => ref.current?.click()}
        disabled={loading}
        className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
          loading ? 'bg-slate-100 text-slate-400' :
          hasUpload ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' :
          'bg-truenorth-500 text-white hover:bg-truenorth-600'
        }`}
      >
        {loading ? <><Loader2 size={12} className="animate-spin" /> Uploading...</> :
         hasUpload ? <><Upload size={12} /> Replace</> :
         <><Upload size={12} /> Upload</>}
      </button>
    </>
  )
}
