import { defineConfig } from 'vite'; // Import defineConfig once
import react from '@vitejs/plugin-react'; // Import the React plugin
import dotenv from 'dotenv';
import EnvironmentPlugin from 'vite-plugin-environment';

dotenv.config();

export default defineConfig({
  base: "/",
  plugins: [react(), EnvironmentPlugin("all")],
  preview: {
   port: process.env.VITE_PORT,
   strictPort: true,
  },
  server: {
   port: process.env.VITE_PORT,
   strictPort: true,
   host: true,
   origin: process.env.VITE_ORIGIN
  },
 });
