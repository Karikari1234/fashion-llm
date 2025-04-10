interface TestimonialCardProps {
  initials: string;
  name: string;
  title: string;
  quote: string;
}

function TestimonialCard({ initials, name, title, quote }: TestimonialCardProps) {
  return (
    <div className="card bg-fashion-cream">
      <div className="flex items-center mb-6">
        <div className="w-14 h-14 rounded-full bg-fashion-beige flex items-center justify-center mr-4">
          <span className="font-serif text-fashion-burgundy">{initials}</span>
        </div>
        <div>
          <h4 className="font-medium text-fashion-navy">{name}</h4>
          <p className="text-sm text-neutral-500">{title}</p>
        </div>
      </div>
      <p className="text-neutral-700 italic elegant-spacing">
        &quot;{quote}&quot;
      </p>
    </div>
  );
}

export default function TestimonialsSection() {
  const testimonials = [
    {
      initials: "SK",
      name: "Sarah K.",
      title: "Fashion Enthusiast",
      quote: "FashionAIKit transformed my style journey. The AI recommendations are spot-on, and the virtual try-on feature saved me from so many shopping mistakes!"
    },
    {
      initials: "JT",
      name: "James T.",
      title: "Business Professional",
      quote: "As someone who struggled with fashion choices, this app has been a game-changer. I now feel confident in my style decisions thanks to the personalized guidance."
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-fashion-burgundy text-sm uppercase tracking-wider font-medium mb-3 block">Why People Love Us</span>
          <h2 className="text-3xl font-serif font-bold mb-4">Client Stories</h2>
          <div className="h-0.5 w-20 bg-fashion-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              initials={testimonial.initials}
              name={testimonial.name}
              title={testimonial.title}
              quote={testimonial.quote}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
