import type { Metadata } from "next";

import { HomeTemplate } from "@/templates/Home/HomeTemplate";

const APP_URL = process.env.NEXT_PUBLIC_FRONTEND_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
	title: "QuickHire - Find Your Dream Job",
	description:
		"Discover thousands of job opportunities across every industry. Search by role, location, or category and apply in minutes on QuickHire.",
	alternates: { canonical: APP_URL },
	openGraph: {
		url: APP_URL,
		title: "QuickHire - Find Your Dream Job",
		description:
			"Discover thousands of job opportunities across every industry. Search by role, location, or category and apply in minutes.",
		images: [{ url: "/og", width: 1200, height: 630 }]
	},
	twitter: {
		title: "QuickHire - Find Your Dream Job",
		description:
			"Discover thousands of job opportunities across every industry. Search by role, location, or category and apply in minutes.",
		images: ["/og"]
	}
};

export default function Home() {
	return <HomeTemplate />;
}

