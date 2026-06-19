create table if not exists access_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  whatsapp text not null,
  crm text not null,
  specialty text not null,
  status text not null default 'pending',
  requested_at timestamptz not null default now()
);

create table if not exists platform_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  access_password text not null,
  specialty text not null,
  crm text,
  plan text not null default 'Creator Pro',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists ai_usage (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  plan text not null,
  action text not null,
  used_at timestamptz not null default now()
);

create table if not exists instagram_imports (
  id uuid primary key default gen_random_uuid(),
  user_email text,
  rows jsonb not null default '[]'::jsonb,
  imported_at timestamptz not null default now()
);

alter table access_requests enable row level security;
alter table platform_users enable row level security;
alter table ai_usage enable row level security;
alter table instagram_imports enable row level security;
