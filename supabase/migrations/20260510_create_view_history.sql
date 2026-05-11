create table view_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  article_id text references articles(id),

  viewed_at timestamptz default now()
)