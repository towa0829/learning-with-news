import { HeroSection, FeaturedSection, CTASection } from '@/components/section/home';

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
