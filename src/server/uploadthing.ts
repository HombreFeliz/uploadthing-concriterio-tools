import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .middleware(async () => {
      return { userId: "demo-user" };
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url, name: file.name };
    }),

  documentUploader: f({
    pdf: { maxFileSize: "16MB", maxFileCount: 2 },
    "text/plain": { maxFileSize: "1MB", maxFileCount: 2 },
  })
    .middleware(async () => ({ userId: "demo-user" }))
    .onUploadComplete(async ({ file }) => {
      return { url: file.url, name: file.name };
    }),

  generalUploader: f({ blob: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async () => ({ userId: "demo-user" }))
    .onUploadComplete(async ({ file }) => {
      return { url: file.url, name: file.name };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
