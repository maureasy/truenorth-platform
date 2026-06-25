-- ============================================
-- SUBSCRIBERS TABLE
-- CRM subscriber/member management
-- Run in Supabase SQL Editor
-- ============================================

create table if not exists subscribers (
  id uuid primary key default uuid_generate_v4(),
  franchisee_id text references franchisees(id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  address text,
  tier text not null default 'none' check (tier in ('none', 'basic', 'pro', 'total_home')),
  status text not null default 'prospect' check (status in ('prospect', 'active', 'paused', 'cancelled')),
  total_spend numeric(12,2) default 0,
  services_used text[] default '{}',
  notes text,
  member_since date,
  created_at timestamptz default now()
);

alter table subscribers enable row level security;

create policy "Subscribers: holdco sees all" on subscribers for select
  using (exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'holdco_admin'));
create policy "Subscribers: holdco manages all" on subscribers for all
  using (exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'holdco_admin'));
create policy "Subscribers: franchisee sees own" on subscribers for select
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));
create policy "Subscribers: franchisee manages own" on subscribers for all
  using (franchisee_id = (select franchisee_id from profiles where id = auth.uid()));

create index if not exists idx_subscribers_franchisee on subscribers(franchisee_id);
create index if not exists idx_subscribers_tier on subscribers(tier);
