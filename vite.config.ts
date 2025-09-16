import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Dp-TechInstitute/", // <-- Change this to match your GitHub repo name

  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://gcaeplteagvasyxxqczz.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjYWVwbHRlYWd2YXN5eHhxY3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MTM4NzgsImV4cCI6MjA3MDk4OTg3OH0.HGg_PZwLJBNIUVSBa9xSCL3oF4OLABuCTZet1N5t6FI'),
  },
})

