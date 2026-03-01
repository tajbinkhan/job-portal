"use client";

import { useState } from "react";

import { AdminSidebar } from "@/layout/AdminSidebar";
import { DashboardHeader } from "@/layout/DashboardHeader";

interface DashboardShellProps {
	user: { name?: string | null; email: string; role: string };
	children: React.ReactNode;
}

export function DashboardShell({ user, children }: DashboardShellProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Mobile overlay backdrop */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-20 bg-black/40 md:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar — slide-over on mobile, always visible on md+ */}
			<div
				className={`fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<AdminSidebar onClose={() => setSidebarOpen(false)} />
			</div>

			{/* Main area */}
			<div className="flex min-w-0 flex-1 flex-col overflow-auto">
				<DashboardHeader user={user} onMenuClick={() => setSidebarOpen(prev => !prev)} />
				<main className="flex-1 overflow-auto p-4 md:p-8">{children}</main>
			</div>
		</div>
	);
}
