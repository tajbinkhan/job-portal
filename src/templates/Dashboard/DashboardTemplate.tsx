import { Briefcase, Plus, Star } from "lucide-react";
import Link from "next/link";

import { getJobs } from "@/lib/api/jobs";

import { Button } from "@/components/ui/button";

import { route } from "@/routes/routes";
import { StatCard } from "@/templates/Dashboard/StatCard";

export async function DashboardTemplate() {
	const [allRes, featuredRes, recentRes] = await Promise.allSettled([
		getJobs({ limit: 1 }),
		getJobs({ isFeatured: true, limit: 1 }),
		getJobs({ limit: 5, sortBy: "createdAt", sortOrder: "desc" })
	]);

	const totalJobs = allRes.status === "fulfilled" ? (allRes.value.pagination?.totalItems ?? 0) : 0;
	const featuredJobs =
		featuredRes.status === "fulfilled" ? (featuredRes.value.pagination?.totalItems ?? 0) : 0;
	const recentJobs = recentRes.status === "fulfilled" ? (recentRes.value.data ?? []) : [];

	return (
		<div className="flex flex-col gap-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-display text-foreground text-3xl font-semibold">Dashboard</h1>
					<p className="text-muted-foreground mt-1 text-sm">
						Overview of your job listings and activity.
					</p>
				</div>
				<Button asChild className="bg-indigo-700 hover:bg-indigo-800">
					<Link href={route.private.createJob} className="flex items-center gap-2">
						<Plus className="size-4" />
						Add New Job
					</Link>
				</Button>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				<StatCard
					title="Total Jobs"
					value={totalJobs}
					icon={<Briefcase className="size-6 text-indigo-600" />}
					bg="bg-indigo-50"
				/>
				<StatCard
					title="Featured Jobs"
					value={featuredJobs}
					icon={<Star className="size-6 text-amber-500" />}
					bg="bg-amber-50"
				/>
				<StatCard
					title="Regular Jobs"
					value={totalJobs - featuredJobs}
					icon={<Briefcase className="size-6 text-emerald-600" />}
					bg="bg-emerald-50"
				/>
			</div>

			{/* Recent Jobs */}
			<div className="border-border border">
				<div className="border-border flex items-center justify-between border-b px-6 py-4">
					<h2 className="font-display text-foreground text-lg font-semibold">
						Recently Added Jobs
					</h2>
					<Link href={route.private.jobs} className="text-sm text-indigo-700 hover:underline">
						View all →
					</Link>
				</div>
				{recentJobs.length === 0 ? (
					<div className="px-6 py-10 text-center">
						<p className="text-muted-foreground text-sm">No jobs added yet.</p>
					</div>
				) : (
					<div className="divide-border divide-y">
						{recentJobs.map(job => (
							<div key={job.id} className="flex items-center justify-between px-6 py-4">
								<div className="flex flex-col gap-0.5">
									<p className="text-foreground text-sm font-semibold">{job.title}</p>
									<p className="text-muted-foreground text-xs">
										{job.company} · {job.location} · {job.category}
									</p>
								</div>
								<div className="flex items-center gap-3">
									{job.isFeatured && (
										<span className="bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
											Featured
										</span>
									)}
									<span className="border-border bg-muted/50 border px-2 py-0.5 text-xs text-gray-600">
										{job.employmentType}
									</span>
									<Link
										href={route.private.editJob(job.id)}
										className="text-xs text-indigo-700 hover:underline"
									>
										Edit
									</Link>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
