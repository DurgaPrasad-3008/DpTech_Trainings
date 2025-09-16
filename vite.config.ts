import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Dp-TechInstitute/", // <-- Change this to match your GitHub repo name
});


