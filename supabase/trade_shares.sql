create table if not exists public.trade_shares (
  code text primary key,
  request_payload jsonb not null,
  response_payload jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.trade_shares enable row level security;

create policy "Anyone can read trade shares"
on public.trade_shares
for select
using (true);

create policy "Anyone can create trade shares"
on public.trade_shares
for insert
with check (true);

create policy "Anyone can update trade responses"
on public.trade_shares
for update
using (true)
with check (true);
