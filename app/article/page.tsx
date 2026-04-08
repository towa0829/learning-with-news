'use client';
import ArticleCardList from "@/components/parts/article/ArticleCardList";
import { FaHistory } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Category } from "@/lib/type";
import { useState } from "react";

const CategoryList: Category[] = ["general", "business", "entertainment", "health", "science", "sports", "technology"];


const ArticleListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("general");
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
      <p className="mb-6 text-base text-muted-foreground sm:text-lg">
        Browse English news articles and expand your vocabulary
      </p>
      <div className="mb-3 flex flex-wrap items-center gap-1">
        {CategoryList.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="mr-2 mb-2"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <ArticleCardList 
        category={selectedCategory}
      />

    </main>
  )
}

export default ArticleListPage
