import React, { useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import "./EditorComponent.css";

interface EditorComponentProps {
  content: string;
  setContent: (content: string) => void;
}

const EditorComponent: React.FC<EditorComponentProps> = ({
  content,
  setContent,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    const container = editorRef.current;
    if (!container) return;

    if (!quillRef.current) {
      quillRef.current = new Quill(container, {
        theme: "bubble",
        placeholder: "Введите текст...",
        modules: {
          toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }, { background: [] }],
            ["bold", "italic", "underline"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "blockquote", "code-block"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
          ],
        },
      });

      quillRef.current.root.innerHTML = content;

      quillRef.current.on("text-change", () => {
        const updatedContent = quillRef.current?.root.innerHTML || "";
        setContent(updatedContent);
      });
    }

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
        quillRef.current = null;
      }
    };
  }, [content, setContent]);

  useEffect(() => {
    if (quillRef.current && quillRef.current.root.innerHTML !== content) {
      quillRef.current.root.innerHTML = content;
    }
  }, [content]);

  return <div className="editor-block" ref={editorRef} />;
};

export default EditorComponent;
