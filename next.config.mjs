/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'imgix.cryptojobslist.com'
            
          },
        ],
      },
};


export default nextConfig;
