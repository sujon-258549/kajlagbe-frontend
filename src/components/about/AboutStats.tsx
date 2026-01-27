import Heading3 from "@/components/common/Headings/Heading3";

export default function AboutStats() {
  return (
    <section className="py-16 bg-[#154d2e] text-white">
      <div className="main-container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:divide-x divide-x-0 divide-white/10">
          <div className="p-4">
            <Heading3 className="text-4xl lg:text-5xl font-bold mb-2">
              824
            </Heading3>
            <p className="text-white/70 text-sm uppercase tracking-wider">
              Happy Clients
            </p>
          </div>
          <div className="p-4">
            <Heading3 className="text-4xl lg:text-5xl font-bold mb-2">
              31
            </Heading3>
            <p className="text-white/70 text-sm uppercase tracking-wider">
              Years Experience
            </p>
          </div>
          <div className="p-4">
            <Heading3 className="text-4xl lg:text-5xl font-bold mb-2">
              08
            </Heading3>
            <p className="text-white/70 text-sm uppercase tracking-wider">
              Awards Won
            </p>
          </div>
          <div className="p-4">
            <Heading3 className="text-4xl lg:text-5xl font-bold mb-2">
              56
            </Heading3>
            <p className="text-white/70 text-sm uppercase tracking-wider">
              Expert Farmers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
