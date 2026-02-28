import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { getJobFilters } from "@/lib/api/jobs";

import { route } from "@/routes/routes";
import { JobForm } from "@/templates/Dashboard/Jobs/JobForm";

const FALLBACK_FILTERS: JobFilters = { locations: [], categories: [], employmentTypes: [] };

export async function CreateJobTemplate() {
	const filtersRes = await getJobFilters().catch(() => null);
	const filterAssets = filtersRes?.data ?? FALLBACK_FILTERS;
	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div>
				<Link
					href={route.private.jobs}
					className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 text-sm transition-colors"
				>
					<ChevronLeft className="size-4" />
					Back to Jobs
				</Link>
				<h1 className="text-foreground text-2xl font-bold tracking-tight">Create Job</h1>
				<p className="text-muted-foreground mt-0.5 text-sm">
					Fill in the details below to publish a new job listing.
				</p>
			</div>

			{/* Form */}
			<div className="border-border border p-6">
				<JobForm mode="create" filterAssets={filterAssets} />
			</div>
		</div>
	);
}
