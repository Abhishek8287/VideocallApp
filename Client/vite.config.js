import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(), // Include nodePolyfills plugin here
  ],
  server: {
    // Configure the server options here
    cors: true, // Enable CORS for development server
  },
  define: {
    //global: {},
  },
});
