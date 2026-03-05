import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	poweredByHeader: false,
	compress: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**"
			}
		],
		formats: ["image/avif", "image/webp"]
	},
	logging: {
		fetches: {
			fullUrl: true
		}
	}
};

export default nextConfig;

