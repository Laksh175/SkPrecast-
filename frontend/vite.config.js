import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'rss-xml-content-type',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url ? req.url.split('?')[0] : '';
          if (url === '/products.rss' || url.endsWith('.rss')) {
            const rssPath = path.resolve(__dirname, 'public/products.rss');
            if (fs.existsSync(rssPath)) {
              const xmlContent = fs.readFileSync(rssPath, 'utf8');
              res.setHeader('Content-Type', 'text/xml; charset=utf-8');
              res.statusCode = 200;
              res.end(xmlContent);
              return;
            }
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url ? req.url.split('?')[0] : '';
          if (url === '/products.rss' || url.endsWith('.rss')) {
            const rssPath = path.resolve(__dirname, 'dist/products.rss');
            if (fs.existsSync(rssPath)) {
              const xmlContent = fs.readFileSync(rssPath, 'utf8');
              res.setHeader('Content-Type', 'text/xml; charset=utf-8');
              res.statusCode = 200;
              res.end(xmlContent);
              return;
            }
          }
          next();
        });
      }
    }
  ],
});
