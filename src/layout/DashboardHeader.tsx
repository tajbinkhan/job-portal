interface DashboardHeaderProps {
	user: { name?: string | null; email: string; role: string };
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
	return (
		<header className="bg-background border-border flex h-16 shrink-0 items-center justify-between border-b px-8">
			<div />
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
