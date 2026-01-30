"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import React from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  Heading1,
  Heading2,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
} from "lucide-react";

interface MenuButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}

const MenuButton = ({ onClick, isActive, children }: MenuButtonProps) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`p-2 rounded-lg transition-all ${
      isActive
        ? "bg-secondary text-white shadow-lg shadow-secondary/20"
        : "text-slate-500 hover:bg-slate-100"
    }`}
  >
    {children}
  </button>
);

const Texteditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: "Write your masterpiece here...",
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none min-h-[500px] p-10 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 leading-relaxed text-slate-700",
      },
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-1000">
      {/* Floating Style Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white/80 backdrop-blur-md sticky top-4 z-10 border border-slate-200/50 rounded-2xl shadow-2xl shadow-slate-200/50 max-w-fit mx-auto">
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 size={18} />
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 size={18} />
        </MenuButton>

        <div className="w-px h-6 bg-slate-200 mx-2" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <UnderlineIcon size={18} />
        </MenuButton>

        <div className="w-px h-6 bg-slate-200 mx-2" />

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter size={18} />
        </MenuButton>

        <div className="w-px h-6 bg-slate-200 mx-2" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List size={18} />
        </MenuButton>
        <MenuButton onClick={addImage}>
          <ImageIcon size={18} />
        </MenuButton>
      </div>

      {/* Editor Surface */}
      <div className="relative group overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-linear-to-b from-slate-50/50 to-white/0 pointer-events-none" />
        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
          font-style: italic;
        }
        .ProseMirror h1 {
          font-size: 2.5rem;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 2rem;
        }
        .ProseMirror h2 {
          font-size: 1.8rem;
          font-weight: 800;
          color: #1e293b;
          margin-top: 2rem;
        }
        .ProseMirror {
          font-family: "Outfit", sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Texteditor;
