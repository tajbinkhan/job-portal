import type { Metadata } from "next";

import DashboardApplicationsTemplate from "@/templates/Dashboard/Applications/DashboardApplicationsTemplate";

export const metadata: Metadata = {
	title: "Applications | Dashboard",
	robots: { index: false, follow: false }
};

interface Props {
	searchParams: Promise<{ page?: string; search?: string; jobId?: string }>;
}

export default async function DashboardApplicationsPage({ searchParams }: Props) {
	const { page: pageParam, search, jobId } = await searchParams;
	const page = Math.max(1, parseInt(pageParam ?? "1", 10));
	return <DashboardApplicationsTemplate page={page} search={search} jobId={jobId} />;
}
