-- ============================================
-- SEED DATA FOR FRANCHISEE OPERATIONS
-- Run AFTER franchisee_ops.sql
-- Uses franchisee 'f1' (GTA Clean Co.) as demo
-- ============================================

-- ─── WORKERS (assigned to f1 = GTA Clean Co.) ───
insert into workers (id, franchisee_id, brand_id, name, role, status, phone, email, lat, lng, skills, rating, jobs_completed, hire_date, referrals_generated, bounty_earned) values
  ('00000000-0000-0000-0000-000000000001', 'f1', 'clean', 'Sarah Chen', 'Cleaner', 'on_job', '416-555-0101', 's.chen@truenorth.local', 43.65, -79.38, '{"Deep Clean","Move-In/Out","Carpet"}', 4.90, 312, '2024-03-15', 14, 840),
  ('00000000-0000-0000-0000-000000000005', 'f1', 'clean', 'Aisha Patel', 'Cleaner', 'available', '416-555-0105', 'a.patel@truenorth.local', 43.64, -79.39, '{"Deep Clean","Office","Post-Reno"}', 4.80, 189, '2024-11-05', 11, 660);

-- Workers for f3 (GreenEdge Lawn)
insert into workers (id, franchisee_id, brand_id, name, role, status, phone, email, lat, lng, skills, rating, jobs_completed, hire_date, referrals_generated, bounty_earned) values
  ('00000000-0000-0000-0000-000000000002', 'f3', 'lawn', 'Marcus Okafor', 'Lawn Crew Lead', 'available', '416-555-0102', 'm.okafor@truenorth.local', 43.68, -79.42, '{"Mowing","Edging","Snow Removal","Fertilizer"}', 4.80, 245, '2024-06-01', 9, 520),
  ('00000000-0000-0000-0000-000000000006', 'f3', 'lawn', 'Liam Torres', 'Lawn Crew', 'on_job', '416-555-0106', 'l.torres@truenorth.local', 43.67, -79.41, '{"Mowing","Snow Removal","Leaf Cleanup","Garden Bed"}', 4.50, 156, '2025-02-15', 5, 250);

-- Worker for f5 (DeckMasters ON)
insert into workers (id, franchisee_id, brand_id, name, role, status, phone, email, lat, lng, skills, rating, jobs_completed, hire_date, referrals_generated, bounty_earned) values
  ('00000000-0000-0000-0000-000000000003', 'f5', 'deck', 'Elena Rostova', 'Deck Specialist', 'available', '416-555-0103', 'e.rostova@truenorth.local', 43.62, -79.35, '{"Composite Decking","Fence Install","Staining","Railing"}', 4.70, 128, '2025-01-10', 3, 180);

-- Worker for f6 (FixIt Toronto)
insert into workers (id, franchisee_id, brand_id, name, role, status, phone, email, lat, lng, skills, rating, jobs_completed, hire_date, referrals_generated, bounty_earned) values
  ('00000000-0000-0000-0000-000000000004', 'f6', 'handyman', 'Dave Kim', 'Handyman', 'off_duty', '416-555-0104', 'd.kim@truenorth.local', 43.66, -79.40, '{"Drywall","Plumbing","Electrical","Assembly"}', 4.60, 198, '2024-09-20', 7, 390);

-- ─── CUSTOMERS (assigned to f1) ───
insert into customers (id, franchisee_id, name, address, lat, lng, phone, email, is_member, member_since, total_spend, services_used, last_service) values
  ('00000000-0000-0000-0001-000000000001', 'f1', 'Alice Montgomery', '123 Bloor St W, Toronto', 43.65, -79.38, '416-555-1001', 'alice.m@email.com', true, '2025-01-10', 8200, '{"clean","lawn","junk"}', '2026-06-20'),
  ('00000000-0000-0000-0001-000000000002', 'f1', 'Bob Singh', '45 King St E, Toronto', 43.65, -79.37, '416-555-1002', 'bob.s@email.com', false, null, 1800, '{"handyman"}', '2026-05-28'),
  ('00000000-0000-0000-0001-000000000003', 'f1', 'Carol Wu', '88 Yonge St, Toronto', 43.68, -79.42, '416-555-1003', 'carol.wu@email.com', true, '2025-04-22', 5400, '{"lawn","clean"}', '2026-06-20'),
  ('00000000-0000-0000-0001-000000000004', 'f1', 'Dan Fortier', '220 Queen St W, Toronto', 43.62, -79.35, '416-555-1004', 'dan.f@email.com', false, null, 3200, '{"deck"}', '2026-06-10'),
  ('00000000-0000-0000-0001-000000000005', 'f1', 'Emily Park', '55 Dundas St, Toronto', 43.66, -79.38, '416-555-1005', 'emily.p@email.com', true, '2025-08-01', 12500, '{"clean","lawn","deck","handyman"}', '2026-06-18'),
  ('00000000-0000-0000-0001-000000000006', 'f1', 'Frank Russo', '300 Bathurst St, Toronto', 43.66, -79.41, '416-555-1006', 'frank.r@email.com', false, null, 650, '{"junk"}', '2026-06-15');

