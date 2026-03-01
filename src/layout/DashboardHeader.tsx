import { Menu } from "lucide-react";

interface DashboardHeaderProps {
	user: { name?: string | null; email: string; role: string };
	onMenuClick?: () => void;
}

export function DashboardHeader({ user, onMenuClick }: DashboardHeaderProps) {
	return (
		<header className="bg-background border-border flex h-16 shrink-0 items-center justify-between border-b px-4 md:px-8">
			{/* Hamburger — mobile only */}
			<button
				className="flex items-center justify-center rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
				onClick={onMenuClick}
				aria-label="Open menu"
			>
				<Menu className="size-5" />
			</button>
			{/* Spacer on desktop */}
			<div className="hidden md:block" />
			<div className="flex items-center gap-3">
				<div className="flex flex-col items-end">
					<p className="text-foreground text-sm font-semibold">{user.name ?? user.email}</p>
					<p className="text-muted-foreground text-xs">{user.role}</p>
				</div>
				<div className="bg-primary/10 text-primary flex size-9 items-center justify-center text-sm font-bold">
					{(user.name ?? user.email).charAt(0).toUpperCase()}
				</div>
			</div>
		</header>
	);
}
