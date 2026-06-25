-- ============================================
-- APPLICATION DOCUMENTS
-- Run this in Supabase SQL Editor
-- ============================================

-- Document tracking table
create table if not exists application_documents (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid not null references franchise_applications(id) on delete cascade,
  doc_type text not null check (doc_type in (
    'government_id',
    'proof_of_funds',
    'credit_report',
    'resume',
    'business_plan',
    'signed_nda',
    'fdd',
    'other'
  )),
  file_name text not null,
  file_size integer,
  mime_type text,
  storage_path text not null,
  uploaded_by text not null check (uploaded_by in ('applicant', 'holdco')),
  status text not null default 'uploaded' check (status in ('uploaded', 'reviewed', 'approved', 'rejected')),
  notes text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table application_documents enable row level security;

-- Public can insert (applicants upload via token link)
create policy "Public insert docs"
  on application_documents for insert
  with check (true);

-- Public can read (for applicant upload page with token)
create policy "Public read docs"
  on application_documents for select
  using (true);

-- Authenticated can update (HoldCo reviews)
create policy "Auth update docs"
  on application_documents for update
  using (auth.role() = 'authenticated');

-- Authenticated can delete
create policy "Auth delete docs"
  on application_documents for delete
  using (auth.role() = 'authenticated');

-- ============================================
-- SUPABASE STORAGE BUCKET
-- Run these one at a time if needed
-- ============================================

-- Create the storage bucket
insert into storage.buckets (id, name, public)
values ('application-docs', 'application-docs', false)
on conflict (id) do nothing;

-- Allow public uploads to the bucket (applicants)
create policy "Public upload to application-docs"
  on storage.objects for insert
  with check (bucket_id = 'application-docs');

-- Allow public read (for download links with signed URLs)
create policy "Public read application-docs"
  on storage.objects for select
  using (bucket_id = 'application-docs');

-- Allow authenticated delete
create policy "Auth delete application-docs"
  on storage.objects for delete
  using (bucket_id = 'application-docs' and auth.role() = 'authenticated');

-- ============================================
-- ADD upload_token TO franchise_applications
-- Used for secure document upload links
-- ============================================

alter table franchise_applications
  add column if not exists upload_token uuid default uuid_generate_v4();

-- Index for fast token lookup
create index if not exists idx_applications_upload_token
  on franchise_applications(upload_token);
