-- ============================================
-- TRUE NORTH PLATFORM — SEED DATA
-- Run this AFTER schema.sql in Supabase SQL Editor
-- ============================================

-- Brands
insert into brands (id, name, color, service, icon) values
  ('clean', 'TrueNorth Clean', '#0ea5e9', 'Cleaning', '🧹'),
  ('lawn', 'TrueNorth Lawn', '#22c55e', 'Lawn/Snow', '🌿'),
  ('deck', 'TrueNorth Deck', '#a855f7', 'Deck/Fence', '🪵'),
  ('handyman', 'TrueNorth Handyman', '#f59e0b', 'Handyman', '🔧'),
  ('junk', 'TrueNorth Junk', '#ef4444', 'Junk Removal', '🚛');

-- Territories
insert into territories (id, name, center_lat, center_lng, zoom) values
  ('gta', 'Greater Toronto', 43.6532, -79.3832, 11),
  ('cal', 'Calgary', 51.0447, -114.0719, 11),
  ('van', 'Vancouver', 49.2827, -123.1207, 11);

-- Franchise Zones
insert into franchise_zones (id, city, name, owner, color, status, homes, revenue, workers, brands, polygon) values
  ('fz-old-toronto', 'gta', 'Old Toronto', 'Sarah & Mike Thompson', '#f59e0b', 'active', 188, 42800, 6, '{clean,handyman,junk,deck}', '[[43.6675,-79.4633],[43.6788,-79.4120],[43.6862,-79.3940],[43.6920,-79.3760],[43.6862,-79.3512],[43.6780,-79.3290],[43.6600,-79.3290],[43.6440,-79.3400],[43.6350,-79.3560],[43.6280,-79.3780],[43.6310,-79.3990],[43.6380,-79.4200],[43.6450,-79.4420],[43.6550,-79.4580],[43.6675,-79.4633]]'),
  ('fz-east-york', 'gta', 'East York', 'Kevin & Priya Patel', '#22c55e', 'active', 95, 19400, 3, '{clean,lawn,deck,handyman}', '[[43.6920,-79.3760],[43.7100,-79.3380],[43.7150,-79.3250],[43.7050,-79.3100],[43.6950,-79.3150],[43.6862,-79.3290],[43.6780,-79.3290],[43.6862,-79.3512],[43.6920,-79.3760]]'),
  ('fz-north-york', 'gta', 'North York', 'David & Lin Chen', '#8b5cf6', 'active', 210, 38600, 5, '{lawn,deck,handyman,clean,junk}', '[[43.7670,-79.5100],[43.7670,-79.3300],[43.7550,-79.3100],[43.7350,-79.3100],[43.7150,-79.3250],[43.7100,-79.3380],[43.6920,-79.3760],[43.6862,-79.3940],[43.6788,-79.4120],[43.6850,-79.4400],[43.6950,-79.4633],[43.7100,-79.4800],[43.7300,-79.5000],[43.7500,-79.5100],[43.7670,-79.5100]]'),
  ('fz-york', 'gta', 'York', 'James & Maria Costa', '#3b82f6', 'active', 72, 14200, 2, '{clean,lawn,handyman}', '[[43.6950,-79.4633],[43.6850,-79.4400],[43.6788,-79.4120],[43.6675,-79.4633],[43.6700,-79.4800],[43.6800,-79.5000],[43.6900,-79.5050],[43.6950,-79.5000],[43.7100,-79.4800],[43.6950,-79.4633]]'),
  ('fz-etobicoke', 'gta', 'Etobicoke', null, '#94a3b8', 'available', 0, 0, 0, '{}', '[[43.7500,-79.5100],[43.7300,-79.5000],[43.7100,-79.4800],[43.6950,-79.5000],[43.6900,-79.5050],[43.6800,-79.5000],[43.6700,-79.4800],[43.6675,-79.4633],[43.6550,-79.4580],[43.6450,-79.4700],[43.6300,-79.4900],[43.6200,-79.5100],[43.6150,-79.5400],[43.6300,-79.5650],[43.6550,-79.5700],[43.6900,-79.5600],[43.7200,-79.5500],[43.7500,-79.5400],[43.7670,-79.5300],[43.7670,-79.5100],[43.7500,-79.5100]]'),
  ('fz-scarborough', 'gta', 'Scarborough', null, '#94a3b8', 'available', 0, 0, 0, '{}', '[[43.7670,-79.3300],[43.7670,-79.1850],[43.7500,-79.1600],[43.7200,-79.1600],[43.7000,-79.1800],[43.6800,-79.2100],[43.6700,-79.2400],[43.6600,-79.2700],[43.6600,-79.3050],[43.6780,-79.3290],[43.6950,-79.3150],[43.7050,-79.3100],[43.7150,-79.3250],[43.7350,-79.3100],[43.7550,-79.3100],[43.7670,-79.3300]]'),
  ('fz-calgary-sw', 'cal', 'Calgary SW', 'Tom & Angela Wu', '#3b82f6', 'active', 48, 12400, 2, '{clean,lawn}', '[[51.0447,-114.0719],[51.0447,-114.1800],[51.0100,-114.1800],[50.9800,-114.1500],[50.9800,-114.0719],[51.0447,-114.0719]]'),
  ('fz-calgary-nw', 'cal', 'Calgary NW', null, '#94a3b8', 'available', 0, 0, 0, '{}', '[[51.0447,-114.0719],[51.0447,-114.1800],[51.0900,-114.1800],[51.1200,-114.1500],[51.1200,-114.0719],[51.0447,-114.0719]]'),
  ('fz-calgary-ne', 'cal', 'Calgary NE', null, '#94a3b8', 'available', 0, 0, 0, '{}', '[[51.0447,-114.0719],[51.1200,-114.0719],[51.1200,-113.9500],[51.0900,-113.9500],[51.0447,-113.9600],[51.0447,-114.0719]]'),
  ('fz-calgary-se', 'cal', 'Calgary SE', null, '#94a3b8', 'available', 0, 0, 0, '{}', '[[51.0447,-114.0719],[51.0447,-113.9600],[50.9800,-113.9600],[50.9800,-114.0719],[51.0447,-114.0719]]');

