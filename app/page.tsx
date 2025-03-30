'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Link from "next/link";
import { BookOpen, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookCard from "../src/components/book-card";
import FeaturedBooks from "../src/components/featured-books";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">BookHaven</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/books" className="text-sm font-medium hover:text-primary transition-colors">
              Books
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="hidden sm:block">
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </Link>
            <Link href="/login" className="hidden sm:block">
              <Button>Sign In</Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t animate-in fade-in">
            <nav className="container flex flex-col gap-1 py-2 px-4">
              <Link 
                href="/" 
                className="px-3 py-2 text-sm font-medium hover:bg-accent rounded-md"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                href="/books" 
                className="px-3 py-2 text-sm font-medium hover:bg-accent rounded-md"
                onClick={toggleMenu}
              >
                Books
              </Link>
              <Link 
                href="/categories" 
                className="px-3 py-2 text-sm font-medium hover:bg-accent rounded-md"
                onClick={toggleMenu}
              >
                Categories
              </Link>
              <Link 
                href="/about" 
                className="px-3 py-2 text-sm font-medium hover:bg-accent rounded-md"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link 
                href="/cart" 
                className="px-3 py-2 text-sm font-medium hover:bg-accent rounded-md sm:hidden"
                onClick={toggleMenu}
              >
                Cart
              </Link>
              <Link 
                href="/login" 
                className="px-3 py-2 text-sm font-medium hover:bg-accent rounded-md sm:hidden"
                onClick={toggleMenu}
              >
                Sign In
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4 text-center lg:text-left">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Discover Your Next Favorite Book
                </h1>
                <p className="text-muted-foreground md:text-lg">
                  Explore our vast collection of bestsellers, new releases, and timeless classics.
                </p>
                <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center lg:justify-start">
                  <Link href="/books" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full">
                      Browse Books
                    </Button>
                  </Link>
                  <Link href="/categories" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full">
                      View Categories
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center order-first lg:order-last">
                <img
                  src="/placeholder.svg"
                  alt="Book collection illustration"
                  className="rounded-lg object-cover w-full max-w-md"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Books */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Books</h2>
            <FeaturedBooks />
          </div>
        </section>

        {/* New Releases */}
        <section className="py-12 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-6">New Releases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <BookCard
                  key={i}
                  id={i}
                  title={`Book Title ${i}`}
                  author={`Author Name ${i}`}
                  price={19.99}
                  coverImage={`/placeholder.svg?height=300&width=200&text=Book+${i}`}
                />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/books">
                <Button variant="outline">View All Books</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span className="font-semibold">BookHaven</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BookHaven. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}