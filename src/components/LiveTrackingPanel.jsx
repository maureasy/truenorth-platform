import { useState } from 'react'
import { MapPin, Clock, Navigation, CheckCircle2, Loader2, Phone, MessageSquare, Star } from 'lucide-react'
import { brands, people, customers, liveJobs } from '../data/mockData'

const stages = ['matching', 'en_route', 'arrived', 'working', 'complete']
const stageLabels = {
  matching: 'Finding Pro',
  en_route: 'En Route',
  arrived: 'Arrived',
  working: 'Working',
  complete: 'Complete',
}
const stageIcons = {
  matching: Loader2,
  en_route: Navigation,
  arrived: MapPin,
  working: Clock,
  complete: CheckCircle2,
}
const stageColors = {
  matching: { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', fill: 'bg-amber-500' },
  en_route: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', fill: 'bg-blue-500' },
  arrived: { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', fill: 'bg-indigo-500' },
  working: { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', fill: 'bg-emerald-500' },
  complete: { text: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', fill: 'bg-slate-400' },
}

function timeAgo(dateStr) {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  return `${hrs}h ${mins % 60}m ago`
}

export function LiveTrackingPanel() {
  const [selectedJob, setSelectedJob] = useState(liveJobs[0])
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? liveJobs : liveJobs.filter(j => j.stage === filter)
  const activeCounts = {
    all: liveJobs.length,
    matching: liveJobs.filter(j => j.stage === 'matching').length,
    en_route: liveJobs.filter(j => j.stage === 'en_route').length,
    arrived: liveJobs.filter(j => j.stage === 'arrived').length,
    working: liveJobs.filter(j => j.stage === 'working').length,
  }

  return (
    <div className="flex h-full gap-5">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Live Tracking</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> {liveJobs.length} active jobs</span>
            </p>
          </div>
        </div>

        {/* Stage filter pills */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {['all', 'matching', 'en_route', 'arrived', 'working'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                filter === s
                  ? 'bg-truenorth-500 text-white border-truenorth-500 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {s === 'all' ? 'All' : stageLabels[s]}
              <span className={`ml-1 ${filter === s ? 'text-white/70' : 'text-slate-400'}`}>({activeCounts[s]})</span>
            </button>
          ))}
        </div>

        {/* Job cards */}
        <div className="space-y-3 overflow-auto flex-1">
          {filtered.map(job => {
            const worker = people.find(p => p.id === job.workerId)
            const customer = customers.find(c => c.id === job.customerId)
            const brand = brands.find(b => b.id === job.brandId)
            const colors = stageColors[job.stage]
            const StageIcon = stageIcons[job.stage]
            const stageIndex = stages.indexOf(job.stage)

            return (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`border rounded-2xl p-4 cursor-pointer transition-all duration-200 ${
                  selectedJob?.id === job.id
                    ? 'border-truenorth-400 bg-truenorth-50/30 ring-2 ring-truenorth-500/10 shadow-card-hover'
                    : 'border-slate-100 hover:border-slate-200 hover:shadow-card-hover bg-white'
                }`}
              >
                {/* Worker + Status header */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={worker.photo} alt={worker.name} className="w-11 h-11 rounded-xl object-cover shadow-sm" />
                    <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      job.stage === 'matching' ? 'bg-amber-400 animate-pulse'
                      : job.stage === 'en_route' ? 'bg-blue-400 animate-pulse'
                      : 'bg-green-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[13px] text-slate-900">{worker.name}</span>
                      <span className={`text-[10px] px-2.5 py-1 rounded-lg font-semibold border ${colors.bg} ${colors.text} ${colors.border} flex items-center gap-1`}>
                        <StageIcon size={10} className={job.stage === 'matching' ? 'animate-spin' : ''} />
                        {stageLabels[job.stage]}
                        {job.etaMinutes !== null && job.etaMinutes > 0 && ` · ${job.etaMinutes} min`}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{customer.name} &bull; {brand.service}</div>
                  </div>
                </div>

                {/* Progress pipeline */}
                <div className="flex items-center gap-1 mt-3">
                  {stages.slice(0, 4).map((s, i) => (
                    <div key={s} className="flex-1 flex items-center gap-1">
                      <div className={`flex-1 h-1.5 rounded-full transition-all ${
                        i < stageIndex ? colors.fill
                        : i === stageIndex ? `${colors.fill} animate-pulse`
                        : 'bg-slate-100'
                      }`} />
                    </div>
                  ))}
                </div>

                {/* Service + Address */}
                <div className="flex items-center justify-between mt-2.5 text-[11px]">
                  <span className="text-slate-700 font-medium truncate">{job.service}</span>
                  {job.stage === 'working' && (
                    <span className="text-emerald-600 font-semibold whitespace-nowrap ml-2">{job.progress}%</span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                  <MapPin size={10} /> {job.address}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Detail panel */}
      {selectedJob && <JobDetail job={selectedJob} />}
    </div>
  )
}

function JobDetail({ job }) {
  const worker = people.find(p => p.id === job.workerId)
  const customer = customers.find(c => c.id === job.customerId)
  const brand = brands.find(b => b.id === job.brandId)
  const colors = stageColors[job.stage]
  const StageIcon = stageIcons[job.stage]
  const stageIndex = stages.indexOf(job.stage)

  return (
    <div className="w-80 shrink-0 border-l border-slate-100 pl-5 overflow-auto">
      {/* Stage hero */}
      <div className={`rounded-2xl p-4 mb-5 text-center ${colors.bg} border ${colors.border}`}>
        <div className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center ${colors.fill} text-white mb-2`}>
          <StageIcon size={22} className={job.stage === 'matching' ? 'animate-spin' : ''} />
        </div>
        <div className={`text-base font-bold ${colors.text}`}>{stageLabels[job.stage]}</div>
        {job.etaMinutes !== null && job.etaMinutes > 0 && (
          <div className={`text-2xl font-black ${colors.text} mt-1`}>{job.etaMinutes} <span className="text-sm font-semibold">min</span></div>
        )}
        {job.stage === 'working' && (
          <div className="mt-2">
            <div className="w-full bg-white/60 rounded-full h-2 overflow-hidden">
              <div className={`h-full rounded-full ${colors.fill} transition-all`} style={{ width: `${job.progress}%` }} />
            </div>
            <div className={`text-[11px] font-semibold mt-1 ${colors.text}`}>{job.progress}% complete</div>
          </div>
        )}
        {job.stage === 'matching' && (
          <div className="text-[12px] text-amber-700/70 mt-1">Searching for available pro...</div>
        )}
      </div>

      {/* Stage timeline */}
      <div className="mb-5">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Timeline</div>
        <div className="space-y-0">
          {stages.map((s, i) => {
            const done = i < stageIndex
            const active = i === stageIndex
            const SIcon = stageIcons[s]
            const timestamp = s === 'matching' ? job.startedAt
              : s === 'en_route' ? job.startedAt
              : s === 'arrived' ? job.arrivedAt
              : s === 'working' ? job.workStartedAt
              : job.completedAt
            return (
              <div key={s} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white ${
                    done ? stageColors[s].fill
                    : active ? `${stageColors[s].fill} ring-4 ring-${stageColors[s].fill}/20`
                    : 'bg-slate-100 text-slate-400'
                  } ${active && s === 'matching' ? '' : ''}`}>
                    <SIcon size={13} className={(active && s === 'matching') ? 'animate-spin text-white' : done || active ? 'text-white' : ''} />
                  </div>
                  {i < stages.length - 1 && (
                    <div className={`w-0.5 h-6 ${done ? stageColors[s].fill : 'bg-slate-100'}`} />
                  )}
                </div>
                <div className="pt-1">
                  <div className={`text-[12px] font-semibold ${done || active ? 'text-slate-900' : 'text-slate-400'}`}>{stageLabels[s]}</div>
                  {timestamp && (done || active) && (
                    <div className="text-[10px] text-slate-400">{new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Worker card */}
      <div className="mb-5">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Assigned Pro</div>
        <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
          <img src={worker.photo} alt={worker.name} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-[13px] text-slate-900">{worker.name}</div>
            <div className="text-[11px] text-slate-500">{worker.role}</div>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <span className="text-[11px] font-bold text-amber-600">{worker.rating}</span>
              <span className="text-[11px] text-slate-400">&bull; {worker.jobsCompleted} jobs</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-truenorth-600 bg-truenorth-50 hover:bg-truenorth-100 rounded-xl py-2 transition-colors">
            <Phone size={12} /> Call
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-truenorth-600 bg-truenorth-50 hover:bg-truenorth-100 rounded-xl py-2 transition-colors">
            <MessageSquare size={12} /> Message
          </button>
        </div>
      </div>

      {/* Customer info */}
      <div className="mb-5">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Customer</div>
        <div className="bg-slate-50 rounded-xl p-3">
          <div className="font-semibold text-[13px] text-slate-900">{customer.name}</div>
          <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1"><MapPin size={10} /> {job.address}</div>
          <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1"><Phone size={10} /> {customer.phone}</div>
        </div>
      </div>

      {/* Job details */}
      <div>
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Job Details</div>
        <div className="space-y-2 text-[12px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Service</span>
            <span className="font-medium text-slate-900">{brand.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Description</span>
            <span className="font-medium text-slate-900 text-right max-w-[180px]">{job.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Est. Duration</span>
            <span className="font-medium text-slate-900">{job.estimatedDuration} min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Started</span>
            <span className="font-medium text-slate-900">{timeAgo(job.startedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
