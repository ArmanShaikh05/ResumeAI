import { Button } from "@/components/ui/button";
import { Bot, Mail, Twitter, Linkedin, Github } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Templates", href: "#templates" },
      { name: "AI Writing", href: "#ai" }
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Blog", href: "#blog" },
      { name: "Press", href: "#press" }
    ],
    resources: [
      { name: "Help Center", href: "#help" },
      { name: "Resume Tips", href: "#tips" },
      { name: "Career Advice", href: "#advice" },
      { name: "API Docs", href: "#api" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "GDPR", href: "#gdpr" }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: "#twitter", label: "Twitter" },
    { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
    { icon: Github, href: "#github", label: "GitHub" }
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-6">
        {/* CTA Section */}
        <div className="py-16 text-center border-b">
          <div className="max-w-3xl mx-auto animate-slide-up">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Career?
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of professionals who&apos;ve landed their dream jobs with our AI-powered resumes.
            </p>
            <Link href={"/resumes"}>
            <Button size="lg" className="bg-gradient-to-br from-ai-emerald to-ai-teal text-white shadow-primary transition-smooth hover:shadow-glow">
              Start Building Your Resume
            </Button>
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ResumeAI</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Create professional, AI-enhanced resumes that get you noticed by top employers. 
                Your dream job is just a resume away.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className="glass-card transition-smooth hover:shadow-card"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-muted-foreground hover:text-primary transition-smooth">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-muted-foreground hover:text-primary transition-smooth">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-muted-foreground hover:text-primary transition-smooth">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-muted-foreground hover:text-primary transition-smooth">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 ResumeAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#status" className="hover:text-primary transition-smooth">System Status</a>
            <a href="#support" className="hover:text-primary transition-smooth flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;