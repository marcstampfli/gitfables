-- Create activity types enum
create type public.activity_type as enum (
  'story_created',
  'story_updated',
  'story_shared',
  'story_exported',
  'api_key_created',
  'api_key_deleted',
  'settings_updated'
);

-- Create user activity table
create table if not exists public.user_activity (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  activity_type activity_type not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index user_activity_user_id_idx on public.user_activity(user_id);
create index user_activity_created_at_idx on public.user_activity(created_at);
create index user_activity_type_idx on public.user_activity(activity_type);

-- Enable RLS
alter table public.user_activity enable row level security;

-- Create RLS policies
create policy "Users can view own activity"
  on public.user_activity
  for select
  using (auth.uid() = user_id);

create policy "System can insert activity"
  on public.user_activity
  for insert
  with check (true);

-- Create activity summary function
create or replace function public.get_user_activity_summary(
  p_user_id uuid,
  p_start_date timestamp with time zone,
  p_end_date timestamp with time zone
) returns table (
  total_activities bigint,
  activities_by_type jsonb,
  recent_activities jsonb
) language plpgsql security definer as $$
declare
  activity_stats record;
  activity_counts jsonb;
  recent_list jsonb;
begin
  -- Get total activities
  select count(*)::bigint into total_activities
  from public.user_activity
  where user_id = p_user_id
  and created_at between p_start_date and p_end_date;

  -- Get activity counts by type
  select jsonb_object_agg(activity_type::text, count(*))
  into activities_by_type
  from public.user_activity
  where user_id = p_user_id
  and created_at between p_start_date and p_end_date
  group by activity_type;

  -- Get recent activities
  select jsonb_agg(
    jsonb_build_object(
      'id', id,
      'type', activity_type,
      'details', details,
      'created_at', created_at
    )
  )
  into recent_activities
  from (
    select id, activity_type, details, created_at
    from public.user_activity
    where user_id = p_user_id
    and created_at between p_start_date and p_end_date
    order by created_at desc
    limit 10
  ) recent;

  return next;
end;
$$; 