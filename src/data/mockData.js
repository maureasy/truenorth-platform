export const brands = [
  { id: 'clean', name: 'TrueNorth Clean', color: '#0ea5e9', service: 'Cleaning', icon: '🧹' },
  { id: 'lawn', name: 'TrueNorth Lawn', color: '#22c55e', service: 'Lawn/Snow', icon: '🌿' },
  { id: 'deck', name: 'TrueNorth Deck', color: '#a855f7', service: 'Deck/Fence', icon: '🪵' },
  { id: 'handyman', name: 'TrueNorth Handyman', color: '#f59e0b', service: 'Handyman', icon: '🔧' },
  { id: 'junk', name: 'TrueNorth Junk', color: '#ef4444', service: 'Junk Removal', icon: '🚛' },
]

export const territories = [
  { id: 'gta', name: 'Greater Toronto', center: [43.6532, -79.3832], zoom: 11 },
  { id: 'cal', name: 'Calgary', center: [51.0447, -114.0719], zoom: 11 },
  { id: 'van', name: 'Vancouver', center: [49.2827, -123.1207], zoom: 11 },
]

// Franchise territories using real Toronto district boundaries (former municipalities)
export const franchiseZones = [
  // GTA — based on real pre-amalgamation municipal boundaries
  {
    id: 'fz-old-toronto', city: 'gta', name: 'Old Toronto', owner: 'Sarah & Mike Thompson',
    color: '#f59e0b', status: 'active', homes: 188, revenue: 42800, workers: 6,
    brands: ['clean', 'handyman', 'junk', 'deck'],
    polygon: [
      [43.6675, -79.4633], [43.6788, -79.4120], [43.6862, -79.3940],
      [43.6920, -79.3760], [43.6862, -79.3512], [43.6780, -79.3290],
      [43.6600, -79.3290], [43.6440, -79.3400], [43.6350, -79.3560],
      [43.6280, -79.3780], [43.6310, -79.3990], [43.6380, -79.4200],
      [43.6450, -79.4420], [43.6550, -79.4580], [43.6675, -79.4633],
    ]
  },
  {
    id: 'fz-east-york', city: 'gta', name: 'East York', owner: 'Kevin & Priya Patel',
    color: '#22c55e', status: 'active', homes: 95, revenue: 19400, workers: 3,
    brands: ['clean', 'lawn', 'deck', 'handyman'],
    polygon: [
      [43.6920, -79.3760], [43.7100, -79.3380], [43.7150, -79.3250],
      [43.7050, -79.3100], [43.6950, -79.3150], [43.6862, -79.3290],
      [43.6780, -79.3290], [43.6862, -79.3512], [43.6920, -79.3760],
    ]
  },
  {
    id: 'fz-north-york', city: 'gta', name: 'North York', owner: 'David & Lin Chen',
    color: '#8b5cf6', status: 'active', homes: 210, revenue: 38600, workers: 5,
    brands: ['lawn', 'deck', 'handyman', 'clean', 'junk'],
    polygon: [
      [43.7670, -79.5100], [43.7670, -79.3300], [43.7550, -79.3100],
      [43.7350, -79.3100], [43.7150, -79.3250], [43.7100, -79.3380],
      [43.6920, -79.3760], [43.6862, -79.3940], [43.6788, -79.4120],
      [43.6850, -79.4400], [43.6950, -79.4633], [43.7100, -79.4800],
      [43.7300, -79.5000], [43.7500, -79.5100], [43.7670, -79.5100],
    ]
  },
  {
    id: 'fz-york', city: 'gta', name: 'York', owner: 'James & Maria Costa',
    color: '#3b82f6', status: 'active', homes: 72, revenue: 14200, workers: 2,
    brands: ['clean', 'lawn', 'handyman'],
    polygon: [
      [43.6950, -79.4633], [43.6850, -79.4400], [43.6788, -79.4120],
      [43.6675, -79.4633], [43.6700, -79.4800], [43.6800, -79.5000],
      [43.6900, -79.5050], [43.6950, -79.5000], [43.7100, -79.4800],
      [43.6950, -79.4633],
    ]
  },
  {
    id: 'fz-etobicoke', city: 'gta', name: 'Etobicoke', owner: null,
    color: '#94a3b8', status: 'available', homes: 0, revenue: 0, workers: 0,
    brands: [],
    polygon: [
      [43.7500, -79.5100], [43.7300, -79.5000], [43.7100, -79.4800],
      [43.6950, -79.5000], [43.6900, -79.5050], [43.6800, -79.5000],
      [43.6700, -79.4800], [43.6675, -79.4633], [43.6550, -79.4580],
      [43.6450, -79.4700], [43.6300, -79.4900], [43.6200, -79.5100],
      [43.6150, -79.5400], [43.6300, -79.5650], [43.6550, -79.5700],
      [43.6900, -79.5600], [43.7200, -79.5500], [43.7500, -79.5400],
      [43.7670, -79.5300], [43.7670, -79.5100], [43.7500, -79.5100],
    ]
  },
  {
    id: 'fz-scarborough', city: 'gta', name: 'Scarborough', owner: null,
    color: '#94a3b8', status: 'available', homes: 0, revenue: 0, workers: 0,
    brands: [],
    polygon: [
      [43.7670, -79.3300], [43.7670, -79.1850], [43.7500, -79.1600],
      [43.7200, -79.1600], [43.7000, -79.1800], [43.6800, -79.2100],
      [43.6700, -79.2400], [43.6600, -79.2700], [43.6600, -79.3050],
      [43.6780, -79.3290], [43.6950, -79.3150], [43.7050, -79.3100],
      [43.7150, -79.3250], [43.7350, -79.3100], [43.7550, -79.3100],
      [43.7670, -79.3300],
    ]
  },
  // Calgary — based on real quadrant system
  {
    id: 'fz-calgary-sw', city: 'cal', name: 'Calgary SW', owner: 'Tom & Angela Wu',
    color: '#3b82f6', status: 'active', homes: 48, revenue: 12400, workers: 2,
    brands: ['clean', 'lawn'],
    polygon: [
      [51.0447, -114.0719], [51.0447, -114.1800], [51.0100, -114.1800],
      [50.9800, -114.1500], [50.9800, -114.0719], [51.0447, -114.0719],
    ]
  },
  {
    id: 'fz-calgary-nw', city: 'cal', name: 'Calgary NW', owner: null,
    color: '#94a3b8', status: 'available', homes: 0, revenue: 0, workers: 0,
    brands: [],
    polygon: [
      [51.0447, -114.0719], [51.0447, -114.1800], [51.0900, -114.1800],
      [51.1200, -114.1500], [51.1200, -114.0719], [51.0447, -114.0719],
    ]
  },
  {
    id: 'fz-calgary-ne', city: 'cal', name: 'Calgary NE', owner: null,
    color: '#94a3b8', status: 'available', homes: 0, revenue: 0, workers: 0,
    brands: [],
    polygon: [
      [51.0447, -114.0719], [51.1200, -114.0719], [51.1200, -113.9500],
      [51.0900, -113.9500], [51.0447, -113.9600], [51.0447, -114.0719],
    ]
  },
  {
    id: 'fz-calgary-se', city: 'cal', name: 'Calgary SE', owner: null,
    color: '#94a3b8', status: 'available', homes: 0, revenue: 0, workers: 0,
    brands: [],
    polygon: [
      [51.0447, -114.0719], [51.0447, -113.9600], [50.9800, -113.9600],
      [50.9800, -114.0719], [51.0447, -114.0719],
    ]
  },
]

