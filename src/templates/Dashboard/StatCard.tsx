interface StatCardProps {
	title: string;
	value: number;
	icon: React.ReactNode;
	bg: string;
}

export function StatCard({ title, value, icon, bg }: StatCardProps) {
	return (
		<div className={`border-border flex items-center gap-5 border p-6`}>
			<div className={`flex size-14 shrink-0 items-center justify-center ${bg}`}>{icon}</div>
			<div className="flex flex-col">
				<span className="text-muted-foreground text-sm">{title}</span>
				<span className="font-display text-foreground text-3xl font-semibold">{value}</span>
			</div>
		</div>
	);
}
