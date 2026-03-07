import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mariposas - Aprendiendo jugando",
    short_name: "Mariposas",
    description: "Plataforma educativa interactiva para personas con discapacidades cognitivas",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f5a623",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
