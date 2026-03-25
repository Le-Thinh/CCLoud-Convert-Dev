import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: { "/v1/api": "http://localhost:3055" },
  },
  plugins: [react(), tailwindcss()],
});
