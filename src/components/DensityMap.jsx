import { useState, useMemo, useEffect } from 'react'
import { MapContainer, TileLayer, Polygon, GeoJSON, CircleMarker, Popup, Tooltip } from 'react-leaflet'
import { MapPin, Users, Home, DollarSign, Target, CheckCircle2, Loader2 } from 'lucide-react'
import { brands, postalCoverage, territories, franchiseZones } from '../data/mockData'

// Fetch real boundary polygons from OpenStreetMap Nominatim API
async function fetchBoundary(query) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&polygon_geojson=1&limit=1`
  const res = await fetch(url, { headers: { 'User-Agent': 'TrueNorth-Dashboard/1.0' } })
  const data = await res.json()
  if (data.length > 0 && data[0].geojson) {
    return data[0].geojson
  }
  return null
}

// District queries for each franchise zone
const boundaryQueries = {
  'fz-old-toronto': 'Old Toronto, Toronto, Ontario, Canada',
  'fz-east-york': 'East York, Toronto, Ontario, Canada',
  'fz-north-york': 'North York, Toronto, Ontario, Canada',
  'fz-york': 'York, Toronto, Ontario, Canada',
  'fz-etobicoke': 'Etobicoke, Toronto, Ontario, Canada',
  'fz-scarborough': 'Scarborough, Toronto, Ontario, Canada',
  'fz-calgary-sw': 'Calgary SW, Alberta, Canada',
  'fz-calgary-nw': 'Calgary NW, Alberta, Canada',
  'fz-calgary-ne': 'Calgary NE, Alberta, Canada',
  'fz-calgary-se': 'Calgary SE, Alberta, Canada',
}

export function DensityMap() {
  const [selectedCity, setSelectedCity] = useState('gta')
  const [selectedZone, setSelectedZone] = useState(null)
  const [showDensity, setShowDensity] = useState(true)
  const [liveBoundaries, setLiveBoundaries] = useState({})
  const [loading, setLoading] = useState(false)

  const city = territories.find(t => t.id === selectedCity)
  const zones = useMemo(() => franchiseZones.filter(z => z.city === selectedCity), [selectedCity])
  const codes = useMemo(() => postalCoverage.filter(p => p.city === selectedCity), [selectedCity])

  // Fetch real boundaries from OSM on mount / city change
  useEffect(() => {
    const cityZones = franchiseZones.filter(z => z.city === selectedCity)
    const toFetch = cityZones.filter(z => boundaryQueries[z.id] && !liveBoundaries[z.id])

    if (toFetch.length === 0) return

    setLoading(true)
    let cancelled = false

    async function loadBoundaries() {
      const results = { ...liveBoundaries }
      for (const zone of toFetch) {
        if (cancelled) break
        try {
          const geojson = await fetchBoundary(boundaryQueries[zone.id])
          if (geojson) results[zone.id] = geojson
        } catch (e) {
          console.warn(`Failed to fetch boundary for ${zone.name}:`, e)
        }
        // Nominatim rate limit: 1 req/sec
        await new Promise(r => setTimeout(r, 1100))
      }
      if (!cancelled) {
        setLiveBoundaries(results)
        setLoading(false)
      }
    }

    loadBoundaries()
    return () => { cancelled = true }
  }, [selectedCity])

  const activeZones = zones.filter(z => z.status === 'active')
  const availableZones = zones.filter(z => z.status === 'available')
  const totalHomes = activeZones.reduce((s, z) => s + z.homes, 0)
  const totalRevenue = activeZones.reduce((s, z) => s + z.revenue, 0)
  const totalWorkers = activeZones.reduce((s, z) => s + z.workers, 0)

  return (
    <div className="h-full flex flex-col gap-4 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Territory Map</h2>
          <p className="text-xs text-slate-400 mt-0.5">Franchise boundaries &bull; {activeZones.length} active, {availableZones.length} available</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-[11px] text-slate-500 cursor-pointer">
            <input type="checkbox" checked={showDensity} onChange={e => setShowDensity(e.target.checked)} className="rounded border-slate-300" />
            Show density dots
          </label>
          {territories.map(t => (
            <button
              key={t.id}
              onClick={() => { setSelectedCity(t.id); setSelectedZone(null) }}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                selectedCity === t.id ? 'bg-truenorth-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >{t.name}</button>
          ))}
        </div>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center gap-2 text-[11px] text-truenorth-500 bg-truenorth-50 border border-truenorth-100 rounded-lg px-3 py-1.5 w-fit">
          <Loader2 size={12} className="animate-spin" />
          Loading real boundaries from OpenStreetMap...
        </div>
      )}

      {/* Metrics row */}
      <div className="grid grid-cols-5 gap-3">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="text-[10px] text-slate-400 font-medium uppercase">Franchises</div>
          <div className="text-xl font-black text-slate-900">{activeZones.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="text-[10px] text-slate-400 font-medium uppercase">Available</div>
          <div className="text-xl font-black text-amber-600">{availableZones.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="text-[10px] text-slate-400 font-medium uppercase">Total Homes</div>
          <div className="text-xl font-black text-blue-600">{totalHomes}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="text-[10px] text-slate-400 font-medium uppercase">Workers</div>
          <div className="text-xl font-black text-purple-600">{totalWorkers}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
          <div className="text-[10px] text-slate-400 font-medium uppercase">Monthly Rev</div>
          <div className="text-xl font-black text-emerald-600">${(totalRevenue / 1000).toFixed(0)}k</div>
        </div>
      </div>

      {/* Map + sidebar */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Map */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-slate-100 shadow-card">
          <MapContainer center={city.center} zoom={city.zoom + 1} className="h-full w-full" zoomControl={false}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution="" />

            {/* Franchise boundary polygons — real OSM data when available, fallback to hardcoded */}
            {zones.map(zone => {
              const isSelected = selectedZone?.id === zone.id
              const isAvailable = zone.status === 'available'
              const style = {
                color: zone.color,
                weight: isSelected ? 3 : 2,
                fillColor: zone.color,
                fillOpacity: isSelected ? 0.35 : isAvailable ? 0.08 : 0.18,
                dashArray: isAvailable ? '8 4' : undefined,
              }

              // Use live OSM boundary if available
              if (liveBoundaries[zone.id]) {
                return (
                  <GeoJSON
                    key={zone.id + '-live'}
                    data={liveBoundaries[zone.id]}
                    style={() => style}
                    eventHandlers={{ click: () => setSelectedZone(zone) }}
                  >
                    <Tooltip direction="center" permanent className="territory-label">
                      <span style={{ color: zone.color, fontWeight: 700, fontSize: '11px' }}>
                        {zone.name}
                      </span>
                    </Tooltip>
                  </GeoJSON>
                )
              }

              // Fallback to hardcoded polygon
              return (
                <Polygon
                  key={zone.id}
                  positions={zone.polygon}
                  pathOptions={style}
                  eventHandlers={{ click: () => setSelectedZone(zone) }}
                >
                  <Tooltip direction="center" permanent className="territory-label">
                    <span style={{ color: zone.color, fontWeight: 700, fontSize: '11px' }}>
                      {zone.name}
                    </span>
                  </Tooltip>
                </Polygon>
              )
            })}

            {/* Density dots (postal code customer clusters) */}
            {showDensity && codes.map(pc => {
              const radius = Math.max(5, Math.min(14, pc.activeHomes * 0.25))
              return (
                <CircleMarker
                  key={pc.code}
                  center={[pc.lat, pc.lng]}
                  radius={radius}
                  pathOptions={{ fillColor: '#1e293b', fillOpacity: 0.3, color: '#1e293b', weight: 1, opacity: 0.4 }}
                >
                  <Popup>
                    <div className="text-[12px] min-w-[150px]">
                      <div className="font-bold text-slate-900">{pc.code}</div>
                      <div className="text-slate-500">{pc.activeHomes} homes</div>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {pc.services.map(sId => {
                          const brand = brands.find(b => b.id === sId)
                          return <span key={sId} className="text-[9px] px-1 py-0.5 rounded" style={{ background: brand.color + '20', color: brand.color }}>{brand.icon}</span>
                        })}
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              )
            })}
          </MapContainer>
        </div>

        {/* Zone detail sidebar */}
        <div className="w-80 shrink-0 bg-white rounded-2xl border border-slate-100 shadow-card p-4 overflow-auto">
          {selectedZone ? (
            <ZoneDetail zone={selectedZone} onClose={() => setSelectedZone(null)} />
          ) : (
            <ZoneList zones={zones} onSelect={setSelectedZone} liveBoundaries={liveBoundaries} />
          )}
        </div>
      </div>
    </div>
  )
}

function ZoneList({ zones, onSelect, liveBoundaries = {} }) {
  const active = zones.filter(z => z.status === 'active')
  const available = zones.filter(z => z.status === 'available')

  return (
    <div>
      <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
        <Target size={14} className="text-truenorth-500" />
        Franchise Zones
      </h3>

      {active.length > 0 && (
        <>
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Active ({active.length})</div>
          <div className="space-y-2 mb-4">
            {active.map(z => (
              <button key={z.id} onClick={() => onSelect(z)} className="w-full text-left border border-slate-100 rounded-xl p-3 hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ background: z.color }} />
                  <span className="text-[13px] font-bold text-slate-900">{z.name}</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-500">
                  <span className="flex items-center gap-0.5"><Home size={10} /> {z.homes}</span>
                  <span className="flex items-center gap-0.5"><Users size={10} /> {z.workers}</span>
                  <span className="flex items-center gap-0.5"><DollarSign size={10} /> ${(z.revenue / 1000).toFixed(0)}k/mo</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {available.length > 0 && (
        <>
          <div className="text-[10px] font-bold text-amber-500 uppercase mb-2">Available ({available.length})</div>
          <div className="space-y-2 mb-4">
            {available.map(z => (
              <button key={z.id} onClick={() => onSelect(z)} className="w-full text-left border border-dashed border-slate-200 rounded-xl p-3 hover:border-amber-300 transition-colors bg-amber-50/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm border-2 border-slate-300 bg-white" />
                  <span className="text-[13px] font-bold text-slate-700">{z.name}</span>
                </div>
                <div className="text-[10px] text-amber-600 mt-1">Open for franchise applications</div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="text-[10px] font-semibold text-slate-500 uppercase mb-2">Map Legend</div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[11px]"><span className="w-4 h-3 rounded-sm bg-blue-500/30 border border-blue-500" /> Active franchise</div>
          <div className="flex items-center gap-2 text-[11px]"><span className="w-4 h-3 rounded-sm bg-slate-100 border border-dashed border-slate-400" /> Available territory</div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">Dark dots = customer density</div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-50">
          <div className="text-[9px] text-slate-400">
            {Object.keys(liveBoundaries).length > 0
              ? '✓ Boundaries from OpenStreetMap (real district data)'
              : '⏳ Loading boundaries from OpenStreetMap...'}
          </div>
        </div>
      </div>
    </div>
  )
}

function ZoneDetail({ zone, onClose }) {
  const isAvailable = zone.status === 'available'

  return (
    <div>
      <button onClick={onClose} className="text-[11px] text-truenorth-500 font-semibold mb-3 hover:underline">&larr; All zones</button>

      <div className="flex items-center gap-2 mb-1">
        <div className="w-4 h-4 rounded" style={{ background: zone.color }} />
        <h3 className="text-[15px] font-bold text-slate-900">{zone.name}</h3>
      </div>

      {isAvailable ? (
        <div className="mt-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
            <div className="text-2xl mb-2">🏗️</div>
            <div className="text-[13px] font-bold text-amber-800">Territory Available</div>
            <div className="text-[11px] text-amber-600 mt-1">This area is open for a new franchise owner.</div>
            <button className="mt-3 px-4 py-2 bg-amber-500 text-white rounded-lg text-[12px] font-bold hover:bg-amber-600 transition-colors">
              View Opportunity
            </button>
          </div>
          <div className="mt-4 p-3 bg-slate-50 rounded-xl">
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Market Estimate</div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div>&bull; ~8,000 single-family homes in area</div>
              <div>&bull; Avg household income $95k</div>
              <div>&bull; No existing TrueNorth coverage</div>
              <div>&bull; Est. year-1 revenue: $180k-$240k</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <div className="text-[12px] text-slate-500">{zone.owner}</div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-slate-50 rounded-lg p-2.5 text-center">
              <div className="text-[15px] font-black text-slate-900">{zone.homes}</div>
              <div className="text-[9px] text-slate-400">Homes</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 text-center">
              <div className="text-[15px] font-black text-slate-900">{zone.workers}</div>
              <div className="text-[9px] text-slate-400">Workers</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2.5 text-center">
              <div className="text-[15px] font-black text-emerald-600">${(zone.revenue / 1000).toFixed(0)}k</div>
              <div className="text-[9px] text-slate-400">Rev/mo</div>
            </div>
          </div>

          {/* Brands active in this zone */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1.5">Active Brands</div>
            <div className="flex gap-1.5 flex-wrap">
              {zone.brands.map(bId => {
                const brand = brands.find(b => b.id === bId)
                return (
                  <span key={bId} className="text-[10px] font-medium px-2 py-1 rounded-lg border" style={{ background: brand.color + '10', color: brand.color, borderColor: brand.color + '30' }}>
                    {brand.icon} {brand.service}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Missing brands */}
          {zone.brands.length < 5 && (
            <div>
              <div className="text-[10px] font-bold text-red-400 uppercase mb-1.5">Not Yet Offered</div>
              <div className="flex gap-1.5 flex-wrap">
                {brands.filter(b => !zone.brands.includes(b.id)).map(brand => (
                  <span key={brand.id} className="text-[10px] font-medium px-2 py-1 rounded-lg bg-red-50 text-red-500 border border-red-100">
                    {brand.icon} {brand.service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Performance */}
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
            <div className="text-[10px] font-bold text-emerald-700 uppercase mb-1">Performance</div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-emerald-600">Revenue per home</span>
                <span className="font-bold text-emerald-700">${Math.round(zone.revenue / zone.homes)}/mo</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-emerald-600">Services per home</span>
                <span className="font-bold text-emerald-700">{(zone.brands.length * 0.6).toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-emerald-600">Coverage density</span>
                <span className="font-bold text-emerald-700">{zone.homes > 100 ? 'High' : zone.homes > 50 ? 'Medium' : 'Growing'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