-- ─── BOOKINGS ───
insert into bookings (id, franchisee_id, customer_id, brand_id, worker_id, date, time, duration, status, address, lat, lng) values
  ('00000000-0000-0000-0002-000000000001', 'f1', '00000000-0000-0000-0001-000000000001', 'clean', '00000000-0000-0000-0000-000000000001', '2026-06-20', '09:00', 120, 'in_progress', '123 Bloor St W, Toronto', 43.65, -79.38),
  ('00000000-0000-0000-0002-000000000002', 'f3', '00000000-0000-0000-0001-000000000003', 'lawn', '00000000-0000-0000-0000-000000000002', '2026-06-20', '10:00', 90, 'in_progress', '88 Yonge St, Toronto', 43.68, -79.42),
  ('00000000-0000-0000-0002-000000000003', 'f5', '00000000-0000-0000-0001-000000000004', 'deck', '00000000-0000-0000-0000-000000000003', '2026-06-21', '08:00', 240, 'scheduled', '220 Queen St W, Toronto', 43.62, -79.35),
  ('00000000-0000-0000-0002-000000000004', 'f6', '00000000-0000-0000-0001-000000000002', 'handyman', '00000000-0000-0000-0000-000000000004', '2026-06-21', '13:00', 180, 'scheduled', '45 King St E, Toronto', 43.65, -79.37),
  ('00000000-0000-0000-0002-000000000005', 'f3', '00000000-0000-0000-0001-000000000001', 'lawn', null, '2026-06-22', '10:00', 60, 'pending', '123 Bloor St W, Toronto', 43.65, -79.38);

-- ─── WORK ORDERS ───
insert into work_orders (id, franchisee_id, booking_id, worker_id, customer_id, brand_id, status, checked_in_at, checked_out_at, tasks) values
  ('00000000-0000-0000-0003-000000000001', 'f1', '00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0001-000000000001', 'clean', 'in_progress', '2026-06-20T09:02:00Z', null,
    '[{"id":"t1","label":"Kitchen deep clean","done":true},{"id":"t2","label":"Bathroom sanitize (x2)","done":true},{"id":"t3","label":"Vacuum & mop all floors","done":false},{"id":"t4","label":"Windows interior","done":false}]'),
  ('00000000-0000-0000-0003-000000000002', 'f3', '00000000-0000-0000-0002-000000000002', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0001-000000000003', 'lawn', 'in_progress', '2026-06-20T10:05:00Z', null,
    '[{"id":"t5","label":"Mow front & back","done":true},{"id":"t6","label":"Edge sidewalks","done":false},{"id":"t7","label":"Blow debris","done":false}]'),
  ('00000000-0000-0000-0003-000000000003', 'f5', '00000000-0000-0000-0002-000000000003', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0001-000000000004', 'deck', 'pending', null, null,
    '[{"id":"t8","label":"Remove old boards (rear section)","done":false},{"id":"t9","label":"Install composite decking","done":false},{"id":"t10","label":"Seal & finish","done":false}]');

-- ─── OBSERVATIONS ───
insert into observations (id, franchisee_id, booking_id, customer_id, brand_id, worker_id, text, has_photo, lat, lng, created_at) values
  ('00000000-0000-0000-0004-000000000001', 'f1', '00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0001-000000000001', 'clean', '00000000-0000-0000-0000-000000000001', 'Deck boards rotting at rear entrance; customer asked about repair estimate.', true, 43.65, -79.38, '2026-06-20T09:37:00Z'),
  ('00000000-0000-0000-0004-000000000002', 'f3', '00000000-0000-0000-0002-000000000002', '00000000-0000-0000-0001-000000000003', 'lawn', '00000000-0000-0000-0000-000000000002', 'Gutters full of leaves; heavy rain forecast this week.', true, 43.68, -79.42, '2026-06-20T10:15:00Z'),
  ('00000000-0000-0000-0004-000000000003', 'f1', '00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0001-000000000001', 'clean', '00000000-0000-0000-0000-000000000001', 'Old couch in basement; customer wants junk removal quote.', false, 43.65, -79.38, '2026-06-20T09:55:00Z');

-- ─── REFERRALS ───
insert into referrals (id, franchisee_id, observation_id, from_brand_id, to_brand_id, customer_id, status, value, bounty, created_at) values
  ('00000000-0000-0000-0005-000000000001', 'f1', '00000000-0000-0000-0004-000000000001', 'clean', 'deck', '00000000-0000-0000-0001-000000000001', 'sent', 4500, 150, '2026-06-20T09:42:00Z'),
  ('00000000-0000-0000-0005-000000000002', 'f3', '00000000-0000-0000-0004-000000000002', 'lawn', 'handyman', '00000000-0000-0000-0001-000000000003', 'accepted', 800, 60, '2026-06-20T10:18:00Z'),
  ('00000000-0000-0000-0005-000000000003', 'f1', '00000000-0000-0000-0004-000000000003', 'clean', 'junk', '00000000-0000-0000-0001-000000000001', 'converted', 350, 40, '2026-06-20T10:00:00Z');

-- ─── ASSETS ───
insert into assets (id, franchisee_id, name, type, brand_id, status, lat, lng, assigned_to, last_service) values
  ('00000000-0000-0000-0006-000000000001', 'f3', 'Truck 101', 'vehicle', 'lawn', 'in_use', 43.68, -79.42, '00000000-0000-0000-0000-000000000002', '2026-05-10'),
  ('00000000-0000-0000-0006-000000000002', 'f3', 'Mower Pro', 'equipment', 'lawn', 'in_use', 43.68, -79.42, '00000000-0000-0000-0000-000000000002', '2026-04-22'),
  ('00000000-0000-0000-0006-000000000003', 'f1', 'Van 12', 'vehicle', 'clean', 'in_use', 43.65, -79.38, '00000000-0000-0000-0000-000000000001', '2026-05-15'),
  ('00000000-0000-0000-0006-000000000004', 'f5', 'Pressure Washer', 'equipment', 'deck', 'available', 43.62, -79.35, '00000000-0000-0000-0000-000000000003', '2026-03-30');
