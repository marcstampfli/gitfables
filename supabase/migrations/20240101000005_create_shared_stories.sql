-- Create share types enum
create type public.share_type as enum (
  'public',
  'private',
  'team'
);

-- Create shared stories table
create table if not exists public.shared_stories (
  id uuid primary key default uuid_generate_v4(),
  story_id uuid references public.stories(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  share_type share_type not null default 'private',
  share_code text unique not null,
  expires_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  views_count integer default 0 not null,
  last_viewed_at timestamp with time zone
);

-- Create indexes
create index shared_stories_story_id_idx on public.shared_stories(story_id);
create index shared_stories_user_id_idx on public.shared_stories(user_id);
create index shared_stories_share_code_idx on public.shared_stories(share_code);
create index shared_stories_share_type_idx on public.shared_stories(share_type);

-- Enable RLS
alter table public.shared_stories enable row level security;

-- Create RLS policies
create policy "Users can view own shared stories"
  on public.shared_stories
  for select
  using (auth.uid() = user_id);

create policy "Users can create shared stories"
  on public.shared_stories
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update own shared stories"
  on public.shared_stories
  for update
  using (auth.uid() = user_id);

create policy "Users can delete own shared stories"
  on public.shared_stories
  for delete
  using (auth.uid() = user_id);

-- Create function to generate unique share code
create or replace function public.generate_share_code()
returns text
language plpgsql
as $$
declare
  chars text[] := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z}';
  result text := '';
  i integer := 0;
  code_exists boolean;
begin
  loop
    result := '';
    for i in 1..8 loop
      result := result || chars[1+random()*(array_length(chars, 1)-1)];
    end loop;
    
    select exists(
      select 1 from public.shared_stories where share_code = result
    ) into code_exists;
    
    if not code_exists then
      return result;
    end if;
  end loop;
end;
$$;

-- Create function to increment view count
create or replace function public.increment_story_views(p_share_code text)
returns void
language plpgsql security definer
as $$
begin
  update public.shared_stories
  set 
    views_count = views_count + 1,
    last_viewed_at = now()
  where share_code = p_share_code
  and (expires_at is null or expires_at > now());
end;
$$; 