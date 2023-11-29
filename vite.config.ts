import { ConfigEnv, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

import {wrapperEnv} from './src/utils/config'

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd())
  const viteEnv = wrapperEnv(env)
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
    },
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    // build config
    build: {
      outDir: 'dist',
      // esbuild打包更快，但不能去除console.log
      minify: true,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
