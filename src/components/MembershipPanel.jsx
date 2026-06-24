import { Crown, Users, TrendingUp, ArrowUpRight, Shield, Check } from 'lucide-react'
import { membershipTiers, membershipStats } from '../data/mockData'

export function MembershipPanel() {
  const ms = membershipStats

  return (
    <div className="h-full flex flex-col gap-5 overflow-auto">
      {/* Hero comparison */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Crown size={18} />
            <span className="text-[12px] font-semibold opacity-80">MEMBERS</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Stat label="Count" value={ms.totalMembers} />
            <Stat label="Monthly Rev" value={`$${(ms.memberRevenue / 1000).toFixed(1)}k`} />
            <Stat label="Avg LTV" value={`$${(ms.memberLTV / 1000).toFixed(1)}k`} />
            <Stat label="Retention" value={`${ms.memberRetention}%`} />
            <Stat label="Services/Home" value={ms.memberCrossSell.toFixed(1)} />
            <Stat label="Rev/Member" value={`$${Math.round(ms.memberRevenue / ms.totalMembers)}/mo`} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Users size={18} />
            <span className="text-[12px] font-semibold opacity-80">NON-MEMBERS</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Stat label="One-Off Rev" value={`$${(ms.nonMemberRevenue / 1000).toFixed(1)}k`} />
            <Stat label="Avg LTV" value={`$${(ms.nonMemberLTV / 1000).toFixed(1)}k`} />
            <Stat label="Retention" value={`${ms.nonMemberRetention}%`} />
            <Stat label="Services/Home" value={ms.nonMemberCrossSell.toFixed(1)} />
          </div>
        </div>
      </div>

      {/* LTV multiplier */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Why Membership Matters</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Members vs non-members across key metrics</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
            <ArrowUpRight size={14} className="text-emerald-600" />
            <span className="text-[12px] font-bold text-emerald-700">{(ms.memberLTV / ms.nonMemberLTV).toFixed(1)}× LTV multiplier</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5">
          <CompareBar label="Lifetime Value" member={ms.memberLTV} nonMember={ms.nonMemberLTV} prefix="$" suffix="" />
          <CompareBar label="Retention" member={ms.memberRetention} nonMember={ms.nonMemberRetention} prefix="" suffix="%" />
          <CompareBar label="Cross-Sell (services)" member={ms.memberCrossSell} nonMember={ms.nonMemberCrossSell} prefix="" suffix="" />
        </div>
      </div>

      {/* Tier cards */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Shield size={14} className="text-truenorth-500" />
          Subscription Tiers
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {membershipTiers.map((tier, idx) => (
            <div key={tier.id} className={`rounded-2xl border-2 p-5 transition-all ${
              idx === 2 ? 'border-emerald-300 bg-emerald-50/30 shadow-lg' : 'border-slate-100 bg-white'
            }`}>
              {idx === 2 && (
                <div className="text-[9px] font-bold text-emerald-600 uppercase bg-emerald-100 px-2 py-0.5 rounded-full inline-block mb-2">Best Value</div>
              )}
              <div className="text-[13px] font-bold text-slate-900">{tier.name}</div>
              <div className="mt-2">
                <span className="text-2xl font-black text-slate-900">${tier.price}</span>
                <span className="text-[12px] text-slate-400">/{tier.interval}</span>
              </div>
              <div className="mt-3 space-y-1.5">
                {tier.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-[11px] text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Members</span>
                  <span className="font-bold text-slate-700">{tier.members}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Avg LTV</span>
                  <span className="font-bold text-emerald-600">${(tier.avgLTV / 1000).toFixed(1)}k</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Churn</span>
                  <span className={`font-bold ${tier.churnRate <= 3 ? 'text-emerald-600' : tier.churnRate <= 6 ? 'text-amber-600' : 'text-red-600'}`}>{tier.churnRate}%/mo</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">MRR</span>
                  <span className="font-bold text-slate-700">${(tier.price * tier.members / 1000).toFixed(1)}k</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue breakdown */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Revenue Mix</h3>
        <div className="flex gap-2 h-8 rounded-lg overflow-hidden">
          <div className="bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold" style={{ width: `${(ms.memberRevenue / (ms.memberRevenue + ms.nonMemberRevenue)) * 100}%` }}>
            Members ${(ms.memberRevenue / 1000).toFixed(0)}k ({Math.round((ms.memberRevenue / (ms.memberRevenue + ms.nonMemberRevenue)) * 100)}%)
          </div>
          <div className="bg-slate-400 flex items-center justify-center text-[10px] text-white font-bold flex-1">
            One-off ${(ms.nonMemberRevenue / 1000).toFixed(0)}k ({Math.round((ms.nonMemberRevenue / (ms.memberRevenue + ms.nonMemberRevenue)) * 100)}%)
          </div>
        </div>
        <div className="text-[11px] text-slate-400 mt-2">
          Total MRR: <span className="font-bold text-slate-700">${((ms.memberRevenue + ms.nonMemberRevenue) / 1000).toFixed(1)}k</span>
          &bull; Target: 60% member revenue by Q4 2026
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-[18px] font-black">{value}</div>
      <div className="text-[9px] opacity-70">{label}</div>
    </div>
  )
}

function CompareBar({ label, member, nonMember, prefix, suffix }) {
  const max = Math.max(member, nonMember)
  return (
    <div>
      <div className="text-[11px] font-semibold text-slate-600 mb-2">{label}</div>
      <div className="space-y-1.5">
        <div>
          <div className="flex justify-between text-[10px] mb-0.5">
            <span className="text-emerald-600 font-medium">Member</span>
            <span className="font-bold text-emerald-600">{prefix}{typeof member === 'number' && member > 100 ? (member / 1000).toFixed(1) + 'k' : member}{suffix}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(member / max) * 100}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[10px] mb-0.5">
            <span className="text-slate-500 font-medium">Non-member</span>
            <span className="font-bold text-slate-500">{prefix}{typeof nonMember === 'number' && nonMember > 100 ? (nonMember / 1000).toFixed(1) + 'k' : nonMember}{suffix}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-400 rounded-full" style={{ width: `${(nonMember / max) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