-- People
insert into people (id, name, role, brand_id, status, lat, lng, phone, email, photo, skills, rating, jobs_completed, hire_date, availability, referrals_generated, bounty_earned) values
  ('p1', 'Sarah Chen', 'Cleaner', 'clean', 'on_job', 43.65, -79.38, '416-555-0101', 's.chen@truenorth.local', '/images/people/p1.jpg', '{Deep Clean,Move-In/Out,Carpet}', 4.9, 312, '2024-03-15', '{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":false,"sun":false}', 14, 840),
  ('p2', 'Marcus Okafor', 'Lawn Crew Lead', 'lawn', 'available', 43.68, -79.42, '416-555-0102', 'm.okafor@truenorth.local', '/images/people/p2.jpg', '{Mowing,Edging,Snow Removal,Fertilizer}', 4.8, 245, '2024-06-01', '{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":false}', 9, 520),
  ('p3', 'Elena Rostova', 'Deck Specialist', 'deck', 'available', 43.62, -79.35, '416-555-0103', 'e.rostova@truenorth.local', '/images/people/p3.jpg', '{Composite Decking,Fence Install,Staining,Railing}', 4.7, 128, '2025-01-10', '{"mon":true,"tue":true,"wed":false,"thu":true,"fri":true,"sat":true,"sun":false}', 3, 180),
  ('p4', 'Dave Kim', 'Handyman', 'handyman', 'off_duty', 43.66, -79.40, '416-555-0104', 'd.kim@truenorth.local', '/images/people/p4.jpg', '{Drywall,Plumbing,Electrical,Assembly}', 4.6, 198, '2024-09-20', '{"mon":true,"tue":false,"wed":true,"thu":true,"fri":true,"sat":false,"sun":false}', 7, 390),
  ('p5', 'Aisha Patel', 'Cleaner', 'clean', 'available', 43.64, -79.39, '416-555-0105', 'a.patel@truenorth.local', '/images/people/p5.jpg', '{Deep Clean,Office,Post-Reno}', 4.8, 189, '2024-11-05', '{"mon":true,"tue":true,"wed":true,"thu":false,"fri":true,"sat":true,"sun":false}', 11, 660),
  ('p6', 'Liam Torres', 'Lawn Crew', 'lawn', 'on_job', 43.67, -79.41, '416-555-0106', 'l.torres@truenorth.local', '/images/people/p6.jpg', '{Mowing,Snow Removal,Leaf Cleanup,Garden Bed}', 4.5, 156, '2025-02-15', '{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}', 5, 250);

