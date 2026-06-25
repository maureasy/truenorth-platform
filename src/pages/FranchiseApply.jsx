import { useState, useMemo, useEffect } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle2, Building2, User, DollarSign, Briefcase, MapPin, Send, Loader2 } from 'lucide-react'
import { MapContainer, TileLayer, Polygon, GeoJSON, Tooltip } from 'react-leaflet'
import { territories, franchiseZones, brands as brandData } from '../data/mockData'
import { supabase } from '../lib/supabase'

const STEPS = [
  { id: 'personal', label: 'About You', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'financial', label: 'Financials', icon: DollarSign },
  { id: 'preferences', label: 'Brand & Territory', icon: MapPin },
  { id: 'commitment', label: 'Commitment', icon: Building2 },
  { id: 'review', label: 'Review & Submit', icon: Send },
]

const emptyForm = {
  // Personal
  firstName: '', lastName: '', email: '', phone: '', city: '', province: '', postalCode: '',
  // Experience
  currentRole: '', employer: '', yearsManagement: '', teamSizeManaged: '', industryBackground: [],
  relevantSkills: '', whyFranchise: '',
  // Financial
  liquidCapital: '', netWorth: '', fundingPlan: '', creditScoreRange: '', existingDebts: '',
  bankruptcyHistory: 'no',
  // Preferences
  preferredBrands: [], preferredCity: '', preferredTerritory: '', territoryFlexibility: '', multiUnit: 'no', timelineToLaunch: '',
  // Commitment
  operatorType: '', hoursPerWeek: '', hasPartner: 'no', partnerRole: '',
  existingBusiness: 'no', existingBusinessDesc: '',
  agreeBackgroundCheck: false, agreeTerms: false,
}

