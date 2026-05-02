"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  PinterestShareButton,
  RedditShareButton,
  EmailShareButton,
} from "next-share";
import {
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  MessageCircle,
  Send,
  Mail,
} from "lucide-react";
import { toast } from "react-toastify";
import { FaPinterest, FaRedditAlien } from "react-icons/fa";

interface BlogShareProps {
  title: string;
}

import { usePathname } from "next/navigation";

export default function BlogShare({ title }: BlogShareProps) {
  const pathname = usePathname();
  
  // Use a reliable base URL from env or fallback to a default
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://kajlagbe.com";
  const shareUrl = `${baseUrl}${pathname}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3">
      {/* Facebook */}
      <div className="group/tooltip relative">
        <FacebookShareButton url={shareUrl} quote={title}>
          <div className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-[#1877F2] hover:text-white transition-all cursor-pointer border border-slate-200">
            <Facebook className="w-4 h-4" />
          </div>
        </FacebookShareButton>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          Facebook
        </span>
      </div>

      {/* Twitter */}
      <div className="group/tooltip relative">
        <TwitterShareButton url={shareUrl} title={title}>
          <div className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-[#1DA1F2] hover:text-white transition-all cursor-pointer border border-slate-200">
            <Twitter className="w-4 h-4" />
          </div>
        </TwitterShareButton>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          Twitter
        </span>
      </div>

      {/* LinkedIn */}
      <div className="group/tooltip relative">
        <LinkedinShareButton url={shareUrl}>
          <div className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-[#0077B5] hover:text-white transition-all cursor-pointer border border-slate-200">
            <Linkedin className="w-4 h-4" />
          </div>
        </LinkedinShareButton>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          LinkedIn
        </span>
      </div>

      {/* WhatsApp */}
      <div className="group/tooltip relative">
        <WhatsappShareButton url={shareUrl} title={title}>
          <div className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-[#25D366] hover:text-white transition-all cursor-pointer border border-slate-200">
            <MessageCircle className="w-4 h-4" />
          </div>
        </WhatsappShareButton>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          WhatsApp
        </span>
      </div>

      {/* Telegram */}
      <div className="group/tooltip relative">
        <TelegramShareButton url={shareUrl} title={title}>
          <div className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-[#0088cc] hover:text-white transition-all cursor-pointer border border-slate-200">
            <Send className="w-4 h-4" />
          </div>
        </TelegramShareButton>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          Telegram
        </span>
      </div>

      {/* Pinterest */}
      <div className="group/tooltip relative">
        <PinterestShareButton url={shareUrl} media={shareUrl}>
          <div className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-[#bd081c] hover:text-white transition-all cursor-pointer border border-slate-200">
            <FaPinterest className="w-4 h-4" />
          </div>
        </PinterestShareButton>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          Pinterest
        </span>
      </div>

      {/* Reddit */}
      <div className="group/tooltip relative">
        <RedditShareButton url={shareUrl} title={title}>
          <div className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-[#ff4500] hover:text-white transition-all cursor-pointer border border-slate-200">
            <FaRedditAlien className="w-4 h-4" />
          </div>
        </RedditShareButton>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          Reddit
        </span>
      </div>

      {/* Email */}
      <div className="group/tooltip relative">
        <EmailShareButton url={shareUrl} subject={title}>
          <div className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-800 hover:text-white transition-all cursor-pointer border border-slate-200">
            <Mail className="w-4 h-4" />
          </div>
        </EmailShareButton>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          Email
        </span>
      </div>

      {/* Copy Link */}
      <div className="group/tooltip relative">
        <button
          onClick={copyToClipboard}
          className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-secondary hover:text-white transition-all cursor-pointer border border-slate-200"
          title="Copy Link"
        >
          <Link2 className="w-4 h-4" />
        </button>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          Copy Link
        </span>
      </div>
    </div>
  );
}