-- Customers
insert into customers (id, name, address, lat, lng, phone, email, member, member_since, total_spend, services_used, last_service) values
  ('c1', 'Alice Montgomery', '123 Bloor St W, Toronto', 43.65, -79.38, '416-555-1001', 'alice.m@email.com', true, '2025-01-10', 8200, '{clean,lawn,junk}', '2026-06-20'),
  ('c2', 'Bob Singh', '45 King St E, Toronto', 43.65, -79.37, '416-555-1002', 'bob.s@email.com', false, null, 1800, '{handyman}', '2026-05-28'),
  ('c3', 'Carol Wu', '88 Yonge St, Toronto', 43.68, -79.42, '416-555-1003', 'carol.wu@email.com', true, '2025-04-22', 5400, '{lawn,clean}', '2026-06-20'),
  ('c4', 'Dan Fortier', '220 Queen St W, Toronto', 43.62, -79.35, '416-555-1004', 'dan.f@email.com', false, null, 3200, '{deck}', '2026-06-10'),
  ('c5', 'Emily Park', '55 Dundas St, Toronto', 43.66, -79.38, '416-555-1005', 'emily.p@email.com', true, '2025-08-01', 12500, '{clean,lawn,deck,handyman}', '2026-06-18'),
  ('c6', 'Frank Russo', '300 Bathurst St, Toronto', 43.66, -79.41, '416-555-1006', 'frank.r@email.com', false, null, 650, '{junk}', '2026-06-15');

-- Assets
insert into assets (id, name, type, brand_id, status, lat, lng, assigned_to, last_service, photo) values
  ('a1', 'Truck 101', 'vehicle', 'lawn', 'in_use', 43.68, -79.42, 'p2', '2026-05-10', '/images/assets/a2.jpg'),
  ('a2', 'Mower Pro', 'equipment', 'lawn', 'in_use', 43.68, -79.42, 'p2', '2026-04-22', '/images/assets/a3.jpg'),
  ('a3', 'Van 12', 'vehicle', 'clean', 'in_use', 43.65, -79.38, 'p1', '2026-05-15', '/images/assets/a1.jpg'),
  ('a4', 'Pressure Washer', 'equipment', 'deck', 'available', 43.62, -79.35, 'p3', '2026-03-30', '/images/assets/a4.jpg');

-- Bookings
insert into bookings (id, customer_id, brand_id, worker_id, asset_ids, date, time, duration, status, address, lat, lng) values
  ('b1', 'c1', 'clean', 'p1', '{a3}', '2026-06-20', '09:00', 120, 'in_progress', '123 Bloor St W, Toronto', 43.65, -79.38),
  ('b2', 'c3', 'lawn', 'p2', '{a1,a2}', '2026-06-20', '10:00', 90, 'in_progress', '88 Yonge St, Toronto', 43.68, -79.42),
  ('b3', 'c4', 'deck', 'p3', '{a4}', '2026-06-21', '08:00', 240, 'scheduled', '220 Queen St W, Toronto', 43.62, -79.35),
  ('b4', 'c2', 'handyman', 'p4', '{}', '2026-06-21', '13:00', 180, 'scheduled', '45 King St E, Toronto', 43.65, -79.37),
  ('b5', 'c1', 'lawn', null, '{}', '2026-06-22', '10:00', 60, 'pending', '123 Bloor St W, Toronto', 43.65, -79.38);

-- Observations
insert into observations (id, booking_id, customer_id, brand_id, worker_id, text, photo, created_at, lat, lng) values
  ('o1', 'b1', 'c1', 'clean', 'p1', 'Deck boards rotting at rear entrance; customer asked about repair estimate.', true, '2026-06-20T09:37:00Z', 43.65, -79.38),
  ('o2', 'b2', 'c3', 'lawn', 'p2', 'Gutters full of leaves; heavy rain forecast this week.', true, '2026-06-20T10:15:00Z', 43.68, -79.42),
  ('o3', 'b1', 'c1', 'clean', 'p1', 'Old couch in basement; customer wants junk removal quote.', false, '2026-06-20T09:55:00Z', 43.65, -79.38);

-- Referrals
insert into referrals (id, observation_id, from_brand_id, to_brand_id, customer_id, status, value, bounty, created_at) values
  ('r1', 'o1', 'clean', 'deck', 'c1', 'sent', 4500, 150, '2026-06-20T09:42:00Z'),
  ('r2', 'o2', 'lawn', 'handyman', 'c3', 'accepted', 800, 60, '2026-06-20T10:18:00Z'),
  ('r3', 'o3', 'clean', 'junk', 'c1', 'converted', 350, 40, '2026-06-20T10:00:00Z');

