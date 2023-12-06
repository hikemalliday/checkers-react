import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Define your environment variable

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [react()],
});