export const people = [
  { id: 'p1', name: 'Sarah Chen', role: 'Cleaner', brandId: 'clean', status: 'on_job', lat: 43.65, lng: -79.38, phone: '416-555-0101', email: 's.chen@truenorth.local', photo: '/images/people/p1.jpg', skills: ['Deep Clean', 'Move-In/Out', 'Carpet'], rating: 4.9, jobsCompleted: 312, hireDate: '2024-03-15', availability: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false }, referralsGenerated: 14, bountyEarned: 840 },
  { id: 'p2', name: 'Marcus Okafor', role: 'Lawn Crew Lead', brandId: 'lawn', status: 'available', lat: 43.68, lng: -79.42, phone: '416-555-0102', email: 'm.okafor@truenorth.local', photo: '/images/people/p2.jpg', skills: ['Mowing', 'Edging', 'Snow Removal', 'Fertilizer'], rating: 4.8, jobsCompleted: 245, hireDate: '2024-06-01', availability: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: false }, referralsGenerated: 9, bountyEarned: 520 },
  { id: 'p3', name: 'Elena Rostova', role: 'Deck Specialist', brandId: 'deck', status: 'available', lat: 43.62, lng: -79.35, phone: '416-555-0103', email: 'e.rostova@truenorth.local', photo: '/images/people/p3.jpg', skills: ['Composite Decking', 'Fence Install', 'Staining', 'Railing'], rating: 4.7, jobsCompleted: 128, hireDate: '2025-01-10', availability: { mon: true, tue: true, wed: false, thu: true, fri: true, sat: true, sun: false }, referralsGenerated: 3, bountyEarned: 180 },
  { id: 'p4', name: 'Dave Kim', role: 'Handyman', brandId: 'handyman', status: 'off_duty', lat: 43.66, lng: -79.40, phone: '416-555-0104', email: 'd.kim@truenorth.local', photo: '/images/people/p4.jpg', skills: ['Drywall', 'Plumbing', 'Electrical', 'Assembly'], rating: 4.6, jobsCompleted: 198, hireDate: '2024-09-20', availability: { mon: true, tue: false, wed: true, thu: true, fri: true, sat: false, sun: false }, referralsGenerated: 7, bountyEarned: 390 },
  { id: 'p5', name: 'Aisha Patel', role: 'Cleaner', brandId: 'clean', status: 'available', lat: 43.64, lng: -79.39, phone: '416-555-0105', email: 'a.patel@truenorth.local', photo: '/images/people/p5.jpg', skills: ['Deep Clean', 'Office', 'Post-Reno'], rating: 4.8, jobsCompleted: 189, hireDate: '2024-11-05', availability: { mon: true, tue: true, wed: true, thu: false, fri: true, sat: true, sun: false }, referralsGenerated: 11, bountyEarned: 660 },
  { id: 'p6', name: 'Liam Torres', role: 'Lawn Crew', brandId: 'lawn', status: 'on_job', lat: 43.67, lng: -79.41, phone: '416-555-0106', email: 'l.torres@truenorth.local', photo: '/images/people/p6.jpg', skills: ['Mowing', 'Snow Removal', 'Leaf Cleanup', 'Garden Bed'], rating: 4.5, jobsCompleted: 156, hireDate: '2025-02-15', availability: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: true }, referralsGenerated: 5, bountyEarned: 250 },
]

