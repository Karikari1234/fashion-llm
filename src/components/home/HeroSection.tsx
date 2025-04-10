import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-fashion-cream to-white px-6 py-20 md:py-32">
      <div className="container mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <div>
          <span className="mb-3 block text-sm font-medium uppercase tracking-wider text-fashion-burgundy">
            AI-Powered Fashion Assistant
          </span>
          <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-fashion-navy md:text-5xl">
            Discover Your <span className="gradient-text fashion-border">Perfect Style</span> with
            AI
          </h1>
          <p className="elegant-spacing mb-8 text-lg text-neutral-700">
            FashionAIKit is your personal fashion assistant powered by artificial intelligence. Get
            personalized style recommendations, virtual try-on, and expert fashion advice.
          </p>
          <div className="mt-8 flex flex-col gap-5 sm:flex-row">
            <Link href="/signup" className="btn-fashion text-center">
              Get Started
            </Link>
            <Link href="/about" className="btn-secondary text-center">
              Learn More
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-fashion-gold/20 bg-fashion-beige p-1 shadow-soft">
          <div className="relative flex h-96 items-center justify-center overflow-hidden rounded-lg bg-white">
            <div className="absolute inset-0 bg-[url('/fashion-pattern.png')] opacity-10"></div>
            <Image
              src="/images/landing_page.jpg"
              alt="Fashion Stylist"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
