-- ============================================
-- HUD v3 — Today dashboard
-- Apply via Supabase dashboard SQL editor
-- ============================================

-- 1. Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  color text default '#06d6a0',
  status text not null default 'active'
    check (status in ('active','paused','done','archived')),
  sort_order int default 0,
  created_at timestamptz not null default now()
);

-- 2. Sprints (week or 2-week blocks)
create table if not exists public.sprints (
  id uuid primary key default gen_random_uuid(),
  name text unique,
  start_date date not null,
  end_date date not null,
  scope_minutes int default 0,
  is_active boolean default false,
  created_at timestamptz not null default now()
);

-- 3. Time logs (work sessions per task)
create table if not exists public.time_logs (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  started_at timestamptz not null,
  stopped_at timestamptz,
  notes text,
  created_at timestamptz not null default now()
);
create index if not exists time_logs_task_idx on public.time_logs(task_id);
create index if not exists time_logs_started_idx on public.time_logs(started_at);

-- 4. Calendar events (synced from Apple Calendar by Mac daemon)
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'apple',
  external_id text,
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  calendar_name text,
  is_all_day boolean default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(source, external_id)
);
create index if not exists events_starts_idx on public.events(starts_at);

-- 5. Extend tasks
alter table public.tasks
  add column if not exists project_id uuid references public.projects(id) on delete set null,
  add column if not exists sprint_id uuid references public.sprints(id) on delete set null,
  add column if not exists estimated_minutes int default 0,
  add column if not exists kanban_lane text default 'backlog'
    check (kanban_lane in ('backlog','today','doing','waiting','done'));

-- 6. Backfill kanban_lane from existing status + is_wig
update public.tasks set kanban_lane = 'done'
  where status = 'done' and (kanban_lane is null or kanban_lane = 'backlog');
update public.tasks set kanban_lane = 'today'
  where status = 'active' and is_wig = true and kanban_lane = 'backlog';

-- 7. Seed Stefan's active projects (idempotent)
insert into public.projects (name, color, sort_order) values
  ('LLA Safe CRQ POV',          '#06d6a0', 10),
  ('Optimum Safe TPRM',         '#fbbf24', 20),
  ('Netglobe / Axia TPRM',      '#e040fb', 30),
  ('KRKN Universe',             '#ef4444', 40),
  ('Art Career Relaunch',       '#22c55e', 50),
  ('Personal / Life',           '#8888a0', 60),
  ('Inbox',                     '#555570', 999)
on conflict (name) do nothing;

-- 8. Seed the current sprint (W17 covering 2026-04-27 → 2026-05-03)
insert into public.sprints (name, start_date, end_date, is_active) values
  ('W17 2026', '2026-04-27', '2026-05-03', true)
on conflict (name) do nothing;

-- 9. Updated-at trigger for events (idempotent, no destructive ops)
create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
do $$
begin
  if not exists (
    select 1 from pg_trigger
    where tgname = 'events_updated_at'
      and tgrelid = 'public.events'::regclass
  ) then
    create trigger events_updated_at
      before update on public.events
      for each row execute function public.set_updated_at();
  end if;
end $$;
