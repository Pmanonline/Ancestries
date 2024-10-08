import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // Set to a higher value, e.g., 1000 KB
  },
  plugins: [react()],
});
