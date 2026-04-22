import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

import publicManifest from './public/manifest.json';
import { setupRyuuProxy } from './setupProxy';

export const buildDir = 'build';
export const tmpDir = '.tmp';
export const envPrefix = 'DOMO_';

interface ConfigInput {
  command: 'build' | 'serve';
  mode: string;
}

// https://vitejs.dev/config/
export default defineConfig(({ command }: ConfigInput) => {
  let manifest = publicManifest;
  const tmpManifestPath = path.join(process.cwd(), tmpDir, 'manifest.json');
  try {
    const tmpManifestContent = fs.readFileSync(tmpManifestPath, 'utf-8');
    manifest = JSON.parse(tmpManifestContent);
  } catch {
    // Using default manifest when temp manifest is not available
  }

  return {
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
          useFlatConfig: true,
          dev: {
            logLevel: ['error'],
          },
        },
      }),
      tsconfigPaths(),
      {
        name: 'html-transform',
        transformIndexHtml(html: string) {
          return html.replace(
            /<title>(.*?)<\/title>/,
            `<title>${manifest.name}@${manifest.version}</title>`,
          );
        },
      },
      {
        name: 'build-index',
        async writeBundle() {
          try {
            if (command === 'build') {
              const buildManifestPath = path.join(
                process.cwd(),
                buildDir,
                'manifest.json',
              );
              fs.renameSync(tmpManifestPath, buildManifestPath);
            }
          } catch (error) {
            console.warn('Could not replace "manifest.json" in build folder:', error);
          }
        },
      },
      {
        name: 'ryuu-proxy-middleware',
        configureServer: setupRyuuProxy,
      },
    ],
    envDir: './.environment',
    envPrefix,
    define: {
      DOMO_APP_NAME: JSON.stringify(manifest.name),
      DOMO_APP_VERSION: JSON.stringify(manifest.version),
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
    build: {
      outDir: buildDir,
      emptyOutDir: true,
      sourcemap: false,
      minify: true,
      rollupOptions: {
        output: {
          sourcemap: false,
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
    clearScreen: false,
  };
});
