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
      className="rounded-md p-1.5 text-[var(--color-text-muted)] transition-colors duration-150 hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-primary)] cursor-pointer"
      title="Copiar URL"
    >
      {copied ? (
        <Check className="size-4 text-[var(--color-success)]" />
      ) : (
        <Copy className="size-4" />
      )}
    </button>
  );
}

export function FileGallery({ files }: FileGalleryProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">
        Archivos subidos
      </h2>

      <div className="divide-y divide-[var(--color-border)] overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
        {files.map((file, i) => (
          <div
            key={`${file.url}-${i}`}
            className="flex items-center gap-4 p-3 transition-colors hover:bg-[var(--color-surface-alt)]"
          >
            {file.type.startsWith("image/") ? (
              <img
                src={file.url}
                alt={file.name}
                className="size-12 rounded-md border border-[var(--color-border)] object-cover"
              />
            ) : (
              <div className="flex size-12 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface-alt)]">
                <FileIcon type={file.type} />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[var(--color-text)]">
                {file.name}
              </p>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-muted)]">
                  {file.type}
                </span>
                <span className="text-[var(--color-border)]">&middot;</span>
                <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-text-muted)]">
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
