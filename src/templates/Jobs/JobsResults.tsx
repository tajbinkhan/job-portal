import { Search } from "lucide-react";
import Link from "next/link";

import { getJobs } from "@/lib/api/jobs";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { route } from "@/routes/routes";
import { JobCard } from "@/templates/Jobs/JobCard";

const PAGE_SIZE = 12;
type SortOption = "newest" | "oldest" | "alphabetical";

function getSortParams(sort: SortOption): [JobsQuery["sortBy"], JobsQuery["sortOrder"]] {
	switch (sort) {
		case "oldest":
			return ["createdAt", "asc"];
		case "alphabetical":
			return ["title", "asc"];
		default:
			return ["createdAt", "desc"];
	}
}

function buildPageUrl(params: Record<string, string>, page: number): string {
	const p = new URLSearchParams({ ...params, page: String(page) });
	return `${route.public.jobs}?${p.toString()}`;
}

interface JobsResultsProps {
	searchParams: Record<string, string>;
}

export async function JobsResults({ searchParams }: JobsResultsProps) {
	const search = searchParams.search ?? "";
	const category = searchParams.category ?? "";
	const location = searchParams.location ?? "";
	const employmentType = searchParams.employmentType ?? "";
	const sort = (searchParams.sort as SortOption) ?? "newest";
	const view = (searchParams.view as "grid" | "list") ?? "grid";
	const page = Math.max(1, parseInt(searchParams.page ?? "1", 10));

	const [sortBy, sortOrder] = getSortParams(sort);
	let jobs: Job[] = [];
	let pagination: Pagination | null = null;

	try {
		const res = await getJobs({
			search: search || undefined,
			category: category || undefined,
			location: location || undefined,
			employmentType: employmentType || undefined,
			page,
			limit: PAGE_SIZE,
			sortBy,
			sortOrder
		});
		jobs = res.data ?? [];
		pagination = res.pagination ?? null;
	} catch {
		// Return empty state on error – error.tsx handles fatal errors
	}

	const totalCount = pagination?.totalItems ?? 0;
	const hasPrev = page > 1;
	const hasNext = pagination?.hasNextPage ?? false;
	const showing = jobs.length;
	const from = showing > 0 ? (page - 1) * PAGE_SIZE + 1 : 0;
	const to = (page - 1) * PAGE_SIZE + showing;

	if (jobs.length === 0) {
		return (
			<div className="border-border flex flex-col items-center justify-center border py-24 text-center">
				<Search className="text-muted-foreground mb-4 size-12 opacity-40" />
				<h3 className="font-display text-foreground mb-2 text-2xl font-semibold">No jobs found</h3>
				<p className="text-muted-foreground mb-6 text-base">
					Try adjusting your search or filters to find what you&apos;re looking for.
				</p>
				<Button variant="outline" size="sm" asChild>
					<Link href={route.public.jobs}>Clear filters</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			{/* Result count */}
			<p className="text-muted-foreground text-sm">
				Showing{" "}
				<span className="text-foreground font-semibold">
					{from}–{to}
				</span>{" "}
				of <span className="text-foreground font-semibold">{totalCount}</span> jobs
			</p>

			{/* Job grid / list */}
			<div
				className={cn(
					"gap-4",
					view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col"
				)}
			>
				{jobs.map(job => (
					<JobCard key={job.id} job={job} view={view} />
				))}
			</div>

			{/* URL-based pagination */}
			{(hasPrev || hasNext) && (
				<div className="mt-6 flex items-center justify-center gap-3">
					{hasPrev ? (
						<Button variant="outline" size="sm" asChild>
							<Link href={buildPageUrl(searchParams, page - 1)}>← Previous</Link>
						</Button>
					) : (
						<Button variant="outline" size="sm" disabled>
							← Previous
						</Button>
					)}
					<span className="text-muted-foreground text-sm">Page {page}</span>
					{hasNext ? (
						<Button variant="outline" size="sm" asChild>
							<Link href={buildPageUrl(searchParams, page + 1)}>Next →</Link>
						</Button>
					) : (
						<Button variant="outline" size="sm" disabled>
							Next →
						</Button>
					)}
				</div>
			)}
		</div>
	);
}
