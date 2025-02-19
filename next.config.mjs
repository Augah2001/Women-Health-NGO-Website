import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {

  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    // Remove all console logs
    removeConsole: true
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'bmjxbbetdtcdplufqqvg.supabase.co',
      port: ""
    }],
    
  },
  
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb"
    }
  },

    async headers() {
      return [
        
          {
              // matching all API routes
              source: "/api/:path*",
              headers: [
                  { key: "Access-Control-Allow-Credentials", value: "true" },
                  { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                  { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                  { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
              ]
          }
      ]
  },
  
  // webpack(config, { isServer }) {
  //   if (!isServer) {
  //     config.plugins.push({
  //       apply: (compiler) => {
  //         compiler.hooks.beforeRun.tap("RemoveConsolePlugin", (compilation) => {
  //           if (process.env.NODE_ENV === "production") {
  //             // console.log = function () {}; // Override console.log in production
  //           }
  //         });
  //       },
  //     });
  //   }
  //   return config;
  // },
  };
  
  export default nextConfig;
  