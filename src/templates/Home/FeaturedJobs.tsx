"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "@/components/ui/carousel";

import { route } from "@/routes/routes";

const LOGO_COLORS = [
	"bg-foreground text-background",
	"bg-blue-500 text-white",
	"bg-gray-800 text-white",
	"bg-green-500 text-white",
	"bg-orange-500 text-white",
	"bg-teal-500 text-white",
	"bg-green-600 text-white",
	"bg-sky-500 text-white",
	"bg-pink-500 text-white",
	"bg-indigo-500 text-white"
];

function getLogoColor(company: string): string {
	const sum = [...company].reduce((acc, c) => acc + c.charCodeAt(0), 0);
	return LOGO_COLORS[sum % LOGO_COLORS.length];
}

interface Props {
	jobs: Job[];
}

const tagColors: Record<string, string> = {
	Marketing: "bg-orange-100 text-orange-700",
	Design: "bg-purple-100 text-purple-700",
	Business: "bg-green-100 text-green-700",
	Technology: "bg-blue-100 text-blue-700",
	Engineering: "bg-indigo-100 text-indigo-700",
	Sales: "bg-pink-100 text-pink-700",
	Finance: "bg-yellow-100 text-yellow-700",
	"Human Resources": "bg-teal-100 text-teal-700"
};

export function FeaturedJobs({ jobs }: Props) {
	return (
		<section className="bg-background py-20">
			<div className="mx-auto max-w-7xl px-6">
				{/* Header */}
				<div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<h2 className="text-foreground font-display text-[32px] font-semibold md:text-[48px]">
						Featured <span className="text-accent-blue">jobs</span>
					</h2>
					<Link
						href={route.public.jobs}
						className="text-primary flex items-center gap-1 text-base font-semibold hover:underline"
					>
						Show all jobs →
					</Link>
				</div>

				{/* Carousel */}
				<Carousel opts={{ align: "start", loop: false }} className="w-full">
					<CarouselContent className="-ml-4">
						{jobs.map(job => (
							<CarouselItem key={job.id} className="basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/4">
								<Link
									href={`${route.public.jobs}/${job.id}`}
									className="border-border hover:border-primary flex h-full flex-col gap-4 border p-6 transition-all hover:shadow-md"
								>
									<div className="flex items-start justify-between">
										<div
											className={cn(
												"flex size-12 items-center justify-center text-base font-bold",
												getLogoColor(job.company)
											)}
										>
											{job.company[0].toUpperCase()}
										</div>
										<span className="text-primary border-primary border px-2 py-0.5 text-base font-normal">
											{job.employmentType}
										</span>
									</div>

									<div>
										<p className="text-foreground text-lg font-semibold">{job.title}</p>
										<p className="text-muted-foreground mt-0.5 text-base font-normal">
											{job.company} • {job.location}
										</p>
									</div>

									<p className="text-muted-foreground line-clamp-2 text-base font-normal">
										{job.description}
									</p>

									<div className="mt-auto flex flex-wrap gap-2">
										{job.tags.map(tag => (
											<span
												key={tag}
												className={cn(
													"rounded-full px-3 py-1 text-xs font-semibold",
													tagColors[tag] ?? "bg-muted text-muted-foreground"
												)}
											>
												{tag}
											</span>
										))}
									</div>
								</Link>
							</CarouselItem>
						))}
					</CarouselContent>
					<div className="mt-6 flex justify-end gap-2">
						<CarouselPrevious className="static translate-y-0" />
						<CarouselNext className="static translate-y-0" />
					</div>
				</Carousel>
			</div>
		</section>
	);
}
