import { useState, useMemo } from 'react'
import { Building2, ClipboardList, Wrench, Home as HomeIcon } from 'lucide-react'
import { Sidebar } from './components/Sidebar'
import { StatsBar } from './components/StatsBar'
import { NotificationBell } from './components/NotificationBell'
import { NewBookingModal } from './components/NewBookingModal'
import { CommandCenter } from './components/CommandCenter'
import { CustomersPanel } from './components/CustomersPanel'
import { CalendarPanel } from './components/CalendarPanel'
import { JobsPanel } from './components/JobsPanel'
import { LeadInboxPanel } from './components/LeadInboxPanel'
import { ConsentFlow } from './components/ConsentFlow'
import { DensityMap } from './components/DensityMap'
import { EarningsBoard } from './components/EarningsBoard'
import { MembershipPanel } from './components/MembershipPanel'
import { WorkerMobile } from './components/WorkerMobile'
import { CustomerMobile } from './components/CustomerMobile'
import { BrandPortfolio } from './components/holdco/BrandPortfolio'
import { FranchiseeMgmt } from './components/holdco/FranchiseeMgmt'
import { GrowthAccelerator } from './components/holdco/GrowthAccelerator'
import { PlatformAnalytics } from './components/holdco/PlatformAnalytics'
import { FranchiseSales } from './components/holdco/FranchiseSales'
import { TradePartnerNetwork } from './components/holdco/TradePartnerNetwork'
import { BridgeCoPipeline } from './components/holdco/BridgeCoPipeline'
import { Hub1Timeline } from './components/holdco/Hub1Timeline'
import { DealScorecard } from './components/holdco/DealScorecard'
import { SourcingCRM } from './components/holdco/SourcingCRM'
import { BillingPanel } from './components/BillingPanel'
import { PayoutsPanel } from './components/PayoutsPanel'
import { brands, territories, people, assets, customers, bookings, observations, referrals, workOrders, stats } from './data/mockData'

const ENVIRONMENTS = [
  { id: 'holdco', label: 'HoldCo', icon: Building2, subtitle: 'Corporate HQ', defaultView: 'platform_analytics' },
  { id: 'franchisee', label: 'Franchisee', icon: ClipboardList, subtitle: 'Operator', defaultView: 'command_center' },
  { id: 'worker', label: 'Worker', icon: Wrench, subtitle: 'Field App', defaultView: 'worker_app' },
  { id: 'customer', label: 'Customer', icon: HomeIcon, subtitle: 'Homeowner', defaultView: 'customer_app' },
]

