import type { Metadata } from "next";

import { JobsTemplate } from "@/templates/Jobs/JobsTemplate";

const APP_URL = process.env.NEXT_PUBLIC_FRONTEND_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
	title: "Browse Jobs",
	description:
		"Search and filter thousands of job opportunities across categories and locations. Find your perfect role on QuickHire.",
	alternates: { canonical: `${APP_URL}/jobs` },
	robots: { index: true, follow: true },
	openGraph: {
		url: `${APP_URL}/jobs`,
		title: "Browse Jobs | QuickHire",
		description:
			"Search and filter thousands of job opportunities across categories and locations.",
		images: [{ url: `/og?title=Browse+Jobs`, width: 1200, height: 630 }]
	},
	twitter: {
		title: "Browse Jobs | QuickHire",
		description:
			"Search and filter thousands of job opportunities across categories and locations.",
		images: [`/og?title=Browse+Jobs`]
	}
};

type Props = { searchParams: Promise<Record<string, string>> };

export default async function JobsPage({ searchParams }: Props) {
	const params = await searchParams;
	return <JobsTemplate searchParams={params} />;
}

