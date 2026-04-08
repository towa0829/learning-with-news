'use client';
import ArticleCardList from "@/components/parts/article/ArticleCardList";
import { FaHistory } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Category } from "@/lib/type";
import { useState } from "react";
import { Input } from "@/components/ui/input"

const CategoryList: Category[] = ["general", "business", "entertainment", "health", "science", "sports", "technology"];

const ArticleListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("general");
  const [keyword, setKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");

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
      <form
        className="mb-6 flex flex-col gap-2 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          setKeyword(inputValue.trim());
          setSelectedCategory("");
        }}
      >
        <Input
          type="search"
          placeholder="Search articles..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="sm:flex-1"
        />
        <Button type="submit">Search</Button>
      </form>

      <div className="mb-3 flex flex-wrap items-center gap-1">
        {CategoryList.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="mr-2 mb-2"
            onClick={() => {
              setSelectedCategory(category);
              setKeyword("");
              setInputValue("");
            }}
          >
            {category}
          </Button>
        ))}
      </div>
      <ArticleCardList
        category={selectedCategory}
        keyword={keyword}
      />

    </main>
  )
}

export default ArticleListPage
