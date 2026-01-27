import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center ">
      <div className="w-full max-w-lg mb-8 animate-in zoom-in-50 duration-500 fade-in">
        {/* Placeholder text mimicking the shape of the 404 image */}
        <h1 className="text-[150px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-900 to-green-700 leading-none select-none drop-shadow-sm">
          404
        </h1>
      </div>

      <div className="space-y-4 animate-in slide-in-from-bottom-5 duration-700 fade-in fill-mode-both delay-200">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Oops! Page Not Found
        </h2>

        <p className="text-slate-500 max-w-md mx-auto text-lg">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or may have
          been moved. Please check the URL.
        </p>

        <div className="pt-4">
          <Button
            asChild
            size="lg"
            className=" text-white px-8 rounded-full "
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
