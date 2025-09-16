import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  Users,
  FileText,
} from "lucide-react";
import heroResumeImage from "@/assets/hero-resume.png";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(158, 160, 162, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(158, 160, 162, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ai-emerald rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-ai-teal rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Single Column Layout */}
          <div className="text-center space-y-12">
            {/* Header Content */}
            <div className="animate-slide-up">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-ai-emerald" />
                <span className="text-ai-emerald font-semibold">
                  AI-Powered Resume Builder
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Create Your
                <span className="block bg-gradient-to-br from-ai-emerald to-ai-teal bg-clip-text text-transparent  ">
                  Perfect Resume
                </span>
                in Minutes
              </h1>

              <p className="text-sm md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto ">
                Transform your career with our AI-powered resume generator.
                Create professional, ATS-optimized resumes that get you noticed
                by top employers and land your dream job.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <Link href={"/resumes"}>
                <Button
                  size="lg"
                  className="bg-gradient-to-br from-ai-emerald to-ai-teal text-white shadow-primary transition-smooth hover:shadow-glow group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 transition-smooth group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Hero Image */}
            <div
              className="relative animate-scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="relative z-10 max-w-2xl mx-auto">
                <Image
                  src={heroResumeImage}
                  alt="AI Resume Generator Interface"
                  className="w-full h-auto rounded-2xl shadow-card"
                />
              </div>
              {/* Floating elements */}
              <div
                className="absolute -top-4 -right-4 w-20 h-20 bg-ai-emerald rounded-xl opacity-20 animate-float"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-ai-teal rounded-full opacity-30 animate-float"
                style={{ animationDelay: "3s" }}
              ></div>
            </div>

            {/* Stats/Features */}
            <div
              className="grid md:grid-cols-3 gap-8 mt-16 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="glass-card p-6 rounded-xl text-center">
                <CheckCircle className="w-8 h-8 text-ai-emerald mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">98%</div>
                <div className="text-muted-foreground">ATS Pass Rate</div>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <Users className="w-8 h-8 text-ai-emerald mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">50K+</div>
                <div className="text-muted-foreground">Happy Users</div>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <FileText className="w-8 h-8 text-ai-emerald mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">100+</div>
                <div className="text-muted-foreground">Templates</div>
              </div>
            </div>

            {/* Trust indicators */}
            <div
              className="flex items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Instant Download</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
