export type Article = {
  id: string;
  source: {
    id?: string;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  bodyText?: string | null;
  // optional analysis/translations (may come from DB as translated_title, etc.)
  translatedTitle?: string | null;
  translated_description?: string | null; // DB snake_case
  translatedDescription?: string | null;
  translatedBodyText?: string | null;
  translated_body_text?: string | null; // DB snake_case
  keywords?: Array<Vocabulary> | null;
};

export type GuardianArticle = {
  id: string;
  sectionId: string;
  sectionName: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  fields?: {
    byline?: string;
    trailText?: string;
    thumbnail?: string;
    bodyText?: string;
  };
};

export type analyzedArticle = {
  summarizedBodyTextHTML: string;
  translatedTitle?: string;
  translatedDescription?: string;
  translatedBodyText?: string;
  keywords?: Array<Vocabulary>;
}

export type ArticleForDB = {
  id: string;
  title: string;
  description?: string;
  summarizedBodyTextHTML: string;
  translatedTitle?: string;
  translatedDescription?: string;
  translatedBodyText?: string;
  // DB column snake_case versions
  translated_title?: string;
  translated_description?: string;
  translated_body_text?: string;
  keywords?: Array<Vocabulary> | null;
  url: string;
  imageUrl?: string;
  source: string;
  author?: string;
  section?: string;
  publishedAt: string;
};

export type ViewHistory = {
  id: string;
  user_id: string;
  article_id: string;
  viewed_at: string;
}

export type Category =
  | "technology"
  | "business"
  | "science"
  | "world"
  | "politics"
  | "environment"
  | "culture"
  | "sport"
  | "";

export type Vocabulary = {
  phrase: string;
  meaning: string;
  example_sentence: {
    en: string;
    ja: string;
  }
}