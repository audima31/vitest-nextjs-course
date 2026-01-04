import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true, // Supaya kita bisa menggunakan global seperti describe, it, expect tanpa perlu mengimportnya
    setupFiles: ["./vitest.setup.ts"], // File yang akan dijalankan sebelum test dijalankan
  },
});
