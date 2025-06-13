import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/auth': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  root: '.', // Raiz do projeto
  publicDir: 'public', // Pasta para arquivos estáticos
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        login: './pages/login.html',
        home: './pages/home.html',
      },
    },
  },
});