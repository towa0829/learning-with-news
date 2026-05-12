'use client';

import { useEffect, useState } from "react";
import { Vocabulary } from "@/lib/type";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Quote, Languages } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

type SavedVocabularyRow = Vocabulary & {
  id: string;
  article_id: string | null;
  created_at: string;
  updated_at: string;
};

const VocabularyListClient = () => {
  const [vocabulary, setVocabulary] = useState<SavedVocabularyRow[]>([]);

  useEffect(() => {
    async function loadVocabulary() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setVocabulary([]);
        return;
      }

      const legacySavedVocabulary = localStorage.getItem("savedVocabulary");
      if (legacySavedVocabulary) {
        try {
          const parsedLegacyVocabulary = JSON.parse(legacySavedVocabulary) as Vocabulary[];

          await Promise.all(
            parsedLegacyVocabulary.map((word) =>
              fetch("/api/vocabulary", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({
                  phrase: word.phrase,
                  meaning: word.meaning,
                  example_sentence: word.example_sentence,
                }),
              }),
            ),
          );

          localStorage.removeItem("savedVocabulary");
        } catch (error) {
          console.error("Failed to migrate savedVocabulary", error);
        }
      }

      const response = await fetch("/api/vocabulary", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Failed to load vocabulary", response.status, text);
        setVocabulary([]);
        return;
      }

      const json = await response.json();
      setVocabulary((json.vocabulary ?? []) as SavedVocabularyRow[]);
    }
    loadVocabulary();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vocabulary?");
    if (!confirmDelete) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      console.error("No active session found for deleting vocabulary");
      return;
    }

    const response = await fetch("/api/vocabulary", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Failed to delete vocabulary", response.status, text);
      return;
    }

    setVocabulary((current) => current.filter((word) => word.id !== id));
  };

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
            <BookOpen className="size-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Vocabulary List
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Your saved words and phrases are here.
          </p>
          {vocabulary.length > 0 && (
            <Badge variant="secondary" className="mt-4">
              {vocabulary.length} {vocabulary.length === 1 ? 'word' : 'words'} saved
            </Badge>
          )}
        </div>

        {vocabulary.length === 0 ? (
          <div className="rounded-lg bg-muted/50 p-6 text-center">
            <p className="text-lg text-muted-foreground">No vocabulary saved yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {vocabulary.map((word, index) => (
              <Card key={word.id} className="group transition-all duration-200 hover:shadow-md hover:border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-xl font-bold text-foreground">
                      {word.phrase}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(word.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        #{index + 1}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-base font-medium text-primary/80">
                    {word.meaning}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <Quote className="size-3" />
                      Example
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">
                      {word.example_sentence?.en}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Languages className="mt-0.5 size-4 shrink-0" />
                    <p className="leading-relaxed">{word.example_sentence?.ja}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default VocabularyListClient;