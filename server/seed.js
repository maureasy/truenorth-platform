import { Franchisee, Subscriber, Asset } from './models.js'

const franchiseeSeed = [
  { name: 'GTA Clean Co.', owner: 'James Li', brandId: 'clean', status: 'healthy', units: 12, workers: 24, monthlyRevenue: 84000, churn: 2.1, nps: 72, observationRate: 4.2, conversionRate: 31, since: '2024' },
  { name: 'Sparkle Toronto', owner: 'Priya Sharma', brandId: 'clean', status: 'at_risk', units: 8, workers: 14, monthlyRevenue: 52000, churn: 5.8, nps: 61, observationRate: 2.8, conversionRate: 22, since: '2025' },
  { name: 'GreenEdge Lawn', owner: 'Tom Murray', brandId: 'lawn', status: 'healthy', units: 15, workers: 30, monthlyRevenue: 110000, churn: 1.4, nps: 78, observationRate: 3.5, conversionRate: 35, since: '2024' },
  { name: 'SnowPro Services', owner: 'Karim Hassan', brandId: 'lawn', status: 'watch', units: 10, workers: 18, monthlyRevenue: 68000, churn: 3.2, nps: 65, observationRate: 1.9, conversionRate: 18, since: '2025' },
  { name: 'DeckMasters ON', owner: 'Mike Oduya', brandId: 'deck', status: 'healthy', units: 6, workers: 12, monthlyRevenue: 92000, churn: 0.8, nps: 82, observationRate: 1.2, conversionRate: 28, since: '2024' },
  { name: 'FixIt Toronto', owner: 'Rachel Wong', brandId: 'handyman', status: 'watch', units: 9, workers: 15, monthlyRevenue: 45000, churn: 4.5, nps: 58, observationRate: 3.8, conversionRate: 25, since: '2025' },
  { name: 'JunkAway GTA', owner: 'Steve Bello', brandId: 'junk', status: 'healthy', units: 5, workers: 10, monthlyRevenue: 38000, churn: 1.2, nps: 74, observationRate: 0.5, conversionRate: 12, since: '2025' },
  { name: 'Fresh Start Calgary', owner: 'Diana Cho', brandId: 'clean', status: 'healthy', units: 6, workers: 10, monthlyRevenue: 41000, churn: 3, nps: 68, observationRate: 2.1, conversionRate: 20, since: '2026' },
]

