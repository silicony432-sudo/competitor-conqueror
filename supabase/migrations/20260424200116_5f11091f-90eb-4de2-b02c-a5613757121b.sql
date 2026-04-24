
create table public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.waitlist_signups enable row level security;

-- Allow anyone (anon + authenticated) to insert their own signup
create policy "Anyone can join waitlist"
on public.waitlist_signups
for insert
to anon, authenticated
with check (true);

-- No public select/update/delete policies = locked down by default
