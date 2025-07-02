import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // add this
import tailwindcss from "tailwindcss"; // corrected import

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // This ensures local dev also supports client-side routing
    historyApiFallback: true,
  },
});
