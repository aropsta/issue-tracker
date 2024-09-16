/** @type {import('next').NextConfig} */
//setting http headers in next config to fix a bug of user avatars not loading from google
//
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "referrer-policy",
            value: "no-referrer",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
