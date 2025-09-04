import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        home: 'index.html',
        detail: 'detail.html',
      },
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? '';
          if (/\.(gif|jpe?g|png|svg|webp|ico)$/i.test(name)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          if (/\.css$/i.test(name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          // name が無い（例えば inlined から分離されたアセット等）の場合
          return 'assets/other/[hash][extname]';
        },
      },
    },
  },
});
