import { headers } from "next/headers";

import { getApplications } from "@/lib/api/applications";

import { ApplicationsTable } from "@/templates/Dashboard/Applications/ApplicationsTable";

const PAGE_LIMIT = 20;

interface Props {
	page: number;
	search?: string;
	jobId?: string;
}

export default async function DashboardApplicationsTemplate({ page, search, jobId }: Props) {
	const headersList = await headers();
	const cookieHeader = headersList.get("cookie") ?? "";

	const result = await getApplications(cookieHeader, {
		page,
		limit: PAGE_LIMIT,
		sortBy: "createdAt",
		sortOrder: "desc",
		...(search ? { search } : {}),
		...(jobId ? { jobId } : {})
	});

	const applications: Application[] = result?.data ?? [];
	const totalPages = result?.pagination?.totalPages ?? 1;

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div>
				<h1 className="text-foreground text-2xl font-bold tracking-tight">Applications</h1>
				<p className="text-muted-foreground mt-0.5 text-sm">
					Browse all job applications submitted by candidates.
				</p>
			</div>

			{/* Table */}
			<ApplicationsTable applications={applications} totalPages={totalPages} currentPage={page} />
		</div>
	);
}
