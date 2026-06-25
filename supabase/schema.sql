-- ============================================
-- TRUE NORTH PLATFORM — SUPABASE SCHEMA
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ============================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================
-- CORE TABLES
-- ============================================

-- Brands (service lines)
create table brands (
  id text primary key,
  name text not null,
  color text not null,
  service text not null,
  icon text
);

-- Territories (geographic regions)
create table territories (
  id text primary key,
  name text not null,
  center_lat double precision not null,
  center_lng double precision not null,
  zoom integer default 11
);

-- Franchise zones (territory polygons)
create table franchise_zones (
  id text primary key,
  city text references territories(id),
  name text not null,
  owner text,
  color text not null,
  status text not null check (status in ('active', 'available')),
  homes integer default 0,
  revenue numeric default 0,
  workers integer default 0,
  brands text[] default '{}',
  polygon jsonb not null
);

-- Workers/People
create table people (
  id text primary key,
  name text not null,
  role text not null,
  brand_id text references brands(id),
  status text not null check (status in ('on_job', 'available', 'off_duty')),
  lat double precision,
  lng double precision,
  phone text,
  email text,
  photo text,
  skills text[] default '{}',
  rating numeric default 0,
  jobs_completed integer default 0,
  hire_date date,
  availability jsonb,
  referrals_generated integer default 0,
  bounty_earned numeric default 0
);

-- Customers
create table customers (
  id text primary key,
  name text not null,
  address text,
  lat double precision,
  lng double precision,
  phone text,
  email text,
  member boolean default false,
  member_since date,
  total_spend numeric default 0,
  services_used text[] default '{}',
  last_service date
);

-- Assets (vehicles, equipment)
create table assets (
  id text primary key,
  name text not null,
  type text not null check (type in ('vehicle', 'equipment')),
  brand_id text references brands(id),
  status text not null check (status in ('in_use', 'available', 'maintenance')),
  lat double precision,
  lng double precision,
  assigned_to text references people(id),
  last_service date,
  photo text
);

-- Bookings
create table bookings (
  id text primary key,
  customer_id text references customers(id),
  brand_id text references brands(id),
  worker_id text references people(id),
  asset_ids text[] default '{}',
  date date not null,
  time text not null,
  duration integer not null,
  status text not null check (status in ('pending', 'scheduled', 'in_progress', 'completed', 'cancelled')),
  address text,
  lat double precision,
  lng double precision
);

-- Observations (I Spotted)
create table observations (
  id text primary key,
  booking_id text references bookings(id),
  customer_id text references customers(id),
  brand_id text references brands(id),
  worker_id text references people(id),
  text text not null,
  photo boolean default false,
  created_at timestamptz default now(),
  lat double precision,
  lng double precision
);

-- Referrals
create table referrals (
  id text primary key,
  observation_id text references observations(id),
  from_brand_id text references brands(id),
  to_brand_id text references brands(id),
  customer_id text references customers(id),
  status text not null check (status in ('sent', 'accepted', 'converted', 'declined')),
  value numeric default 0,
  bounty numeric default 0,
  created_at timestamptz default now()
);

-- Work orders
create table work_orders (
  id text primary key,
  booking_id text references bookings(id),
  worker_id text references people(id),
  customer_id text references customers(id),
  brand_id text references brands(id),
  status text not null check (status in ('pending', 'in_progress', 'completed')),
  checked_in_at timestamptz,
  checked_out_at timestamptz,
  tasks jsonb default '[]'
);

-- Notifications
create table notifications (
  id text primary key,
  type text not null,
  title text not null,
  message text not null,
  time timestamptz default now(),
  read boolean default false
);

-- Homes (intelligence)
create table homes (
  id text primary key,
  customer_id text references customers(id),
  address text,
  lat double precision,
  lng double precision,
  health_score integer default 0,
  sqft integer,
  year_built integer,
  type text,
  total_visits integer default 0,
  last_visit date,
  services_active text[] default '{}',
  issues jsonb default '[]',
  predicted_needs jsonb default '[]',
  monthly_spend jsonb default '[]'
);

-- Franchisees
create table franchisees (
  id text primary key,
  brand_id text references brands(id),
  name text not null,
  owner text not null,
  territory text references territories(id),
  units integer default 0,
  workers integer default 0,
  monthly_revenue numeric default 0,
  churn numeric default 0,
  nps integer default 0,
  observation_rate numeric default 0,
  conversion_rate numeric default 0,
  status text check (status in ('healthy', 'watch', 'at_risk')),
  since date
);

-- Membership tiers
create table membership_tiers (
  id text primary key,
  name text not null,
  price numeric not null,
  interval text default 'month',
  includes text[] default '{}',
  members integer default 0,
  avg_ltv numeric default 0,
  churn_rate numeric default 0
);

