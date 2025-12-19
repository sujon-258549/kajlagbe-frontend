import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-primary-foreground/70 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-start text-left">
             <Link href="/" className="inline-block mb-4">
                <Image 
                  src="/images/logo/logo.png" 
                  alt="Kajlagbe Logo" 
                  width={180} 
                  height={60} 
                  className="h-12 w-auto z-10 object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" 
                />
            </Link>
            <p className="text-[15px] leading-relaxed">
              We provide the best solution for your business. We have a team of experienced professionals who are ready to help you.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="h-8 w-8 rounded-full bg-secondary/80 hover:bg-primary flex items-center justify-center text-primary-foreground transition-all duration-300"><Facebook className="h-4 w-4" /></Link>
              <Link href="#" className="h-8 w-8 rounded-full bg-secondary/80 hover:bg-primary flex items-center justify-center text-primary-foreground transition-all duration-300"><Twitter className="h-4 w-4" /></Link>
              <Link href="#" className="h-8 w-8 rounded-full bg-secondary/80 hover:bg-primary flex items-center justify-center text-primary-foreground transition-all duration-300"><Instagram className="h-4 w-4" /></Link>
              <Link href="#" className="h-8 w-8 rounded-full bg-secondary/80 hover:bg-primary flex items-center justify-center text-primary-foreground transition-all duration-300"><Linkedin className="h-4 w-4" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary-foreground relative pl-4 after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-4 after:w-1 after:bg-primary">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-primary transition-colors text-[15px] flex items-center gap-2"><div className="h-1.5 w-1.5 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors text-[15px] flex items-center gap-2"><div className="h-1.5 w-1.5 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>Our Services</Link></li>
              <li><Link href="/team" className="hover:text-primary transition-colors text-[15px] flex items-center gap-2"><div className="h-1.5 w-1.5 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>Meet The Team</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors text-[15px] flex items-center gap-2"><div className="h-1.5 w-1.5 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>Latest Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors text-[15px] flex items-center gap-2"><div className="h-1.5 w-1.5 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary-foreground relative pl-4 after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-4 after:w-1 after:bg-primary">Services</h3>
             <ul className="space-y-3">
              <li><Link href="#" className="hover:text-primary transition-colors text-[15px]">IT Solutions</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-[15px]">Web Development</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-[15px]">App Development</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-[15px]">UI/UX Design</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors text-[15px]">Digital Marketing</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary-foreground relative pl-4 after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:h-4 after:w-1 after:bg-primary">Newsletter</h3>
            <p className="text-[15px]">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="relative">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-secondary/40 border-primary/20 text-primary-foreground placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-primary h-12 pr-12 rounded-none" 
              />
              <Button size="icon" className="absolute right-0 top-0 h-12 w-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-none">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} Kajlagbe. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
