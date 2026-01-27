import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  return (
    <div className="w-full bg-[#0a101f] text-white/70 text-[13px] font-medium leading-[46px]">
      <div className="main-container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center h-auto sm:h-[46px]">
        {/* Contact Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-white" />
            <a
              href="mailto:info@kajlagbe.com"
              className="hover:text-white transition-colors"
            >
              info@kajlagbe.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-white" />
            <a
              href="tel:+8801234567890"
              className="hover:text-white transition-colors"
            >
              +880 1234 567 890
            </a>
          </div>
        </div>

        {/* Social Links & Utilities */}
        <div className="flex items-center gap-5 mt-2 sm:mt-0">
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white transition-colors">
              Help
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Support
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-3 pl-4 border-l border-white/20">
            <Link href="#" className="hover:text-white transition-colors">
              <Facebook className="h-3.5 w-3.5" />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Twitter className="h-3.5 w-3.5" />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Instagram className="h-3.5 w-3.5" />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Linkedin className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
