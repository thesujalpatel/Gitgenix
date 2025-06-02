/**
 * This file contains Next.js-specific configuration for server-only dependencies
 * It helps prevent issues with Node.js libraries that don't work in the browser
 */

const serverConfig = {
  // Tell Next.js to handle packages containing Node.js modules properly
  serverComponentsExternalPackages: ["firebase-admin"],
};

export default serverConfig;
