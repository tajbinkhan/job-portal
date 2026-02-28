import { getJobFilters, getJobs } from "@/lib/api/jobs";

import { Footer } from "@/layout/Footer";
import { Categories } from "@/templates/Home/Categories";
import { Companies } from "@/templates/Home/Companies";
import { CtaBanner } from "@/templates/Home/CtaBanner";
import { FeaturedJobs } from "@/templates/Home/FeaturedJobs";
import { Hero } from "@/templates/Home/Hero";
import { LatestJobs } from "@/templates/Home/LatestJobs";

const FALLBACK_LOCATIONS: string[] = ["Remote", "On-site", "Hybrid"];

export async function HomeTemplate() {
	const [filtersRes, featuredRes, latestRes] = await Promise.allSettled([
		getJobFilters(),
		getJobs({ isFeatured: true, limit: 8, sortBy: "createdAt", sortOrder: "desc" }),
		getJobs({ limit: 8, sortBy: "createdAt", sortOrder: "desc" })
	]);

	const locations =
		filtersRes.status === "fulfilled"
			? (filtersRes.value.data?.locations ?? FALLBACK_LOCATIONS)
			: FALLBACK_LOCATIONS;

	const featuredJobs = featuredRes.status === "fulfilled" ? (featuredRes.value.data ?? []) : [];

	const latestJobs = latestRes.status === "fulfilled" ? (latestRes.value.data ?? []) : [];

	return (
		<div className="flex min-h-screen flex-col">
			<main className="flex-1">
				<Hero locations={locations} />
				<Companies />
				<Categories />
				<CtaBanner />
				<FeaturedJobs jobs={featuredJobs} />
				<LatestJobs jobs={latestJobs} />
			</main>
			<Footer />
		</div>
	);
}
