-- teacher_requests
create table if not exists public.teacher_requests (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  cv_url text,
  motivation text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  admin_note text,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists teacher_requests_status_idx
  on public.teacher_requests(status);

create or replace function public.set_teacher_requests_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists teacher_requests_set_updated_at on public.teacher_requests;
create trigger teacher_requests_set_updated_at
before update on public.teacher_requests
for each row execute function public.set_teacher_requests_updated_at();

-- AuditLog
create table if not exists public."AuditLog" (
  id bigint generated always as identity primary key,
  "actorId" uuid not null references auth.users(id) on delete restrict,
  "actorRole" text not null,
  action text not null,
  "targetId" uuid references auth.users(id) on delete set null,
  "targetRole" text,
  "createdAt" timestamptz not null default now()
);

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema='public' and table_name='AuditLog' and column_name='created_at'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema='public' and table_name='AuditLog' and column_name='createdAt'
  ) then
    execute 'alter table public."AuditLog" rename column created_at to "createdAt"';
  end if;
end $$;

create index if not exists "AuditLog_createdAt_idx"
  on public."AuditLog"("createdAt");
