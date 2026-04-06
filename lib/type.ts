export type Article = {
  id: string;
  source: {
    name: string;
  }
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}