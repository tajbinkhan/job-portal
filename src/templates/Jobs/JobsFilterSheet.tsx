"use client";

import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { type FilterState, FiltersContent } from "@/templates/Jobs/JobsSidebar";

interface JobsFilterSheetProps {
	filters: FilterState;
	onChange: (filters: FilterState) => void;
	onClear: () => void;
	filterAssets: JobFilters;
}

export function JobsFilterSheet({
	filters,
	onChange,
	onClear,
	filterAssets
}: JobsFilterSheetProps) {
	const activeCount = [
		filters.category ? 1 : 0,
		filters.location ? 1 : 0,
		filters.employmentType ? 1 : 0
	].reduce((a, b) => a + b, 0);
	return (
		<div className="lg:hidden">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="sm" className="flex items-center gap-2">
						<SlidersHorizontal className="size-4" />
						Filters
						{activeCount > 0 && (
							<span className="bg-primary text-primary-foreground flex size-4 items-center justify-center text-[10px] font-bold">
								{activeCount}
							</span>
						)}
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="overflow-y-auto">
					<SheetHeader>
						<SheetTitle>Filter Jobs</SheetTitle>
					</SheetHeader>
					<div className="px-6 pb-6">
						<FiltersContent
							filters={filters}
							onChange={onChange}
							onClear={onClear}
							filterAssets={filterAssets}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
