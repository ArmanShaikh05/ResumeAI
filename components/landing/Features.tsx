import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Zap, Target, Shield, Users, Download } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Writing",
      description:
        "Our advanced AI analyzes your experience and crafts compelling bullet points that highlight your achievements.",
    },
    {
      icon: Zap,
      title: "ATS Optimization",
      description:
        "Ensure your resume passes Applicant Tracking Systems with our smart formatting and keyword optimization.",
    },
    {
      icon: Target,
      title: "Industry-Specific",
      description:
        "Tailored templates and suggestions for your specific industry to maximize your job search success.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "Your data is encrypted and secure. We never share your information with third parties.",
    },
    {
      icon: Users,
      title: "Expert Reviewed",
      description:
        "Templates and suggestions reviewed by HR professionals and career experts.",
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description:
        "Download your resume in PDF, Word, or other formats preferred by employers.",
    },
  ];

  return (
    <section className="py-24 bg-background" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Powerful Features for
            <span className="block gradient-primary bg-clip-text text-transparent">
              Career Success
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to create a standout resume that gets you hired
            faster
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="glass-card  transition-smooth hover:shadow-card hover:scale-105 animate-scale-in duration-200 hover:border hover:border-ai-emerald"
              >
                <CardHeader>
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
