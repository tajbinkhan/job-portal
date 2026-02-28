import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getMe } from "@/lib/api/auth";

import { AdminSidebar } from "@/layout/AdminSidebar";
import { DashboardHeader } from "@/layout/DashboardHeader";
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

	return (
		<div className="flex h-screen overflow-hidden">
			<AdminSidebar />
			<div className="flex flex-1 flex-col overflow-auto">
				<DashboardHeader user={user} />

				{/* Main content */}
				<main className="flex-1 overflow-auto p-8">{children}</main>
			</div>
		</div>
	);
}
