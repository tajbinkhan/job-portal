"use client";

import { LayoutGrid, List, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";

import { route } from "@/routes/routes";
import { JobsFilterSheet } from "@/templates/Jobs/JobsFilterSheet";
import { type FilterState, JobsSidebar } from "@/templates/Jobs/JobsSidebar";

type SortOption = "newest" | "oldest" | "alphabetical";

interface JobsListingProps {
	/** Filter options to populate sidebar / sheet */
	filterAssets: JobFilters;
	/** Server-rendered results passed via Suspense from JobsTemplate */
	children: React.ReactNode;
}

function updateUrl(
	router: ReturnType<typeof useRouter>,
	params: {
		search?: string;
		category?: string;
		location?: string;
		employmentType?: string;
		sort?: string;
		view?: string;
		page?: string;
	}
) {
	const p = new URLSearchParams();
	if (params.search) p.set("search", params.search);
	if (params.category) p.set("category", params.category);
	if (params.location) p.set("location", params.location);
	if (params.employmentType) p.set("employmentType", params.employmentType);
	if (params.sort && params.sort !== "newest") p.set("sort", params.sort);
	if (params.view && params.view !== "grid") p.set("view", params.view);
	if (params.page && params.page !== "1") p.set("page", params.page);
	const qs = p.toString();
	router.replace(`${route.public.jobs}${qs ? `?${qs}` : ""}`, { scroll: false });
}

export function JobsListing({ filterAssets, children }: JobsListingProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const search = searchParams.get("search") ?? "";
	const category = searchParams.get("category") ?? "";
	const location = searchParams.get("location") ?? "";
	const employmentType = searchParams.get("employmentType") ?? "";
	const sort = (searchParams.get("sort") as SortOption) ?? "newest";
	const view = (searchParams.get("view") as "grid" | "list") ?? "grid";

	// Initialized from URL so Hero-form navigations hydrate the input on mount.
	// All subsequent updates go through event handlers directly.
	const [searchInput, setSearchInput] = useState(search);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, []);

	const filters: FilterState = { category, location, employmentType };

	function getAll() {
		return { search, category, location, employmentType, sort, view };
	}

	function handleFiltersChange(next: FilterState) {
		updateUrl(router, { ...getAll(), ...next, page: "1" });
	}

	function handleSearchChange(value: string) {
		setSearchInput(value);
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			updateUrl(router, { ...getAll(), search: value, page: "1" });
		}, 400);
	}

	function handleClear() {
		setSearchInput("");
		if (debounceRef.current) clearTimeout(debounceRef.current);
		router.replace(route.public.jobs, { scroll: false });
	}

	function handleSortChange(value: SortOption) {
		updateUrl(router, { ...getAll(), sort: value, page: "1" });
	}

	function handleViewChange(v: "grid" | "list") {
		updateUrl(router, { ...getAll(), view: v });
	}

	const hasActiveFilters = !!category || !!location || !!employmentType || !!search;

	return (
		<div className="flex gap-8">
			{/* Sidebar (desktop) */}
			<JobsSidebar
				filters={filters}
				onChange={handleFiltersChange}
				onClear={handleClear}
				filterAssets={filterAssets}
			/>

			{/* Right column */}
			<div className="min-w-0 flex-1">
				{/* Top bar */}
				<div className="mb-6 flex flex-wrap items-center gap-3">
					<JobsFilterSheet
						filters={filters}
						onChange={handleFiltersChange}
						onClear={handleClear}
						filterAssets={filterAssets}
					/>

					{/* Search input */}
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

					{/* Sort */}
					<Select value={sort} onValueChange={v => handleSortChange(v as SortOption)}>
						<SelectTrigger size="default" className="h-9 w-auto min-w-35">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="newest">Newest first</SelectItem>
							<SelectItem value="oldest">Oldest first</SelectItem>
							<SelectItem value="alphabetical">A → Z</SelectItem>
						</SelectContent>
					</Select>

					{/* View toggle */}
					<div className="border-border flex border">
						<button
							onClick={() => handleViewChange("grid")}
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
							onClick={() => handleViewChange("list")}
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

				{/* Active filter chips */}
				{hasActiveFilters && (
					<div className="mb-4 flex flex-wrap items-center gap-2">
						{category && (
							<span className="bg-primary/10 text-primary flex items-center gap-1 px-2 py-0.5 text-xs font-medium">
								{category}
								<button
									onClick={() => handleFiltersChange({ ...filters, category: "" })}
									className="ml-0.5 hover:opacity-60"
								>
									×
								</button>
							</span>
						)}
						{location && (
							<span className="bg-primary/10 text-primary flex items-center gap-1 px-2 py-0.5 text-xs font-medium">
								{location}
								<button
									onClick={() => handleFiltersChange({ ...filters, location: "" })}
									className="ml-0.5 hover:opacity-60"
								>
									×
								</button>
							</span>
						)}
						{employmentType && (
							<span className="bg-primary/10 text-primary flex items-center gap-1 px-2 py-0.5 text-xs font-medium">
								{employmentType}
								<button
									onClick={() => handleFiltersChange({ ...filters, employmentType: "" })}
									className="ml-0.5 hover:opacity-60"
								>
									×
								</button>
							</span>
						)}
						<button onClick={handleClear} className="text-muted-foreground text-xs hover:underline">
							Clear all
						</button>
					</div>
				)}

				{/* Server-rendered results streamed via Suspense in JobsTemplate */}
				{children}
			</div>
		</div>
	);
}
