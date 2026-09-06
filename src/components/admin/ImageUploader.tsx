"use client";

import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { uploadImage } from "@/lib/content-client";

interface ImageUploaderProps {
  currentUrl?: string;
  folder?: string;
  label?: string;
  onUploaded: (url: string, key: string) => void;
}

export default function ImageUploader({
  currentUrl,
  folder = "images",
  label = "Image",
  onUploaded,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(currentUrl || "");
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setStatus("error");
      return;
    }
    setUploading(true);
    setStatus("idle");

    // Local preview
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    const result = await uploadImage(file, folder);
    if (result.error || !result.url) {
      setStatus("error");
      setPreview(currentUrl || "");
    } else {
      setStatus("success");
      setPreview(result.url);
      onUploaded(result.url, result.key || "");
      setTimeout(() => setStatus("idle"), 3000);
    }
    setUploading(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">{label}</label>

      {/* Preview */}
      {preview && (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 h-40 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1.5 bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Replace
            </button>
            <button
              onClick={() => { setPreview(""); onUploaded("", ""); }}
              className="flex items-center gap-1.5 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer hover:bg-red-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Upload zone */}
      {!preview && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            dragOver ? "border-[#1E7A3A] bg-green-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-[#1E7A3A] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-gray-500">Uploading...</p>
            </div>
          ) : (
            <>
              <ImageIcon className={`w-7 h-7 mx-auto mb-1.5 ${dragOver ? "text-[#1E7A3A]" : "text-gray-300"}`} />
              <p className="text-xs font-semibold text-gray-500">Drop image here or click to upload</p>
              <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, WebP · Max 5MB</p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />

      {/* Manual URL input */}
      <div>
        <label className="block text-[10px] text-gray-400 mb-1">Or paste image URL</label>
        <input
          type="url"
          value={preview}
          onChange={(e) => { setPreview(e.target.value); onUploaded(e.target.value, ""); }}
          placeholder="https://..."
          className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#1E7A3A]"
        />
      </div>

      {status !== "idle" && (
        <div className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg ${
          status === "success" ? "bg-green-50 text-[#1E7A3A] border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
        }`}>
          {status === "success" ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
          {status === "success" ? "Image uploaded!" : "Upload failed. Please try again."}
        </div>
      )}
    </div>
  );
}