export const assets = [
  { id: 'a1', name: 'Truck 101', type: 'vehicle', brandId: 'lawn', status: 'in_use', lat: 43.68, lng: -79.42, assignedTo: 'p2', lastService: '2026-05-10', photo: '/images/assets/a2.jpg' },
  { id: 'a2', name: 'Mower Pro', type: 'equipment', brandId: 'lawn', status: 'in_use', lat: 43.68, lng: -79.42, assignedTo: 'p2', lastService: '2026-04-22', photo: '/images/assets/a3.jpg' },
  { id: 'a3', name: 'Van 12', type: 'vehicle', brandId: 'clean', status: 'in_use', lat: 43.65, lng: -79.38, assignedTo: 'p1', lastService: '2026-05-15', photo: '/images/assets/a1.jpg' },
  { id: 'a4', name: 'Pressure Washer', type: 'equipment', brandId: 'deck', status: 'available', lat: 43.62, lng: -79.35, assignedTo: 'p3', lastService: '2026-03-30', photo: '/images/assets/a4.jpg' },
]

export const customers = [
  { id: 'c1', name: 'Alice Montgomery', address: '123 Bloor St W, Toronto', lat: 43.65, lng: -79.38, phone: '416-555-1001', email: 'alice.m@email.com', member: true, memberSince: '2025-01-10', totalSpend: 8200, servicesUsed: ['clean', 'lawn', 'junk'], lastService: '2026-06-20' },
  { id: 'c2', name: 'Bob Singh', address: '45 King St E, Toronto', lat: 43.65, lng: -79.37, phone: '416-555-1002', email: 'bob.s@email.com', member: false, memberSince: null, totalSpend: 1800, servicesUsed: ['handyman'], lastService: '2026-05-28' },
  { id: 'c3', name: 'Carol Wu', address: '88 Yonge St, Toronto', lat: 43.68, lng: -79.42, phone: '416-555-1003', email: 'carol.wu@email.com', member: true, memberSince: '2025-04-22', totalSpend: 5400, servicesUsed: ['lawn', 'clean'], lastService: '2026-06-20' },
  { id: 'c4', name: 'Dan Fortier', address: '220 Queen St W, Toronto', lat: 43.62, lng: -79.35, phone: '416-555-1004', email: 'dan.f@email.com', member: false, memberSince: null, totalSpend: 3200, servicesUsed: ['deck'], lastService: '2026-06-10' },
  { id: 'c5', name: 'Emily Park', address: '55 Dundas St, Toronto', lat: 43.66, lng: -79.38, phone: '416-555-1005', email: 'emily.p@email.com', member: true, memberSince: '2025-08-01', totalSpend: 12500, servicesUsed: ['clean', 'lawn', 'deck', 'handyman'], lastService: '2026-06-18' },
  { id: 'c6', name: 'Frank Russo', address: '300 Bathurst St, Toronto', lat: 43.66, lng: -79.41, phone: '416-555-1006', email: 'frank.r@email.com', member: false, memberSince: null, totalSpend: 650, servicesUsed: ['junk'], lastService: '2026-06-15' },
]

