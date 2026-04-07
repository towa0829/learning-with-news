"use client";

import { Article } from "@/lib/type";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type ArticleCardProps = {
  article: Article;
  priority?: boolean;
}
const ArticleCard = ({ article }: ArticleCardProps) => {
  const handleClick = () => {
    const savedArticles = localStorage.getItem("savedArticles");
    const parsedArticles = savedArticles ? (JSON.parse(savedArticles) as Article[]) : [];
    const nextArticles = parsedArticles.filter((savedArticle) => savedArticle.id !== article.id);
    
    if (nextArticles.length >= 30) {
      nextArticles.shift();
    }

    nextArticles.push(article);
    localStorage.setItem("savedArticles", JSON.stringify(nextArticles));
  };

  return (
    <Card className="mx-auto w-full max-w-md pt-0 md:max-w-none">
      <img
        src={article.urlToImage}
        alt={article.title}
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader>
        <p className="text-sm text-muted-foreground">{article.publishedAt.slice(0, 10)}</p>
        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {article.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full bg-blue-600" asChild>
          <Link
            href={`/article/${article.id}`}
            onClick={handleClick}
            className="text-blue-500"
          >
            Read more
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ArticleCard
