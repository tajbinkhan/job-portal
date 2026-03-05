export default function JobDetailLoading() {
	return (
		<div className="flex min-h-screen flex-col">
			{/* Header skeleton */}
			<div className="bg-[#F8F8FD] py-12">
				<div className="mx-auto max-w-7xl px-6">
					<div className="bg-muted mb-8 h-4 w-48 animate-pulse" />
					<div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
						<div className="flex items-start gap-5">
							<div className="bg-muted size-16 animate-pulse" />
							<div className="flex flex-col gap-2">
								<div className="bg-muted h-10 w-64 animate-pulse" />
								<div className="bg-muted h-5 w-40 animate-pulse" />
								<div className="bg-muted h-4 w-80 animate-pulse" />
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Body skeleton */}
			<div className="bg-background flex-1 py-14">
				<div className="mx-auto max-w-7xl px-6">
					<div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
						<div className="flex flex-1 flex-col gap-6">
							<div className="bg-muted h-7 w-48 animate-pulse" />
							{[...Array(4)].map((_, i) => (
								<div key={i} className="bg-muted h-4 w-full animate-pulse" />
							))}
						</div>
						<div className="border-border hidden w-72 animate-pulse border p-6 lg:block xl:w-80">
							<div className="bg-muted mb-4 h-6 w-32" />
							{[...Array(4)].map((_, i) => (
								<div key={i} className="bg-muted mb-3 h-12 w-full" />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
