import { Article } from "@/lib/type";
import Link from "next/link";
import Image from "next/image";

type ArticleCardProps = {
  article: Article;
  priority?: boolean;
}
const ArticleCard = ({ article, priority = false }: ArticleCardProps) => {
  return (
    <div className="p-20">
      <Image
        src={article.urlToImage}
        alt={article.title}
        width={300}
        height={200}
        style={{ width: "100%", height: "auto" }}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
      />
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <Link href={article.url} target="_blank" className="text-blue-500">
        Read more
      </Link>
    </div>
  )
}

export default ArticleCard
