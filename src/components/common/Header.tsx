"use client";

import Image from "next/image";
import Link from "next/link";
import { LogInIcon, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import TopBar from "./TopBar";
import { useState, useEffect } from "react";
import { servicesData } from "@/data/servicesData";
import { ChevronRight } from "lucide-react";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [activeCategory, setActiveCategory] = useState(
    servicesData.length > 0 ? servicesData[0].slug : "",
  );

  useEffect(() => {
    const handleScroll = () => {
      // Threshold: TopBar (46px) + Header (approx 80px) + some buffer
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Jobs", href: "/jobs" },
    { name: "Subscription", href: "/subscription" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* TopBar - Scrolls away */}
      <div className="hidden lg:block bg-secondary">
        <TopBar />
      </div>

      {/* Placeholder to prevent layout shift when header becomes fixed */}
      <div
        className={`${isScrolled ? "h-[56px] sm:h-[72px]" : "h-0"} w-full`}
      ></div>

      {/* Main Navigation - Fixed with Slide Down Animation */}
      <header
        className={`w-full bg-background z-[999] transition-all duration-300 ease-in-out py-3 border-b ${
          isScrolled
            ? "fixed top-0  animate-in slide-in-from-top duration-700 border-gray-300"
            : "relative"
        }`}
      >
        <div className="main-container mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Image
              src="/images/logo/logo.png"
              alt="Kajlagbe Logo"
              width={160}
              height={50}
              className="h-8 sm:h-12 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 h-full">
            {navItems.map((item) => {
              if (item.name === "Services") {
                return (
                  <div
                    key={item.name}
                    className="relative group h-full flex items-center"
                  >
                    <Link
                      href={item.href}
                      className="text-[14px] font-bold text-secondary hover:text-primary uppercase tracking-wide transition-colors relative flex items-center gap-1 py-4"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    {/* Mega Menu Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-screen-lg bg-white shadow-2xl rounded-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-50 overflow-hidden flex h-[500px]">
                      {/* Left Sidebar - Categories */}
                      <div className="w-1/3 bg-slate-50 border-r border-slate-100 overflow-y-auto">
                        {servicesData.map((category) => (
                          <div
                            key={category.slug}
                            onMouseEnter={() =>
                              setActiveCategory(category.slug)
                            }
                            className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-all border-l-4 ${
                              activeCategory === category.slug
                                ? "bg-white border-secondary text-secondary shadow-sm"
                                : "border-transparent text-secondary hover:bg-slate-100"
                            }`}
                          >
                            <span className="font-bold text-xs tracking-wide uppercase">
                              {category.title}
                            </span>
                            <ChevronRight
                              className={`w-3.5 h-3.5 transition-transform ${activeCategory === category.slug ? "translate-x-1" : "opacity-0"}`}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Right Content - Sub-services */}
                      <div className="w-2/3 bg-white p-6 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                          {servicesData
                            .find((c) => c.slug === activeCategory)
                            ?.subServices.map((sub) => (
                              <Link
                                key={sub.slug}
                                href={`/services/${activeCategory}/${sub.slug}`}
                                className="group/sub flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-black transition-colors"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover/sub:opacity-100 transition-opacity"></div>
                                {sub.name}
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[14px] font-bold text-secondary hover:text-primary uppercase tracking-wide transition-colors relative group py-4"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/login">
              <Button size="sm" className="px-3 sm:px-4 text-[13px] sm:text-sm">
                <span className="hidden sm:inline">Login</span>{" "}
                <LogInIcon className="h-4 w-4" />
              </Button>
            </Link>

            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6">
                <div className="flex flex-col gap-6 mt-14">
                  {/* Mobile Search inside menu */}
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-9"
                    />
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                      if (item.name === "Services") {
                        return (
                          <Accordion
                            type="single"
                            collapsible
                            key={item.name}
                            className="w-full"
                          >
                            <AccordionItem
                              value="services"
                              className="border-none"
                            >
                              <AccordionTrigger className="text-lg font-medium hover:text-secondary transition-colors py-2 hover:no-underline">
                                {item.name}
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="flex flex-col gap-2 pl-4 border-l-2 border-slate-100 mt-2">
                                  {servicesData.map((category) => (
                                    <div
                                      key={category.slug}
                                      className="flex flex-col gap-1"
                                    >
                                      <div className="text-sm font-bold text-secondary/60 uppercase tracking-wider mt-2 mb-1">
                                        {category.title}
                                      </div>
                                      <div className="grid grid-cols-1 gap-1">
                                        {category.subServices
                                          .slice(0, 5)
                                          .map((sub) => (
                                            <Link
                                              key={sub.slug}
                                              href={`/services/${category.slug}/${sub.slug}`}
                                              className="text-sm text-slate-500 hover:text-secondary py-1"
                                              onClick={() =>
                                                setIsMenuOpen(false)
                                              }
                                            >
                                              {sub.name}
                                            </Link>
                                          ))}
                                        <Link
                                          href={`/services#${category.slug}`}
                                          className="text-xs font-bold text-primary hover:underline py-1"
                                          onClick={() => setIsMenuOpen(false)}
                                        >
                                          View all {category.title}
                                        </Link>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        );
                      }

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-lg font-medium hover:text-secondary transition-colors border-b border-gray-100 py-3 block"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar Expandable */}
        {isSearchOpen && (
          <div className="lg:hidden main-container mx-auto px-4 pb-4 animate-in slide-in-from-top-2 pt-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9 w-full"
                autoFocus
              />
            </div>
          </div>
        )}
      </header>
    </>
  );
}
