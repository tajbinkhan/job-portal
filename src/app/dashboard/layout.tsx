import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getMe } from "@/lib/api/auth";

import { DashboardShell } from "@/layout/DashboardShell";
import { route } from "@/routes/routes";

export default async function DashboardLayout({ children }: GlobalLayoutProps) {
	// Server-side role verification (double-check beyond middleware)
	const headersList = await headers();
	const cookieHeader = headersList.get("cookie") ?? "";
	const user = await getMe(cookieHeader);

	if (!user) {
		redirect(route.protected.login);
	}

	if (user.role !== "ADMIN") {
		redirect("/");
	}

	return <DashboardShell user={user}>{children}</DashboardShell>;
}
