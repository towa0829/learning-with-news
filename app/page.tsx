import type { Metadata } from "next";
import { HeroSection, FeaturedSection, CTASection } from '@/components/section/home';

export const metadata: Metadata = {
  title: "ホーム",
  description: "最新ニュースを使って英語を学べるNewsLingoのトップページ。幅広い分野の記事に触れながら、語彙力と読解力を伸ばせます。",
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <FeaturedSection />
        <CTASection />
      </main>
    </div>
  );
}
