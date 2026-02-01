import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: rootDir,
  publicDir: path.resolve(rootDir, "resources"),
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true
  },
  build: {
    outDir: path.resolve(rootDir, "dist/renderer"),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(rootDir, "index.html")
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: path.resolve(rootDir, "src/renderer/test/setup.ts"),
    include: ["src/renderer/__tests__/**/*.test.tsx"]
  }
});
