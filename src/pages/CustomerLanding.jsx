import { ArrowRight, Star, Shield, Clock, CheckCircle2, Users, Home, Sparkles, Phone, Calendar, ChevronRight, Award, Heart } from 'lucide-react'

const services = [
  { icon: '🧹', name: 'Home Cleaning', desc: 'Bi-weekly or deep cleans. Trusted, vetted professionals.', price: 'From $89', color: '#0ea5e9' },
  { icon: '🌿', name: 'Lawn & Snow', desc: 'Weekly mowing, seasonal aeration, snow clearing.', price: 'From $45/visit', color: '#22c55e' },
  { icon: '🪵', name: 'Deck & Fence', desc: 'Staining, repair, restoration. Bring your outdoor space back to life.', price: 'Free quote', color: '#a855f7' },
  { icon: '🔧', name: 'Handyman', desc: 'Small repairs, installations, and odd jobs — done right.', price: 'From $85/hr', color: '#f59e0b' },
  { icon: '🚛', name: 'Junk Removal', desc: 'Estate cleanouts, garage purges, appliance hauling.', price: 'From $199', color: '#ef4444' },
]

const plans = [
  { name: 'Basic', price: 49, interval: 'month', includes: ['Bi-weekly cleaning OR weekly lawn', 'Priority scheduling', '10% off add-ons', 'Online portal access'], popular: false },
  { name: 'Pro', price: 129, interval: 'month', includes: ['Bi-weekly cleaning', 'Weekly lawn care', 'Seasonal deck inspection', '15% off all add-ons', 'Dedicated account manager'], popular: true },
  { name: 'Total Home', price: 249, interval: 'month', includes: ['Bi-weekly cleaning', 'Weekly lawn care', 'Seasonal deck & fence', 'Priority handyman (4h/mo)', 'Annual junk removal', 'VIP support line'], popular: false },
]

const testimonials = [
  { name: 'Carol Wu', location: 'Toronto, ON', text: "I started with just cleaning and now they handle my lawn, deck staining, and even fixed my leaky faucet. It's like having a maintenance team for my home.", rating: 5 },
  { name: 'Henry Zhao', location: 'Mississauga, ON', text: "The Total Home membership is incredible value. My lawn guy noticed my fence was rotting and they had it fixed within a week. No hassle.", rating: 5 },
  { name: 'Emily Park', location: 'Oakville, ON', text: "Finally, one number to call for everything. Reliable, professional, and they actually communicate what's happening with my home.", rating: 5 },
]

const howItWorks = [
  { num: 1, title: 'Choose your services', desc: 'Pick what you need — cleaning, lawn, maintenance, or everything.' },
  { num: 2, title: 'We match your team', desc: 'Local, vetted pros assigned to your home. Same faces every visit.' },
  { num: 3, title: 'We spot what you miss', desc: 'Our teams proactively report issues — you approve fixes on your terms.' },
  { num: 4, title: 'Relax', desc: 'Your home is maintained, protected, and looking its best. Year-round.' },
]