export const bookings = [
  { id: 'b1', customerId: 'c1', brandId: 'clean', workerId: 'p1', assetIds: ['a3'], date: '2026-06-20', time: '09:00', duration: 120, status: 'in_progress', address: '123 Bloor St W, Toronto', lat: 43.65, lng: -79.38 },
  { id: 'b2', customerId: 'c3', brandId: 'lawn', workerId: 'p2', assetIds: ['a1', 'a2'], date: '2026-06-20', time: '10:00', duration: 90, status: 'in_progress', address: '88 Yonge St, Toronto', lat: 43.68, lng: -79.42 },
  { id: 'b3', customerId: 'c4', brandId: 'deck', workerId: 'p3', assetIds: ['a4'], date: '2026-06-21', time: '08:00', duration: 240, status: 'scheduled', address: '220 Queen St W, Toronto', lat: 43.62, lng: -79.35 },
  { id: 'b4', customerId: 'c2', brandId: 'handyman', workerId: 'p4', assetIds: [], date: '2026-06-21', time: '13:00', duration: 180, status: 'scheduled', address: '45 King St E, Toronto', lat: 43.65, lng: -79.37 },
  { id: 'b5', customerId: 'c1', brandId: 'lawn', workerId: null, assetIds: [], date: '2026-06-22', time: '10:00', duration: 60, status: 'pending', address: '123 Bloor St W, Toronto', lat: 43.65, lng: -79.38 },
]

export const observations = [
  { id: 'o1', bookingId: 'b1', customerId: 'c1', brandId: 'clean', workerId: 'p1', text: 'Deck boards rotting at rear entrance; customer asked about repair estimate.', photo: true, createdAt: '2026-06-20T09:37:00', lat: 43.65, lng: -79.38 },
  { id: 'o2', bookingId: 'b2', customerId: 'c3', brandId: 'lawn', workerId: 'p2', text: 'Gutters full of leaves; heavy rain forecast this week.', photo: true, createdAt: '2026-06-20T10:15:00', lat: 43.68, lng: -79.42 },
  { id: 'o3', bookingId: 'b1', customerId: 'c1', brandId: 'clean', workerId: 'p1', text: 'Old couch in basement; customer wants junk removal quote.', photo: false, createdAt: '2026-06-20T09:55:00', lat: 43.65, lng: -79.38 },
]

export const referrals = [
  { id: 'r1', observationId: 'o1', fromBrandId: 'clean', toBrandId: 'deck', customerId: 'c1', status: 'sent', value: 4500, bounty: 150, createdAt: '2026-06-20T09:42:00' },
  { id: 'r2', observationId: 'o2', fromBrandId: 'lawn', toBrandId: 'handyman', customerId: 'c3', status: 'accepted', value: 800, bounty: 60, createdAt: '2026-06-20T10:18:00' },
  { id: 'r3', observationId: 'o3', fromBrandId: 'clean', toBrandId: 'junk', customerId: 'c1', status: 'converted', value: 350, bounty: 40, createdAt: '2026-06-20T10:00:00' },
]

export const workOrders = [
  { id: 'w1', bookingId: 'b1', workerId: 'p1', customerId: 'c1', brandId: 'clean', status: 'in_progress', checkedInAt: '2026-06-20T09:02:00', checkedOutAt: null, tasks: [
    { id: 't1', label: 'Kitchen deep clean', done: true },
    { id: 't2', label: 'Bathroom sanitize (x2)', done: true },
    { id: 't3', label: 'Vacuum & mop all floors', done: false },
    { id: 't4', label: 'Windows interior', done: false },
  ]},
  { id: 'w2', bookingId: 'b2', workerId: 'p2', customerId: 'c3', brandId: 'lawn', status: 'in_progress', checkedInAt: '2026-06-20T10:05:00', checkedOutAt: null, tasks: [
    { id: 't5', label: 'Mow front & back', done: true },
    { id: 't6', label: 'Edge sidewalks', done: false },
    { id: 't7', label: 'Blow debris', done: false },
  ]},
  { id: 'w3', bookingId: 'b3', workerId: 'p3', customerId: 'c4', brandId: 'deck', status: 'pending', checkedInAt: null, checkedOutAt: null, tasks: [
    { id: 't8', label: 'Remove old boards (rear section)', done: false },
    { id: 't9', label: 'Install composite decking', done: false },
    { id: 't10', label: 'Seal & finish', done: false },
  ]},
]

export const notifications = [
  { id: 'n1', type: 'referral', title: 'New referral generated', message: 'Sarah Chen spotted deck rot at Alice Montgomery. Routed to TrueNorth Deck.', time: '2026-06-20T09:42:00', read: false },
  { id: 'n2', type: 'booking', title: 'Booking confirmed', message: 'Elena Rostova assigned to deck repair at Dan Fortier. Jun 21, 8:00 AM.', time: '2026-06-20T08:30:00', read: true },
  { id: 'n3', type: 'sla', title: 'SLA warning', message: 'Booking #b5 unassigned for 48h. Auto-escalate in 12h.', time: '2026-06-20T07:00:00', read: false },
  { id: 'n4', type: 'conversion', title: 'Referral converted!', message: 'Junk removal for Alice Montgomery completed. $40 bounty to Sarah Chen.', time: '2026-06-20T10:05:00', read: false },
  { id: 'n5', type: 'checkin', title: 'Worker checked in', message: 'Marcus Okafor checked in at Carol Wu, 88 Yonge St.', time: '2026-06-20T10:05:00', read: true },
]

