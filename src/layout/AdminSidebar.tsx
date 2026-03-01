"use client";

import { Briefcase, FileText, LayoutDashboard, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { logoutApi } from "@/lib/api/client";
import { cn } from "@/lib/utils";

import { route } from "@/routes/routes";

const NAV_ITEMS = [
	{ label: "Overview", href: route.private.dashboard, icon: LayoutDashboard, exact: true },
	{ label: "Jobs", href: route.private.jobs, icon: Briefcase, exact: false },
	{ label: "Applications", href: route.private.applications, icon: FileText, exact: false }
];

interface AdminSidebarProps {
	onClose?: () => void;
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
	const pathname = usePathname();
	const router = useRouter();

	async function handleLogout() {
		try {
			await logoutApi();
		} finally {
			router.push(route.protected.login);
			router.refresh();
		}
	}

	return (
		<aside className="bg-background border-border flex h-full w-64 shrink-0 flex-col border-r">
			<div className="border-border flex h-16 items-center border-b px-6">
				<Link href="/">
					<Image src="/images/logo.png" alt="QuickHire" width={120} height={36} />
				</Link>
			</div>
			<nav className="flex flex-1 flex-col gap-1 px-3 py-4">
				{NAV_ITEMS.map(item => {
					const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
					return (
						<Link
							key={item.href}
							href={item.href}
							onClick={onClose}
							className={cn(
								"flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors",
								isActive
									? "bg-primary/10 text-primary"
									: "text-muted-foreground hover:bg-muted hover:text-foreground"
							)}
						>
							<item.icon className="size-4 shrink-0" />
							{item.label}
						</Link>
					);
				})}
			</nav>
			<div className="border-border border-t px-3 py-4">
				<button
					onClick={handleLogout}
					className="text-muted-foreground hover:text-foreground flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-red-50"
				>
					<LogOut className="size-4 shrink-0" />
					Sign Out
				</button>
			</div>
		</aside>
	);
}
