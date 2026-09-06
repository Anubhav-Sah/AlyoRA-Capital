"use client";

import React, { useState, useRef } from "react";
import { Upload, X, FileText, ExternalLink, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { uploadPdf, getPdfFiles, deletePdf } from "@/lib/content-client";
import type { PdfFile } from "@/lib/content-client";

interface PdfUploaderProps {
  page: string;
  section?: string;
  initialFiles?: PdfFile[];
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export default function PdfUploader({ page, section = "main", initialFiles = [] }: PdfUploaderProps) {
  const [files, setFiles] = useState<PdfFile[]>(initialFiles);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file || file.type !== "application/pdf") {
      setUploadStatus("error");
      return;
    }
    setUploading(true);
    setUploadStatus("idle");

    const result = await uploadPdf(file, page, section);
    if (result.error) {
      setUploadStatus("error");
    } else {
      setUploadStatus("success");
      // Refresh file list
      const updated = await getPdfFiles(page);
      setFiles(updated);
      setTimeout(() => setUploadStatus("idle"), 3000);
    }
    setUploading(false);
  };

  const handleDelete = async (id: string, key: string) => {
    if (!confirm("Delete this PDF?")) return;
    await deletePdf(id, key);
    setFiles(files.filter((f) => f.id !== id));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">PDF Files</p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          dragOver ? "border-[#1E7A3A] bg-green-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-[#1E7A3A] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Uploading to InsForge Storage...</p>
          </div>
        ) : (
          <>
            <Upload className={`w-8 h-8 mx-auto mb-2 ${dragOver ? "text-[#1E7A3A]" : "text-gray-300"}`} />
            <p className="text-sm font-semibold text-gray-600">Drop PDF here or click to upload</p>
            <p className="text-xs text-gray-400 mt-1">PDF files only · Max 20MB</p>
          </>
        )}
      </div>

      {/* Status feedback */}
      {uploadStatus !== "idle" && (
        <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
          uploadStatus === "success"
            ? "bg-green-50 text-[#1E7A3A] border border-green-200"
            : "bg-red-50 text-red-600 border border-red-200"
        }`}>
          {uploadStatus === "success"
            ? <CheckCircle className="w-4 h-4 flex-shrink-0" />
            : <AlertCircle className="w-4 h-4 flex-shrink-0" />
          }
          {uploadStatus === "success" ? "PDF uploaded successfully!" : "Upload failed. Please try again."}
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div key={file.id} className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-3 py-2.5 group">
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                <p className="text-[10px] text-gray-400">{formatBytes(file.file_size)}</p>
              </div>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 cursor-pointer transition-colors"
                title="Open PDF"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => handleDelete(file.id, file.key)}
                className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 cursor-pointer transition-all"
                title="Delete PDF"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length === 0 && !uploading && (
        <p className="text-center text-xs text-gray-400">No PDFs uploaded yet.</p>
      )}
    </div>
  );
}
