"use client";

import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { CreditCard, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "../ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-card shadow-card backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
            src={logo}
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full"
          />
            <span className="text-xl font-bold">ResumeAI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 ">
            <button
              onClick={() => scrollToSection("features")}
              className={"text-muted-foreground hover:text-foreground transition-smooth cursor-pointer"}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-muted-foreground hover:text-foreground transition-smooth cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-muted-foreground hover:text-foreground transition-smooth cursor-pointer"
            >
              Pricing
            </button>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <ThemeToggle />

            <SignedOut>
              {/* Login button - desktop */}
              <Link href={"/sign-in"}>
                <Button
                  variant="outline"
                  className="hidden md:flex glass-card border-primary/20 hover:bg-primary/10"
                >
                  Login
                </Button>
              </Link>

              {/* Get Started button - desktop */}
              <Link href={"/sign-up"}>
                <Button className="hidden md:flex bg-gradient-to-br from-ai-emerald to-ai-teal text-white shadow-primary transition-smooth hover:shadow-glow">
                  Get Started
                </Button>
              </Link>
            </SignedOut>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>

            <SignedIn>
              <div className="items-center gap-4 flex ">
                <Link href={"/resumes"}>
                  <Button className="bg-gradient-to-br from-ai-emerald to-ai-teal text-white shadow-primary transition-smooth hover:shadow-glow hidden md:flex">
                    All Resumes
                  </Button>
                </Link>

                <UserButton
                  appearance={{
                    baseTheme: theme === "dark" ? dark : undefined,
                    elements: {
                      avatarBox: {
                        width: 35,
                        height: 35,
                      },
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="Billing"
                      labelIcon={<CreditCard className="size-4" />}
                      href="/billing"
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            </SignedIn>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-slide-up glass-card shadow-card backdrop-blur-md border-b">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-muted-foreground hover:text-foreground transition-smooth py-2 text-left cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-muted-foreground hover:text-foreground transition-smooth py-2 text-left cursor-pointer"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-muted-foreground hover:text-foreground transition-smooth py-2 text-left cursor-pointer"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-muted-foreground hover:text-foreground transition-smooth py-2 text-left cursor-pointer"
              >
                FAQ
              </button>
              <SignedOut>
                <div className="flex gap-2 pt-4">
                  <Link href={"/sign-in"} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full glass-card border-primary/20"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href={"/sign-up"} className="flex-1">
                    <Button className="w-full bg-gradient-to-br from-ai-emerald to-ai-teal text-white shadow-primary">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </SignedOut>

              <SignedIn>
                <Link href={"/resumes"} className="flex-1">
                  <Button className="w-full bg-gradient-to-br from-ai-emerald to-ai-teal text-white shadow-primary transition-smooth hover:shadow-glow">
                    All Resumes
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
