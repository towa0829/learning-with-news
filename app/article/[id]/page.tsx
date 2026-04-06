import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>
}

type NewsArticle = {
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  content?: string;
};

const DetailPage = async ({ params }: Props) => {
  const { id } = await params;
  if (!id) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <p className="mt-4 text-muted-foreground">
          The article link is invalid or missing.
        </p>
        <Link href="/article" className="mt-6 inline-block text-blue-600">
          Back to articles
        </Link>
      </main>
    );
  }

  const decodedUrl = decodeURIComponent(id);
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&language=en&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  const article = data.articles.find((item: { url: string }) => item.url === decodedUrl) as NewsArticle | undefined;

  if (!article) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <p className="mt-4 text-muted-foreground">
          The article may no longer be available from the news source.
        </p>
        <Link href="/article" className="mt-6 inline-block text-blue-600">
          Back to articles
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-right text-sm text-muted-foreground">{article.publishedAt.slice(0, 10)}</p>
      <Image
        src={article.urlToImage}
        alt={article.title}
        width={1200}
        height={675}
        className="mt-3 h-auto w-full rounded-xl object-cover"
      />
      <h1 className="mt-3 text-3xl font-bold leading-tight">{article.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{article.description}</p>
      <Link href="/article" className="mt-8 inline-block text-blue-600">
        Back to articles
      </Link>
    </main>
  )
}

export default DetailPage
