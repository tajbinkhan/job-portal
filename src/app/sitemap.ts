import type { MetadataRoute } from "next";

import { getJobs } from "@/lib/api/jobs";

const APP_URL = process.env.NEXT_PUBLIC_FRONTEND_URL ?? "http://localhost:3000";

export const revalidate = 3600; // rebuild sitemap at most once per hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Static routes
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: APP_URL,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1.0
		},
		{
			url: `${APP_URL}/jobs`,
			lastModified: new Date(),
			changeFrequency: "hourly",
			priority: 0.9
		}
	];

	// Dynamic job detail routes
	let jobRoutes: MetadataRoute.Sitemap = [];
	try {
		const res = await getJobs({ limit: 500, sortBy: "createdAt", sortOrder: "desc" });
		const jobs = res.data ?? [];
		jobRoutes = jobs.map(job => ({
			url: `${APP_URL}/jobs/${job.id}`,
			lastModified: new Date(job.updatedAt ?? job.createdAt),
			changeFrequency: "weekly" as const,
			priority: job.isFeatured ? 0.8 : 0.7
		}));
	} catch {
		// If the API is unavailable during build, emit static routes only
	}

	return [...staticRoutes, ...jobRoutes];
}
