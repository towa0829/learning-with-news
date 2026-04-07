import ArticleCardList from "@/components/parts/article/ArticleCardList";
import { FaHistory } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ArticleListPage = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-15">
      <div className="flex items-center justify-between">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Articles</h1>
        <Button variant="outline" asChild>
          <Link href="/article/reading_history">
            <FaHistory /><span className="text-base">History</span>
          </Link>
        </Button>
      </div>
      <p className="mb-8 text-base text-muted-foreground sm:text-lg">
        Browse English news articles and expand your vocabulary
      </p>
      <ArticleCardList />

    </main>
  )
}

export default ArticleListPage
