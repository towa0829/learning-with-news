import ArticleCardList from "@/components/parts/article/ArticleCardList";

const ArticleListPage = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-15">
      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Articles</h1>
      <p className="mb-8 text-base text-muted-foreground sm:text-lg">
        Browse English news articles and expand your vocabulary
      </p>
      <ArticleCardList />

    </main>
  )
}

export default ArticleListPage
