import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: { "/v1/api": "https://ccloud-convert-dev.onrender.com" },
  },
  plugins: [react(), tailwindcss()],
});
