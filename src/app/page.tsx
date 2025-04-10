import { 
  HomeHeader, 
  HeroSection, 
  FeaturesSection, 
  TestimonialsSection, 
  Footer 
} from '@/components/home';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HomeHeader />
      
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
}
