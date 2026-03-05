export default function DashboardApplicationsLoading() {
	return (
		<div className="flex flex-col gap-6 p-6">
			<div className="flex items-center justify-between">
				<div className="bg-muted h-8 w-48 animate-pulse" />
				<div className="bg-muted h-9 w-36 animate-pulse" />
			</div>
			<div className="border-border overflow-hidden border">
				<div className="border-border border-b p-4">
					<div className="bg-muted h-9 w-64 animate-pulse" />
				</div>
				{[...Array(8)].map((_, i) => (
					<div key={i} className="border-border flex items-center gap-4 border-b px-4 py-3">
						<div className="flex flex-1 flex-col gap-2">
							<div className="bg-muted h-4 w-48 animate-pulse" />
							<div className="bg-muted h-3 w-64 animate-pulse" />
						</div>
						<div className="bg-muted h-5 w-24 animate-pulse" />
						<div className="bg-muted h-3 w-20 animate-pulse" />
					</div>
				))}
			</div>
		</div>
	);
}
