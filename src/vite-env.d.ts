/// <reference types="vite/client" />

/**
 * You can use variables defined here directly in your code (dev and build).
 * e.g.:
 *
 *   console.log(import.meta.env.DOMO_SUPPORT);
 *
 * For more information, see: https://vite.dev/guide/env-and-mode
 */

interface ImportMetaEnv {
  readonly DOMO_SUPPORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
