import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExt from "@tiptap/extension-image";
import LinkExt from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, ImageIcon, LinkIcon, Undo, Redo, Minus, FileCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

interface MenuButtonProps {
  onClick: () => void;
  active?: boolean;
  title?: string;
  children?: React.ReactNode;
}

const PROSE_CLASS =
  "prose prose-sm sm:prose dark:prose-invert max-w-none min-h-[400px] focus:outline-none px-4 py-3 " +
  "prose-headings:font-grotesk prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-accent";

const MenuButton = ({ onClick, active, children, title }: MenuButtonProps) => (
  <Button
    type="button"
    variant="ghost"
    size="icon"
    className={`h-8 w-8 ${active ? "bg-accent/20 text-accent" : "text-muted-foreground"}`}
    onClick={onClick}
    title={title}
  >
    {children}
  </Button>
);

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const onChangeRef = useRef(onChange);
  const lastEmittedHtml = useRef(content);
  onChangeRef.current = onChange;

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      ImageExt.configure({ inline: false, allowBase64: false }),
      LinkExt.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: "Start writing your blog post..." }),
    ],
    content,
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      lastEmittedHtml.current = html;
      onChangeRef.current(html);
    },
    editorProps: {
      attributes: { class: PROSE_CLASS },
      handlePaste: (_view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            event.preventDefault();
            return true;
          }
        }
        return false;
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (content === lastEmittedHtml.current) return;

    lastEmittedHtml.current = content;
    const { from, to } = editor.state.selection;
    editor.commands.setContent(content, { emitUpdate: false });
    try {
      const size = editor.state.doc.content.size;
      editor.commands.setTextSelection({
        from: Math.min(from, size),
        to: Math.min(to, size),
      });
    } catch {
      // best-effort selection restore
    }
  }, [content, editor]);

  const addImage = useCallback(async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file || !editor) return;

      const ext = file.name.split(".").pop();
      const path = `posts/${Date.now()}.${ext}`;

      const { data, error } = await supabase.storage
        .from("blog-media")
        .upload(path, file);

      if (error) {
        toast.error("Upload failed");
        return;
      }

      const { data: urlData } = supabase.storage.from("blog-media").getPublicUrl(data.path);
      editor.chain().focus().setImage({ src: urlData.publicUrl, alt: file.name }).run();
    };
    input.click();
  }, [editor]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL:", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addButton = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter button URL:");
    if (!url) return;
    const text = window.prompt("Enter button text:");
    if (!text) return;

    const escapedText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const buttonHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="custom-btn">${escapedText}</a>`;
    editor.chain().focus().insertContent(buttonHTML).run();
  }, [editor]);

  if (!editor) {
    return (
      <div className="border border-border rounded-xl overflow-hidden bg-card min-h-[440px] flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading editor…</p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <div className="flex flex-wrap gap-0.5 border-b border-border p-1.5 bg-muted/30">
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
          <Bold className="h-3.5 w-3.5" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
          <Italic className="h-3.5 w-3.5" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
          <Strikethrough className="h-3.5 w-3.5" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline Code">
          <Code className="h-3.5 w-3.5" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code Block">
          <FileCode className="h-3.5 w-3.5" />
        </MenuButton>
        <div className="w-px h-6 bg-border self-center mx-1" />
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="H1">
          <Heading1 className="h-3.5 w-3.5" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="H2">
          <Heading2 className="h-3.5 w-3.5" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="H3">
          <Heading3 className="h-3.5 w-3.5" />
        </MenuButton>
        <div className="w-px h-6 bg-border self-center mx-1" />
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
          <List className="h-3.5 w-3.5" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered List">
          <ListOrdered className="h-3.5 w-3.5" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote">
          <Quote className="h-3.5 w-3.5" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">
          <Minus className="h-3.5 w-3.5" />
        </MenuButton>
        <div className="w-px h-6 bg-border self-center mx-1" />
        <MenuButton onClick={addImage} title="Insert Image">
          <ImageIcon className="h-3.5 w-3.5" />
        </MenuButton>
        <MenuButton onClick={addLink} active={editor.isActive("link")} title="Insert Link">
          <LinkIcon className="h-3.5 w-3.5" />
        </MenuButton>
        <MenuButton onClick={addButton} title="Insert Button">
          <span className="text-xs font-bold">BTN</span>
        </MenuButton>
        <div className="w-px h-6 bg-border self-center mx-1" />
        <MenuButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <Undo className="h-3.5 w-3.5" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <Redo className="h-3.5 w-3.5" />
        </MenuButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
