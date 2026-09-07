"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { uploadImageAction } from "@/actions/storage";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  bucket?: string;
  label?: string;
  helperText?: string;
  aspectRatio?: "video" | "square" | "wide" | "auto";
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export function ImageUpload({
  value = "",
  onChange,
  bucket = "general",
  label,
  helperText = "Format: JPG, PNG, WEBP (maks. 5MB)",
  aspectRatio = "video",
  disabled = false,
  className = "",
  required = false,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentImageUrl = previewUrl || value;

  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    wide: "aspect-[21/9]",
    auto: "h-56",
  }[aspectRatio];

  const handleFile = async (file: File) => {
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar (JPG, PNG, WEBP, GIF, dll.)");
      return;
    }

    // Validate size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Ukuran gambar melebihi batas 5MB");
      return;
    }

    setError(null);
    setIsUploading(true);

    // Create temporary local preview
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadImageAction(formData, bucket);

      if (!result.success || !result.url) {
        throw new Error(result.error || "Gagal mengunggah gambar");
      }

      onChange(result.url);
      setPreviewUrl(null); // clear temporary object URL once state updated
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Gagal mengunggah gambar ke Supabase Storage");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
      URL.revokeObjectURL(tempUrl);
    }
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // Reset file input value so re-selecting same file triggers change
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled || isUploading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setError(null);
    onChange("");
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label and Actions */}
      <div className="flex items-center justify-between">
        {label && (
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <button
          type="button"
          onClick={() => setShowManualInput(!showManualInput)}
          className="text-[11px] text-forest hover:text-forest-dark font-medium underline underline-offset-2 transition-colors ml-auto"
        >
          {showManualInput ? "Sembunyikan URL Manual" : "Input URL Manual"}
        </button>
      </div>

      {/* Manual URL Input (collapsible) */}
      {showManualInput && (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1.5 transition-all animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://... atau /images/1.png"
              disabled={disabled || isUploading}
              className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest"
            />
            {value && (
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-gray-400 hover:text-forest transition-colors"
                title="Buka URL gambar"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          <p className="text-[10px] text-gray-400">
            Anda dapat menempelkan link langsung atau mengunggah file gambar di bawah.
          </p>
        </div>
      )}

      {/* Upload Zone / Preview Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative overflow-hidden rounded-2xl border-2 transition-all group ${
          isDragging
            ? "border-forest bg-forest/5 scale-[1.005]"
            : currentImageUrl
            ? "border-gray-200 bg-gray-50"
            : "border-dashed border-gray-200 hover:border-forest/50 hover:bg-forest/[0.02] bg-gray-50/50"
        } ${disabled ? "opacity-60 pointer-events-none" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/jpg,image/gif"
          onChange={onFileInputChange}
          disabled={disabled || isUploading}
          className="hidden"
        />

        {currentImageUrl ? (
          /* Preview State */
          <div className={`relative w-full ${aspectClasses} max-h-[360px] flex items-center justify-center bg-gray-900/5`}>
            <Image
              src={currentImageUrl}
              alt="Preview"
              fill
              unoptimized={currentImageUrl.startsWith("blob:")}
              className="object-cover transition-transform group-hover:scale-105 duration-500"
            />

            {/* Gradient Overlay for controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3" />

            {/* Loading Indicator Overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] flex flex-col items-center justify-center text-white z-20 gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-forest-light" />
                <span className="text-xs font-semibold tracking-wide">
                  Mengunggah ke Supabase ({bucket})...
                </span>
              </div>
            )}

            {/* Controls Bar on Top Right */}
            {!isUploading && (
              <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-charcoal font-medium text-xs shadow-md backdrop-blur-sm transition-all flex items-center gap-1.5"
                  title="Ganti Gambar"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Ganti</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white shadow-md backdrop-blur-sm transition-all"
                  title="Hapus Gambar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Bucket Badge Bottom Left */}
            <div className="absolute bottom-3 left-3 z-10">
              <span className="px-2.5 py-1 rounded-md bg-black/60 text-white/90 text-[10px] font-mono backdrop-blur-sm">
                Bucket: {bucket}
              </span>
            </div>
          </div>
        ) : (
          /* Empty / Upload Prompt State */
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer p-8 flex flex-col items-center justify-center text-center gap-3 transition-colors ${
              aspectClasses
            } max-h-[300px]`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 py-4">
                <Loader2 className="w-10 h-10 animate-spin text-forest" />
                <p className="text-xs font-semibold text-charcoal">
                  Mengunggah ke Supabase Storage ({bucket})...
                </p>
                <p className="text-[11px] text-gray-400">Mohon tunggu sebentar</p>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-forest/10 text-forest flex items-center justify-center transition-transform group-hover:scale-110 duration-200">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-charcoal">
                    Tarik gambar ke sini, atau <span className="text-forest underline">telusuri file</span>
                  </p>
                  <p className="text-[11px] text-gray-400">{helperText}</p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-mono">
                  <span>Target Bucket:</span>
                  <span className="font-semibold text-forest">{bucket}</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Upload Error Banner */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Success / Status Info */}
      {value && !error && !isUploading && (
        <div className="flex items-center justify-between text-[11px] text-gray-400 px-1">
          <div className="flex items-center gap-1.5 text-forest font-medium truncate max-w-[80%]">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{value}</span>
          </div>
          {value.includes("supabase.co") && (
            <span className="shrink-0 text-[10px] uppercase font-semibold tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              Supabase Storage
            </span>
          )}
        </div>
      )}
    </div>
  );
}
