import ArticleCardList from "@/components/parts/article/ArticleCardList";

const ArticleListPage = () => {
  return (
    <main className="py-15 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Articles</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Browse English news articles and expand your vocabulary
      </p>
      <ArticleCardList />

    </main>
  )
}

export default ArticleListPage