export const liveJobs = [
  {
    id: 'lj1', bookingId: 'b1', workerId: 'p1', customerId: 'c1', brandId: 'clean',
    stage: 'working', // matching | en_route | arrived | working | complete
    etaMinutes: null,
    startedAt: '2026-06-20T09:02:00',
    arrivedAt: '2026-06-20T09:05:00',
    workStartedAt: '2026-06-20T09:10:00',
    completedAt: null,
    progress: 65,
    workerLat: 43.6501, workerLng: -79.3802,
    address: '123 Bloor St W, Toronto',
    service: 'Deep Clean — Kitchen & Bathrooms',
    estimatedDuration: 120,
  },
  {
    id: 'lj2', bookingId: 'b2', workerId: 'p2', customerId: 'c3', brandId: 'lawn',
    stage: 'working',
    etaMinutes: null,
    startedAt: '2026-06-20T10:00:00',
    arrivedAt: '2026-06-20T10:04:00',
    workStartedAt: '2026-06-20T10:05:00',
    completedAt: null,
    progress: 40,
    workerLat: 43.6805, workerLng: -79.4198,
    address: '88 Yonge St, Toronto',
    service: 'Full Lawn Care — Mow, Edge, Blow',
    estimatedDuration: 90,
  },
  {
    id: 'lj3', bookingId: 'b3', workerId: 'p3', customerId: 'c4', brandId: 'deck',
    stage: 'en_route',
    etaMinutes: 12,
    startedAt: '2026-06-20T11:30:00',
    arrivedAt: null,
    workStartedAt: null,
    completedAt: null,
    progress: 0,
    workerLat: 43.6350, workerLng: -79.3600,
    address: '220 Queen St W, Toronto',
    service: 'Deck Repair — Replace Rotting Boards',
    estimatedDuration: 240,
  },
  {
    id: 'lj4', bookingId: 'b4', workerId: 'p4', customerId: 'c2', brandId: 'handyman',
    stage: 'matching',
    etaMinutes: null,
    startedAt: '2026-06-20T12:55:00',
    arrivedAt: null,
    workStartedAt: null,
    completedAt: null,
    progress: 0,
    workerLat: 43.6600, workerLng: -79.4000,
    address: '45 King St E, Toronto',
    service: 'Handyman — Drywall Repair & Painting',
    estimatedDuration: 180,
  },
  {
    id: 'lj5', bookingId: null, workerId: 'p5', customerId: 'c5', brandId: 'clean',
    stage: 'arrived',
    etaMinutes: 0,
    startedAt: '2026-06-20T11:00:00',
    arrivedAt: '2026-06-20T11:42:00',
    workStartedAt: null,
    completedAt: null,
    progress: 0,
    workerLat: 43.6600, workerLng: -79.3800,
    address: '55 Dundas St, Toronto',
    service: 'Office Deep Clean',
    estimatedDuration: 90,
  },
]

export const stats = {
  activeBookings: 5,
  openReferrals: 12,
  conversionRate: 34,
  todayRevenue: 12400,
  ytdRevenue: 2840000,
  fleetUtilization: 82,
}

