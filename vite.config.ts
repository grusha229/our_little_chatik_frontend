import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {

    const env = loadEnv(mode, process.cwd(), '');
    const apiProxy = env.VITE_API_PROXY;

    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@app': path.resolve(__dirname, 'src'),
            },
        },
        server: apiProxy
            ? {
                  proxy: {
                      '/api': {
                          target: apiProxy,
                          changeOrigin: true,
                          rewrite: (path) => path.replace(/^\/api/, ''),
                      },
                  },
              }
            : undefined,
    }
});
