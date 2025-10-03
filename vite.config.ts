import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build"  // <-- папка для Vercel
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});
  