// Home Intelligence data — each home is a "patient chart"
export const homes = [
  {
    id: 'h1', customerId: 'c1', address: '123 Bloor St W, Toronto', lat: 43.65, lng: -79.38,
    healthScore: 72, // 0-100
    sqft: 2200, yearBuilt: 1998, type: 'Detached',
    totalVisits: 28, lastVisit: '2026-06-20',
    servicesActive: ['clean', 'lawn'],
    issues: [
      { id: 'i1', brandId: 'deck', severity: 'high', title: 'Rear deck boards rotting', detectedAt: '2026-06-20', status: 'referral_sent', detectedBy: 'p1' },
      { id: 'i2', brandId: 'junk', severity: 'low', title: 'Old couch in basement', detectedAt: '2026-06-20', status: 'converted', detectedBy: 'p1' },
      { id: 'i3', brandId: 'handyman', severity: 'medium', title: 'Loose railing on front steps', detectedAt: '2026-05-15', status: 'resolved', detectedBy: 'p2' },
    ],
    predictedNeeds: [
      { brandId: 'lawn', service: 'Fall leaf cleanup', confidence: 92, monthDue: 'Oct 2026' },
      { brandId: 'clean', service: 'Post-holiday deep clean', confidence: 85, monthDue: 'Jan 2027' },
      { brandId: 'handyman', service: 'Furnace filter change', confidence: 78, monthDue: 'Nov 2026' },
    ],
    monthlySpend: [420, 380, 520, 450, 600, 480, 550, 420, 380, 520, 610, 480],
  },
  {
    id: 'h2', customerId: 'c3', address: '88 Yonge St, Toronto', lat: 43.68, lng: -79.42,
    healthScore: 85,
    sqft: 1800, yearBuilt: 2012, type: 'Semi-Detached',
    totalVisits: 18, lastVisit: '2026-06-20',
    servicesActive: ['lawn', 'clean'],
    issues: [
      { id: 'i4', brandId: 'handyman', severity: 'medium', title: 'Gutters full of debris', detectedAt: '2026-06-20', status: 'referral_sent', detectedBy: 'p2' },
    ],
    predictedNeeds: [
      { brandId: 'lawn', service: 'Snow removal contract', confidence: 95, monthDue: 'Nov 2026' },
      { brandId: 'deck', service: 'Fence staining', confidence: 65, monthDue: 'May 2027' },
    ],
    monthlySpend: [280, 250, 320, 280, 350, 300, 280, 250, 320, 280, 350, 300],
  },
  {
    id: 'h3', customerId: 'c5', address: '55 Dundas St, Toronto', lat: 43.66, lng: -79.38,
    healthScore: 94,
    sqft: 3100, yearBuilt: 2019, type: 'Detached',
    totalVisits: 42, lastVisit: '2026-06-18',
    servicesActive: ['clean', 'lawn', 'deck', 'handyman'],
    issues: [],
    predictedNeeds: [
      { brandId: 'deck', service: 'Annual deck re-seal', confidence: 88, monthDue: 'Aug 2026' },
      { brandId: 'clean', service: 'Window cleaning (exterior)', confidence: 72, monthDue: 'Jul 2026' },
    ],
    monthlySpend: [800, 750, 900, 850, 1050, 920, 800, 750, 900, 850, 1050, 920],
  },
  {
    id: 'h4', customerId: 'c2', address: '45 King St E, Toronto', lat: 43.65, lng: -79.37,
    healthScore: 58,
    sqft: 1400, yearBuilt: 1985, type: 'Townhouse',
    totalVisits: 4, lastVisit: '2026-05-28',
    servicesActive: ['handyman'],
    issues: [
      { id: 'i5', brandId: 'clean', severity: 'low', title: 'Heavy dust accumulation noted', detectedAt: '2026-05-28', status: 'no_action', detectedBy: 'p4' },
      { id: 'i6', brandId: 'lawn', severity: 'medium', title: 'Overgrown backyard, fence leaning', detectedAt: '2026-05-28', status: 'referral_sent', detectedBy: 'p4' },
    ],
    predictedNeeds: [
      { brandId: 'clean', service: 'Regular bi-weekly clean', confidence: 70, monthDue: 'Jul 2026' },
      { brandId: 'lawn', service: 'Lawn rescue + maintenance', confidence: 82, monthDue: 'Jul 2026' },
    ],
    monthlySpend: [0, 0, 150, 0, 200, 0, 0, 0, 150, 0, 200, 0],
  },
  {
    id: 'h5', customerId: 'c4', address: '220 Queen St W, Toronto', lat: 43.62, lng: -79.35,
    healthScore: 65,
    sqft: 2600, yearBuilt: 2004, type: 'Detached',
    totalVisits: 8, lastVisit: '2026-06-10',
    servicesActive: ['deck'],
    issues: [
      { id: 'i7', brandId: 'deck', severity: 'high', title: 'Full deck replacement needed (rear)', detectedAt: '2026-06-10', status: 'booked', detectedBy: 'p3' },
    ],
    predictedNeeds: [
      { brandId: 'lawn', service: 'Lawn maintenance (new customer)', confidence: 60, monthDue: 'Jul 2026' },
      { brandId: 'clean', service: 'Post-construction clean', confidence: 75, monthDue: 'Jul 2026' },
    ],
    monthlySpend: [0, 0, 0, 0, 0, 300, 0, 0, 0, 0, 0, 300],
  },
]

// Referral pipeline with full funnel stages
export const pipelineStats = {
  thisMonth: {
    observations: 47,
    referralsSent: 38,
    accepted: 28,
    booked: 19,
    completed: 14,
    revenue: 18600,
    bountyPaid: 2240,
  },
  lastMonth: {
    observations: 41,
    referralsSent: 32,
    accepted: 22,
    booked: 15,
    completed: 11,
    revenue: 14200,
    bountyPaid: 1780,
  },
  conversionByBrand: [
    { from: 'clean', to: 'deck', observations: 12, conversions: 4, rate: 33 },
    { from: 'clean', to: 'junk', observations: 8, conversions: 5, rate: 63 },
    { from: 'lawn', to: 'handyman', observations: 9, conversions: 3, rate: 33 },
    { from: 'lawn', to: 'clean', observations: 6, conversions: 2, rate: 33 },
    { from: 'handyman', to: 'lawn', observations: 5, conversions: 2, rate: 40 },
    { from: 'deck', to: 'clean', observations: 4, conversions: 2, rate: 50 },
    { from: 'handyman', to: 'clean', observations: 3, conversions: 1, rate: 33 },
  ],
}

