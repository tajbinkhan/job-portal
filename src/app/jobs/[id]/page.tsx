import { getJob } from "@/lib/api/jobs";

import { JobDetailTemplate } from "@/templates/JobDetail/JobDetailTemplate";

interface PageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
	const { id } = await params;
	const res = await getJob(id);
	if (!res?.data) return {};
	const job = res.data;
	return {
		title: `${job.title} at ${job.company} | QuickHire`,
		description: job.description.slice(0, 160)
	};
}

export default async function JobDetailPage({ params }: PageProps) {
	const { id } = await params;
	return <JobDetailTemplate id={id} />;
}

