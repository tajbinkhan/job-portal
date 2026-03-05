"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { fadeInUp, staggerContainer } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

import { route } from "@/routes/routes";

const LOGO_BG_COLORS = [
	"bg-green-500",
	"bg-teal-500",
	"bg-blue-500",
	"bg-pink-500",
	"bg-yellow-500",
	"bg-indigo-500",
	"bg-orange-500",
	"bg-blue-700",
	"bg-gray-800",
	"bg-sky-500"
];

function getLogoBg(company: string): string {
	const sum = [...company].reduce((acc, c) => acc + c.charCodeAt(0), 0);
	return LOGO_BG_COLORS[sum % LOGO_BG_COLORS.length];
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

export function LatestJobs({ jobs }: Props) {
	return (
		<section className="bg-light-bg relative overflow-hidden py-20 [clip-path:polygon(20%_0%,100%_0,100%_100%,100%_100%,0_100%,0_5%)] md:[clip-path:polygon(7%_0%,100%_0,100%_100%,100%_100%,0_100%,0_7%)]">
			{/* Right-side decorative pattern */}
			<div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 select-none">
				<Image src="/images/pattern.png" alt="" fill className="object-contain object-right" />
			</div>
			<div className="relative mx-auto max-w-7xl px-6">
				{/* Header */}
				<motion.div
					className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
					variants={fadeInUp}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					<h2 className="text-foreground font-display text-[32px] font-semibold md:text-[48px]">
						Latest <span className="text-accent-blue">jobs open</span>
					</h2>
					<Link
						href={route.public.jobs}
						className="text-primary flex items-center gap-1 text-base font-semibold hover:underline"
					>
						Show all jobs →
					</Link>
				</motion.div>

				{/* Two-column list */}
				<motion.div
					className="grid grid-cols-1 gap-4 md:grid-cols-2"
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-60px" }}
				>
					{jobs.map(job => (
						<motion.div
							key={job.id}
							variants={fadeInUp}
							whileHover={{ x: 4 }}
							transition={{ type: "spring", stiffness: 300, damping: 20 }}
						>
							<Link
								href={`/jobs/${job.id}`}
								className="flex items-center gap-4 rounded-none border-0 bg-white p-5 transition-all hover:border-indigo-300 hover:shadow-md"
							>
								{/* Logo */}
								<div
									className={cn(
										"flex size-14 shrink-0 items-center justify-center text-base font-bold text-white",
										getLogoBg(job.company)
									)}
									style={{
										clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
									}}
								>
									{job.company[0].toUpperCase()}
								</div>

								{/* Info */}
								<div className="flex flex-1 flex-col gap-1">
									<p className="text-xl font-semibold text-[#25324B]">{job.title}</p>
									<p className="text-sm font-normal text-gray-400">
										{job.company} • {job.location}
									</p>

									{/* Badges */}
									<div className="mt-2 flex flex-wrap items-center gap-2">
										{/* Type badge */}
										<span
											className={cn(
												"rounded-full px-3 py-1 text-xs font-semibold",
												job.employmentType === "Full-Time"
													? "bg-teal-100/50 text-teal-400"
													: "bg-gray-100 text-gray-700"
											)}
										>
											{job.employmentType}
										</span>

										{/* Divider */}
										<span className="h-4 w-px bg-gray-200" />

										{/* Tag badges */}
										{job.tags.map(tag => (
											<span
												key={tag}
												className={cn(
													"rounded-full px-3 py-1 text-xs font-semibold",
													tagColors[tag] ?? "bg-gray-100 text-gray-500"
												)}
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</Link>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
