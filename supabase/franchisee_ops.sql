-- ============================================
-- FRANCHISEE OPERATIONS TABLES
-- Run this in Supabase SQL Editor
-- ============================================

-- Add franchisee_id to profiles FIRST (needed by RLS policies below)
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_name = 'profiles' and column_name = 'franchisee_id'
  ) then
    alter table profiles add column franchisee_id text references franchisees(id);
  end if;
end $$;

-- ─── WORKERS ───
create table if not exists workers (
  id uuid primary key default uuid_generate_v4(),
  franchisee_id text not null references franchisees(id) on delete cascade,
  brand_id text not null,
  name text not null,
  role text,
  status text not null default 'available' check (status in ('available', 'on_job', 'off_duty', 'inactive')),
  phone text,
  email text,
  lat numeric,
  lng numeric,
  skills text[] default '{}',
  rating numeric(3,2) default 0,
  jobs_completed integer default 0,
  hire_date date,
  availability jsonb default '{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":false,"sun":false}',
  referrals_generated integer default 0,
  bounty_earned numeric(10,2) default 0,
  created_at timestamptz default now()
);

-- ─── CUSTOMERS ───
create table if not exists customers (
  id uuid primary key default uuid_generate_v4(),
  franchisee_id text not null references franchisees(id) on delete cascade,
  name text not null,
  address text,
  lat numeric,
  lng numeric,
  phone text,
  email text,
  is_member boolean default false,
  member_since date,
  total_spend numeric(12,2) default 0,
  services_used text[] default '{}',
  last_service date,
  created_at timestamptz default now()
);

-- ─── BOOKINGS ───
create table if not exists bookings (
  id uuid primary key default uuid_generate_v4(),
  franchisee_id text not null references franchisees(id) on delete cascade,
  customer_id uuid references customers(id),
  brand_id text not null,
  worker_id uuid references workers(id),
  date date not null,
  time time,
  duration integer, -- minutes
  status text not null default 'pending' check (status in ('pending', 'scheduled', 'in_progress', 'completed', 'cancelled')),
  address text,
  lat numeric,
  lng numeric,
  notes text,
  total_price numeric(10,2),
  created_at timestamptz default now()
);

-- ─── WORK ORDERS ───
create table if not exists work_orders (
  id uuid primary key default uuid_generate_v4(),
  franchisee_id text not null references franchisees(id) on delete cascade,
  booking_id uuid references bookings(id) on delete cascade,
  worker_id uuid references workers(id),
  customer_id uuid references customers(id),
  brand_id text not null,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed')),
  checked_in_at timestamptz,
  checked_out_at timestamptz,
  tasks jsonb default '[]', -- [{id, label, done}]
  created_at timestamptz default now()
);

-- ─── OBSERVATIONS (cross-sell leads from workers) ───
create table if not exists observations (
  id uuid primary key default uuid_generate_v4(),
  franchisee_id text not null references franchisees(id) on delete cascade,
  booking_id uuid references bookings(id),
  customer_id uuid references customers(id),
  brand_id text not null,
  worker_id uuid references workers(id),
  text text not null,
  has_photo boolean default false,
  lat numeric,
  lng numeric,
  created_at timestamptz default now()
);

-- ─── REFERRALS (observation → cross-sell conversion) ───
create table if not exists referrals (
  id uuid primary key default uuid_generate_v4(),
  franchisee_id text not null references franchisees(id) on delete cascade,
  observation_id uuid references observations(id),
  from_brand_id text not null,
  to_brand_id text not null,
  customer_id uuid references customers(id),
  status text not null default 'sent' check (status in ('sent', 'accepted', 'booked', 'converted', 'expired')),
  value numeric(10,2) default 0,
  bounty numeric(10,2) default 0,
  created_at timestamptz default now()
);

-- ─── ASSETS (vehicles & equipment) ───
create table if not exists assets (
  id uuid primary key default uuid_generate_v4(),
  franchisee_id text not null references franchisees(id) on delete cascade,
  name text not null,
  type text not null check (type in ('vehicle', 'equipment', 'tool')),
  brand_id text,
  status text not null default 'available' check (status in ('available', 'in_use', 'maintenance', 'retired')),
  lat numeric,
  lng numeric,
  assigned_to uuid references workers(id),
  last_service date,
  created_at timestamptz default now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- Franchisees only see their own data
-- HoldCo admins see everything
-- ============================================

alter table workers enable row level security;
alter table customers enable row level security;
alter table bookings enable row level security;
alter table work_orders enable row level security;
alter table observations enable row level security;
alter table referrals enable row level security;
alter table assets enable row level security;

-- Helper: get current user's franchisee_id from profiles
-- (profiles.franchisee_id must be set for franchisee users)

-- Policy pattern: holdco sees all, franchisee sees own
-- Workers
create policy "Workers: holdco sees all" on workers for select
  using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'holdco_admin')
  );
create policy "Workers: franchisee sees own" on workers for select
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));
create policy "Workers: franchisee manages own" on workers for all
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));

-- Customers
create policy "Customers: holdco sees all" on customers for select
  using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'holdco_admin')
  );
create policy "Customers: franchisee sees own" on customers for select
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));
create policy "Customers: franchisee manages own" on customers for all
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));

-- Bookings
create policy "Bookings: holdco sees all" on bookings for select
  using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'holdco_admin')
  );
create policy "Bookings: franchisee sees own" on bookings for select
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));
create policy "Bookings: franchisee manages own" on bookings for all
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));

-- Work Orders
create policy "WorkOrders: holdco sees all" on work_orders for select
  using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'holdco_admin')
  );
create policy "WorkOrders: franchisee sees own" on work_orders for select
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));
create policy "WorkOrders: franchisee manages own" on work_orders for all
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));

-- Observations
create policy "Observations: holdco sees all" on observations for select
  using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'holdco_admin')
  );
create policy "Observations: franchisee sees own" on observations for select
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));
create policy "Observations: franchisee manages own" on observations for all
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));

-- Referrals
create policy "Referrals: holdco sees all" on referrals for select
  using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'holdco_admin')
  );
create policy "Referrals: franchisee sees own" on referrals for select
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));
create policy "Referrals: franchisee manages own" on referrals for all
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));

-- Assets
create policy "Assets: holdco sees all" on assets for select
  using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'holdco_admin')
  );
create policy "Assets: franchisee sees own" on assets for select
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));
create policy "Assets: franchisee manages own" on assets for all
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));

-- ============================================
-- INDEXES
-- ============================================

create index if not exists idx_workers_franchisee on workers(franchisee_id);
create index if not exists idx_customers_franchisee on customers(franchisee_id);
create index if not exists idx_bookings_franchisee on bookings(franchisee_id);
create index if not exists idx_bookings_date on bookings(date);
create index if not exists idx_bookings_status on bookings(status);
create index if not exists idx_work_orders_franchisee on work_orders(franchisee_id);
create index if not exists idx_observations_franchisee on observations(franchisee_id);
create index if not exists idx_referrals_franchisee on referrals(franchisee_id);
create index if not exists idx_assets_franchisee on assets(franchisee_id);
