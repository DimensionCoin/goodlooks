"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, LogOutIcon, Menu, UserIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignOutButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isLoaded, user } = useUser();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#services", label: "Services" },
    { href: "/#gallery", label: "Gallery" },
    { href: "/#about-us", label: "About Us" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/quote", label: "Get a Quote" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  const handleLinkClick = () => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  // Prevent flicker before auth loads
  if (!isLoaded) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md border-border"
          : "bg-transparent shadow-none border-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={handleLinkClick}
          >
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">
              GoodLooks Landscaping
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "font-medium transition-colors hover:text-primary",
                  isActive(link.href)
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center space-x-3">
                <span className="text-foreground">
                  Welcome, {user?.firstName}
                </span>
                <SignOutButton>
                  <Button variant="ghost" size="icon">
                    <LogOutIcon className="h-5 w-5" />
                  </Button>
                </SignOutButton>
              </div>
            </SignedIn>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md shadow-lg absolute top-20 left-0 right-0 z-40 border-t border-border">
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 hover:text-primary",
                  isActive(link.href)
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground"
                )}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-border space-y-2">
            <SignedOut>
              <Button asChild variant="outline" className="w-full">
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <SignOutButton>
                <Button asChild variant="ghost" className="w-full text-red-500">
                  <span>Sign out</span>
                </Button>
              </SignOutButton>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
}
