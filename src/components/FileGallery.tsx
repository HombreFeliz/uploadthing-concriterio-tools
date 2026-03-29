import { useState } from "react";
import { Image, FileText, File, Check, Copy } from "lucide-react";

export interface UploadedFile {
  name: string;
  url: string;
  size: number;
  type: string;
}

interface FileGalleryProps {
  files: UploadedFile[];
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon({ type }: { type: string }) {
  const className = "size-5 text-[var(--color-text-muted)]";
  if (type.startsWith("image/")) return <Image className={className} />;
  if (type === "application/pdf" || type.startsWith("text/"))
    return <FileText className={className} />;
  return <File className={className} />;
}

function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-150 cursor-pointer"
      title="Copiar URL"
    >
      {copied ? <Check className="size-4 text-[var(--color-success)]" /> : <Copy className="size-4" />}
    </button>
  );
}

export function FileGallery({ files }: FileGalleryProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="font-[var(--font-display)] text-[1.75rem] leading-[2.25rem] font-semibold">
        Archivos subidos
      </h2>

      <div className="grid gap-3">
        {files.map((file, i) => (
          <div
            key={`${file.url}-${i}`}
            className="flex items-center gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
          >
            {file.type.startsWith("image/") ? (
              <img
                src={file.url}
                alt={file.name}
                className="size-16 rounded object-cover"
              />
            ) : (
              <div className="flex size-16 items-center justify-center rounded bg-[var(--color-surface-alt)]">
                <FileIcon type={file.type} />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-[var(--color-text)]">
                {file.name}
              </p>
              <div className="flex gap-3 mt-1">
                <span className="font-[var(--font-mono)] text-[0.75rem] text-[var(--color-text-muted)]">
                  {file.type}
                </span>
                <span className="font-[var(--font-mono)] text-[0.75rem] text-[var(--color-text-muted)]">
                  {formatSize(file.size)}
                </span>
              </div>
            </div>

            <CopyButton url={file.url} />
          </div>
        ))}
      </div>
    </div>
  );
}
