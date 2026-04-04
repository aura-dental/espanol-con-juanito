-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ============================================================
-- PROFILES
-- ============================================================
create table profiles (
  id uuid references auth.users primary key,
  display_name text,
  challenge_start_date date,
  current_level integer default 1,
  auto_adapt boolean default true,
  tense_session_counts jsonb default '{}',
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

-- ============================================================
-- SESSIONS
-- ============================================================
create table sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  session_date date not null,
  tense text not null,
  phase_completed text[] default '{}',
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, session_date)
);

alter table sessions enable row level security;

create policy "Users can manage own sessions"
  on sessions for all using (auth.uid() = user_id);

-- ============================================================
-- EXERCISE ATTEMPTS
-- ============================================================
create table exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  session_id uuid references sessions(id) on delete cascade,
  tense text not null,
  verb text not null,
  pronoun text not null,
  expected text not null,
  given text not null,
  correct boolean not null,
  contrast_pair boolean default false,
  attempted_at timestamptz default now()
);

alter table exercise_attempts enable row level security;

create policy "Users can manage own attempts"
  on exercise_attempts for all using (auth.uid() = user_id);

-- Index for spaced repetition queries
create index exercise_attempts_user_tense_idx on exercise_attempts(user_id, tense, attempted_at desc);

-- ============================================================
-- GRAMMAR LOG
-- ============================================================
create table grammar_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  session_date date,
  concept text not null,
  seen_at timestamptz default now()
);

alter table grammar_log enable row level security;

create policy "Users can manage own grammar log"
  on grammar_log for all using (auth.uid() = user_id);

-- ============================================================
-- CHAT MESSAGES
-- ============================================================
create table chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  session_id uuid references sessions(id) on delete set null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now()
);

alter table chat_messages enable row level security;

create policy "Users can manage own chat messages"
  on chat_messages for all using (auth.uid() = user_id);

-- ============================================================
-- FUNCTION: auto-create profile on signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
