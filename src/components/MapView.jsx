import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'

function MapCenter({ center, zoom }) {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

const createIcon = (color, emoji) =>
  L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 32px; height: 32px; border-radius: 50%;
      background: ${color}; color: white;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    ">${emoji}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })

export function MapView({ context }) {
  const { brands, people, assets, customers, bookings, selectedTerritory } = context

  return (
    <MapContainer center={selectedTerritory.center} zoom={selectedTerritory.zoom} scrollWheelZoom={true}>
      <MapCenter center={selectedTerritory.center} zoom={selectedTerritory.zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {customers.map(c => {
        const brand = brands.find(b => b.id === bookings.find(bk => bk.customerId === c.id)?.brandId) || brands[0]
        return (
          <Marker key={c.id} position={[c.lat, c.lng]} icon={createIcon(brand.color, '🏠')}>
            <Popup>
              <div className="text-sm font-medium">{c.name}</div>
              <div className="text-xs text-slate-600">{c.address}</div>
              <div className="text-xs text-slate-500 mt-1">{c.phone}</div>
            </Popup>
          </Marker>
        )
      })}
      {people.map(p => {
        const brand = brands.find(b => b.id === p.brandId)
        return (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={createIcon(brand.color, '👤')}>
            <Popup>
              <div className="text-sm font-medium">{p.name}</div>
              <div className="text-xs text-slate-600">{p.role} • {brand.service}</div>
              <div className="text-xs text-slate-500 mt-1">Status: {p.status}</div>
            </Popup>
          </Marker>
        )
      })}
      {assets.map(a => {
        const brand = brands.find(b => b.id === a.brandId)
        return (
          <Marker key={a.id} position={[a.lat, a.lng]} icon={createIcon(brand.color, a.type === 'vehicle' ? '🚛' : '🔧')}>
            <Popup>
              <div className="text-sm font-medium">{a.name}</div>
              <div className="text-xs text-slate-600">{a.type} • {brand.service}</div>
              <div className="text-xs text-slate-500 mt-1">{a.status}</div>
            </Popup>
          </Marker>
        )
      })}
      <Circle center={selectedTerritory.center} radius={8000} pathOptions={{ color: '#0ea5e9', fillOpacity: 0.05 }} />
    </MapContainer>
  )
}
