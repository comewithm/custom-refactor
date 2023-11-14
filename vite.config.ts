import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react()],
    css: {
      preprocessorOptions: {
        less: {
          math: "always",
        },
      },
    },
    server: {
      host: "0.0.0.0",
      
      proxy: {
        '/auth-service': {
          target: 'https://dev4.nekoplan.com',
          changeOrigin: true,
        },
        '/intellect-saas-v4': {
          target: 'https://dev4.nekoplan.com',
          changeOrigin: true,
        },
        '/mall-service': {
          target: 'https://dev4.nekoplan.com',
          changeOrigin: true,
        },
        '/speech-service-tts': {
          target: 'https://dev4.nekoplan.com',
          changeOrigin: true,
        },
        '/talker-service': {
          target: 'https://dev4.nekoplan.com',
          changeOrigin: true,
        },
        '/dataService': {
          target: 'http://172.16.0.51:8888',
          changeOrigin: true,
        },
        '/accservice': {
          target: 'http://172.16.0.51:8888',
          changeOrigin: true,
        },
      }
    }
  };
});
