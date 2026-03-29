import { useState } from "react";
import { RouteConfigurator } from "./RouteConfigurator";
import { UploadZone } from "./UploadZone";
import { FileGallery, type UploadedFile } from "./FileGallery";
import type { OurFileRouter } from "../server/uploadthing";

type Endpoint = keyof OurFileRouter;

export function DemoApp() {
  const [activeEndpoint, setActiveEndpoint] = useState<Endpoint>("imageUploader");
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleUploadComplete = (newFiles: UploadedFile[]) => {
    setFiles((prev) => [...newFiles, ...prev]);
  };

  return (
    <div className="space-y-10">
      <RouteConfigurator
        activeEndpoint={activeEndpoint}
        onEndpointChange={setActiveEndpoint}
      />

      <UploadZone
        key={activeEndpoint}
        endpoint={activeEndpoint}
        onUploadComplete={handleUploadComplete}
      />

      <FileGallery files={files} />
    </div>
  );
}
