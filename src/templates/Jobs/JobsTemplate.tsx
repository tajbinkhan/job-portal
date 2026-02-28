import { Briefcase } from "lucide-react";
import { Suspense } from "react";

import { getJobFilters, getJobs } from "@/lib/api/jobs";

import { Footer } from "@/layout/Footer";
import { Navbar } from "@/layout/Navbar";
import { JobsListing } from "@/templates/Jobs/JobsListing";

function JobsListingSkeleton() {
	return (
		<div className="flex gap-8">
			<div className="hidden w-64 shrink-0 lg:block">
				<div className="border-border animate-pulse space-y-4 border p-6">
					{[...Array(6)].map((_, i) => (
						<div key={i} className="bg-muted h-8 w-full" />
					))}
				</div>
			</div>
			<div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
				{[...Array(6)].map((_, i) => (
					<div key={i} className="border-border animate-pulse space-y-3 border p-6">
						<div className="bg-muted size-12" />
						<div className="bg-muted h-5 w-3/4" />
						<div className="bg-muted h-4 w-1/2" />
						<div className="bg-muted h-16 w-full" />
					</div>
				))}
			</div>
		</div>
	);
}

const FALLBACK_FILTERS: JobFilters = { locations: [], employmentTypes: [], categories: [] };

export async function JobsTemplate() {
	const [allRes, featuredRes, filtersRes] = await Promise.allSettled([
		getJobs({ limit: 1 }),
		getJobs({ isFeatured: true, limit: 1 }),
		getJobFilters()
	]);

	const totalJobs = allRes.status === "fulfilled" ? (allRes.value.pagination?.totalItems ?? 0) : 0;
	const featuredCount =
		featuredRes.status === "fulfilled" ? (featuredRes.value.pagination?.totalItems ?? 0) : 0;
	const filterAssets =
		filtersRes.status === "fulfilled"
			? (filtersRes.value.data ?? FALLBACK_FILTERS)
			: FALLBACK_FILTERS;

	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />

			<section className="bg-[#F8F8FD] py-14">
				<div className="mx-auto max-w-7xl px-6">
					<div className="flex flex-col gap-4">
						<div className="text-muted-foreground flex items-center gap-2 text-sm">
							<Briefcase className="size-4" />
							<span>
								<span className="text-foreground font-semibold">{totalJobs}</span> jobs listed
								&nbsp;·&nbsp;
								<span className="text-foreground font-semibold">{featuredCount}</span> featured
							</span>
						</div>
						<h1 className="font-display text-foreground text-[48px] leading-tight font-semibold">
							Find Your <span className="text-accent-blue">Dream Job</span>
						</h1>
						<p className="text-muted-foreground max-w-xl text-lg font-normal">
							Browse all available positions, filter by category or location, and apply in minutes.
						</p>
					</div>
				</div>
			</section>

			<main className="bg-background flex-1 py-12">
				<div className="mx-auto max-w-7xl px-6">
					<Suspense fallback={<JobsListingSkeleton />}>
						<JobsListing filterAssets={filterAssets} />
					</Suspense>
				</div>
			</main>

			<Footer />
		</div>
	);
}
