import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Bot, Download } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: Upload,
      title: "Upload Your Info",
      description:
        "Simply enter your work experience, education, and skills. Our AI will analyze your background.",
    },
    {
      step: "02",
      icon: Bot,
      title: "AI Enhancement",
      description:
        "Our advanced AI transforms your information into compelling, professional content that stands out.",
    },
    {
      step: "03",
      icon: Download,
      title: "Download & Apply",
      description:
        "Get your polished, ATS-optimized resume in minutes. Ready to impress employers instantly.",
    },
  ];

  return (
    <section
      className="py-24 bg-gradient-to-br from-ai-emerald/10 to-ai-teal/10 bg-opac"
      id="how-it-works"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create your professional resume in just three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Card className="glass-card border-0 transition-smooth hover:shadow-card relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 gradient-secondary opacity-10 rounded-bl-full"></div>

                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-primary">
                      <Icon className="w-8 h-8  text-ai-teal" />
                    </div>
                    <div className="text-6xl font-bold text-ai-emerald/20 mb-2">
                      {step.step}
                    </div>
                    <CardTitle className="text-2xl font-semibold">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
