-- ============================================
-- AUTH PROFILES TABLE
-- Run this in Supabase SQL Editor after schema.sql
-- Links auth.users to app roles
-- ============================================

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'franchisee' check (role in ('holdco_admin', 'franchisee')),
  franchisee_id text references franchisees(id),
  full_name text,
  email text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Users can read their own profile
create policy "Users can read own profile"
  on profiles for select
  using (auth.uid() = id);

-- HoldCo admins can read all profiles
create policy "Admins can read all profiles"
  on profiles for select
  using (
    exists (
      select 1 from profiles p
      where p.id = auth.uid() and p.role = 'holdco_admin'
    )
  );

-- Allow insert during signup (via trigger or service role)
create policy "Service insert"
  on profiles for insert
  with check (true);

-- Allow users to update their own profile
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, role, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'franchisee'),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists and recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- UPDATE RLS on franchise_applications for write
-- ============================================

-- Allow authenticated users (holdco) to update applications
create policy "Authenticated update" on franchise_applications
  for update using (auth.role() = 'authenticated');
