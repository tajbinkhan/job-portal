import { ArrowRight, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { TAG_COLORS } from "@/lib/jobs-data";
import { cn } from "@/lib/utils";

import { route } from "@/routes/routes";

interface JobCardProps {
	job: Job;
	view: "grid" | "list";
}

const COMPANY_COLORS = [
	"bg-blue-100 text-blue-700",
	"bg-indigo-100 text-indigo-700",
	"bg-purple-100 text-purple-700",
	"bg-green-100 text-green-700",
	"bg-orange-100 text-orange-700",
	"bg-red-100 text-red-700",
	"bg-yellow-100 text-yellow-700",
	"bg-pink-100 text-pink-700",
	"bg-teal-100 text-teal-700",
	"bg-cyan-100 text-cyan-700"
];

function getCompanyColor(name: string): string {
	let hash = 0;
	for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) & 0xffffffff;
	return COMPANY_COLORS[Math.abs(hash) % COMPANY_COLORS.length];
}

function CompanyLogo({
	company,
	logoUrl,
	size = "md"
}: {
	company: string;
	logoUrl: string | null;
	size?: "sm" | "md";
}) {
	const dimension = size === "sm" ? "size-12" : "size-14";
	if (logoUrl) {
		return (
			<div
				className={cn(dimension, "shrink-0 overflow-hidden")}
				style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
			>
				<Image
					src={logoUrl}
					alt={company}
					width={56}
					height={56}
					className="h-full w-full object-cover"
				/>
			</div>
		);
	}
	return (
		<div
			className={cn(
				dimension,
				"flex shrink-0 items-center justify-center text-lg font-bold",
				getCompanyColor(company)
			)}
			style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
		>
			{company.charAt(0).toUpperCase()}
		</div>
	);
}

function formatDate(dateStr: string) {
	const date = new Date(dateStr);
	const now = new Date();
	const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
	if (diffDays === 0) return "Today";
	if (diffDays === 1) return "Yesterday";
	if (diffDays < 7) return `${diffDays} days ago`;
	if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
	return `${Math.floor(diffDays / 30)} months ago`;
}

export function JobCard({ job, view }: JobCardProps) {
	const tagColor = TAG_COLORS[job.category] ?? "bg-gray-100 text-gray-700";

	if (view === "list") {
		return (
			<Link
				href={`${route.public.jobs}/${job.id}`}
				className="border-border hover:border-primary group flex items-center gap-5 border bg-white p-5 transition-all hover:shadow-md"
			>
				<CompanyLogo company={job.company} logoUrl={job.companyLogoUrl} />
				<div className="flex min-w-0 flex-1 flex-col gap-1">
					<div className="flex flex-wrap items-center gap-2">
						<h3 className="text-foreground font-display truncate text-lg font-semibold">
							{job.title}
						</h3>
						{job.isFeatured && (
							<span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-semibold">
								Featured
							</span>
						)}
					</div>
					<p className="text-foreground text-lg font-semibold">{job.company}</p>
					<div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-4 text-sm">
						<span className="text-muted-foreground mt-0.5 flex items-center gap-1 text-base font-normal">
							<MapPin className="size-3.5" />
							{job.location}
						</span>
						<span className="text-muted-foreground mt-0.5 flex items-center gap-1 text-base font-normal">
							<Clock className="size-3.5" />
							{formatDate(job.createdAt)}
						</span>
					</div>
				</div>
				<div className="hidden shrink-0 flex-col items-end gap-3 sm:flex">
					<span className="text-primary border-primary border px-2 py-0.5 text-sm font-normal">
						{job.employmentType}
					</span>
					<div className="flex flex-wrap justify-end gap-1.5">
						{job.tags.slice(0, 3).map(tag => (
							<span
								key={tag}
								className={cn("rounded-full px-3 py-1 text-xs font-semibold", tagColor)}
							>
								{tag}
							</span>
						))}
					</div>
				</div>
				<ArrowRight className="text-primary hidden size-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 md:block" />
			</Link>
		);
	}

	return (
		<Link
			href={`${route.public.jobs}/${job.id}`}
			className="border-border hover:border-primary flex flex-col gap-4 border bg-white p-6 transition-all hover:shadow-md"
		>
			<div className="flex items-start justify-between gap-2">
				<CompanyLogo company={job.company} logoUrl={job.companyLogoUrl} size="sm" />
				{job.isFeatured && (
					<span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-semibold">
						Featured
					</span>
				)}
			</div>
			<div className="flex flex-col gap-1">
				<span className="text-primary border-primary self-start border px-2 py-0.5 text-sm font-normal">
					{job.employmentType}
				</span>
				<h3 className="text-foreground text-lg font-semibold">{job.title}</h3>
				<p className="text-muted-foreground mt-0.5 text-base font-normal">{job.company}</p>
			</div>
			<p className="text-muted-foreground line-clamp-2 text-base font-normal">{job.description}</p>
			<div className="mt-auto flex flex-col gap-2">
				<div className="flex flex-wrap gap-1.5">
					{job.tags.slice(0, 4).map(tag => (
						<span
							key={tag}
							className={cn("rounded-full px-3 py-1 text-xs font-semibold", tagColor)}
						>
							{tag}
						</span>
					))}
				</div>
				<div className="text-muted-foreground flex items-center gap-1 text-sm">
					<MapPin className="size-3.5" />
					{job.location}
				</div>
			</div>
		</Link>
	);
}
