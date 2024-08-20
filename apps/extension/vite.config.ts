import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { crx } from "@crxjs/vite-plugin"
import { resolve } from "path"
import manifest from "./manifest.json"

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        contentScript: resolve(__dirname, "./src/content/content.tsx"),
        background: resolve(__dirname, "./background.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
})
