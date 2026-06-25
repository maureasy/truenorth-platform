-- ============================================
-- FRANCHISEE ONBOARDING AUTOMATION
-- Run in Supabase SQL Editor
-- ============================================

-- 0. Fix profiles RLS recursion (admin policy queries profiles within profiles)
drop policy if exists "Admins can read all profiles" on profiles;
create policy "Admins can read all profiles" on profiles for select
  using (public.get_my_role() = 'holdco_admin');

-- 1. Add contact_email to franchisees for auto-linking
alter table franchisees
  add column if not exists contact_email text;

-- 2. Add application_id to franchisees to track origin
alter table franchisees
  add column if not exists application_id uuid references franchise_applications(id);

-- 3. Trigger: when a new profile is created (user signs up),
--    auto-set franchisee_id + role by matching email to franchisees.contact_email
create or replace function public.link_franchisee_on_signup()
returns trigger
language plpgsql
security definer
as $$
declare
  matched_franchisee_id text;
begin
  -- Check if this user's email matches a franchisee contact_email
  select id into matched_franchisee_id
  from public.franchisees
  where contact_email = new.email
  limit 1;

  if matched_franchisee_id is not null then
    new.franchisee_id := matched_franchisee_id;
    new.role := 'franchisee';
  end if;

  return new;
end;
$$;

-- Drop existing trigger if any, then create
drop trigger if exists on_profile_created_link_franchisee on profiles;
create trigger on_profile_created_link_franchisee
  before insert on profiles
  for each row
  execute function public.link_franchisee_on_signup();

-- 4. Also handle case where franchisee record is created AFTER the user already exists
--    (admin approves after user already signed up)
create or replace function public.link_existing_user_to_franchisee()
returns trigger
language plpgsql
security definer
as $$
begin
  -- If the new franchisee has a contact_email, find matching profile and link
  if new.contact_email is not null then
    update public.profiles
    set franchisee_id = new.id, role = 'franchisee'
    where email = new.contact_email
      and (franchisee_id is null);
  end if;
  return new;
end;
$$;

drop trigger if exists on_franchisee_created_link_user on franchisees;
create trigger on_franchisee_created_link_user
  after insert on franchisees
  for each row
  execute function public.link_existing_user_to_franchisee();
