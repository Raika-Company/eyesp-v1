import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: "/manifest.webmanifest",
      workbox: {
        globPatterns: ["**/*"],
        globIgnores: ["**/*.html"],
        navigateFallback: "/index.html",
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "all",
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
              },
            },
          },
        ],
      },
    }),
  ],
});