-- ============================================
-- HOLDCO TABLES
-- ============================================

-- Trade partners (3-tier network)
create table trade_partners (
  id text primary key,
  name text not null,
  category text not null,
  tier integer not null check (tier in (1, 2, 3)),
  status text not null check (status in ('active', 'pending', 'inactive')),
  owner text,
  leads_routed integer default 0,
  converted integer default 0,
  conversion_rate numeric default 0,
  avg_ticket numeric default 0,
  monthly_revenue numeric default 0,
  response_time text,
  rating numeric default 0,
  since_date date,
  on_os boolean default false,
  cobranded boolean default false,
  rofr_eligible boolean default false,
  notes text
);

-- BridgeCo deals (acquisition pipeline)
create table deals (
  id text primary key,
  name text not null,
  category text not null,
  city text,
  stage text not null check (stage in ('sourcing', 'diligence', 'acquired', 'stabilizing', 'reselling', 'completed')),
  owner_name text,
  owner_age integer,
  ebitda numeric,
  buy_multiple numeric,
  resell_multiple numeric,
  acquired_date date,
  completed_date date,
  operator jsonb,
  swat jsonb,
  cash_at_close numeric,
  vtb numeric,
  lp_rollover numeric,
  diligence jsonb,
  sourcing jsonb,
  notes text
);

-- Sourcing leads (CRM)
create table sourcing_leads (
  id text primary key,
  name text not null,
  business text not null,
  category text not null,
  city text,
  channel text not null,
  temperature text check (temperature in ('hot', 'warm', 'cold')),
  stage text not null,
  owner_age integer,
  ebitda_est numeric,
  employees integer,
  years_in_business integer,
  first_contact date,
  last_contact date,
  next_action text,
  notes text,
  activities jsonb default '[]'
);

-- Operator bench
create table operator_bench (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  background text,
  status text check (status in ('Pre-qualified', 'In assessment', 'Deployed')),
  ready_since text
);

-- Hub milestones
create table milestones (
  id uuid primary key default uuid_generate_v4(),
  phase_id text not null,
  phase_label text not null,
  months text not null,
  milestone_text text not null,
  done boolean default false,
  sort_order integer default 0
);

-- Franchise applications
create table franchise_applications (
  id uuid primary key default uuid_generate_v4(),
  first_name text,
  last_name text,
  email text,
  phone text,
  city text,
  province text,
  postal_code text,
  occupation text,
  employer text,
  years_experience integer,
  management_experience boolean,
  industry_experience text,
  liquid_capital numeric,
  net_worth numeric,
  credit_score text,
  financing_needed boolean,
  preferred_brands text[] default '{}',
  preferred_territory text,
  start_timeline text,
  full_time boolean,
  consent_background boolean default false,
  consent_terms boolean default false,
  status text default 'submitted' check (status in ('submitted', 'under_review', 'qualified', 'rejected', 'approved')),
  submitted_at timestamptz default now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
alter table brands enable row level security;
alter table territories enable row level security;
alter table franchise_zones enable row level security;
alter table people enable row level security;
alter table customers enable row level security;
alter table assets enable row level security;
alter table bookings enable row level security;
alter table observations enable row level security;
alter table referrals enable row level security;
alter table work_orders enable row level security;
alter table notifications enable row level security;
alter table homes enable row level security;
alter table franchisees enable row level security;
alter table membership_tiers enable row level security;
alter table trade_partners enable row level security;
alter table deals enable row level security;
alter table sourcing_leads enable row level security;
alter table operator_bench enable row level security;
alter table milestones enable row level security;
alter table franchise_applications enable row level security;

-- Public read access for all tables (mockup — tighten later)
create policy "Public read access" on brands for select using (true);
create policy "Public read access" on territories for select using (true);
create policy "Public read access" on franchise_zones for select using (true);
create policy "Public read access" on people for select using (true);
create policy "Public read access" on customers for select using (true);
create policy "Public read access" on assets for select using (true);
create policy "Public read access" on bookings for select using (true);
create policy "Public read access" on observations for select using (true);
create policy "Public read access" on referrals for select using (true);
create policy "Public read access" on work_orders for select using (true);
create policy "Public read access" on notifications for select using (true);
create policy "Public read access" on homes for select using (true);
create policy "Public read access" on franchisees for select using (true);
create policy "Public read access" on membership_tiers for select using (true);
create policy "Public read access" on trade_partners for select using (true);
create policy "Public read access" on deals for select using (true);
create policy "Public read access" on sourcing_leads for select using (true);
create policy "Public read access" on operator_bench for select using (true);
create policy "Public read access" on milestones for select using (true);
create policy "Public read access" on franchise_applications for select using (true);

-- Public insert for franchise applications (public form)
create policy "Public insert" on franchise_applications for insert with check (true);
