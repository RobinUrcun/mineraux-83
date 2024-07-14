import path from "path";

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Configure alias
    config.resolve.alias["@"] = path.resolve(__dirname);

    return config;
  },
};

export default nextConfig;