// Worker earnings leaderboard
export const earningsData = [
  { workerId: 'p1', month: 'Jun 2026', observations: 6, conversions: 3, bounties: 230, streak: 4, rank: 1 },
  { workerId: 'p5', month: 'Jun 2026', observations: 5, conversions: 3, bounties: 210, streak: 3, rank: 2 },
  { workerId: 'p2', month: 'Jun 2026', observations: 4, conversions: 2, bounties: 160, streak: 2, rank: 3 },
  { workerId: 'p4', month: 'Jun 2026', observations: 3, conversions: 1, bounties: 80, streak: 1, rank: 4 },
  { workerId: 'p6', month: 'Jun 2026', observations: 2, conversions: 1, bounties: 60, streak: 1, rank: 5 },
  { workerId: 'p3', month: 'Jun 2026', observations: 1, conversions: 0, bounties: 0, streak: 0, rank: 6 },
]

// Franchisee data — the franchise layer between holdco and workers
export const franchisees = [
  { id: 'f1', brandId: 'clean', name: 'GTA Clean Co.', owner: 'James Li', territory: 'gta', units: 12, workers: 28, monthlyRevenue: 84000, churn: 2.1, nps: 72, observationRate: 4.2, conversionRate: 31, status: 'healthy', since: '2024-03' },
  { id: 'f2', brandId: 'clean', name: 'Sparkle Toronto', owner: 'Priya Sharma', territory: 'gta', units: 8, workers: 18, monthlyRevenue: 52000, churn: 5.8, nps: 61, observationRate: 2.8, conversionRate: 22, status: 'at_risk', since: '2024-06' },
  { id: 'f3', brandId: 'lawn', name: 'GreenEdge Lawn', owner: 'Tom Murray', territory: 'gta', units: 15, workers: 22, monthlyRevenue: 110000, churn: 1.4, nps: 78, observationRate: 3.5, conversionRate: 35, status: 'healthy', since: '2024-01' },
  { id: 'f4', brandId: 'lawn', name: 'SnowPro Services', owner: 'Karim Hassan', territory: 'gta', units: 10, workers: 15, monthlyRevenue: 68000, churn: 3.2, nps: 65, observationRate: 1.9, conversionRate: 18, status: 'watch', since: '2025-01' },
  { id: 'f5', brandId: 'deck', name: 'DeckMasters ON', owner: 'Mike Oduya', territory: 'gta', units: 6, workers: 14, monthlyRevenue: 92000, churn: 0.8, nps: 82, observationRate: 1.2, conversionRate: 28, status: 'healthy', since: '2025-04' },
  { id: 'f6', brandId: 'handyman', name: 'FixIt Toronto', owner: 'Rachel Wong', territory: 'gta', units: 9, workers: 12, monthlyRevenue: 45000, churn: 4.5, nps: 58, observationRate: 3.8, conversionRate: 25, status: 'watch', since: '2025-06' },
  { id: 'f7', brandId: 'junk', name: 'JunkAway GTA', owner: 'Steve Bello', territory: 'gta', units: 5, workers: 10, monthlyRevenue: 38000, churn: 1.2, nps: 74, observationRate: 0.5, conversionRate: 12, status: 'healthy', since: '2025-09' },
  { id: 'f8', brandId: 'clean', name: 'Fresh Start Calgary', owner: 'Diana Cho', territory: 'cal', units: 6, workers: 14, monthlyRevenue: 41000, churn: 3.0, nps: 68, observationRate: 2.1, conversionRate: 20, status: 'healthy', since: '2025-11' },
]

