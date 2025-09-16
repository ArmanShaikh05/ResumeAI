import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does the AI resume generator work?",
      answer: "Our AI analyzes your work experience, skills, and industry to create personalized, professional content. It optimizes your resume for ATS systems and suggests improvements based on current hiring trends."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We use enterprise-grade encryption to protect your data. Your information is never shared with third parties, and you can delete your account and data at any time."
    },
    {
      question: "Can I customize the resume templates?",
      answer: "Yes! Our templates are fully customizable. You can adjust colors, fonts, layouts, and sections to match your personal style and industry preferences."
    },
    {
      question: "What makes this ATS-friendly?",
      answer: "Our resumes are optimized for Applicant Tracking Systems with proper formatting, relevant keywords, and structured sections that ATS software can easily parse and understand."
    },
    {
      question: "Do you offer cover letter generation?",
      answer: "Yes, our Pro and Enterprise plans include an AI-powered cover letter generator that creates personalized cover letters tailored to specific job applications."
    },
    {
      question: "Can I download my resume in different formats?",
      answer: "You can download your resume as a PDF with our free plan. Pro and Enterprise users can also export to Word format and other professional formats."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! We offer a 7-day free trial for all paid plans. You can also use our Basic plan forever at no cost with limited features."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your account settings. There are no cancellation fees, and you'll retain access until the end of your current billing period."
    }
  ];

  return (
    <section className="py-24 gradient-hero">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our AI resume generator
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass-card border-0 rounded-xl px-6 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;