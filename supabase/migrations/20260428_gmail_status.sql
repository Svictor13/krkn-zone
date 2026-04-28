-- ============================================
-- Gmail glance metric (counts only, no body content)
-- Apply via Supabase dashboard SQL editor after the HUD v3 migration
-- ============================================

create table if not exists public.gmail_status (
  account text primary key,
  unread_count int not null default 0,
  oldest_unread_age_minutes int,
  last_synced_at timestamptz not null default now()
);

-- last_synced_at is set explicitly by the daemon on every write; no trigger needed.

-- Pre-seed the two accounts so the daemon can do simple updates instead of upserts
insert into public.gmail_status (account, unread_count) values
  ('personal', 0),
  ('work',     0)
on conflict (account) do nothing;
