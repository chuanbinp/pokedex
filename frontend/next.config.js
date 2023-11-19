/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "assets.pokemon.com",
            },
        ]
    }
}

module.exports = nextConfig
