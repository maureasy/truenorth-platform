import { ArrowRight, Building2, TrendingUp, Users, MapPin, Shield, DollarSign, BarChart3, Rocket, CheckCircle2, ChevronRight, Phone, Mail } from 'lucide-react'

const stats = [
  { value: '$128B', label: 'Canadian franchise GDP', sub: '2025' },
  { value: '5×', label: 'Avg. acquisition multiple', sub: 'EBITDA' },
  { value: '$31.2M', label: 'Year 5 revenue target', sub: 'Projected' },
  { value: '28', label: 'Target territories', sub: 'National' },
]

const brands = [
  { name: 'TrueNorth Clean', icon: '🧹', color: '#0ea5e9', desc: 'Residential & commercial cleaning' },
  { name: 'TrueNorth Lawn', icon: '🌿', color: '#22c55e', desc: 'Lawn care & snow removal' },
  { name: 'TrueNorth Deck', icon: '🪵', color: '#a855f7', desc: 'Deck & fence restoration' },
  { name: 'TrueNorth Handyman', icon: '🔧', color: '#f59e0b', desc: 'General maintenance & repair' },
  { name: 'TrueNorth Junk', icon: '🚛', color: '#ef4444', desc: 'Junk removal & hauling' },
]

const pillars = [
  { icon: Building2, title: 'Acquire Brands', desc: 'Target mid-market franchisors at 4-5× EBITDA. Founder-friendly structures with rollover equity.' },
  { icon: Rocket, title: 'Platform Integration', desc: 'Unified tech stack, shared lead-gen engine, cross-brand referral flywheel.' },
  { icon: TrendingUp, title: 'Accelerate Growth', desc: 'Internal capital fund to infill white-space territories. Work-to-own operator pathway.' },
  { icon: Users, title: 'Total Home Model', desc: 'Membership-based recurring revenue. One household, multiple services, maximum LTV.' },
]

const dealStructure = [
  { tier: 'Tier 1 — Foundational', items: ['30% cash', '25% seller note', '20% rollover equity', '25% performance'] },
  { tier: 'Tier 2 — Add-on', items: ['40% cash', '20% seller note', '15% rollover equity', '25% performance'] },
]

const timeline = [
  { year: 'Year 1', milestone: '2 brands acquired, 3 cities launched', revenue: '$4.8M' },
  { year: 'Year 2', milestone: '4 brands, 6 cities, membership launch', revenue: '$9.2M' },
  { year: 'Year 3', milestone: '5 brands, 12 cities, 500+ franchisees', revenue: '$16.4M' },
  { year: 'Year 5', milestone: 'National coverage, 28 territories', revenue: '$31.2M' },
]

