import type { OurFileRouter } from "../server/uploadthing";

type Endpoint = keyof OurFileRouter;

interface RouteConfiguratorProps {
  activeEndpoint: Endpoint;
  onEndpointChange: (endpoint: Endpoint) => void;
}

const presets: { key: Endpoint; label: string; description: string }[] = [
  {
    key: "imageUploader",
    label: "Imágenes",
    description: "Hasta 4 imágenes, máximo 4 MB cada una.",
  },
  {
    key: "documentUploader",
    label: "Documentos",
    description: "PDF hasta 16 MB o texto plano hasta 1 MB. Máximo 2 archivos.",
  },
  {
    key: "generalUploader",
    label: "General",
    description: "Cualquier tipo de archivo, máximo 8 MB. 1 archivo.",
  },
];

export function RouteConfigurator({
  activeEndpoint,
  onEndpointChange,
}: RouteConfiguratorProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-[var(--font-display)] text-[1.75rem] leading-[2.25rem] font-semibold">
        Configurador de File Routes
      </h2>
      <p className="text-[var(--color-text-muted)] text-[0.875rem] leading-[1.25rem]">
        Selecciona un preset para cambiar las restricciones del uploader en
        tiempo real.
      </p>

      <div className="flex gap-2">
        {presets.map((preset) => {
          const isActive = activeEndpoint === preset.key;
          return (
            <button
              key={preset.key}
              onClick={() => onEndpointChange(preset.key)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                  : "border-[var(--color-border)] bg-transparent text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)]"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      <p className="font-[var(--font-mono)] text-[0.75rem] leading-[1rem] text-[var(--color-text-muted)]">
        {presets.find((p) => p.key === activeEndpoint)?.description}
      </p>
    </div>
  );
}