-- Work Orders
insert into work_orders (id, booking_id, worker_id, customer_id, brand_id, status, checked_in_at, checked_out_at, tasks) values
  ('w1', 'b1', 'p1', 'c1', 'clean', 'in_progress', '2026-06-20T09:02:00Z', null, '[{"id":"t1","label":"Kitchen deep clean","done":true},{"id":"t2","label":"Bathroom sanitize (x2)","done":true},{"id":"t3","label":"Vacuum & mop all floors","done":false},{"id":"t4","label":"Windows interior","done":false}]'),
  ('w2', 'b2', 'p2', 'c3', 'lawn', 'in_progress', '2026-06-20T10:05:00Z', null, '[{"id":"t5","label":"Mow front & back","done":true},{"id":"t6","label":"Edge sidewalks","done":false},{"id":"t7","label":"Blow debris","done":false}]'),
  ('w3', 'b3', 'p3', 'c4', 'deck', 'pending', null, null, '[{"id":"t8","label":"Remove old boards (rear section)","done":false},{"id":"t9","label":"Install composite decking","done":false},{"id":"t10","label":"Seal & finish","done":false}]');

-- Franchisees
insert into franchisees (id, brand_id, name, owner, territory, units, workers, monthly_revenue, churn, nps, observation_rate, conversion_rate, status, since) values
  ('f1', 'clean', 'GTA Clean Co.', 'James Li', 'gta', 12, 28, 84000, 2.1, 72, 4.2, 31, 'healthy', '2024-03-01'),
  ('f2', 'clean', 'Sparkle Toronto', 'Priya Sharma', 'gta', 8, 18, 52000, 5.8, 61, 2.8, 22, 'at_risk', '2024-06-01'),
  ('f3', 'lawn', 'GreenEdge Lawn', 'Tom Murray', 'gta', 15, 22, 110000, 1.4, 78, 3.5, 35, 'healthy', '2024-01-01'),
  ('f4', 'lawn', 'SnowPro Services', 'Karim Hassan', 'gta', 10, 15, 68000, 3.2, 65, 1.9, 18, 'watch', '2025-01-01'),
  ('f5', 'deck', 'DeckMasters ON', 'Mike Oduya', 'gta', 6, 14, 92000, 0.8, 82, 1.2, 28, 'healthy', '2025-04-01'),
  ('f6', 'handyman', 'FixIt Toronto', 'Rachel Wong', 'gta', 9, 12, 45000, 4.5, 58, 3.8, 25, 'watch', '2025-06-01'),
  ('f7', 'junk', 'JunkAway GTA', 'Steve Bello', 'gta', 5, 10, 38000, 1.2, 74, 0.5, 12, 'healthy', '2025-09-01'),
  ('f8', 'clean', 'Fresh Start Calgary', 'Diana Cho', 'cal', 6, 14, 41000, 3.0, 68, 2.1, 20, 'healthy', '2025-11-01');

-- Membership Tiers
insert into membership_tiers (id, name, price, interval, includes, members, avg_ltv, churn_rate) values
  ('basic', 'Basic', 49, 'month', '{Bi-weekly cleaning OR weekly lawn}', 128, 2400, 8.2),
  ('pro', 'Pro', 129, 'month', '{Bi-weekly cleaning,Weekly lawn,Seasonal deck inspection}', 64, 6200, 4.1),
  ('total', 'Total Home', 249, 'month', '{Bi-weekly cleaning,Weekly lawn,Seasonal deck/fence,Priority handyman (4h/mo),Annual junk removal}', 22, 14800, 1.8);