export function CorporateLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-truenorth-500 to-truenorth-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-truenorth-500/20">TN</div>
            <span className="text-lg font-bold text-slate-900">TrueNorth</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#opportunity" className="hover:text-truenorth-600 transition-colors">Opportunity</a>
            <a href="#platform" className="hover:text-truenorth-600 transition-colors">Platform</a>
            <a href="#brands" className="hover:text-truenorth-600 transition-colors">Brands</a>
            <a href="#growth" className="hover:text-truenorth-600 transition-colors">Growth</a>
            <a href="#contact" className="px-5 py-2.5 bg-truenorth-600 text-white rounded-xl font-semibold hover:bg-truenorth-700 transition-colors shadow-lg shadow-truenorth-600/20">Contact Us</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-truenorth-50 text-truenorth-700 rounded-full text-sm font-semibold mb-6 border border-truenorth-100">
              <Building2 size={14} /> Building Canada's premier home services platform
            </div>
            <h1 className="text-5xl font-black text-slate-900 leading-tight tracking-tight">
              The multi-brand franchisor<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-truenorth-500 to-truenorth-700">Canada needs.</span>
            </h1>
            <p className="text-xl text-slate-500 mt-6 leading-relaxed max-w-2xl">
              Acquiring, integrating, and scaling mid-market home service franchisors through a proprietary technology platform and cross-brand referral flywheel.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-truenorth-500 to-truenorth-700 text-white font-bold rounded-xl text-sm hover:shadow-xl hover:shadow-truenorth-500/25 transition-all hover:-translate-y-0.5">
                Request Deck <ArrowRight size={16} />
              </a>
              <a href="#platform" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-slate-200 text-slate-700 font-bold rounded-xl text-sm hover:border-truenorth-300 transition-all">
                See the Platform
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 mt-16">
            {stats.map(s => (
              <div key={s.label} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-3xl font-black text-slate-900">{s.value}</div>
                <div className="text-sm text-slate-600 font-medium mt-1">{s.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunity */}
      <section id="opportunity" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center">The White Space</h2>
          <p className="text-lg text-slate-500 text-center mt-3 max-w-2xl mx-auto">
            Mid-market Canadian franchisors fall between acquisition strategies — too small for PE, too big for individual buyers.
          </p>
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4"><DollarSign size={22} className="text-red-500" /></div>
              <h3 className="text-lg font-bold text-slate-900">Too Small for PE</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">$2-4M EBITDA sweet spot overlooked by private equity. Sub-scale for institutional funds.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4"><Users size={22} className="text-amber-500" /></div>
              <h3 className="text-lg font-bold text-slate-900">Too Big for Individuals</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">30-80 unit networks require sophisticated buyer with capital and operating expertise.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4"><TrendingUp size={22} className="text-emerald-500" /></div>
              <h3 className="text-lg font-bold text-slate-900">Silver Tsunami</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">60-70 year old founders ready to exit. Thousands of franchisors, no natural buyer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform */}
      <section id="platform" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center">Platform Playbook</h2>
          <p className="text-lg text-slate-500 text-center mt-3 max-w-2xl mx-auto">
            Four-pillar approach to building a $31M+ revenue platform.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-12">
            {pillars.map((p, i) => {
              const Icon = p.icon
              return (
                <div key={i} className="flex gap-5 p-8 rounded-2xl border border-slate-100 bg-white hover:shadow-lg transition-all hover:-translate-y-0.5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-truenorth-50 to-truenorth-100 flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-truenorth-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center">Brand Portfolio</h2>
          <p className="text-lg text-slate-500 text-center mt-3">Phase 1: Non-Red Seal services with recurring revenue DNA.</p>
          <div className="grid grid-cols-5 gap-4 mt-12">
            {brands.map(b => (
              <div key={b.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{b.icon}</div>
                <div className="font-bold text-slate-900 text-sm">{b.name}</div>
                <div className="text-xs text-slate-400 mt-1">{b.desc}</div>
                <div className="w-full h-1 rounded-full mt-4" style={{ background: b.color }} />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-400">Phase 2: Selective restoration + skilled trades with proven recruiting</p>
          </div>
        </div>
      </section>

      {/* Flywheel */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center">The Flywheel</h2>
          <p className="text-lg text-slate-500 text-center mt-3 max-w-2xl mx-auto">
            Cleaning and lawncare franchisees act as in-home sensors, feeding high-intent leads into sister brands.
          </p>
          <div className="flex items-center justify-center gap-4 mt-12 flex-wrap">
            {['Worker visits home', 'Spots opportunity', 'Logs observation', 'Lead sent to sister brand', 'Quote auto-generated', 'Customer approves', 'Revenue shared'].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <span className="w-6 h-6 rounded-full bg-truenorth-100 text-truenorth-700 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="text-xs font-semibold text-slate-700">{step}</span>
                </div>
                {i < 6 && <ChevronRight size={16} className="text-slate-300" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth */}
      <section id="growth" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-16">
            {/* Deal structure */}
            <div>
              <h2 className="text-2xl font-black text-slate-900">Deal Structure</h2>
              <p className="text-sm text-slate-500 mt-2">Founder-friendly acquisitions that align incentives.</p>
              <div className="mt-8 space-y-6">
                {dealStructure.map(d => (
                  <div key={d.tier} className="bg-white rounded-2xl p-6 border border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900 mb-3">{d.tier}</h4>
                    <div className="flex gap-2 flex-wrap">
                      {d.items.map(item => (
                        <span key={item} className="px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-medium text-slate-600 border border-slate-100">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-2xl font-black text-slate-900">Growth Roadmap</h2>
              <p className="text-sm text-slate-500 mt-2">Building from $4.8M to $31.2M over 5 years.</p>
              <div className="mt-8 space-y-4">
                {timeline.map(t => (
                  <div key={t.year} className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-slate-100">
                    <div className="w-16 shrink-0">
                      <div className="text-sm font-black text-truenorth-600">{t.year}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-700">{t.milestone}</div>
                    </div>
                    <div className="text-lg font-black text-emerald-600">{t.revenue}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-slate-900">Let's Build This Together</h2>
          <p className="text-lg text-slate-500 mt-4">
            Whether you're a franchisor exploring exit options, an investor looking at Canadian home services, or an operator ready to grow — let's talk.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <a href="mailto:hello@truenorth.ca" className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-truenorth-500 to-truenorth-700 text-white font-bold rounded-xl text-sm hover:shadow-xl hover:shadow-truenorth-500/25 transition-all">
              <Mail size={16} /> hello@truenorth.ca
            </a>
            <a href="tel:+14165550100" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-slate-200 text-slate-700 font-bold rounded-xl text-sm hover:border-truenorth-300 transition-all">
              <Phone size={16} /> (416) 555-0100
            </a>
          </div>
          <p className="text-xs text-slate-400 mt-6">Confidential &bull; By invitation only</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-truenorth-500 to-truenorth-700 flex items-center justify-center text-white font-bold text-[9px]">TN</div>
            <span className="font-medium">TrueNorth Home Services Corp.</span>
          </div>
          <div>&copy; 2026. All rights reserved. &bull; Toronto, Canada</div>
        </div>
      </footer>
    </div>
  )
}
