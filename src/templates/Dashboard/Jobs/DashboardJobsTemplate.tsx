import { Plus } from "lucide-react";
import Link from "next/link";

import { getJobs } from "@/lib/api/jobs";

import { Button } from "@/components/ui/button";

import { route } from "@/routes/routes";
import { JobsTable } from "@/templates/Dashboard/Jobs/JobsTable";

const PAGE_LIMIT = 20;

interface Props {
	page: number;
}

export async function DashboardJobsTemplate({ page }: Props) {
	const result = await getJobs({
		page,
		limit: PAGE_LIMIT,
		sortBy: "createdAt",
		sortOrder: "desc"
	});

	const jobs: Job[] = result?.data ?? [];
	const totalPages = result?.pagination?.totalPages ?? 1;

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-foreground text-2xl font-bold tracking-tight">Jobs</h1>
					<p className="text-muted-foreground mt-0.5 text-sm">
						Manage all job listings — create, edit or remove them.
					</p>
				</div>
				<Link href={route.private.createJob}>
					<Button className="w-fit bg-indigo-700 hover:bg-indigo-800">
						<Plus className="size-4" />
						Add New Job
					</Button>
				</Link>
			</div>

			{/* Table */}
			<JobsTable jobs={jobs} totalPages={totalPages} currentPage={page} />
		</div>
	);
}
