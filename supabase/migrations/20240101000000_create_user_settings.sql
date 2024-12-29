-- Create user settings table
create table if not exists public.user_settings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  settings jsonb not null default '{
    "theme": {
      "mode": "system",
      "accent_color": "#0ea5e9"
    },
    "notifications": {
      "email": true,
      "web": true,
      "digest": "weekly"
    },
    "privacy": {
      "show_activity": true,
      "default_story_visibility": "private"
    },
    "repository": {
      "auto_sync": true,
      "sync_frequency": "daily",
      "default_branch": "main"
    }
  }',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Enable RLS
alter table public.user_settings enable row level security;

-- Create RLS policies
create policy "Users can view own settings"
  on public.user_settings
  for select
  using (auth.uid() = user_id);

create policy "Users can update own settings"
  on public.user_settings
  for update
  using (auth.uid() = user_id);

create policy "Users can insert own settings"
  on public.user_settings
  for insert
  with check (auth.uid() = user_id);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create trigger handle_user_settings_updated_at
  before update on public.user_settings
  for each row
  execute function public.handle_updated_at(); 