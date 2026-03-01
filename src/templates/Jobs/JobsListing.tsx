"use client";

import { ChevronDown, LayoutGrid, List, Loader2, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getJobsApi } from "@/lib/api/client";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";

import { route } from "@/routes/routes";
import { JobCard } from "@/templates/Jobs/JobCard";
import { JobsFilterSheet } from "@/templates/Jobs/JobsFilterSheet";
import { type FilterState, JobsSidebar } from "@/templates/Jobs/JobsSidebar";

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

interface JobsListingProps {
	initialCategory?: string;
	filterAssets: JobFilters;
}

export function JobsListing({ initialCategory = "", filterAssets }: JobsListingProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const search = searchParams.get("search") ?? "";
	const categoryParam = searchParams.get("category") ?? initialCategory;
	const locationParam = searchParams.get("location") ?? "";
	const employmentTypeParam = searchParams.get("employmentType") ?? "";

	const [sort, setSort] = useState<SortOption>("newest");
	const [view, setView] = useState<"grid" | "list">("grid");
	const [page, setPage] = useState(1);
	const [jobs, setJobs] = useState<Job[]>([]);
	const [pagination, setPagination] = useState<Pagination | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	// Local controlled value for the search input — debounced before hitting the URL
	const [searchInput, setSearchInput] = useState(search);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	// Prevents the URL-sync effect from overwriting input when WE triggered the URL change
	const skipSyncRef = useRef(false);

	// Keep local input in sync when URL search param changes externally (e.g. Hero navigation)
	useEffect(() => {
		if (skipSyncRef.current) {
			skipSyncRef.current = false;
			return;
		}
		setSearchInput(search);
	}, [search]);

	// Cleanup debounce timer on unmount
	useEffect(() => {
		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, []);

	const filterKey = [search, categoryParam, locationParam, employmentTypeParam, sort].join("|");
	const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
	if (prevFilterKey !== filterKey) {
		setPrevFilterKey(filterKey);
		setPage(1);
	}

	const filters: FilterState = {
		category: categoryParam,
		location: locationParam,
		employmentType: employmentTypeParam
	};

	function updateUrl(category: string, location: string, q: string, employmentType: string) {
		const params = new URLSearchParams();
		if (q) params.set("search", q);
		if (category) params.set("category", category);
		if (location) params.set("location", location);
		if (employmentType) params.set("employmentType", employmentType);
		const query = params.toString();
		router.replace(`${route.public.jobs}${query ? `?${query}` : ""}`, { scroll: false });
	}

	function handleFiltersChange(next: FilterState) {
		updateUrl(next.category, next.location, search, next.employmentType);
	}
	function handleSearchChange(value: string) {
		setSearchInput(value);
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			skipSyncRef.current = true;
			updateUrl(categoryParam, locationParam, value, employmentTypeParam);
		}, 400);
	}
	function handleClear() {
		setSearchInput("");
		if (debounceRef.current) clearTimeout(debounceRef.current);
		router.replace(`${route.public.jobs}`, { scroll: false });
	}

	useEffect(() => {
		let cancelled = false;
		async function doFetch() {
			if (page === 1) setIsLoading(true);
			else setIsLoadingMore(true);
			try {
				const [sortBy, sortOrder] = getSortParams(sort);
				const res = await getJobsApi({
					search: search || undefined,
					category: categoryParam || undefined,
					location: locationParam || undefined,
					employmentType: employmentTypeParam || undefined,
					page,
					limit: PAGE_SIZE,
					sortBy,
					sortOrder
				});
				if (cancelled) return;
				const newJobs = res.data ?? [];
				setJobs(prev => (page === 1 ? newJobs : [...prev, ...newJobs]));
				setPagination(res.pagination ?? null);
			} catch {
				// keep previous data on error
			} finally {
				if (!cancelled) {
					setIsLoading(false);
					setIsLoadingMore(false);
				}
			}
		}
		doFetch();
		return () => {
			cancelled = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterKey, page]);

	const hasMore = pagination ? pagination.hasNextPage : false;
	const totalCount = pagination?.totalItems ?? 0;
	const hasActiveFilters =
		!!filters.category || !!filters.location || !!filters.employmentType || !!search;

	return (
		<div className="flex gap-8">
			<JobsSidebar
				filters={filters}
				onChange={handleFiltersChange}
				onClear={handleClear}
				filterAssets={filterAssets}
			/>
			<div className="min-w-0 flex-1">
				{/* Top bar */}
				<div className="mb-6 flex flex-wrap items-center gap-3">
					<JobsFilterSheet
						filters={filters}
						onChange={handleFiltersChange}
						onClear={handleClear}
						filterAssets={filterAssets}
					/>
					<div className="relative min-w-35 flex-1">
						<Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
						<Input
							type="text"
							placeholder="Search jobs, companies, skills…"
							value={searchInput}
							onChange={e => handleSearchChange(e.target.value)}
							className="h-9 w-full pr-8 pl-9"
						/>
						{searchInput && (
							<button
								type="button"
								onClick={() => handleSearchChange("")}
								className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2"
								aria-label="Clear search"
							>
								<X className="size-3.5" />
							</button>
						)}
					</div>
					<div className="flex flex-none items-center gap-3">
						<Select
							value={sort}
							onValueChange={v => {
								setSort(v as SortOption);
								setPage(1);
							}}
						>
							<SelectTrigger size="default" className="h-9 w-auto min-w-35">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="newest">Newest first</SelectItem>
								<SelectItem value="oldest">Oldest first</SelectItem>
								<SelectItem value="alphabetical">A → Z</SelectItem>
							</SelectContent>
						</Select>
						<div className="border-border flex border">
							<button
								onClick={() => setView("grid")}
								className={cn(
									"flex items-center justify-center p-2 transition-colors",
									view === "grid"
										? "bg-primary text-primary-foreground"
										: "text-muted-foreground hover:bg-muted"
								)}
								aria-label="Grid view"
							>
								<LayoutGrid className="size-4" />
							</button>
							<button
								onClick={() => setView("list")}
								className={cn(
									"flex items-center justify-center p-2 transition-colors",
									view === "list"
										? "bg-primary text-primary-foreground"
										: "text-muted-foreground hover:bg-muted"
								)}
								aria-label="List view"
							>
								<List className="size-4" />
							</button>
						</div>
					</div>
				</div>

				{/* Result count + active filter chips */}
				<div className="mb-4 flex flex-wrap items-center gap-2">
					{!isLoading && (
						<p className="text-muted-foreground text-sm">
							Showing <span className="text-foreground font-semibold">{jobs.length}</span> of{" "}
							<span className="text-foreground font-semibold">{totalCount}</span> jobs
						</p>
					)}
					{filters.category && (
						<span className="bg-primary/10 text-primary flex items-center gap-1 px-2 py-0.5 text-xs font-medium">
							{filters.category}
							<button
								onClick={() => handleFiltersChange({ ...filters, category: "" })}
								className="ml-0.5 hover:opacity-60"
							>
								×
							</button>
						</span>
					)}
					{filters.location && (
						<span className="bg-primary/10 text-primary flex items-center gap-1 px-2 py-0.5 text-xs font-medium">
							{filters.location}
							<button
								onClick={() => handleFiltersChange({ ...filters, location: "" })}
								className="ml-0.5 hover:opacity-60"
							>
								×
							</button>
						</span>
					)}
					{filters.employmentType && (
						<span className="bg-primary/10 text-primary flex items-center gap-1 px-2 py-0.5 text-xs font-medium">
							{filters.employmentType}
							<button
								onClick={() => handleFiltersChange({ ...filters, employmentType: "" })}
								className="ml-0.5 hover:opacity-60"
							>
								×
							</button>
						</span>
					)}
					{hasActiveFilters && (
						<button onClick={handleClear} className="text-muted-foreground text-xs hover:underline">
							Clear all
						</button>
					)}
				</div>

				{isLoading ? (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
						{[...Array(6)].map((_, i) => (
							<div key={i} className="border-border animate-pulse space-y-3 border p-6">
								<div className="bg-muted size-12" />
								<div className="bg-muted h-5 w-3/4" />
								<div className="bg-muted h-4 w-1/2" />
								<div className="bg-muted h-16 w-full" />
							</div>
						))}
					</div>
				) : jobs.length === 0 ? (
					<div className="border-border flex flex-col items-center justify-center border py-24 text-center">
						<Search className="text-muted-foreground mb-4 size-12 opacity-40" />
						<h3 className="font-display text-foreground mb-2 text-2xl font-semibold">
							No jobs found
						</h3>
						<p className="text-muted-foreground mb-6 text-base">
							Try adjusting your search or filters to find what you&apos;re looking for.
						</p>
						<Button variant="outline" size="sm" onClick={handleClear}>
							Clear filters
						</Button>
					</div>
				) : (
					<>
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
						{hasMore && (
							<div className="mt-10 flex justify-center">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setPage(p => p + 1)}
									disabled={isLoadingMore}
									className="flex items-center gap-2"
								>
									{isLoadingMore ? (
										<Loader2 className="size-4 animate-spin" />
									) : (
										<ChevronDown className="size-4" />
									)}
									{isLoadingMore ? "Loading…" : "Load more jobs"}
								</Button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
