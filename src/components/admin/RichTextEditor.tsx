"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { Bold, Italic, Heading1, Heading2, List, Minus } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter text...",
  className = "",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const exec = (command: string, val?: string) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const toolbarBtn = (action: () => void, icon: React.ReactNode, title: string) => (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); action(); }}
      title={title}
      className="p-1.5 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer transition-colors"
    >
      {icon}
    </button>
  );

  return (
    <div className={`border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#1E7A3A] transition-colors ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-gray-100 bg-gray-50 flex-wrap">
        {toolbarBtn(() => exec("bold"), <Bold className="w-3.5 h-3.5" />, "Bold")}
        {toolbarBtn(() => exec("italic"), <Italic className="w-3.5 h-3.5" />, "Italic")}
        <div className="w-px h-4 bg-gray-200 mx-1" />
        {toolbarBtn(() => exec("formatBlock", "<h2>"), <Heading1 className="w-3.5 h-3.5" />, "Heading")}
        {toolbarBtn(() => exec("formatBlock", "<h3>"), <Heading2 className="w-3.5 h-3.5" />, "Subheading")}
        {toolbarBtn(() => exec("formatBlock", "<p>"), <Minus className="w-3.5 h-3.5" />, "Paragraph")}
        <div className="w-px h-4 bg-gray-200 mx-1" />
        {toolbarBtn(() => exec("insertUnorderedList"), <List className="w-3.5 h-3.5" />, "Bullet List")}
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        id="rich-text-editor"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        className="min-h-[120px] max-h-[400px] overflow-y-auto p-3 text-sm text-gray-800 focus:outline-none prose prose-sm max-w-none
          [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-gray-400 [&:empty]:before:pointer-events-none"
      />
    </div>
  );
}
