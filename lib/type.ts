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

export type Category = "business" | "entertainment" | "general" | "health" | "science" | "sports" | "technology" | "";

export type Vocabulary = {
  phrase: string;
  meaning: string;
  example_sentence: {
    en: string;
    ja: string;
  }
}