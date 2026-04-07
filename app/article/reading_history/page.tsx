import ReadingHistoryList from "@/components/parts/article/ReadingHistoryList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ReadingHistoryPage = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-15">
      <div className="flex items-center justify-between">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Reading History</h1>
        <Button>
          <Link href="/article">Back to Articles</Link>
        </Button>
      </div>
      <p className="mb-8 text-base text-muted-foreground sm:text-lg">
        Browse your reading history and expand your vocabulary
      </p>
      <ReadingHistoryList />

    </main>
  )
}

export default ReadingHistoryPage