// Postal code coverage data for density map
export const postalCoverage = [
  // GTA postal codes
  { code: 'M5V', city: 'gta', lat: 43.6426, lng: -79.3871, activeHomes: 42, services: ['clean', 'lawn', 'handyman'], gap: ['deck', 'junk'] },
  { code: 'M4W', city: 'gta', lat: 43.6763, lng: -79.3753, activeHomes: 35, services: ['clean', 'lawn', 'deck'], gap: ['handyman', 'junk'] },
  { code: 'M6G', city: 'gta', lat: 43.6636, lng: -79.4225, activeHomes: 28, services: ['clean', 'lawn'], gap: ['deck', 'handyman', 'junk'] },
  { code: 'M4K', city: 'gta', lat: 43.6790, lng: -79.3520, activeHomes: 18, services: ['lawn'], gap: ['clean', 'deck', 'handyman', 'junk'] },
  { code: 'M6H', city: 'gta', lat: 43.6595, lng: -79.4395, activeHomes: 55, services: ['clean', 'lawn', 'deck', 'handyman', 'junk'], gap: [] },
  { code: 'M4E', city: 'gta', lat: 43.6762, lng: -79.2930, activeHomes: 8, services: ['clean'], gap: ['lawn', 'deck', 'handyman', 'junk'] },
  { code: 'M5A', city: 'gta', lat: 43.6555, lng: -79.3626, activeHomes: 31, services: ['clean', 'handyman'], gap: ['lawn', 'deck', 'junk'] },
  { code: 'M4S', city: 'gta', lat: 43.7019, lng: -79.3848, activeHomes: 22, services: ['clean', 'lawn', 'deck'], gap: ['handyman', 'junk'] },
  { code: 'M6K', city: 'gta', lat: 43.6372, lng: -79.4281, activeHomes: 12, services: ['lawn'], gap: ['clean', 'deck', 'handyman', 'junk'] },
  { code: 'M5R', city: 'gta', lat: 43.6727, lng: -79.4035, activeHomes: 48, services: ['clean', 'lawn', 'deck', 'handyman'], gap: ['junk'] },
  // Calgary
  { code: 'T2P', city: 'cal', lat: 51.0486, lng: -114.0708, activeHomes: 15, services: ['clean'], gap: ['lawn', 'deck', 'handyman', 'junk'] },
  { code: 'T3H', city: 'cal', lat: 51.0875, lng: -114.2075, activeHomes: 8, services: ['clean'], gap: ['lawn', 'deck', 'handyman', 'junk'] },
]

// Membership tiers
export const membershipTiers = [
  { id: 'basic', name: 'Basic', price: 49, interval: 'month', includes: ['Bi-weekly cleaning OR weekly lawn'], members: 128, avgLTV: 2400, churnRate: 8.2 },
  { id: 'pro', name: 'Pro', price: 129, interval: 'month', includes: ['Bi-weekly cleaning', 'Weekly lawn', 'Seasonal deck inspection'], members: 64, avgLTV: 6200, churnRate: 4.1 },
  { id: 'total', name: 'Total Home', price: 249, interval: 'month', includes: ['Bi-weekly cleaning', 'Weekly lawn', 'Seasonal deck/fence', 'Priority handyman (4h/mo)', 'Annual junk removal'], members: 22, avgLTV: 14800, churnRate: 1.8 },
]

export const membershipStats = {
  totalMembers: 214,
  memberRevenue: 28600, // monthly
  nonMemberRevenue: 42000, // monthly (one-off bookings)
  memberLTV: 5800, // avg across tiers
  nonMemberLTV: 1200,
  memberRetention: 94, // %
  nonMemberRetention: 38,
  memberCrossSell: 3.2, // avg services per member
  nonMemberCrossSell: 1.4,
}

// Growth Accelerator Fund
export const acceleratorFund = {
  totalCapital: 2000000,
  deployed: 1240000,
  activeLoans: 8,
  workToOwn: 5,
  lenderBacked: 3,
  avgLoanSize: 155000,
  repaymentRate: 96,
  territoriesFilled: 12,
  territoriesTarget: 28,
}

// Quote pipeline (consent flow)
export const quotePipeline = [
  { id: 'q1', observationId: 'o1', customerId: 'c1', brandId: 'deck', stage: 'quote_sent', value: 4500, createdAt: '2026-06-20T09:45:00', consentAt: '2026-06-20T10:02:00', quoteExpires: '2026-06-23' },
  { id: 'q2', observationId: 'o2', customerId: 'c3', brandId: 'handyman', stage: 'consent_pending', value: 800, createdAt: '2026-06-20T10:20:00', consentAt: null, quoteExpires: null },
  { id: 'q3', observationId: 'o3', customerId: 'c1', brandId: 'junk', stage: 'completed', value: 350, createdAt: '2026-06-20T10:05:00', consentAt: '2026-06-20T10:08:00', quoteExpires: null },
  { id: 'q4', observationId: null, customerId: 'c5', brandId: 'deck', stage: 'quote_accepted', value: 2800, createdAt: '2026-06-18T14:00:00', consentAt: '2026-06-18T14:30:00', quoteExpires: '2026-06-21' },
  { id: 'q5', observationId: null, customerId: 'c4', brandId: 'lawn', stage: 'quote_sent', value: 1200, createdAt: '2026-06-19T09:00:00', consentAt: '2026-06-19T09:15:00', quoteExpires: '2026-06-22' },
  { id: 'q6', observationId: null, customerId: 'c2', brandId: 'clean', stage: 'consent_declined', value: 600, createdAt: '2026-06-17T11:00:00', consentAt: null, quoteExpires: null },
]
