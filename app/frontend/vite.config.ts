// typescript
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default ({ mode }: { mode: string }) => {
  console.log('Vite build mode: ', mode);
  console.log('Loading env from: ', __dirname);
  const env = loadEnv(mode, __dirname, '');

  const apiPort = env.PORT || env.API_PORT || '4000';

  return defineConfig({
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: `http://localhost:${apiPort}`,
          changeOrigin: true,
          secure: false
        }
      }
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true
    },
    resolve: {
      alias: {
        'react': resolve(__dirname, '../node_modules/react'),
        'react-dom': resolve(__dirname, '../node_modules/react-dom')
      }
    }
  });
};