const subscriberSeed = [
  { name: 'Alice Montgomery', email: 'alice.m@email.com', phone: '416-555-1001', address: '123 Bloor St W, Toronto', tier: 'total_home', status: 'active', memberSince: new Date('2025-01-10'), totalSpend: 8200, servicesUsed: ['clean', 'lawn', 'junk'] },
  { name: 'Carol Wu', email: 'carol.wu@email.com', phone: '416-555-1003', address: '88 Yonge St, Toronto', tier: 'pro', status: 'active', memberSince: new Date('2025-04-22'), totalSpend: 5400, servicesUsed: ['lawn', 'clean'] },
  { name: 'Emily Park', email: 'emily.p@email.com', phone: '416-555-1005', address: '55 Dundas St, Toronto', tier: 'total_home', status: 'active', memberSince: new Date('2025-08-01'), totalSpend: 12500, servicesUsed: ['clean', 'lawn', 'deck', 'handyman'] },
  { name: 'Grace Lee', email: 'grace.lee@email.com', phone: '416-555-2001', address: '401 Bay St, Toronto', tier: 'basic', status: 'active', memberSince: new Date('2026-01-15'), totalSpend: 1200, servicesUsed: ['clean'] },
  { name: 'Henry Zhao', email: 'henry.z@email.com', phone: '416-555-2002', address: '15 Spadina Ave, Toronto', tier: 'pro', status: 'active', memberSince: new Date('2025-11-10'), totalSpend: 3800, servicesUsed: ['lawn', 'handyman'] },
  { name: 'Irene Santos', email: 'irene.s@email.com', phone: '416-555-2003', address: '780 College St, Toronto', tier: 'basic', status: 'paused', memberSince: new Date('2025-09-05'), totalSpend: 900, servicesUsed: ['clean'] },
  { name: 'Kevin Tremblay', email: 'kevin.t@email.com', phone: '403-555-3001', address: '100 Centre St, Calgary', tier: 'pro', status: 'active', memberSince: new Date('2026-02-20'), totalSpend: 2200, servicesUsed: ['clean', 'lawn'] },
  { name: 'Lisa Nguyen', email: 'lisa.n@email.com', phone: '416-555-2004', address: '200 Front St W, Toronto', tier: 'total_home', status: 'active', memberSince: new Date('2025-06-18'), totalSpend: 9800, servicesUsed: ['clean', 'lawn', 'deck', 'junk'] },
  // Prospects (non-members from old customer list)
  { name: 'Bob Singh', email: 'bob.s@email.com', phone: '416-555-1002', address: '45 King St E, Toronto', tier: 'none', status: 'prospect', totalSpend: 1800, servicesUsed: ['handyman'], notes: 'One-off handyman job, potential upsell to membership' },
  { name: 'Dan Fortier', email: 'dan.f@email.com', phone: '416-555-1004', address: '220 Queen St W, Toronto', tier: 'none', status: 'prospect', totalSpend: 3200, servicesUsed: ['deck'], notes: 'Deck project complete, follow up for maintenance plan' },
  { name: 'Frank Russo', email: 'frank.r@email.com', phone: '416-555-1006', address: '300 Bathurst St, Toronto', tier: 'none', status: 'prospect', totalSpend: 650, servicesUsed: ['junk'], notes: 'Single junk removal, low engagement' },
  { name: 'Maria Chen', email: 'maria.c@email.com', phone: '416-555-2005', address: '92 Harbord St, Toronto', tier: 'none', status: 'prospect', totalSpend: 0, servicesUsed: [], notes: 'Inbound lead from referral, not yet booked' },
]

const assetSeed = [
  { name: 'Truck 101', type: 'vehicle', brandId: 'lawn', status: 'in_use', assignedTo: 'Marcus Okafor', lastService: '2026-05-10', value: 38000 },
  { name: 'Mower Pro', type: 'equipment', brandId: 'lawn', status: 'in_use', assignedTo: 'Marcus Okafor', lastService: '2026-04-22', value: 4500 },
  { name: 'Van 12', type: 'vehicle', brandId: 'clean', status: 'in_use', assignedTo: 'Sarah Chen', lastService: '2026-05-15', value: 32000 },
  { name: 'Pressure Washer', type: 'equipment', brandId: 'deck', status: 'available', assignedTo: 'Elena Rostova', lastService: '2026-03-30', value: 2800 },
  { name: 'Cargo Van 7', type: 'vehicle', brandId: 'junk', status: 'in_use', assignedTo: 'Steve B.', lastService: '2026-06-01', value: 28000 },
  { name: 'Leaf Blower X2', type: 'equipment', brandId: 'lawn', status: 'available', assignedTo: '', lastService: '2026-04-15', value: 650 },
  { name: 'Drill Kit Pro', type: 'tool', brandId: 'handyman', status: 'in_use', assignedTo: 'Dave Kim', lastService: '2026-05-20', value: 1200 },
  { name: 'Trailer 04', type: 'vehicle', brandId: 'junk', status: 'maintenance', assignedTo: '', lastService: '2026-06-10', value: 15000 },
]

export async function seedIfEmpty() {
  const fc = await Franchisee.countDocuments()
  if (fc === 0) {
    await Franchisee.insertMany(franchiseeSeed)
    console.log('  → Seeded franchisees')
  }
  const sc = await Subscriber.countDocuments()
  if (sc === 0) {
    await Subscriber.insertMany(subscriberSeed)
    console.log('  → Seeded subscribers')
  }
  const ac = await Asset.countDocuments()
  if (ac === 0) {
    await Asset.insertMany(assetSeed)
    console.log('  → Seeded assets')
  }
}
