import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Vocabulary } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

type Props = {
  item: Vocabulary;
  articleId?: string;
}

const KeyWord = ({ item, articleId }: Props) => {
  const saveVocabulary = async (word: Vocabulary) => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.access_token) {
      console.error("No active session found for saving vocabulary");
      return;
    }

    const response = await fetch("/api/vocabulary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        articleId,
        phrase: word.phrase,
        meaning: word.meaning,
        example_sentence: word.example_sentence,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Failed to save vocabulary", response.status, text);
    }
  };
  return (
    <Drawer>
      <DrawerTrigger>
        <span className="mr-3 mb-2 inline-block whitespace-nowrap text-black leading-relaxed cursor-pointer bg-white shadow-sm px-2 py-1 rounded-xl border hover:bg-gray-50 hover:border-gray-300">
          {item.phrase}<span className="text-muted-foreground"> : {item.meaning}</span>
        </span>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs font-normal">
                Vocabulary
              </Badge>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </DrawerClose>
            </div>
            <DrawerTitle className="mt-4 flex items-center gap-3 text-2xl">
              {item.phrase}
            </DrawerTitle>
            <p className="mt-1 text-lg text-muted-foreground text-left">{item.meaning}</p>
          </DrawerHeader>

          {item.example_sentence && (
            <div className="px-4 py-4 mb-4">
              <div className="rounded-xl bg-muted/50 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Example
                </p>
                <p className="mt-2 text-base leading-relaxed text-foreground">
                  {item.example_sentence.en}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.example_sentence.ja}
                </p>
              </div>
            </div>
          )}

          <DrawerFooter className="flex-row gap-3 pt-2">
            <DrawerClose asChild>
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button onClick={() => saveVocabulary(item)} className="flex-1 gap-2">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default KeyWord
