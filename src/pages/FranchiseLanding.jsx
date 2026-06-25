import { useState, useMemo, useEffect } from 'react'
import { ArrowRight, DollarSign, MapPin, Users, TrendingUp, Shield, CheckCircle2, Rocket, Award, Building2, Phone, Mail, Calendar, Star, BarChart3, Home, Loader2 } from 'lucide-react'
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet'
import { territories, franchiseZones, brands as brandData } from '../data/mockData'

const whyUs = [
  { icon: TrendingUp, title: 'Proprietary Lead Engine', desc: 'Our app generates leads from sister brands. Your workers spot opportunities at every job — you close them without cold calling.' },
  { icon: Shield, title: 'Proven Playbook', desc: 'Operations manuals, training programs, CRM, scheduling, billing — all provided. Focus on growing, not building systems.' },
  { icon: Users, title: 'Worker Recruitment Support', desc: 'We help you hire, train, and retain top workers with our bounty and earnings system. Low turnover, high motivation.' },
  { icon: DollarSign, title: 'Growth Accelerator Fund', desc: 'Need capital to launch? Our internal fund backs qualified operators with favourable terms. Work-to-own pathway available.' },
  { icon: MapPin, title: 'Protected Territories', desc: 'Exclusive geographic zones with minimum home density. No internal competition, maximum market share.' },
  { icon: BarChart3, title: 'Platform Analytics', desc: 'Real-time dashboards for revenue, worker performance, NPS, churn, and territory coverage. Data-driven decisions.' },
]

const brands = [
  { icon: '🧹', name: 'TrueNorth Clean', desc: 'Residential cleaning', investment: '$60-90k', color: '#0ea5e9', units: '45 units' },
  { icon: '🌿', name: 'TrueNorth Lawn', desc: 'Lawn & snow', investment: '$50-80k', color: '#22c55e', units: '62 units' },
  { icon: '🪵', name: 'TrueNorth Deck', desc: 'Deck & fence', investment: '$80-120k', color: '#a855f7', units: '38 units' },
  { icon: '🔧', name: 'TrueNorth Handyman', desc: 'Maintenance & repair', investment: '$40-70k', color: '#f59e0b', units: '28 units' },
  { icon: '🚛', name: 'TrueNorth Junk', desc: 'Junk removal', investment: '$35-60k', color: '#ef4444', units: '22 units' },
]

const economics = [
  { label: 'Avg. Unit Revenue', value: '$92k/yr', sub: 'Mature units, Year 2+' },
  { label: 'Target Gross Margin', value: '55-62%', sub: 'Varies by brand' },
  { label: 'Breakeven Timeline', value: '4-8 months', sub: 'Depending on territory size' },
  { label: 'Royalty Rate', value: '6-8%', sub: 'Sliding scale on gross' },
  { label: 'Marketing Fund', value: '2%', sub: 'Pooled local + digital' },
  { label: 'Avg. NPS Score', value: '72', sub: 'Across all franchisees' },
]

const steps = [
  { num: 1, title: 'Apply Online', desc: 'Fill out our 5-minute application. Tell us about your background, territory preference, and available capital.' },
  { num: 2, title: 'Discovery Call', desc: 'Meet with our franchise development team. Ask questions, learn about unit economics, and find your fit.' },
  { num: 3, title: 'Territory Selection', desc: 'Pick your protected zone. We share postal-code-level data on home density, demand signals, and competition.' },
  { num: 4, title: 'Training & Launch', desc: '2-week intensive training, CRM setup, worker recruitment support, and your first 10 customers guaranteed.' },
]

const testimonials = [
  { name: 'James Li', brand: 'TrueNorth Clean', territory: 'GTA', quote: "I went from managing a single crew to 28 workers in 18 months. The lead engine is no joke — half my new business comes from lawn and handyman referrals.", revenue: '$84k/mo' },
  { name: 'Tom Murray', brand: 'TrueNorth Lawn', territory: 'GTA', quote: "Best decision I made was converting my independent lawn company to the franchise. Their tech, training, and cross-brand leads tripled my growth rate.", revenue: '$110k/mo' },
  { name: 'Mike Oduya', brand: 'TrueNorth Deck', territory: 'Ontario', quote: "The observation bounty system is genius. Every clean or lawn visit is a potential $2,400 deck job landing in my pipeline.", revenue: '$92k/mo' },
]