export function CustomerLanding() {
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
            <a href="#services" className="hover:text-truenorth-600 transition-colors">Services</a>
            <a href="#how" className="hover:text-truenorth-600 transition-colors">How It Works</a>
            <a href="#plans" className="hover:text-truenorth-600 transition-colors">Plans</a>
            <a href="#reviews" className="hover:text-truenorth-600 transition-colors">Reviews</a>
            <a href="#book" className="px-5 py-2.5 bg-truenorth-600 text-white rounded-xl font-semibold hover:bg-truenorth-700 transition-colors shadow-lg shadow-truenorth-600/20">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-white via-truenorth-50/30 to-white">
        <div className="max-w-6xl mx-auto flex items-center gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold mb-6 border border-emerald-100">
              <Star size={14} /> Rated 4.9/5 by homeowners across Canada
            </div>
            <h1 className="text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Your home,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-truenorth-500 to-emerald-500">always at its best.</span>
            </h1>
            <p className="text-xl text-slate-500 mt-6 leading-relaxed max-w-xl">
              One platform for cleaning, lawn, deck care, handyman, and more. Our teams don't just do the job — they proactively protect your home.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a href="#book" className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-truenorth-500 to-emerald-500 text-white font-bold rounded-xl text-sm hover:shadow-xl hover:shadow-truenorth-500/25 transition-all hover:-translate-y-0.5">
                Get a Free Quote <ArrowRight size={16} />
              </a>
              <a href="#plans" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-slate-200 text-slate-700 font-bold rounded-xl text-sm hover:border-truenorth-300 transition-all">
                View Plans
              </a>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> No contracts</span>
              <span className="flex items-center gap-1.5"><Shield size={14} className="text-emerald-500" /> Fully insured</span>
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-emerald-500" /> Same-week booking</span>
            </div>
          </div>
          <div className="w-96 shrink-0">
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-2">🏠</div>
                <h3 className="font-bold text-slate-900">Quick Quote</h3>
                <p className="text-xs text-slate-400 mt-1">Tell us what your home needs</p>
              </div>
              <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400" placeholder="Your postal code" />
              <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400" placeholder="Your name" />
              <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400" placeholder="Email address" />
              <div className="grid grid-cols-3 gap-2">
                {['🧹', '🌿', '🪵', '🔧', '🚛', '✨'].map(e => (
                  <button key={e} className="py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-lg hover:border-truenorth-300 hover:bg-truenorth-50 transition-all">{e}</button>
                ))}
              </div>
              <button className="w-full py-3.5 bg-gradient-to-r from-truenorth-500 to-emerald-500 text-white font-bold rounded-xl text-sm hover:shadow-lg transition-all">
                Get My Free Quote →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-6 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-12 text-sm text-slate-500 font-medium">
          <span className="flex items-center gap-2"><Shield size={16} className="text-truenorth-500" /> $5M liability insured</span>
          <span className="flex items-center gap-2"><Users size={16} className="text-truenorth-500" /> 133 vetted professionals</span>
          <span className="flex items-center gap-2"><Home size={16} className="text-truenorth-500" /> 500+ homes served</span>
          <span className="flex items-center gap-2"><Star size={16} className="text-amber-500" /> 4.9 avg rating</span>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center">Everything Your Home Needs</h2>
          <p className="text-lg text-slate-500 text-center mt-3">One platform, multiple services, consistent quality.</p>
          <div className="grid grid-cols-5 gap-4 mt-12">
            {services.map(s => (
              <div key={s.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-slate-900 text-sm">{s.name}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{s.desc}</p>
                <div className="mt-4 text-sm font-bold" style={{ color: s.color }}>{s.price}</div>
                <div className="mt-3 text-[11px] font-semibold text-truenorth-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">Book now <ArrowRight size={10} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center">How It Works</h2>
          <p className="text-lg text-slate-500 text-center mt-3">Simple, transparent, proactive.</p>
          <div className="grid grid-cols-4 gap-6 mt-12">
            {howItWorks.map(step => (
              <div key={step.num} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-truenorth-500 to-truenorth-700 text-white font-black text-sm flex items-center justify-center mb-4">{step.num}</div>
                <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{step.desc}</p>
                {step.num < 4 && <ChevronRight size={16} className="absolute top-1/2 -right-4 text-slate-300 hidden lg:block" />}
              </div>
            ))}
          </div>

          {/* Key differentiator callout */}
          <div className="mt-12 bg-gradient-to-r from-truenorth-500 to-emerald-500 rounded-2xl p-8 text-white text-center">
            <Sparkles size={28} className="mx-auto mb-3 opacity-80" />
            <h3 className="text-xl font-bold">We Don't Just Do — We Detect</h3>
            <p className="text-sm opacity-90 mt-2 max-w-lg mx-auto">Our teams proactively report maintenance issues they spot during visits. Rotting fence? Clogged gutters? You'll know before it becomes expensive. No upselling — just honest observations you can act on (or not).</p>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center">Membership Plans</h2>
          <p className="text-lg text-slate-500 text-center mt-3">Lock in rates, skip the scheduling hassle, save more.</p>
          <div className="grid grid-cols-3 gap-6 mt-12">
            {plans.map(plan => (
              <div key={plan.name} className={`rounded-2xl p-8 border-2 relative ${plan.popular ? 'border-truenorth-300 bg-truenorth-50/30 shadow-xl' : 'border-slate-100 bg-white'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-truenorth-600 text-white text-xs font-bold rounded-full">Most Popular</div>
                )}
                <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                <div className="mt-3">
                  <span className="text-4xl font-black text-slate-900">${plan.price}</span>
                  <span className="text-sm text-slate-400">/{plan.interval}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.includes.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-8 py-3.5 rounded-xl font-bold text-sm transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-truenorth-500 to-truenorth-700 text-white hover:shadow-lg hover:shadow-truenorth-500/25'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}>
                  {plan.popular ? 'Start Pro Plan' : `Choose ${plan.name}`}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-6">All plans include: no lock-in contracts, 48h cancellation, full insurance coverage</p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 text-center">What Homeowners Say</h2>
          <div className="grid grid-cols-3 gap-6 mt-12">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">"{t.text}"</p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="text-sm font-bold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="book" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-slate-900">Ready to Simplify Home Maintenance?</h2>
          <p className="text-lg text-slate-500 mt-4">
            Get a free, no-obligation quote in under 2 minutes. Your home will thank you.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-truenorth-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-truenorth-500/25 transition-all hover:-translate-y-0.5">
              <Calendar size={18} /> Book Your First Service
            </button>
            <a href="tel:+14165550100" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:border-truenorth-300 transition-all">
              <Phone size={18} /> (416) 555-0100
            </a>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-slate-400">
            <span>✓ No contracts</span>
            <span>✓ Same-week availability</span>
            <span>✓ 100% satisfaction guaranteed</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-truenorth-400 to-truenorth-600 flex items-center justify-center text-white font-bold text-xs">TN</div>
                <span className="font-bold">TrueNorth</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">Your trusted home services partner. One call for everything your home needs.</p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">Services</h4>
              <div className="space-y-2 text-xs text-slate-400">
                <div>Home Cleaning</div>
                <div>Lawn & Snow</div>
                <div>Deck & Fence</div>
                <div>Handyman</div>
                <div>Junk Removal</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">Company</h4>
              <div className="space-y-2 text-xs text-slate-400">
                <div>About Us</div>
                <div>Careers</div>
                <div>Franchise Info</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-3">Contact</h4>
              <div className="space-y-2 text-xs text-slate-400">
                <div>(416) 555-0100</div>
                <div>hello@truenorth.ca</div>
                <div>Toronto, ON, Canada</div>
                <div className="pt-2 text-[10px]">Serving GTA, Calgary & Vancouver</div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-500 text-center">
            &copy; 2026 TrueNorth Home Services. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
