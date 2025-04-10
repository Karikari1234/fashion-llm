interface FooterColumnProps {
  title: string;
  links: Array<{
    text: string;
    href: string;
  }>;
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h4 className="text-md font-bold mb-5 text-fashion-cream">{title}</h4>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href} className="text-neutral-300 hover:text-fashion-gold transition-colors">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerColumns = [
    {
      title: "Features",
      links: [
        { text: "Style Analysis", href: "#" },
        { text: "AI Recommendations", href: "#" },
        { text: "Virtual Try-On", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { text: "About Us", href: "#" },
        { text: "Careers", href: "#" },
        { text: "Contact", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { text: "Privacy Policy", href: "#" },
        { text: "Terms of Service", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-fashion-navy text-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-lg font-serif font-bold mb-5">FashionAIKit</h3>
            <p className="text-neutral-300 elegant-spacing">
              Your AI-powered fashion assistant for personalized style recommendations.
            </p>
          </div>
          
          {footerColumns.map((column, index) => (
            <FooterColumn 
              key={index}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>
        <div className="border-t border-fashion-navy/40 mt-10 pt-8 text-center text-neutral-400">
          <p>&copy; {currentYear} FashionAIKit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
