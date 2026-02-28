"use client";

import { cn } from "@/lib/utils";

export interface FilterState {
	category: string;
	location: string;
	employmentType: string;
}

interface FiltersContentProps {
	filters: FilterState;
	onChange: (filters: FilterState) => void;
	onClear: () => void;
	filterAssets: JobFilters;
}

export function FiltersContent({ filters, onChange, onClear, filterAssets }: FiltersContentProps) {
	function toggleEmploymentType(type: string) {
		onChange({ ...filters, employmentType: filters.employmentType === type ? "" : type });
	}
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-3">
				<h3 className="font-display text-foreground text-base font-semibold">Category</h3>
				<div className="flex flex-col gap-1">
					<button
						onClick={() => onChange({ ...filters, category: "" })}
						className={cn(
							"flex w-full items-center px-3 py-2 text-left text-sm font-normal transition-colors",
							filters.category === ""
								? "bg-primary text-primary-foreground"
								: "text-foreground hover:bg-muted"
						)}
					>
						All Categories
					</button>
					{filterAssets.categories.map(cat => (
						<button
							key={cat}
							onClick={() => onChange({ ...filters, category: cat })}
							className={cn(
								"flex w-full items-center px-3 py-2 text-left text-sm font-normal transition-colors",
								filters.category === cat
									? "bg-primary text-primary-foreground"
									: "text-foreground hover:bg-muted"
							)}
						>
							{cat}
						</button>
					))}
				</div>
			</div>
			<hr className="border-border" />
			<div className="flex flex-col gap-3">
				<h3 className="font-display text-foreground text-base font-semibold">Location</h3>
				<div className="flex max-h-52 flex-col gap-1 overflow-y-auto">
					<button
						onClick={() => onChange({ ...filters, location: "" })}
						className={cn(
							"flex w-full items-center px-3 py-2 text-left text-sm font-normal transition-colors",
							filters.location === ""
								? "bg-primary text-primary-foreground"
								: "text-foreground hover:bg-muted"
						)}
					>
						All Locations
					</button>
					{filterAssets.locations.map(loc => (
						<button
							key={loc}
							onClick={() => onChange({ ...filters, location: loc })}
							className={cn(
								"flex w-full items-center px-3 py-2 text-left text-sm font-normal transition-colors",
								filters.location === loc
									? "bg-primary text-primary-foreground"
									: "text-foreground hover:bg-muted"
							)}
						>
							{loc}
						</button>
					))}
				</div>
			</div>
			<hr className="border-border" />
			<div className="flex flex-col gap-3">
				<h3 className="font-display text-foreground text-base font-semibold">Job Type</h3>
				<div className="flex flex-col gap-2">
					{filterAssets.employmentTypes.map(type => (
						<label key={type} className="flex cursor-pointer items-center gap-3 text-sm">
							<input
								type="radio"
								name="employmentType"
								checked={filters.employmentType === type}
								onChange={() => toggleEmploymentType(type)}
								className="border-border accent-primary size-4 cursor-pointer"
							/>
							<span className="text-foreground font-normal">{type}</span>
						</label>
					))}
				</div>
			</div>
			<hr className="border-border" />
			<button
				onClick={onClear}
				className="text-primary text-left text-sm font-semibold hover:underline"
			>
				Clear all filters
			</button>
		</div>
	);
}

interface JobsSidebarProps {
	filters: FilterState;
	onChange: (filters: FilterState) => void;
	onClear: () => void;
	filterAssets: JobFilters;
}

export function JobsSidebar({ filters, onChange, onClear, filterAssets }: JobsSidebarProps) {
	return (
		<aside className="hidden w-64 shrink-0 lg:block">
			<div className="border-border border p-6">
				<h2 className="font-display text-foreground mb-6 text-xl font-semibold">Filter Jobs</h2>
				<FiltersContent
					filters={filters}
					onChange={onChange}
					onClear={onClear}
					filterAssets={filterAssets}
				/>
			</div>
		</aside>
	);
}
