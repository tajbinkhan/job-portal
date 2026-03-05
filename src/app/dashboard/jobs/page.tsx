import type { Metadata } from "next";

import { DashboardJobsTemplate } from "@/templates/Dashboard/Jobs/DashboardJobsTemplate";

export const metadata: Metadata = {
	title: "Jobs | Dashboard",
	robots: { index: false, follow: false }
};

interface Props {
	searchParams: Promise<{ page?: string }>;
}

export default async function DashboardJobsPage({ searchParams }: Props) {
	const { page: pageParam } = await searchParams;
	const page = Math.max(1, parseInt(pageParam ?? "1", 10));
	return <DashboardJobsTemplate page={page} />;
}

