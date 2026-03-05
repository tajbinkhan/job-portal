import type { Metadata } from "next";
import { cache } from "react";

import { getJob, getJobs } from "@/lib/api/jobs";

import { JobDetailTemplate } from "@/templates/JobDetail/JobDetailTemplate";

export const revalidate = 300;

// React.cache deduplicates the fetch across generateMetadata + page render
const getCachedJob = cache(async (id: string) => getJob(id));

interface PageProps {
	params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
	try {
		const res = await getJobs({ limit: 500, sortBy: "createdAt", sortOrder: "desc" });
		return (res.data ?? []).map(job => ({ id: job.id }));
	} catch {
		return [];
	}
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const { id } = await params;
	const res = await getCachedJob(id);
	if (!res?.data) return {};
	const job = res.data;
	const APP_URL = process.env.NEXT_PUBLIC_FRONTEND_URL ?? "http://localhost:3000";
	const title = `${job.title} at ${job.company}`;
	const description = job.description.slice(0, 160);
	const ogUrl = `/og?title=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}`;
	return {
		title,
		description,
		alternates: { canonical: `${APP_URL}/jobs/${id}` },
		openGraph: {
			url: `${APP_URL}/jobs/${id}`,
			title: `${title} | QuickHire`,
			description,
			images: [{ url: ogUrl, width: 1200, height: 630, alt: title }]
		},
		twitter: { title: `${title} | QuickHire`, description, images: [ogUrl] }
	};
}

export default async function JobDetailPage({ params }: PageProps) {
	const { id } = await params;
	return <JobDetailTemplate id={id} />;
}

