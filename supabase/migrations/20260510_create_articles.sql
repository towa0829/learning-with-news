create table articles (
  id text primary key,

  title text not null,
  description text,

  summarized_body_text_html text not null,

  translated_title text,
  translated_description text,

  url text not null,
  image_url text,

  source text not null,
  author text,
  section text,

  published_at timestamptz,

  created_at timestamptz default now()
);