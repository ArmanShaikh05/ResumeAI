"use client";

import { createCheckoutSession } from "@/actions/stripeActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { env } from "@/env";
import { useUser } from "@clerk/nextjs";
import { Check, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      label: "basic",
      price: "Free",
      period: "Forever",
      description: "Perfect for getting started",
      features: [
        "1 resume template",
        "Basic AI suggestions",
        "PDF download",
        "Email support",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Pro",
      label: "pro",
      price: "$9.99",
      period: "/month",
      description: "Most popular for job seekers",
      features: [
        "Unlimited resume templates",
        "Advanced AI writing",
        "ATS optimization",
        "Multiple formats (PDF, Word)",
        "Cover letter generator",
        "Priority support",
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Pro Plus",
      label: "pro_plus",
      price: "$19.99",
      period: "/month",
      description: "For teams and career services",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Custom branding",
        "Analytics dashboard",
        "API access",
        "Dedicated support",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false,
    },
  ];

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleClick = async (planName: string) => {
    if (!user?.id) {
      router.push("/sign-in");
    }

    try {
      setLoading(true);

      if (planName === "pro") {
        const redirectUrl = await createCheckoutSession(
          env.NEXT_PUBLIC_PRO_PRICE_ID
        );
        window.location.href = redirectUrl;
      } else if (planName === "pro_plus") {
        const redirectUrl = await createCheckoutSession(
          env.NEXT_PUBLIC_PRO_PLUS_PRICE_ID
        );
        window.location.href = redirectUrl;
      } else {
        router.push("/resumes");
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong", {
        description: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-background" id="pricing">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include our core AI
            features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative transition-smooth hover:scale-105 animate-scale-in duration-200 py-4 ${
                plan.popular
                  ? "glass-card border-ai-emerald shadow-primary pt-6"
                  : "glass-card border-0 hover:shadow-card"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-br from-ai-emerald to-ai-teal px-4 py-2 rounded-full text-white text-sm font-semibold flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-semibold mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">
                    {plan.period}
                  </span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6 grow flex flex-col">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={loading}
                  onClick={() => handleClick(plan.label)}
                  className={`w-full transition-smooth ${
                    plan.popular
                      ? "bg-gradient-to-br from-ai-emerald to-ai-teal text-white shadow-primary hover:shadow-glow"
                      : ""
                  }`}
                  variant={plan.buttonVariant}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div
          className="text-center mt-12 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <p className="text-muted-foreground mb-4">
            All plans include a 7-day free trial. No credit card required.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              30-day money back guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
