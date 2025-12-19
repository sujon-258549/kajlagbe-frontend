import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-secondary py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern/grid.png')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            We are here to help. Reach out to us for any queries, support, or partnership opportunities.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
                {/* Contact Info */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-2">Our Location</h3>
                        <p className="text-slate-600">123 Street Name, Dhaka, Bangladesh</p>
                    </div>
                     <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                            <Phone className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-2">Phone Number</h3>
                        <p className="text-slate-600">+880 1234 567890</p>
                        <p className="text-slate-600">+880 9876 543210</p>
                    </div>
                     <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                            <Mail className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-2">Email Address</h3>
                        <p className="text-slate-600">support@kajlagbe.com</p>
                        <p className="text-slate-600">info@kajlagbe.com</p>
                    </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-2 bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-3xl font-bold text-secondary mb-6">Send Us A Message</h2>
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Full Name</label>
                                <Input placeholder="John Doe" className="h-12" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Email Address</label>
                                <Input type="email" placeholder="john@example.com" className="h-12" />
                            </div>
                        </div>
                         <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                                <Input placeholder="+880..." className="h-12" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Subject</label>
                                <Input placeholder="Service Inquiry" className="h-12" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Message</label>
                            <Textarea placeholder="How can we help you?" className="min-h-[150px] resize-none" />
                        </div>
                        <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl">
                            Send Message <Send className="ml-2 h-5 w-5" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
