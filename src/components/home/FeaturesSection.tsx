interface FeatureCardProps {
  number: number;
  title: string;
  description: string;
}

function FeatureCard({ number, title, description }: FeatureCardProps) {
  return (
    <div className="card bg-white hover:shadow-strong transition-shadow duration-300">
      <div className="h-16 w-16 rounded-full bg-fashion-cream border border-fashion-gold/20 flex items-center justify-center mb-6 mx-auto">
        <span className="text-fashion-burgundy font-serif font-bold text-2xl">{number}</span>
      </div>
      <h3 className="text-xl font-semibold mb-4 text-center text-fashion-navy">{title}</h3>
      <p className="text-neutral-600 text-center elegant-spacing">
        {description}
      </p>
    </div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      number: 1,
      title: "Create Your Style Profile",
      description: "Answer a few questions about your preferences and body type to create your personalized style profile."
    },
    {
      number: 2,
      title: "Get AI Recommendations",
      description: "Our AI analyzes your profile and suggests outfits and styles perfectly suited to your unique needs."
    },
    {
      number: 3,
      title: "Try On Virtually",
      description: "See how recommended outfits look on you with our virtual try-on technology before making decisions."
    }
  ];

  return (
    <section className="py-24 px-6 bg-fashion-beige/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-fashion-burgundy text-sm uppercase tracking-wider font-medium mb-3 block">Simple Process</span>
          <h2 className="text-3xl font-serif font-bold mb-4">How It Works</h2>
          <div className="h-0.5 w-20 bg-fashion-gold mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              number={feature.number}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