export function FranchiseApply() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ ...emptyForm })
  const [submitted, setSubmitted] = useState(false)

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))
  const toggleArray = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }))
  }

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep(s => Math.max(s - 1, 0))

  const submit = async () => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const { error } = await supabase.from('franchise_applications').insert({
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
        city: form.city,
        province: form.province,
        postal_code: form.postalCode,
        occupation: form.currentRole,
        employer: form.employer,
        years_experience: parseInt(form.yearsManagement) || null,
        management_experience: form.yearsManagement !== '' && form.yearsManagement !== 'Less than 2',
        industry_experience: form.industryBackground.join(', '),
        liquid_capital: form.liquidCapital ? parseFloat(form.liquidCapital.replace(/[^0-9]/g, '')) || null : null,
        net_worth: form.netWorth ? parseFloat(form.netWorth.replace(/[^0-9]/g, '')) || null : null,
        credit_score: form.creditScoreRange,
        financing_needed: form.fundingPlan === 'TrueNorth Growth Accelerator Fund',
        preferred_brands: form.preferredBrands,
        preferred_territory: form.preferredTerritory || form.preferredCity,
        start_timeline: form.timelineToLaunch,
        full_time: form.operatorType === 'full_time',
        consent_background: form.agreeBackgroundCheck,
        consent_terms: form.agreeTerms,
        status: 'submitted',
      })
      if (error) throw error
      setSubmitted(true)
    } catch (err) {
      console.error('Submit error:', err)
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-truenorth-50/30 flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900">Application Received</h1>
          <p className="text-slate-500 mt-4 leading-relaxed">
            Thank you, <strong>{form.firstName}</strong>. Our franchise development team will review your application and score it against our qualification criteria.
          </p>
          <div className="bg-white rounded-2xl border border-slate-100 p-6 mt-8 text-left space-y-3 text-sm">
            <div className="text-xs font-bold text-slate-400 uppercase">What happens next</div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-truenorth-100 text-truenorth-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</div>
              <div><strong className="text-slate-700">48-hour review</strong> <span className="text-slate-500">— we'll score your application and verify eligibility</span></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-truenorth-100 text-truenorth-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</div>
              <div><strong className="text-slate-700">Discovery call</strong> <span className="text-slate-500">— if you qualify, we'll schedule a 30-min call to discuss fit</span></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-truenorth-100 text-truenorth-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</div>
              <div><strong className="text-slate-700">Territory + FDD</strong> <span className="text-slate-500">— review available territories and franchise disclosure docs</span></div>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-6">Confirmation sent to {form.email}</p>
          <a href="/franchise" className="inline-block mt-6 text-sm font-semibold text-truenorth-600 hover:text-truenorth-700">← Back to franchise info</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-truenorth-50/30 flex flex-col">
      {/* Header */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/franchise" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-truenorth-500 to-truenorth-700 flex items-center justify-center text-white font-bold text-xs shadow-md">TN</div>
              <span className="text-sm font-bold text-slate-900">TrueNorth</span>
            </a>
            <span className="text-xs font-semibold text-truenorth-600 bg-truenorth-50 px-2 py-1 rounded-lg border border-truenorth-100">Franchise Application</span>
          </div>
          <div className="text-xs text-slate-400">Step {step + 1} of {STEPS.length}</div>
        </div>
      </nav>

      {/* Progress */}
      <div className="bg-white border-b border-slate-100 px-6 py-3 shrink-0">
        <div className="max-w-4xl mx-auto flex gap-1">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const done = i < step
            const active = i === step
            return (
              <button
                key={s.id}
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold transition-all flex-1 justify-center ${
                  active ? 'bg-truenorth-50 text-truenorth-700 border border-truenorth-200' :
                  done ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 cursor-pointer' :
                  'bg-slate-50 text-slate-400 border border-slate-100'
                }`}
              >
                {done ? <CheckCircle2 size={12} /> : <Icon size={12} />}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Form body */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {step === 0 && <StepPersonal form={form} set={set} />}
          {step === 1 && <StepExperience form={form} set={set} toggleArray={toggleArray} />}
          {step === 2 && <StepFinancial form={form} set={set} />}
          {step === 3 && <StepPreferences form={form} set={set} toggleArray={toggleArray} />}
          {step === 4 && <StepCommitment form={form} set={set} />}
          {step === 5 && <StepReview form={form} />}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            {step > 0 ? (
              <button onClick={back} className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                <ArrowLeft size={14} /> Back
              </button>
            ) : (
              <a href="/franchise" className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">
                <ArrowLeft size={14} /> Cancel
              </a>
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={next} className="flex items-center gap-2 px-6 py-2.5 bg-truenorth-600 text-white text-sm font-bold rounded-xl hover:bg-truenorth-700 transition-colors shadow-lg shadow-truenorth-600/20">
                Continue <ArrowRight size={14} />
              </button>
            ) : (
              <button onClick={submit} disabled={!form.agreeBackgroundCheck || !form.agreeTerms || submitting} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 disabled:opacity-40 disabled:cursor-not-allowed">
                {submitting ? <><Loader2 size={14} className="animate-spin" /> Submitting...</> : <>Submit Application <Send size={14} /></>}
              </button>
            )}
          </div>
          {submitError && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium">{submitError}</div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Step Components ─── */

function StepPersonal({ form, set }) {
  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900">About You</h2>
      <p className="text-sm text-slate-500 mt-1">Basic contact information.</p>
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="First name" value={form.firstName} onChange={v => set('firstName', v)} placeholder="First name" />
          <Field label="Last name" value={form.lastName} onChange={v => set('lastName', v)} placeholder="Last name" />
        </div>
        <Field label="Email" value={form.email} onChange={v => set('email', v)} placeholder="you@email.com" type="email" />
        <Field label="Phone" value={form.phone} onChange={v => set('phone', v)} placeholder="(416) 555-0000" type="tel" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="City" value={form.city} onChange={v => set('city', v)} placeholder="Toronto" />
          <Select label="Province" value={form.province} onChange={v => set('province', v)} options={['', 'Ontario', 'Alberta', 'British Columbia', 'Quebec', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'PEI', 'Newfoundland', 'Yukon', 'NWT', 'Nunavut']} />
        </div>
        <Field label="Postal code" value={form.postalCode} onChange={v => set('postalCode', v)} placeholder="M5V 2T6" />
      </div>
    </div>
  )
}

function StepExperience({ form, set, toggleArray }) {
  const industries = ['Cleaning / Janitorial', 'Landscaping / Lawn', 'Construction / Trades', 'Hospitality / Hotels', 'Retail / Restaurant', 'Property Management', 'Fleet / Logistics', 'Military / Government', 'Corporate / Office', 'Other']
  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900">Your Experience</h2>
      <p className="text-sm text-slate-500 mt-1">Help us understand your operational background.</p>
      <div className="mt-6 space-y-4">
        <Field label="Current role / job title" value={form.currentRole} onChange={v => set('currentRole', v)} placeholder="e.g. Operations Manager" />
        <Field label="Current employer / business" value={form.employer} onChange={v => set('employer', v)} placeholder="Company name" />
        <div className="grid grid-cols-2 gap-4">
          <Select label="Years of management experience" value={form.yearsManagement} onChange={v => set('yearsManagement', v)} options={['', 'Less than 2', '2-5 years', '5-10 years', '10-15 years', '15+ years']} />
          <Select label="Largest team you've managed" value={form.teamSizeManaged} onChange={v => set('teamSizeManaged', v)} options={['', '1-5 people', '5-10 people', '10-25 people', '25-50 people', '50+ people']} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-2">Industry background (select all that apply)</label>
          <div className="grid grid-cols-2 gap-2">
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => toggleArray('industryBackground', ind)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all ${
                  form.industryBackground.includes(ind) ? 'bg-truenorth-50 border-truenorth-300 text-truenorth-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {form.industryBackground.includes(ind) && <CheckCircle2 size={10} className="inline mr-1.5" />}
                {ind}
              </button>
            ))}
          </div>
        </div>

        <TextArea label="Relevant skills or certifications" value={form.relevantSkills} onChange={v => set('relevantSkills', v)} placeholder="e.g. P&L management, sales, HR, fleet ops, trade certifications..." />
        <TextArea label="Why do you want to own a franchise?" value={form.whyFranchise} onChange={v => set('whyFranchise', v)} placeholder="Tell us what motivates you — there's no wrong answer." />
      </div>
    </div>
  )
}

function StepFinancial({ form, set }) {
  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900">Financial Readiness</h2>
      <p className="text-sm text-slate-500 mt-1">This helps us match you to the right brand and funding path. All information is confidential.</p>
      <div className="mt-6 space-y-4">
        <Select label="Liquid capital available to invest" value={form.liquidCapital} onChange={v => set('liquidCapital', v)} options={['', 'Under $35,000', '$35,000 - $60,000', '$60,000 - $90,000', '$90,000 - $120,000', '$120,000 - $150,000', '$150,000+', 'Need financing support']} />
        <Select label="Estimated net worth" value={form.netWorth} onChange={v => set('netWorth', v)} options={['', 'Under $100,000', '$100,000 - $250,000', '$250,000 - $500,000', '$500,000 - $1,000,000', '$1,000,000+', 'Prefer not to say']} />
        <Select label="How do you plan to fund the franchise?" value={form.fundingPlan} onChange={v => set('fundingPlan', v)} options={['', 'Personal savings', 'RRSP / TFSA withdrawal', 'Home equity line of credit', 'Bank loan / BDC financing', 'TrueNorth Growth Accelerator Fund', 'Partner / investor co-funding', 'Combination of sources']} />
        <Select label="Credit score range" value={form.creditScoreRange} onChange={v => set('creditScoreRange', v)} options={['', 'Excellent (750+)', 'Good (700-749)', 'Fair (650-699)', 'Below 650', 'Not sure']} />
        <Select label="Existing business debts or obligations" value={form.existingDebts} onChange={v => set('existingDebts', v)} options={['', 'None', 'Under $25,000', '$25,000 - $75,000', '$75,000 - $150,000', '$150,000+', 'Prefer not to say']} />
        <Select label="Any previous bankruptcy or insolvency?" value={form.bankruptcyHistory} onChange={v => set('bankruptcyHistory', v)} options={[{ v: 'no', l: 'No' }, { v: 'discharged', l: 'Yes — discharged over 5 years ago' }, { v: 'recent', l: 'Yes — within the past 5 years' }]} isObj />
      </div>
    </div>
  )
}

function StepPreferences({ form, set, toggleArray }) {
  const brandOptions = [
    { id: 'clean', label: '🧹 TrueNorth Clean', sub: 'Cleaning — $60-90k' },
    { id: 'lawn', label: '🌿 TrueNorth Lawn', sub: 'Lawn & Snow — $50-80k' },
    { id: 'deck', label: '🪵 TrueNorth Deck', sub: 'Deck & Fence — $80-120k' },
    { id: 'handyman', label: '🔧 TrueNorth Handyman', sub: 'Maintenance — $40-70k' },
    { id: 'junk', label: '🚛 TrueNorth Junk', sub: 'Junk Removal — $35-60k' },
  ]
  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900">Brand & Territory</h2>
      <p className="text-sm text-slate-500 mt-1">Tell us what you're interested in. We'll match you to available opportunities.</p>
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-2">Which brands interest you? (select all that apply)</label>
          <div className="space-y-2">
            {brandOptions.map(b => (
              <button
                key={b.id}
                onClick={() => toggleArray('preferredBrands', b.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
                  form.preferredBrands.includes(b.id) ? 'bg-truenorth-50 border-truenorth-300' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-sm font-semibold text-slate-800">{b.label}</div>
                  <div className="text-xs text-slate-400">{b.sub}</div>
                </div>
                {form.preferredBrands.includes(b.id) && <CheckCircle2 size={16} className="text-truenorth-600" />}
              </button>
            ))}
          </div>
        </div>

        <Select label="Preferred city / market" value={form.preferredCity} onChange={v => set('preferredCity', v)} options={['', 'Greater Toronto Area', 'Calgary', 'Vancouver', 'Ottawa', 'Montreal', 'Other — willing to discuss']} />

        {/* Territory availability map */}
        <TerritoryPicker selectedTerritory={form.preferredTerritory} onSelect={v => set('preferredTerritory', v)} preferredCity={form.preferredCity} />

        <Select label="How flexible are you on territory?" value={form.territoryFlexibility} onChange={v => set('territoryFlexibility', v)} options={['', 'Specific neighborhood only', 'Anywhere in my preferred city', 'Open to multiple cities', 'Will go wherever the best opportunity is']} />
        <Select label="Interested in operating multiple units/brands?" value={form.multiUnit} onChange={v => set('multiUnit', v)} options={[{ v: 'no', l: 'No — starting with one' }, { v: 'eventually', l: 'Yes — eventually, once established' }, { v: 'immediately', l: 'Yes — want to launch multiple from day one' }]} isObj />
        <Select label="When are you looking to launch?" value={form.timelineToLaunch} onChange={v => set('timelineToLaunch', v)} options={['', 'As soon as possible', 'Within 3 months', '3-6 months', '6-12 months', 'Just exploring for now']} />
      </div>
    </div>
  )
}

function StepCommitment({ form, set }) {
  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900">Commitment & Availability</h2>
      <p className="text-sm text-slate-500 mt-1">We want to make sure this is the right fit for both sides.</p>
      <div className="mt-6 space-y-4">
        <Select label="What type of operator will you be?" value={form.operatorType} onChange={v => set('operatorType', v)} options={['', 'Full-time owner-operator (hands-on daily)', 'Semi-absentee (involved but hiring a manager)', 'I want the work-to-own pathway']} />
        <Select label="Hours per week you can commit" value={form.hoursPerWeek} onChange={v => set('hoursPerWeek', v)} options={['', '20-30 hours', '30-40 hours', '40-50 hours', '50+ hours']} />
        <Select label="Will you have a business partner?" value={form.hasPartner} onChange={v => set('hasPartner', v)} options={[{ v: 'no', l: 'No — solo operator' }, { v: 'yes', l: 'Yes — I have a partner' }]} isObj />
        {form.hasPartner === 'yes' && (
          <Field label="Partner's name and role" value={form.partnerRole} onChange={v => set('partnerRole', v)} placeholder="e.g. Jane Doe — will manage operations" />
        )}
        <Select label="Do you currently own a related business?" value={form.existingBusiness} onChange={v => set('existingBusiness', v)} options={[{ v: 'no', l: 'No' }, { v: 'yes', l: 'Yes — I want to convert it to a TrueNorth brand' }]} isObj />
        {form.existingBusiness === 'yes' && (
          <TextArea label="Describe your current business" value={form.existingBusinessDesc} onChange={v => set('existingBusinessDesc', v)} placeholder="Service type, years in operation, revenue, number of employees..." />
        )}

        <div className="pt-4 border-t border-slate-100 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input type="checkbox" checked={form.agreeBackgroundCheck} onChange={e => set('agreeBackgroundCheck', e.target.checked)} className="mt-1 rounded border-slate-300 text-truenorth-600 focus:ring-truenorth-500" />
            <span className="text-xs text-slate-600 leading-relaxed">I consent to a <strong>background check and credit check</strong> as part of the franchise qualification process.</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input type="checkbox" checked={form.agreeTerms} onChange={e => set('agreeTerms', e.target.checked)} className="mt-1 rounded border-slate-300 text-truenorth-600 focus:ring-truenorth-500" />
            <span className="text-xs text-slate-600 leading-relaxed">I confirm that all information provided is <strong>accurate and complete</strong>. I understand that misrepresentation may result in application denial.</span>
          </label>
        </div>
      </div>
    </div>
  )
}

function StepReview({ form }) {
  const brandNames = { clean: '🧹 Clean', lawn: '🌿 Lawn', deck: '🪵 Deck', handyman: '🔧 Handyman', junk: '🚛 Junk' }
  return (
    <div>
      <h2 className="text-2xl font-black text-slate-900">Review Your Application</h2>
      <p className="text-sm text-slate-500 mt-1">Double-check everything before submitting. You can go back to edit any section.</p>
      <div className="mt-6 space-y-5">
        <ReviewSection title="Personal Information">
          <ReviewRow label="Name" value={`${form.firstName} ${form.lastName}`} />
          <ReviewRow label="Email" value={form.email} />
          <ReviewRow label="Phone" value={form.phone} />
          <ReviewRow label="Location" value={`${form.city}, ${form.province} ${form.postalCode}`} />
        </ReviewSection>
        <ReviewSection title="Experience">
          <ReviewRow label="Current role" value={`${form.currentRole} at ${form.employer}`} />
          <ReviewRow label="Management experience" value={form.yearsManagement} />
          <ReviewRow label="Team size" value={form.teamSizeManaged} />
          <ReviewRow label="Industry" value={form.industryBackground.join(', ') || '—'} />
          {form.whyFranchise && <ReviewRow label="Motivation" value={form.whyFranchise} />}
        </ReviewSection>
        <ReviewSection title="Financial">
          <ReviewRow label="Liquid capital" value={form.liquidCapital} />
          <ReviewRow label="Net worth" value={form.netWorth} />
          <ReviewRow label="Funding plan" value={form.fundingPlan} />
          <ReviewRow label="Credit score" value={form.creditScoreRange} />
        </ReviewSection>
        <ReviewSection title="Brand & Territory">
          <ReviewRow label="Brands" value={form.preferredBrands.map(b => brandNames[b] || b).join(', ') || '—'} />
          <ReviewRow label="City" value={form.preferredCity} />
          <ReviewRow label="Preferred territory" value={form.preferredTerritory || '—'} />
          <ReviewRow label="Flexibility" value={form.territoryFlexibility} />
          <ReviewRow label="Timeline" value={form.timelineToLaunch} />
        </ReviewSection>
        <ReviewSection title="Commitment">
          <ReviewRow label="Operator type" value={form.operatorType} />
          <ReviewRow label="Hours/week" value={form.hoursPerWeek} />
          <ReviewRow label="Background check" value={form.agreeBackgroundCheck ? '✓ Agreed' : '✗ Not agreed'} />
          <ReviewRow label="Terms" value={form.agreeTerms ? '✓ Agreed' : '✗ Not agreed'} />
        </ReviewSection>
      </div>
    </div>
  )
}

/* ─── Reusable form elements ─── */

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-truenorth-500/20 focus:border-truenorth-400 outline-none transition-all"
      />
    </div>
  )
}

function Select({ label, value, onChange, options, isObj }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:ring-2 focus:ring-truenorth-500/20 focus:border-truenorth-400 outline-none transition-all"
      >
        {options.map(opt => {
          if (isObj) return <option key={opt.v} value={opt.v}>{opt.l}</option>
          return <option key={opt} value={opt}>{opt || '— Select —'}</option>
        })}
      </select>
    </div>
  )
}

function TextArea({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-truenorth-500/20 focus:border-truenorth-400 outline-none transition-all resize-none"
      />
    </div>
  )
}

function ReviewSection({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800 text-right max-w-[60%]">{value || '—'}</span>
    </div>
  )
}

/* ─── Territory Map Picker ─── */

const boundaryQueries = {
  'fz-old-toronto': 'Old Toronto, Toronto, Ontario, Canada',
  'fz-east-york': 'East York, Toronto, Ontario, Canada',
  'fz-north-york': 'North York, Toronto, Ontario, Canada',
  'fz-york': 'York, Toronto, Ontario, Canada',
  'fz-etobicoke': 'Etobicoke, Toronto, Ontario, Canada',
  'fz-scarborough': 'Scarborough, Toronto, Ontario, Canada',
}

const cityIdMap = {
  'Greater Toronto Area': 'gta',
  'Calgary': 'cal',
  'Vancouver': 'van',
}

async function fetchBoundary(query) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&polygon_geojson=1&limit=1`
  const res = await fetch(url, { headers: { 'User-Agent': 'TrueNorth-Apply/1.0' } })
  const data = await res.json()
  return data.length > 0 && data[0].geojson ? data[0].geojson : null
}

function TerritoryPicker({ selectedTerritory, onSelect, preferredCity }) {
  const cityId = cityIdMap[preferredCity] || 'gta'
  const [mapCity, setMapCity] = useState(cityId)
  const [liveBoundaries, setLiveBoundaries] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (cityIdMap[preferredCity]) setMapCity(cityIdMap[preferredCity])
  }, [preferredCity])

  const city = territories.find(t => t.id === mapCity)
  const zones = useMemo(() => franchiseZones.filter(z => z.city === mapCity), [mapCity])
  const availableZones = zones.filter(z => z.status === 'available')
  const activeZones = zones.filter(z => z.status === 'active')

  useEffect(() => {
    const toFetch = zones.filter(z => boundaryQueries[z.id] && !liveBoundaries[z.id])
    if (toFetch.length === 0) return
    setLoading(true)
    let cancelled = false
    async function load() {
      const results = { ...liveBoundaries }
      for (const zone of toFetch) {
        if (cancelled) break
        try {
          const geo = await fetchBoundary(boundaryQueries[zone.id])
          if (geo) results[zone.id] = geo
        } catch (e) { /* skip */ }
        await new Promise(r => setTimeout(r, 1100))
      }
      if (!cancelled) { setLiveBoundaries(results); setLoading(false) }
    }
    load()
    return () => { cancelled = true }
  }, [mapCity])

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-2">Select your preferred territory</label>

      {/* City tabs */}
      <div className="flex gap-2 mb-3">
        {territories.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setMapCity(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mapCity === t.id ? 'bg-truenorth-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >{t.name}</button>
        ))}
        <div className="flex-1" />
        <div className="flex items-center gap-3 text-[10px] font-medium">
          <span className="text-emerald-600">● {activeZones.length} taken</span>
          <span className="text-amber-600">◆ {availableZones.length} available</span>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-[10px] text-truenorth-600 bg-truenorth-50 rounded-lg px-2.5 py-1.5 mb-2 w-fit border border-truenorth-100">
          <Loader2 size={10} className="animate-spin" /> Loading map boundaries…
        </div>
      )}

      {/* Map */}
      <div className="h-[320px] rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <MapContainer center={city.center} zoom={city.zoom + 1} className="h-full w-full" zoomControl={false} key={mapCity}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution="" />
          {zones.map(zone => {
            const isAvailable = zone.status === 'available'
            const isSelected = selectedTerritory === zone.name
            const style = {
              color: isAvailable ? '#f59e0b' : zone.color,
              weight: isSelected ? 4 : 2,
              fillColor: isSelected ? '#3b82f6' : isAvailable ? '#f59e0b' : zone.color,
              fillOpacity: isSelected ? 0.35 : isAvailable ? 0.10 : 0.18,
              dashArray: isAvailable && !isSelected ? '8 4' : undefined,
            }
            const handlers = isAvailable ? { click: () => onSelect(zone.name) } : {}
            if (liveBoundaries[zone.id]) {
              return (
                <GeoJSON key={zone.id + '-live'} data={liveBoundaries[zone.id]} style={() => style} eventHandlers={handlers}>
                  <Tooltip direction="center" permanent className="territory-label">
                    <span style={{ color: isSelected ? '#2563eb' : isAvailable ? '#d97706' : zone.color, fontWeight: 700, fontSize: '11px' }}>
                      {zone.name} {isAvailable ? '✦' : ''}
                    </span>
                  </Tooltip>
                </GeoJSON>
              )
            }
            return (
              <Polygon key={zone.id} positions={zone.polygon} pathOptions={style} eventHandlers={handlers}>
                <Tooltip direction="center" permanent className="territory-label">
                  <span style={{ color: isSelected ? '#2563eb' : isAvailable ? '#d97706' : zone.color, fontWeight: 700, fontSize: '11px' }}>
                    {zone.name} {isAvailable ? '✦' : ''}
                  </span>
                </Tooltip>
              </Polygon>
            )
          })}
        </MapContainer>
      </div>

      {/* Available zone selector chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        {availableZones.map(z => (
          <button
            key={z.id}
            type="button"
            onClick={() => onSelect(z.name)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              selectedTerritory === z.name
                ? 'bg-truenorth-50 border-truenorth-400 text-truenorth-700'
                : 'bg-white border-amber-200 text-amber-700 hover:border-amber-400'
            }`}
          >
            {selectedTerritory === z.name && <CheckCircle2 size={10} className="inline mr-1" />}
            {z.name}
          </button>
        ))}
        {availableZones.length === 0 && (
          <div className="text-xs text-slate-400 italic">No open territories in this city — try another market.</div>
        )}
      </div>

      {selectedTerritory && (
        <div className="mt-3 p-3 bg-truenorth-50 border border-truenorth-200 rounded-xl text-xs text-truenorth-700">
          <strong>Selected:</strong> {selectedTerritory} — we'll prioritize this territory in your application.
        </div>
      )}
    </div>
  )
}
