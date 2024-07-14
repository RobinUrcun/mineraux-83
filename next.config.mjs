import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Configure alias
    config.resolve.alias["@"] = path.resolve(__dirname);

    return config;
  },
};

export default nextConfig;
