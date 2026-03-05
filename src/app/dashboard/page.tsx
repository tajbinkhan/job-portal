import type { Metadata } from "next";

import { DashboardTemplate } from "@/templates/Dashboard/DashboardTemplate";

export const metadata: Metadata = {
	title: "Dashboard | QuickHire Admin",
	robots: { index: false, follow: false }
};

export default function DashboardPage() {
	return <DashboardTemplate />;
}

