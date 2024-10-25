import { defineConfig } from 'vite'; // Import defineConfig once
import react from '@vitejs/plugin-react'; // Import the React plugin
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Export the Vite configuration
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.VITE_PORT,
    host: process.env.VITE_HOST,
  },
});
