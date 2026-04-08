'use client';

import { useEffect, useState } from "react";
import { Vocabulary } from "@/lib/type";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Quote, Languages } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const VocabularyListClient = () => {
  const [vocabulary, setVocabulary] = useState<Vocabulary[]>([]);

  useEffect(() => {
    async function loadVocabulary() {
      const savedVocabulary = localStorage.getItem("savedVocabulary");
      const parsedVocabulary = savedVocabulary ? (JSON.parse(savedVocabulary) as Vocabulary[]) : [];
      setVocabulary(parsedVocabulary.reverse());
    }
    loadVocabulary();
  }, []);

  const handleDelete = (index: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vocabulary?");
    if (!confirmDelete) return;
    const updatedVocabulary = [...vocabulary];
    updatedVocabulary.splice(index, 1);
    setVocabulary(updatedVocabulary);
    localStorage.setItem("savedVocabulary", JSON.stringify(updatedVocabulary));
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
              <Card key={index} className="group transition-all duration-200 hover:shadow-md hover:border-primary/20">
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
                        onClick={() => handleDelete(index)}
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
                      {word.example_sentence.en}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Languages className="mt-0.5 size-4 shrink-0" />
                    <p className="leading-relaxed">{word.example_sentence.ja}</p>
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