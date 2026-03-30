import type { APIContext } from "astro";
import { createRouteHandler } from "uploadthing/server";
import { uploadRouter } from "../../server/uploadthing";

const handler = createRouteHandler({
  router: uploadRouter,
  config: {
    token: import.meta.env.UPLOADTHING_TOKEN ?? process.env.UPLOADTHING_TOKEN,
  },
});

export const GET = (ctx: APIContext) => handler(ctx.request);
export const POST = (ctx: APIContext) => handler(ctx.request);
