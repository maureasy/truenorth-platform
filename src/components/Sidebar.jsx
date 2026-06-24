import { CalendarDays, Users, Home, Trophy, Zap, Map, MessageSquare, Crown, Inbox, DollarSign, Briefcase, Building2, BarChart3, Rocket, UserPlus, ShoppingBag, FileText, CreditCard, Receipt, Handshake, GitBranch, Milestone, ClipboardCheck, Target } from 'lucide-react'

const icons = {
  // HoldCo
  brand_portfolio: ShoppingBag,
  territory_map: Map,
  trade_partners: Handshake,
  bridgeco_pipeline: GitBranch,
  sourcing_crm: Target,
  deal_scorecard: ClipboardCheck,
  hub1_timeline: Milestone,
  franchisee_mgmt: UserPlus,
  growth_accelerator: Rocket,
  platform_analytics: BarChart3,
  franchise_sales: Building2,
  // Franchisee
  command_center: Zap,
  customers: Users,
  schedule: CalendarDays,
  jobs: Briefcase,
  lead_inbox: Inbox,
  pipeline: MessageSquare,
  territory: Map,
  billing: CreditCard,
  revenue: Trophy,
  membership: Crown,
  payouts: DollarSign,
}

const labels = {
  // HoldCo
  brand_portfolio: 'Brand Portfolio',
  territory_map: 'Territory Map',
  trade_partners: 'Trade Partners',
  bridgeco_pipeline: 'BridgeCo Pipeline',
  sourcing_crm: 'Deal Sourcing',
  deal_scorecard: 'Deal Scorecard',
  hub1_timeline: 'Hub 1 Timeline',
  franchisee_mgmt: 'Franchisees',
  growth_accelerator: 'Growth Accelerator',
  platform_analytics: 'Platform Analytics',
  franchise_sales: 'Franchise Sales',
  // Franchisee
  command_center: 'Command Center',
  customers: 'Customers',
  schedule: 'Schedule',
  jobs: 'Jobs',
  lead_inbox: 'Lead Inbox',
  pipeline: 'Pipeline',
  territory: 'Territory',
  billing: 'Billing',
  revenue: 'Revenue',
  membership: 'Membership',
  payouts: 'Worker Payouts',
}

const envSections = {
  holdco: [
    { title: 'Overview', items: ['platform_analytics'] },
    { title: 'Portfolio', items: ['brand_portfolio', 'territory_map', 'trade_partners'] },
    { title: 'Acquisitions', items: ['bridgeco_pipeline', 'sourcing_crm', 'deal_scorecard'] },
    { title: 'Strategy', items: ['hub1_timeline'] },
    { title: 'Franchisees', items: ['franchisee_mgmt', 'growth_accelerator'] },
    { title: 'Sales', items: ['franchise_sales'] },
  ],
  franchisee: [
    { title: 'Dashboard', items: ['command_center'] },
    { title: 'Customers', items: ['customers'] },
    { title: 'Jobs', items: ['schedule', 'jobs'] },
    { title: 'Leads', items: ['lead_inbox', 'pipeline'] },
    { title: 'Territory', items: ['territory'] },
    { title: 'Money', items: ['billing', 'revenue', 'membership', 'payouts'] },
  ],
}

export function Sidebar({ activeView, setActiveView, environment }) {
  const sections = envSections[environment] || envSections.franchisee

  return (
    <nav className="w-60 bg-white/50 glass border-r border-slate-200/60 flex flex-col py-4 px-3 shrink-0 gap-1">
      {sections.map((section, si) => (
        <div key={si} className={si > 0 ? 'mt-4' : ''}>
          {section.title && (
            <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{section.title}</div>
          )}
          {section.items.map(view => {
            const Icon = icons[view]
            const active = activeView === view
            return (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium rounded-xl transition-all duration-150 ${
                  active
                    ? 'bg-truenorth-500 text-white shadow-md shadow-truenorth-500/20'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <Icon size={17} strokeWidth={active ? 2.2 : 1.8} />
                {labels[view]}
              </button>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
