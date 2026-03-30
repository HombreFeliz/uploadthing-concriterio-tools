import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const token = import.meta.env.UPLOADTHING_TOKEN ?? process.env.UPLOADTHING_TOKEN ?? "";

  let decoded = "could not decode";
  try {
    decoded = atob(token);
  } catch {
    decoded = "not valid base64";
  }

  const firstChars = token ? token.slice(0, 10) + "..." : "(empty)";

  return new Response(
    JSON.stringify({
      tokenLength: token.length,
      tokenPreview: firstChars,
      decodedPreview: decoded.slice(0, 80),
      importMetaKeys: Object.keys(import.meta.env).filter((k) =>
        k.includes("UPLOAD")
      ),
      processEnvExists: typeof process.env.UPLOADTHING_TOKEN === "string",
    }),
    { headers: { "content-type": "application/json" } }
  );
};
