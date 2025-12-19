import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative bg-secondary text-white overflow-hidden pt-20 pb-32">
      {/* Background Pattern/Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70"></div>

      <div className="container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm border border-primary/20">
            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
            Welcome to Kajlagbe
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            We Provide The Best <span className="text-primary">Service</span> For Your Business
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
            We are a team of experienced professionals dedicated to providing top-notch IT and home services. From web development to daily repairs, we have you covered.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 px-8">
              DISCOVER MORE
            </Button>
            <Button size="lg" variant="outline" className="border-white text-secondary hover:bg-white hover:text-secondary h-12 px-8 bg-white">
              CONTACT US
            </Button>
          </div>
        </div>
        {/* Hero Image / Illustration Placeholder */}
        <div className="hidden lg:block relative animate-in slide-in-from-right duration-1000 delay-200">
           <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border-4 border-primary/20">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
                alt="Team working" 
                className="w-full h-auto object-cover"
              />
           </div>
           {/* Decorative Elements */}
           <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary rounded-full opacity-20 blur-3xl"></div>
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}
