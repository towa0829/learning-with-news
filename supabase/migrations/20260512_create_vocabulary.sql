create table vocabulary (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  article_id text references articles(id) on delete set null,
  phrase text not null,
  meaning text not null,
  example_sentence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, phrase)
);

alter table vocabulary enable row level security;

create policy "Users can read their own vocabulary"
on vocabulary
for select
using (auth.uid() = user_id);

create policy "Users can insert their own vocabulary"
on vocabulary
for insert
with check (auth.uid() = user_id);

create policy "Users can update their own vocabulary"
on vocabulary
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own vocabulary"
on vocabulary
for delete
using (auth.uid() = user_id);
