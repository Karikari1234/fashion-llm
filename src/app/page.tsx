import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-fashion-cream shadow-soft">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="font-serif font-bold text-xl text-fashion-burgundy">FashionAIKit</h1>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/login" 
              className="text-sm font-medium text-fashion-charcoal hover:text-primary-600 transition-colors tracking-wide"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="text-sm font-medium bg-fashion-burgundy text-white px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity tracking-wide"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
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

        {/* Features Section */}
        <section className="py-24 px-6 bg-fashion-beige/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-fashion-burgundy text-sm uppercase tracking-wider font-medium mb-3 block">Simple Process</span>
              <h2 className="text-3xl font-serif font-bold mb-4">How It Works</h2>
              <div className="h-0.5 w-20 bg-fashion-gold mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="card bg-white hover:shadow-strong transition-shadow duration-300">
                <div className="h-16 w-16 rounded-full bg-fashion-cream border border-fashion-gold/20 flex items-center justify-center mb-6 mx-auto">
                  <span className="text-fashion-burgundy font-serif font-bold text-2xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-fashion-navy">Create Your Style Profile</h3>
                <p className="text-neutral-600 text-center elegant-spacing">
                  Answer a few questions about your preferences and body type to create your personalized style profile.
                </p>
              </div>
              <div className="card bg-white hover:shadow-strong transition-shadow duration-300">
                <div className="h-16 w-16 rounded-full bg-fashion-cream border border-fashion-gold/20 flex items-center justify-center mb-6 mx-auto">
                  <span className="text-fashion-burgundy font-serif font-bold text-2xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-fashion-navy">Get AI Recommendations</h3>
                <p className="text-neutral-600 text-center elegant-spacing">
                  Our AI analyzes your profile and suggests outfits and styles perfectly suited to your unique needs.
                </p>
              </div>
              <div className="card bg-white hover:shadow-strong transition-shadow duration-300">
                <div className="h-16 w-16 rounded-full bg-fashion-cream border border-fashion-gold/20 flex items-center justify-center mb-6 mx-auto">
                  <span className="text-fashion-burgundy font-serif font-bold text-2xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-fashion-navy">Try On Virtually</h3>
                <p className="text-neutral-600 text-center elegant-spacing">
                  See how recommended outfits look on you with our virtual try-on technology before making decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-fashion-burgundy text-sm uppercase tracking-wider font-medium mb-3 block">Why People Love Us</span>
              <h2 className="text-3xl font-serif font-bold mb-4">Client Stories</h2>
              <div className="h-0.5 w-20 bg-fashion-gold mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="card bg-fashion-cream">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-fashion-beige flex items-center justify-center mr-4">
                    <span className="font-serif text-fashion-burgundy">SK</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-fashion-navy">Sarah K.</h4>
                    <p className="text-sm text-neutral-500">Fashion Enthusiast</p>
                  </div>
                </div>
                <p className="text-neutral-700 italic elegant-spacing">
                  "FashionAIKit transformed my style journey. The AI recommendations are spot-on, and the virtual try-on feature saved me from so many shopping mistakes!"
                </p>
              </div>

              <div className="card bg-fashion-cream">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-fashion-beige flex items-center justify-center mr-4">
                    <span className="font-serif text-fashion-burgundy">JT</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-fashion-navy">James T.</h4>
                    <p className="text-sm text-neutral-500">Business Professional</p>
                  </div>
                </div>
                <p className="text-neutral-700 italic elegant-spacing">
                  "As someone who struggled with fashion choices, this app has been a game-changer. I now feel confident in my style decisions thanks to the personalized guidance."
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-fashion-navy text-white py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-lg font-serif font-bold mb-5">FashionAIKit</h3>
              <p className="text-neutral-300 elegant-spacing">
                Your AI-powered fashion assistant for personalized style recommendations.
              </p>
            </div>
            <div>
              <h4 className="text-md font-bold mb-5 text-fashion-cream">Features</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-300 hover:text-fashion-gold transition-colors">Style Analysis</a></li>
                <li><a href="#" className="text-neutral-300 hover:text-fashion-gold transition-colors">AI Recommendations</a></li>
                <li><a href="#" className="text-neutral-300 hover:text-fashion-gold transition-colors">Virtual Try-On</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-bold mb-5 text-fashion-cream">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-300 hover:text-fashion-gold transition-colors">About Us</a></li>
                <li><a href="#" className="text-neutral-300 hover:text-fashion-gold transition-colors">Careers</a></li>
                <li><a href="#" className="text-neutral-300 hover:text-fashion-gold transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-bold mb-5 text-fashion-cream">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-300 hover:text-fashion-gold transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-neutral-300 hover:text-fashion-gold transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-fashion-navy/40 mt-10 pt-8 text-center text-neutral-400">
            <p>&copy; {new Date().getFullYear()} FashionAIKit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
