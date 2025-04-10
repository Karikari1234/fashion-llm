import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="py-20 px-6 md:py-32 bg-gradient-to-br from-fashion-cream to-white">
      <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-fashion-burgundy text-sm uppercase tracking-wider font-medium mb-3 block">AI-Powered Fashion Assistant</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-fashion-navy leading-tight">
            Discover Your <span className="gradient-text fashion-border">Perfect Style</span> with AI
          </h1>
          <p className="text-lg text-neutral-700 mb-8 elegant-spacing">
            FashionAIKit is your personal fashion assistant powered by artificial intelligence. 
            Get personalized style recommendations, virtual try-on, and expert fashion advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 mt-8">
            <Link
              href="/signup"
              className="btn-fashion text-center"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="btn-secondary text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="bg-fashion-beige rounded-lg shadow-soft p-1 border border-fashion-gold/20">
          <div className="bg-white rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('/fashion-pattern.png')]"></div>
            <p className="text-fashion-burgundy relative font-serif italic">Fashion Image Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