-- Sourcing Leads
insert into sourcing_leads (id, name, business, category, city, channel, temperature, stage, owner_age, ebitda_est, employees, years_in_business, first_contact, last_contact, next_action, notes, activities) values
  ('l-1', 'Bill Mackey', 'Northern Lawns & Gardens', 'Lawn & Snow', 'Collingwood, ON', 'accountant', 'warm', 'initial_contact', 69, 175000, 8, 22, '2026-05-28', '2026-06-10', 'Site visit scheduled Jun 28', 'Referral from his accountant (Sandra Kim). Retiring end of year.', '[{"date":"2026-06-10","type":"call","text":"Follow-up call — confirmed interest."},{"date":"2026-05-30","type":"email","text":"Sent intro package."},{"date":"2026-05-28","type":"referral","text":"Sandra Kim introduced via email."}]'),
  ('l-2', 'Vera Kowalczyk', 'Durham Detail Cleaning', 'Cleaning', 'Oshawa, ON', 'inbound', 'hot', 'meeting_scheduled', 63, 145000, 12, 15, '2026-06-12', '2026-06-18', 'Discovery meeting Jun 25', 'Saw tagline on competitor van. Very motivated.', '[{"date":"2026-06-18","type":"call","text":"Pre-meeting call. Wants exit in 6 months."},{"date":"2026-06-14","type":"email","text":"Sent NDA."},{"date":"2026-06-12","type":"inbound","text":"Inbound call via tagline."}]'),
  ('l-3', 'Frank DeLuca', 'Prestige Lawn Care', 'Lawn & Snow', 'Newmarket, ON', 'broker', 'warm', 'initial_contact', 67, 220000, 14, 19, '2026-06-05', '2026-06-15', 'Waiting for financials from broker', 'Listed with Peak Business Brokers. Asking 4.2x.', '[{"date":"2026-06-15","type":"email","text":"Broker sending financials."},{"date":"2026-06-05","type":"referral","text":"Peak Brokers flagged listing."}]'),
  ('l-4', 'Linda Morrison', 'Morrison Cleaning Services', 'Cleaning', 'Peterborough, ON', 'direct', 'cold', 'researching', 61, 130000, 6, 11, '2026-06-20', '2026-06-20', 'Send intro letter + follow up in 2 weeks', 'Identified via LinkedIn. No response yet.', '[{"date":"2026-06-20","type":"email","text":"Cold outreach via LinkedIn."}]'),
  ('l-5', 'George Pappas', 'Pappas Property Maintenance', 'Lawn & Snow', 'Barrie, ON', 'community', 'warm', 'initial_contact', 72, 195000, 10, 28, '2026-06-08', '2026-06-16', 'Coffee meeting this Thursday', 'Referred by David Park (operator neighbour).', '[{"date":"2026-06-16","type":"call","text":"Very proud of business. Wants care for staff."},{"date":"2026-06-08","type":"referral","text":"David Park intro at BBQ."}]'),
  ('l-6', 'Susan Chen', 'Bright Side Home Cleaning', 'Cleaning', 'Markham, ON', 'accountant', 'hot', 'nda_signed', 65, 280000, 18, 17, '2026-05-15', '2026-06-19', 'Financials under review — scorecard pending', 'Strong business. 80% recurring. Highest EBITDA.', '[{"date":"2026-06-19","type":"email","text":"Full financials received."},{"date":"2026-06-10","type":"call","text":"NDA signed."},{"date":"2026-05-22","type":"meeting","text":"In-person discovery."},{"date":"2026-05-15","type":"referral","text":"Referral from accountant Wayne Ho."}]');

-- Hub 1 Milestones
insert into milestones (phase_id, phase_label, months, milestone_text, done, sort_order) values
  ('foundation', 'Foundation', '1-6', 'Legal structure + shareholder agreement', true, 1),
  ('foundation', 'Foundation', '1-6', 'Brand identity + tagline system', true, 2),
  ('foundation', 'Foundation', '1-6', 'Platform MVP (booking + scheduling)', true, 3),
  ('foundation', 'Foundation', '1-6', 'First trade partner recruited (Tier 3)', true, 4),
  ('foundation', 'Foundation', '1-6', 'First BridgeCo acquisition sourced', false, 5),
  ('hub1_live', 'Hub 1 Live', '6-12', 'First acquisition closed + operator deployed', false, 6),
  ('hub1_live', 'Hub 1 Live', '6-12', 'SWAT team stabilization complete', false, 7),
  ('hub1_live', 'Hub 1 Live', '6-12', 'Worker app launched (3+ crews)', false, 8),
  ('hub1_live', 'Hub 1 Live', '6-12', 'Customer density 50+ homes in zone', false, 9),
  ('hub1_live', 'Hub 1 Live', '6-12', 'Cross-brand referral loop generating revenue', false, 10),
  ('prove', 'Prove & Upgrade', '12-18', 'Unit economics validated (>25% margin)', false, 11),
  ('prove', 'Prove & Upgrade', '12-18', 'Second acquisition closed', false, 12),
  ('prove', 'Prove & Upgrade', '12-18', 'Trade partner upgraded to Tier 2', false, 13),
  ('prove', 'Prove & Upgrade', '12-18', 'Membership tier launched (50+ subscribers)', false, 14),
  ('franchise_launch', 'Franchise Launch', '18-24', 'Franchise disclosure document filed', false, 15),
  ('franchise_launch', 'Franchise Launch', '18-24', 'First franchisee signed (non-operator)', false, 16),
  ('franchise_launch', 'Franchise Launch', '18-24', 'Hub 2 territory selected', false, 17),
  ('franchise_launch', 'Franchise Launch', '18-24', 'Growth Accelerator fund seeded', false, 18);
