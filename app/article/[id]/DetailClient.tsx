"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Article } from "@/lib/type";
import { LuSparkles } from "react-icons/lu";
import { MdGTranslate } from "react-icons/md";
import { MdOutlineExitToApp } from "react-icons/md";
import Keyword from "@/components/parts/article/KeyWord";
import { ShimmeringText } from "@/components/unlumen-ui/shimmering-text";
import { supabase } from "@/lib/supabase/client";


type Props = {
  params: { id: string };
};

const DetailClient = ({ params }: Props) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!params?.id) return;


    let isMounted = true;
    async function loadArticle() {
      try {
        setIsLoading(true);

        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id;

        const cacheRes = await fetch(`/api/article/cache/${params.id}`);
        if (cacheRes.ok) {
          const data = await cacheRes.json();
          setAnalysis({
            summarizedBodyTextHTML:
              data.summarized_body_text_html,

            translatedTitle:
              data.translated_title,

            translatedDescription:
              data.translated_description,

            translatedBodyText:
              data.translated_body_text,
          });

          setArticle({
            id: data.id,
            title: data.title,
            description: data.description,
            url: data.url,
            urlToImage: data.image_url,
            publishedAt: data.published_at,
            author: data.author,
            source: {
              name: data.source,
            },
          });

          if (user?.id) {
            await supabase.from("view_history").insert({
              user_id: user.id,
              article_id: data.id,
            });
          }

          setIsLoading(false);
          return;
        }

        const res = await fetch(
          `/api/article/detail/${params.id}`,
        );

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();

        if (!isMounted) return;

        setArticle(data);
        setIsLoading(false);

        const analysisRes = await fetch("/api/article/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            bodyText: data.bodyText,
          }),
        });

        const analysisData = await analysisRes.json();

        if (!isMounted) return;

        setAnalysis(analysisData);

        await fetch("/api/article/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            article: data,
            analysis: analysisData,
          }),
        });

        if (userId) {
          await supabase.from("view_history").insert({
            user_id: userId,
            article_id: data.id,
          });
        }
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    }

    loadArticle();

    return () => {
      isMounted = false;
    };
  }, [params?.id]);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-2xl font-bold sm:text-3xl">Loading...</h1>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-2xl font-bold sm:text-3xl">Article not found</h1>
        <p className="mt-4 text-muted-foreground">
          The article is not saved in local storage yet.
        </p>
        <Link href="/article" className="mt-6 inline-block text-blue-600">
          Back to articles
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/article" className="text-blue-600 hover:underline">
        &larr; Back to articles
      </Link>
      <p className="mt-4 text-sm text-muted-foreground">
        {article.publishedAt.slice(0, 10)}
      </p>
      <p className="mb-4 text-sm text-muted-foreground">
        {article.author} from {article.source.name}
      </p>
      <img
        src={article.urlToImage || "/no-image.png"}
        alt={article.title}
        className="relative z-20 aspect-video w-full object-cover"
      />
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm sm:gap-4">
        <Button className="bg-black text-white hover:bg-gray-800">
          <Link href={article.url} target="_blank" rel="noopener noreferrer" className="text-white flex items-center gap-1">
            View Original<MdOutlineExitToApp className="w-7 h-7 mt-0.5" />
          </Link>
        </Button>
      </div>
      <h1 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">{article.title}</h1>
      <p className="mt-4 text-base text-muted-foreground sm:text-lg">{article.description}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm sm:gap-4">
        {!analysis && (
          <ShimmeringText text="Agent is analyzing..." duration={1.5} repeat={true} className="text-base" />
        )}
        {analysis && (
          <div
            className="prose prose-sm max-w-none prose-strong:text-blue-600 prose-strong:font-bold sm:prose-base"
            dangerouslySetInnerHTML={{
              __html: analysis.summarizedBodyTextHTML,
            }}
          />
        )}
        {analysis?.keywords?.length > 0 && (
          <p className="flex items-center gap-1 rounded-2xl bg-green-100 px-2 py-1 text-green-600"><LuSparkles />{analysis.keywords.length} difficult words found</p>
        )}
        {analysis && (
          <Button onClick={() => setIsOpen((prev) => !prev)} className="bg-blue-600 text-white hover:bg-blue-700">
            <MdGTranslate />
            {isOpen ? "Hide" : "Show"} Translation
          </Button>
        )}
      </div>
      {analysis && isOpen && (
        <div>

          <div className="mt-8 rounded-3xl border border-gray-300 bg-white p-4 text-sm sm:text-base">

            <h2 className="mb-2 text-lg font-semibold sm:text-xl">Japanese Translation</h2>
            <p className="text-muted-foreground">{analysis.translatedTitle}</p>
            <p className="text-muted-foreground">{analysis.translatedDescription}</p>
            <p className="text-muted-foreground">{analysis.translatedBodyText}</p>
            <div className="mt-4 list-disc list-inside">
              <h2 className="mb-2 text-lg font-semibold sm:text-xl">Keywords</h2>
              {analysis.keywords?.map((item: any, idx: number) => (
                <Keyword key={idx} item={item} />
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500 text-right">Translated with AI assistance</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default DetailClient;