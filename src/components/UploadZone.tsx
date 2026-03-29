import { useState, useCallback, useRef } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { useUploadThing } from "../utils/uploadthing";
import type { OurFileRouter } from "../server/uploadthing";
import type { UploadedFile } from "./FileGallery";

type Endpoint = keyof OurFileRouter;

interface UploadZoneProps {
  endpoint: Endpoint;
  onUploadComplete: (files: UploadedFile[]) => void;
}

export function UploadZone({ endpoint, onUploadComplete }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload, isUploading } = useUploadThing(endpoint, {
    onUploadProgress: (p) => setProgress(p),
    onClientUploadComplete: (res) => {
      setProgress(0);
      setError(null);
      const uploaded: UploadedFile[] = res.map((f) => ({
        name: f.name,
        url: f.ufsUrl,
        size: f.size,
        type: f.type,
      }));
      onUploadComplete(uploaded);
    },
    onUploadError: (err) => {
      setProgress(0);
      setError(err.message);
    },
  });

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      setError(null);
      const fileArray = Array.from(files);
      if (fileArray.length === 0) return;
      startUpload(fileArray);
    },
    [startUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div
        onClick={!isUploading ? handleClick : undefined}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-12 transition-all duration-150 ${
          isDragging
            ? "border-solid border-[var(--color-primary)] bg-[var(--color-primary)]/5"
            : "border-[var(--color-border)] bg-[var(--color-surface-alt)] hover:border-[var(--color-primary)]"
        } ${isUploading ? "pointer-events-none opacity-60" : "cursor-pointer"}`}
      >
        <Upload
          className={`size-12 transition-colors duration-150 ${
            isDragging
              ? "text-[var(--color-primary)]"
              : "text-[var(--color-text-muted)]"
          }`}
        />
        <p className="text-center text-[var(--color-text-muted)]">
          {isUploading
            ? "Subiendo..."
            : "Arrastra archivos aquí o haz clic para seleccionar"}
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {isUploading && (
        <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
          <div
            className="h-full rounded-full transition-all duration-200 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor:
                progress === 100
                  ? "var(--color-success)"
                  : "var(--color-primary)",
            }}
          />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-[0.875rem] text-[var(--color-error)]">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
