import { Rocket, DollarSign, MapPin, Users, TrendingUp, CheckCircle2, Clock } from 'lucide-react'
import { acceleratorFund, brands } from '../../data/mockData'

const loans = [
  { id: 'gl1', operator: 'Ahmed Rashid', type: 'work_to_own', brand: 'clean', territory: 'M4K (East Toronto)', amount: 120000, disbursed: '2025-08', status: 'active', repaid: 45000, homes: 22 },
  { id: 'gl2', operator: 'Lin Wei', type: 'work_to_own', brand: 'lawn', territory: 'T2P (Downtown Calgary)', amount: 95000, disbursed: '2025-11', status: 'active', repaid: 18000, homes: 14 },
  { id: 'gl3', operator: 'Sophie Tremblay', type: 'lender_backed', brand: 'clean', territory: 'M6K (Parkdale)', amount: 180000, disbursed: '2025-06', status: 'active', repaid: 72000, homes: 38 },
  { id: 'gl4', operator: 'David Osei', type: 'work_to_own', brand: 'handyman', territory: 'M4S (Davisville)', amount: 140000, disbursed: '2025-09', status: 'active', repaid: 35000, homes: 18 },
  { id: 'gl5', operator: 'Maria Santos', type: 'lender_backed', brand: 'lawn', territory: 'M5R (Annex)', amount: 200000, disbursed: '2025-04', status: 'active', repaid: 110000, homes: 48 },
  { id: 'gl6', operator: 'Jason Park', type: 'work_to_own', brand: 'clean', territory: 'T3H (West Calgary)', amount: 110000, disbursed: '2026-01', status: 'active', repaid: 12000, homes: 8 },
  { id: 'gl7', operator: 'Nicole Dubois', type: 'lender_backed', brand: 'deck', territory: 'M4W (Rosedale)', amount: 165000, disbursed: '2025-07', status: 'active', repaid: 58000, homes: 28 },
  { id: 'gl8', operator: 'Ryan Mitchell', type: 'work_to_own', brand: 'junk', territory: 'M6G (Christie)', amount: 130000, disbursed: '2025-10', status: 'active', repaid: 28000, homes: 12 },
]

const af = acceleratorFund

export function GrowthAccelerator() {
  const totalRepaid = loans.reduce((s, l) => s + l.repaid, 0)
  const totalHomes = loans.reduce((s, l) => s + l.homes, 0)
  const pctDeployed = Math.round(af.deployed / af.totalCapital * 100)
  const remaining = af.totalCapital - af.deployed

  return (
    <div className="h-full flex flex-col gap-5 overflow-auto">
      <div>
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Rocket size={20} className="text-truenorth-500" />
          Growth Accelerator Fund
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">Internal capital pool to infill white space &bull; Fund work-to-own operators</p>
      </div>

      {/* Fund overview */}
      <div className="grid grid-cols-5 gap-3">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="text-[10px] text-slate-400 font-medium">Total Capital</div>
          <div className="text-xl font-black text-slate-900 mt-1">${(af.totalCapital / 1000000).toFixed(1)}M</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="text-[10px] text-slate-400 font-medium">Deployed</div>
          <div className="text-xl font-black text-blue-600 mt-1">${(af.deployed / 1000000).toFixed(2)}M</div>
          <div className="text-[9px] text-blue-500 font-semibold mt-0.5">{pctDeployed}% utilized</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="text-[10px] text-slate-400 font-medium">Available</div>
          <div className="text-xl font-black text-emerald-600 mt-1">${(remaining / 1000).toFixed(0)}k</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="text-[10px] text-slate-400 font-medium">Repaid</div>
          <div className="text-xl font-black text-emerald-600 mt-1">${(totalRepaid / 1000).toFixed(0)}k</div>
          <div className="text-[9px] text-emerald-500 font-semibold mt-0.5">{af.repaymentRate}% on time</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
          <div className="text-[10px] text-slate-400 font-medium">Territories Filled</div>
          <div className="text-xl font-black text-slate-900 mt-1">{af.territoriesFilled}/{af.territoriesTarget}</div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2">
            <div className="h-full bg-truenorth-500 rounded-full" style={{ width: `${af.territoriesFilled / af.territoriesTarget * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Deployment split */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Users size={14} className="text-violet-500" />
            <h3 className="text-sm font-bold text-slate-900">Work-to-Own</h3>
            <span className="text-[10px] bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">{af.workToOwn} operators</span>
          </div>
          <p className="text-[11px] text-slate-500 mb-3">Operators build equity through performance. Path to franchise ownership over 3-5 years.</p>
          <div className="space-y-2">
            {loans.filter(l => l.type === 'work_to_own').map(l => (
              <LoanRow key={l.id} loan={l} />
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={14} className="text-blue-500" />
            <h3 className="text-sm font-bold text-slate-900">Lender-Backed</h3>
            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{af.lenderBacked} franchisees</span>
          </div>
          <p className="text-[11px] text-slate-500 mb-3">Co-funded with BDC/bank financing. 2:1 debt:equity. Standard franchise agreement.</p>
          <div className="space-y-2">
            {loans.filter(l => l.type === 'lender_backed').map(l => (
              <LoanRow key={l.id} loan={l} />
            ))}
          </div>
        </div>
      </div>

      {/* Impact summary */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
        <h4 className="text-[11px] font-bold text-slate-500 uppercase mb-3">Flywheel Impact</h4>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-black text-slate-900">{totalHomes}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">New homes served via Accelerator</div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{loans.length}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Active operators funded</div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-600">{af.territoriesFilled}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">White-space territories filled</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoanRow({ loan }) {
  const brand = brands.find(b => b.id === loan.brand)
  const pctRepaid = Math.round(loan.repaid / loan.amount * 100)
  return (
    <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg">
      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: brand?.color }} />
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-semibold text-slate-800 truncate">{loan.operator}</div>
        <div className="text-[10px] text-slate-400">{loan.territory}</div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-[11px] font-bold text-slate-700">${(loan.amount / 1000).toFixed(0)}k</div>
        <div className="text-[9px] text-emerald-600 font-medium">{pctRepaid}% repaid</div>
      </div>
    </div>
  )
}
