import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-white shadow-soft">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-bold text-xl text-fashion-burgundy">FashionAIKit</h1>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="text-sm font-medium bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="py-16 px-4 md:py-24">
          <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Discover Your Perfect Style with AI
              </h1>
              <p className="text-lg text-neutral-700 mb-8">
                FashionAIKit is your personal fashion assistant powered by artificial intelligence. 
                Get personalized style recommendations, virtual try-on, and expert fashion advice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="btn-primary text-center"
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
            <div className="bg-neutral-100 rounded-lg h-80 flex items-center justify-center">
              <p className="text-neutral-500">Fashion Image Placeholder</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-neutral-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-6 mx-auto">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Create Your Style Profile</h3>
                <p className="text-neutral-600 text-center">
                  Answer a few questions about your preferences and body type to create your personalized style profile.
                </p>
              </div>
              <div className="card">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-6 mx-auto">
                  <span className="text-primary-600 font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Get AI Recommendations</h3>
                <p className="text-neutral-600 text-center">
                  Our AI analyzes your profile and suggests outfits and styles perfectly suited to your unique needs.
                </p>
              </div>
              <div className="card">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-6 mx-auto">
                  <span className="text-primary-600 font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Try On Virtually</h3>
                <p className="text-neutral-600 text-center">
                  See how recommended outfits look on you with our virtual try-on technology before making decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">FashionAIKit</h3>
              <p className="text-neutral-400">
                Your AI-powered fashion assistant for personalized style recommendations.
              </p>
            </div>
            <div>
              <h4 className="text-md font-bold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Style Analysis</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">AI Recommendations</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Virtual Try-On</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
            <p>&copy; {new Date().getFullYear()} FashionAIKit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
