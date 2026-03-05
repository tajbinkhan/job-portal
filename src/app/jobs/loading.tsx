export default function JobsLoading() {
	return (
		<div className="flex min-h-screen flex-col">
			<div className="bg-[#F8F8FD] py-14">
				<div className="mx-auto max-w-7xl px-6">
					<div className="flex flex-col gap-4">
						<div className="bg-muted h-4 w-48 animate-pulse" />
						<div className="bg-muted h-12 w-80 animate-pulse" />
						<div className="bg-muted h-5 w-64 animate-pulse" />
					</div>
				</div>
			</div>
			<div className="bg-background flex-1 py-12">
				<div className="mx-auto max-w-7xl px-6">
					<div className="flex gap-8">
						<div className="hidden w-64 shrink-0 lg:block">
							<div className="border-border animate-pulse space-y-4 border p-6">
								{[...Array(6)].map((_, i) => (
									<div key={i} className="bg-muted h-8 w-full" />
								))}
							</div>
						</div>
						<div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
							{[...Array(9)].map((_, i) => (
								<div key={i} className="border-border animate-pulse space-y-3 border p-6">
									<div className="bg-muted size-12" />
									<div className="bg-muted h-5 w-3/4" />
									<div className="bg-muted h-4 w-1/2" />
									<div className="bg-muted h-16 w-full" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
