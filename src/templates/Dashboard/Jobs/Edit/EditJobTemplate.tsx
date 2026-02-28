import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getJob, getJobFilters } from "@/lib/api/jobs";

import { route } from "@/routes/routes";
import { JobForm } from "@/templates/Dashboard/Jobs/JobForm";

const FALLBACK_FILTERS: JobFilters = { locations: [], categories: [], employmentTypes: [] };

interface Props {
	id: string;
}

export async function EditJobTemplate({ id }: Props) {
	const [result, filtersRes] = await Promise.all([getJob(id), getJobFilters().catch(() => null)]);

	if (!result?.data) notFound();

	const job = result.data;
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
				<h1 className="text-foreground text-2xl font-bold tracking-tight">Edit Job</h1>
				<p className="text-muted-foreground mt-0.5 max-w-xl truncate text-sm">
					{job.title} — {job.company}
				</p>
			</div>

			{/* Form */}
			<div className="border-border border p-6">
				<JobForm mode="edit" jobId={job.id} defaultValues={job} filterAssets={filterAssets} />
			</div>
		</div>
	);
}
