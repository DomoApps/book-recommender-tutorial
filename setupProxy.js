import fs from 'fs';
import path from 'path';
import { Proxy } from '@domoinc/ryuu-proxy';
import manifestJson from './public/manifest.json';

export function setupRyuuProxy(server) {
  let manifest = manifestJson;
  const tempPath = path.join(process.cwd(), '.tmp', 'manifest.json');

  try {
    const tempManifestContent = fs.readFileSync(tempPath, 'utf-8');
    manifest = JSON.parse(tempManifestContent);
  } catch {
    // Using default manifest when temp manifest is not available
  }

  const config = { manifest };
  const proxy = new Proxy(config);

  proxy.onError = (error, response) => {
    const status = error.response?.data?.statusCode || 500;
    const message = error.response?.data?.statusMessage || error.message || 'Proxy error';

    response.statusCode = status;
    response.end(message);
  };

  // Apply the middleware
  server.middlewares.use(proxy.express());
}