function App() {
  const [environment, setEnvironment] = useState('franchisee')
  const [activeView, setActiveView] = useState('command_center')
  const [selectedTerritory, setSelectedTerritory] = useState(territories[0])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [selectedReferral, setSelectedReferral] = useState(null)
  const [selectedObservation, setSelectedObservation] = useState(null)
  const [showNewBooking, setShowNewBooking] = useState(false)

  const switchEnv = (envId) => {
    setEnvironment(envId)
    const env = ENVIRONMENTS.find(e => e.id === envId)
    setActiveView(env.defaultView)
  }

  const context = useMemo(() => ({
    brands, people, assets, customers, bookings, observations, referrals, workOrders, stats,
    selectedTerritory, setSelectedTerritory,
    selectedBooking, setSelectedBooking,
    selectedReferral, setSelectedReferral,
    selectedObservation, setSelectedObservation,
  }), [selectedTerritory, selectedBooking, selectedReferral, selectedObservation])

  const currentEnv = ENVIRONMENTS.find(e => e.id === environment)
  const isFullscreen = environment === 'worker' || environment === 'customer'

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30">
      {/* Header */}
      <header className="bg-white/80 glass border-b border-slate-200/60 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-truenorth-500 to-truenorth-700 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-truenorth-500/20">TN</div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">TrueNorth Home Services</h1>
            <p className="text-[11px] text-slate-400 font-medium">Platform Mockup &bull; June 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Environment switcher */}
          <div className="flex bg-slate-100 rounded-xl p-1 gap-0.5">
            {ENVIRONMENTS.map(env => {
              const Icon = env.icon
              const active = environment === env.id
              return (
                <button
                  key={env.id}
                  onClick={() => switchEnv(env.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                    active ? 'bg-white text-truenorth-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                  title={env.subtitle}
                >
                  <Icon size={13} />
                  {env.label}
                </button>
              )
            })}
          </div>
          <div className="h-8 w-px bg-slate-200" />
          {environment === 'franchisee' && (
            <>
              <button onClick={() => setShowNewBooking(true)} className="px-4 py-2 bg-gradient-to-r from-truenorth-500 to-truenorth-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-truenorth-500/25 transition-all duration-200 hover:-translate-y-0.5">+ New Booking</button>
              <select
                className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white/70 font-medium text-slate-700 focus:ring-2 focus:ring-truenorth-500/20 focus:border-truenorth-400 outline-none transition-all"
                value={selectedTerritory.id}
                onChange={(e) => setSelectedTerritory(territories.find(t => t.id === e.target.value))}
              >
                {territories.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </>
          )}
          <NotificationBell />
        </div>
      </header>

      {/* Stats bar — only for franchisee */}
      {environment === 'franchisee' && <StatsBar stats={stats} />}

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — only for holdco and franchisee */}
        {!isFullscreen && (
          <Sidebar activeView={activeView} setActiveView={setActiveView} environment={environment} />
        )}

        <main className="flex-1 overflow-hidden p-5 flex gap-5">
          <div className="flex-1 flex flex-col min-w-0">

            {/* ========== HOLDCO PANELS ========== */}
            {activeView === 'platform_analytics' && environment === 'holdco' && <PlatformAnalytics />}
            {activeView === 'brand_portfolio' && environment === 'holdco' && <BrandPortfolio />}
            {activeView === 'territory_map' && environment === 'holdco' && <DensityMap holdcoView />}
            {activeView === 'franchisee_mgmt' && environment === 'holdco' && <FranchiseeMgmt />}
            {activeView === 'growth_accelerator' && environment === 'holdco' && <GrowthAccelerator />}
            {activeView === 'trade_partners' && environment === 'holdco' && <TradePartnerNetwork />}
            {activeView === 'bridgeco_pipeline' && environment === 'holdco' && <BridgeCoPipeline />}
            {activeView === 'sourcing_crm' && environment === 'holdco' && <SourcingCRM />}
            {activeView === 'deal_scorecard' && environment === 'holdco' && <DealScorecard />}
            {activeView === 'hub1_timeline' && environment === 'holdco' && <Hub1Timeline />}
            {activeView === 'franchise_sales' && environment === 'holdco' && <FranchiseSales />}

            {/* ========== FRANCHISEE PANELS ========== */}
            {activeView === 'command_center' && environment === 'franchisee' && <CommandCenter />}
            {activeView === 'customers' && environment === 'franchisee' && <CustomersPanel />}
            {activeView === 'schedule' && environment === 'franchisee' && (
              <div className="h-full bg-white rounded-2xl shadow-card border border-slate-100 p-5 overflow-hidden">
                <CalendarPanel context={context} />
              </div>
            )}
            {activeView === 'jobs' && environment === 'franchisee' && (
              <div className="h-full bg-white rounded-2xl shadow-card border border-slate-100 p-5 overflow-auto">
                <JobsPanel context={context} />
              </div>
            )}
            {activeView === 'lead_inbox' && environment === 'franchisee' && (
              <div className="h-full bg-white rounded-2xl shadow-card border border-slate-100 p-5 overflow-auto">
                <LeadInboxPanel />
              </div>
            )}
            {activeView === 'pipeline' && environment === 'franchisee' && <ConsentFlow />}
            {activeView === 'territory' && environment === 'franchisee' && <DensityMap />}
            {activeView === 'billing' && environment === 'franchisee' && <BillingPanel />}
            {activeView === 'revenue' && environment === 'franchisee' && <EarningsBoard />}
            {activeView === 'membership' && environment === 'franchisee' && <MembershipPanel />}
            {activeView === 'payouts' && environment === 'franchisee' && <PayoutsPanel />}

            {/* ========== WORKER APP ========== */}
            {environment === 'worker' && (
              <div className="h-full bg-white rounded-2xl shadow-card border border-slate-100 p-5 overflow-auto">
                <WorkerMobile />
              </div>
            )}

            {/* ========== CUSTOMER APP ========== */}
            {environment === 'customer' && (
              <div className="h-full bg-white rounded-2xl shadow-card border border-slate-100 p-5 overflow-auto">
                <CustomerMobile />
              </div>
            )}
          </div>

          {/* Activity feed — franchisee operational views only */}
          {environment === 'franchisee' && ['schedule', 'jobs'].includes(activeView) && (
            <aside className="w-80 shrink-0 bg-white rounded-2xl shadow-card border border-slate-100 p-5 overflow-auto hidden xl:block">
              <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-truenorth-400 to-truenorth-600" />
                Activity Feed
              </h3>
              <div className="space-y-4">
                {[...observations].reverse().map(o => {
                  const brand = brands.find(b => b.id === o.brandId)
                  const worker = people.find(p => p.id === o.workerId)
                  const customer = customers.find(c => c.id === o.customerId)
                  return (
                    <div key={o.id} className="relative pl-4 py-2 group">
                      <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full" style={{ background: brand.color }} />
                      <div className="text-[13px] font-semibold text-slate-900">{worker.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{customer.name} &bull; <span style={{ color: brand.color }}>{brand.service}</span></div>
                      <div className="text-xs text-slate-500 mt-1.5 leading-relaxed">{o.text}</div>
                      <div className="text-[11px] text-slate-400 mt-1.5 font-medium">{new Date(o.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>
                  )
                })}
              </div>
            </aside>
          )}
        </main>
      </div>
      {showNewBooking && <NewBookingModal onClose={() => setShowNewBooking(false)} />}
    </div>
  )
}

export default App