const faqs = [
  { q: 'Do I need industry experience?', a: 'Not necessarily. We look for operational and leadership skills. Many successful franchisees come from hospitality, retail, or fleet management backgrounds.' },
  { q: 'What is the total investment range?', a: 'Between $35k and $120k depending on brand and territory size. Our Growth Accelerator Fund offers financing for qualified operators.' },
  { q: 'What is the work-to-own pathway?', a: 'Start as an operator with reduced upfront capital. Build equity through performance milestones over 3-5 years until you own the unit outright.' },
  { q: 'How quickly can I launch?', a: 'From signing to first customer in 4-6 weeks. Training is 2 weeks, then 2 weeks of setup, recruitment, and your guaranteed first 10 bookings.' },
  { q: 'Can I operate multiple brands?', a: 'Yes — many franchisees start with one brand and add sister brands as they grow. Cross-brand operators see 40% higher total revenue.' },
]

export function FranchiseLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-truenorth-500 to-truenorth-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-truenorth-500/20">TN</div>
            <span className="text-lg font-bold text-slate-900">TrueNorth</span>
            <span className="text-xs font-semibold text-truenorth-600 bg-truenorth-50 px-2 py-1 rounded-lg border border-truenorth-100">Franchise</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#opportunity" className="hover:text-truenorth-600 transition-colors">Why TrueNorth</a>
            <a href="#brands" className="hover:text-truenorth-600 transition-colors">Brands</a>
            <a href="#territories" className="hover:text-truenorth-600 transition-colors">Territories</a>
            <a href="#economics" className="hover:text-truenorth-600 transition-colors">Economics</a>
            <a href="#process" className="hover:text-truenorth-600 transition-colors">Process</a>
            <a href="/apply" className="px-5 py-2.5 bg-truenorth-600 text-white rounded-xl font-semibold hover:bg-truenorth-700 transition-colors shadow-lg shadow-truenorth-600/20">Apply Now</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-truenorth-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-truenorth-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-40 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-emerald-300 rounded-full text-sm font-semibold mb-6 border border-white/10">
              <Rocket size={14} /> Now accepting applications for 2026
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-tight">
              Own a franchise that<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-truenorth-300 to-emerald-300">grows itself.</span>
            </h1>
            <p className="text-xl text-slate-300 mt-6 leading-relaxed max-w-2xl">
              Join Canada's fastest-growing home services platform. Our proprietary lead engine, cross-brand referrals, and operator support system means you focus on service — while leads come to you.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a href="/apply" className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-truenorth-400 to-emerald-400 text-slate-900 font-bold rounded-xl text-sm hover:shadow-xl hover:shadow-truenorth-500/25 transition-all hover:-translate-y-0.5">
                Apply to Own a Franchise <ArrowRight size={16} />
              </a>
              <a href="#economics" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/20 text-white font-bold rounded-xl text-sm hover:border-white/40 transition-all">
                View Unit Economics
              </a>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-4 gap-4 mt-16">
            {[
              { value: '195+', label: 'Active Units', sub: 'Across 5 brands' },
              { value: '3', label: 'Cities', sub: 'GTA, Calgary, Vancouver' },
              { value: '$92k', label: 'Avg. Unit Revenue', sub: 'Per year, mature units' },
              { value: '96%', label: 'Franchisee Retention', sub: 'Year over year' },
            ].map(s => (
              <div key={s.label} className="p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-sm text-slate-300 font-medium mt-1">{s.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="opportunity" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center">Why TrueNorth?</h2>
          <p className="text-lg text-slate-500 text-center mt-3 max-w-2xl mx-auto">
            We're not just a franchise — we're a platform that makes your business grow faster.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-12">
            {whyUs.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="p-8 rounded-2xl border border-slate-100 bg-white hover:shadow-lg transition-all hover:-translate-y-0.5">
                  <div className="w-12 h-12 rounded-xl bg-truenorth-50 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-truenorth-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center">Choose Your Brand</h2>
          <p className="text-lg text-slate-500 text-center mt-3">Five proven service lines. Pick one — or build a multi-brand empire.</p>
          <div className="grid grid-cols-5 gap-4 mt-12">
            {brands.map(b => (
              <div key={b.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                <div className="text-4xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-slate-900 text-sm">{b.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{b.desc}</p>
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1">
                  <div className="text-xs text-slate-500">Investment: <span className="font-bold text-slate-700">{b.investment}</span></div>
                  <div className="text-xs text-slate-500">Network: <span className="font-bold text-slate-700">{b.units}</span></div>
                </div>
                <div className="w-full h-1 rounded-full mt-4" style={{ background: b.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Territory Map */}
      <section id="territories" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center">Available Territories</h2>
          <p className="text-lg text-slate-500 text-center mt-3">See which areas are open. Green = active franchise, dashed = available for you.</p>
          <TerritoryExplorer />
        </div>
      </section>

      {/* Unit Economics */}
      <section id="economics" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center">Unit Economics</h2>
          <p className="text-lg text-slate-500 text-center mt-3">Transparent numbers. No surprises.</p>
          <div className="grid grid-cols-3 gap-4 mt-12">
            {economics.map(e => (
              <div key={e.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
                <div className="text-3xl font-black text-slate-900">{e.value}</div>
                <div className="text-sm font-medium text-slate-600 mt-2">{e.label}</div>
                <div className="text-xs text-slate-400 mt-1">{e.sub}</div>
              </div>
            ))}
          </div>

          {/* Revenue model visual */}
          <div className="mt-12 bg-gradient-to-r from-truenorth-500 to-truenorth-700 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold text-center mb-6">How You Earn</h3>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-black">60%</div>
                <div className="text-sm opacity-90 mt-1 font-medium">Service Revenue</div>
                <div className="text-xs opacity-70 mt-1">Direct billing for work completed</div>
              </div>
              <div>
                <div className="text-3xl font-black">25%</div>
                <div className="text-sm opacity-90 mt-1 font-medium">Cross-Brand Leads</div>
                <div className="text-xs opacity-70 mt-1">Observations from sister brands converted to your jobs</div>
              </div>
              <div>
                <div className="text-3xl font-black">15%</div>
                <div className="text-sm opacity-90 mt-1 font-medium">Membership Revenue</div>
                <div className="text-xs opacity-70 mt-1">Recurring plans = predictable monthly income</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center">Hear from Our Franchisees</h2>
          <div className="grid grid-cols-3 gap-6 mt-12">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">"{t.quote}"</p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.brand} &bull; {t.territory}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-emerald-600">{t.revenue}</div>
                    <div className="text-[10px] text-slate-400">monthly</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center">From Application to Launch in 6 Weeks</h2>
          <p className="text-lg text-slate-500 text-center mt-3">Simple, fast, supported every step.</p>
          <div className="grid grid-cols-4 gap-6 mt-12">
            {steps.map(step => (
              <div key={step.num} className="relative">
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm h-full">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-truenorth-500 to-truenorth-700 text-white font-black text-sm flex items-center justify-center mb-4">{step.num}</div>
                  <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center">Frequently Asked Questions</h2>
          <div className="mt-12 space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900">{faq.q}</h4>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section id="apply" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-truenorth-900 rounded-3xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-48 h-48 bg-truenorth-400 rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-400 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <Award size={32} className="mx-auto mb-4 text-truenorth-300" />
              <h2 className="text-3xl font-black">Ready to Own Your Future?</h2>
              <p className="text-slate-300 mt-4 max-w-lg mx-auto">
                Join 195+ franchise operators across Canada. Apply today — spots are limited by territory.
              </p>

              {/* Application form */}
              <div className="mt-8 max-w-md mx-auto space-y-3 text-left">
                <input className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-400 backdrop-blur-sm" placeholder="Full name" />
                <input className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-400 backdrop-blur-sm" placeholder="Email address" />
                <input className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-400 backdrop-blur-sm" placeholder="Phone number" />
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-slate-400 backdrop-blur-sm">
                  <option>Preferred city</option>
                  <option>Greater Toronto Area</option>
                  <option>Calgary</option>
                  <option>Vancouver</option>
                  <option>Other</option>
                </select>
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-slate-400 backdrop-blur-sm">
                  <option>Available capital</option>
                  <option>$35,000 - $60,000</option>
                  <option>$60,000 - $100,000</option>
                  <option>$100,000 - $150,000</option>
                  <option>$150,000+</option>
                  <option>Need financing (Accelerator Fund)</option>
                </select>
                <a href="/apply" className="block w-full py-3.5 bg-gradient-to-r from-truenorth-400 to-emerald-400 text-slate-900 font-bold rounded-xl text-sm hover:shadow-xl transition-all mt-2 text-center">
                  Start Full Application →
                </a>
              </div>

              <p className="text-xs text-slate-400 mt-6">We'll respond within 48 hours. No commitment required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-truenorth-500 to-truenorth-700 flex items-center justify-center text-white font-bold text-[9px]">TN</div>
            <span className="font-medium">TrueNorth Home Services Corp.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:franchise@truenorth.ca" className="hover:text-truenorth-600">franchise@truenorth.ca</a>
            <span>&bull;</span>
            <span>(416) 555-0100</span>
            <span>&bull;</span>
            <span>&copy; 2026</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ─── Territory Map Component ─── */

const boundaryQueries = {
  'fz-old-toronto': 'Old Toronto, Toronto, Ontario, Canada',
  'fz-east-york': 'East York, Toronto, Ontario, Canada',
  'fz-north-york': 'North York, Toronto, Ontario, Canada',
  'fz-york': 'York, Toronto, Ontario, Canada',
  'fz-etobicoke': 'Etobicoke, Toronto, Ontario, Canada',
  'fz-scarborough': 'Scarborough, Toronto, Ontario, Canada',
}

async function fetchBoundary(query) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&polygon_geojson=1&limit=1`
  const res = await fetch(url, { headers: { 'User-Agent': 'TrueNorth-Franchise/1.0' } })
  const data = await res.json()
  return data.length > 0 && data[0].geojson ? data[0].geojson : null
}

function TerritoryExplorer() {
  const [selectedCity, setSelectedCity] = useState('gta')
  const [selectedZone, setSelectedZone] = useState(null)
  const [liveBoundaries, setLiveBoundaries] = useState({})
  const [loading, setLoading] = useState(false)

  const city = territories.find(t => t.id === selectedCity)
  const zones = useMemo(() => franchiseZones.filter(z => z.city === selectedCity), [selectedCity])
  const activeZones = zones.filter(z => z.status === 'active')
  const availableZones = zones.filter(z => z.status === 'available')

  useEffect(() => {
    const cityZones = franchiseZones.filter(z => z.city === selectedCity)
    const toFetch = cityZones.filter(z => boundaryQueries[z.id] && !liveBoundaries[z.id])
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
  }, [selectedCity])

  return (
    <div className="mt-12">
      {/* City tabs + stats */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {territories.map(t => (
            <button
              key={t.id}
              onClick={() => { setSelectedCity(t.id); setSelectedZone(null) }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                selectedCity === t.id ? 'bg-truenorth-600 text-white shadow-lg shadow-truenorth-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >{t.name}</button>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold"><CheckCircle2 size={14} /> {activeZones.length} active</span>
          <span className="flex items-center gap-1.5 text-amber-600 font-semibold"><MapPin size={14} /> {availableZones.length} available</span>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-xs text-truenorth-600 bg-truenorth-50 rounded-lg px-3 py-2 mb-4 w-fit border border-truenorth-100">
          <Loader2 size={12} className="animate-spin" /> Loading boundaries from OpenStreetMap…
        </div>
      )}

      <div className="flex gap-6">
        {/* Map */}
        <div className="flex-1 h-[480px] rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
          <MapContainer center={city.center} zoom={city.zoom + 1} className="h-full w-full" zoomControl={false} key={selectedCity}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution="" />
            {zones.map(zone => {
              if (!liveBoundaries[zone.id]) return null
              const isSelected = selectedZone?.id === zone.id
              const isAvailable = zone.status === 'available'
              const style = {
                color: isAvailable ? '#f59e0b' : zone.color,
                weight: isSelected ? 3 : 2,
                fillColor: isAvailable ? '#f59e0b' : zone.color,
                fillOpacity: isSelected ? 0.35 : isAvailable ? 0.10 : 0.20,
                dashArray: isAvailable ? '8 4' : undefined,
              }
              return (
                <GeoJSON key={zone.id + '-live'} data={liveBoundaries[zone.id]} style={() => style}
                  eventHandlers={{ click: () => setSelectedZone(zone) }}>
                  <Tooltip direction="center" permanent className="territory-label">
                    <span style={{ color: isAvailable ? '#d97706' : zone.color, fontWeight: 700, fontSize: '11px' }}>
                      {zone.name} {isAvailable ? '✦' : ''}
                    </span>
                  </Tooltip>
                </GeoJSON>
              )
            })}
          </MapContainer>
        </div>

        {/* Zone sidebar */}
        <div className="w-80 shrink-0">
          {selectedZone ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-6">
              <button onClick={() => setSelectedZone(null)} className="text-xs text-truenorth-600 font-semibold mb-3 hover:underline">← All zones</button>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded" style={{ background: selectedZone.status === 'available' ? '#f59e0b' : selectedZone.color }} />
                <h3 className="text-lg font-bold text-slate-900">{selectedZone.name}</h3>
              </div>

              {selectedZone.status === 'available' ? (
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
                    <div className="text-2xl mb-1">🏗️</div>
                    <div className="text-sm font-bold text-amber-800">Open for Applications</div>
                    <div className="text-xs text-amber-600 mt-1">This territory is available for a new franchise operator.</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs text-slate-600">
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Market Estimates</div>
                    <div className="flex justify-between"><span>Single-family homes</span><span className="font-bold text-slate-800">~8,000</span></div>
                    <div className="flex justify-between"><span>Avg. household income</span><span className="font-bold text-slate-800">$95,000</span></div>
                    <div className="flex justify-between"><span>Existing coverage</span><span className="font-bold text-red-500">None</span></div>
                    <div className="flex justify-between"><span>Est. Year 1 revenue</span><span className="font-bold text-emerald-600">$180k-$240k</span></div>
                  </div>
                  <a href="/apply" className="block w-full py-3 bg-gradient-to-r from-truenorth-500 to-truenorth-700 text-white text-center font-bold rounded-xl text-sm hover:shadow-lg transition-all">
                    Apply for {selectedZone.name} →
                  </a>
                </div>
              ) : (
                <div className="space-y-4 mt-3">
                  <div className="text-sm text-slate-500">{selectedZone.owner}</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                      <div className="text-base font-black text-slate-900">{selectedZone.homes}</div>
                      <div className="text-[9px] text-slate-400">Homes</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                      <div className="text-base font-black text-slate-900">{selectedZone.workers}</div>
                      <div className="text-[9px] text-slate-400">Workers</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                      <div className="text-base font-black text-emerald-600">${(selectedZone.revenue / 1000).toFixed(0)}k</div>
                      <div className="text-[9px] text-slate-400">Rev/mo</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mb-1.5">Active Brands</div>
                    <div className="flex gap-1.5 flex-wrap">
                      {selectedZone.brands.map(bId => {
                        const brand = brandData.find(b => b.id === bId)
                        return (
                          <span key={bId} className="text-[10px] font-medium px-2 py-1 rounded-lg border" style={{ background: brand.color + '10', color: brand.color, borderColor: brand.color + '30' }}>
                            {brand.icon} {brand.service}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-xs text-emerald-700">
                    ✓ This territory is operating successfully
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {availableZones.length > 0 && (
                <>
                  <div className="text-xs font-bold text-amber-600 uppercase">Open Territories ({availableZones.length})</div>
                  {availableZones.map(z => (
                    <button key={z.id} onClick={() => setSelectedZone(z)} className="w-full text-left bg-white rounded-xl border-2 border-dashed border-amber-200 p-4 hover:border-amber-400 transition-all group">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-slate-800 text-sm">{z.name}</div>
                        <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-semibold">Available</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Click to view market data</div>
                      <div className="text-xs font-semibold text-truenorth-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">View details <ArrowRight size={10} /></div>
                    </button>
                  ))}
                </>
              )}
              {activeZones.length > 0 && (
                <>
                  <div className="text-xs font-bold text-slate-400 uppercase mt-4">Active Franchises ({activeZones.length})</div>
                  {activeZones.map(z => (
                    <button key={z.id} onClick={() => setSelectedZone(z)} className="w-full text-left bg-white rounded-xl border border-slate-100 p-3 hover:border-slate-200 transition-all">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm" style={{ background: z.color }} />
                        <span className="text-sm font-semibold text-slate-700">{z.name}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400">
                        <span>{z.homes} homes</span>
                        <span>{z.workers} workers</span>
                        <span>${(z.revenue / 1000).toFixed(0)}k/mo</span>
                      </div>
                    </button>
                  ))}
                </>
              )}
              {/* Legend */}
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
                <div className="flex items-center gap-2"><span className="w-4 h-2.5 rounded-sm bg-blue-500/25 border border-blue-500" /> Active franchise</div>
                <div className="flex items-center gap-2"><span className="w-4 h-2.5 rounded-sm bg-amber-500/15 border border-dashed border-amber-500" /> Available — apply now</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
