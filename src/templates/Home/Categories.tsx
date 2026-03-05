"use client";

import { Code2 } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { CiMonitor } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { HiOutlineCash } from "react-icons/hi";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { LuPencilRuler } from "react-icons/lu";
import { PiBriefcase } from "react-icons/pi";
import { TbChartInfographic } from "react-icons/tb";

import { fadeInUp, staggerContainer } from "@/lib/motion-variants";

import { route } from "@/routes/routes";

const categories = [
	{ name: "Design", count: 235, icon: LuPencilRuler },
	{ name: "Sales", count: 756, icon: TbChartInfographic },
	{ name: "Marketing", count: 140, icon: HiOutlineMegaphone },
	{ name: "Finance", count: 325, icon: HiOutlineCash },
	{ name: "Technology", count: 436, icon: CiMonitor },
	{ name: "Engineering", count: 542, icon: Code2 },
	{ name: "Business", count: 211, icon: PiBriefcase },
	{ name: "Human Resource", count: 346, icon: FaUsers }
];

export function Categories() {
	return (
		<section className="bg-background py-20">
			<div className="mx-auto max-w-7xl px-6">
				<div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<motion.h2
						className="text-foreground font-display text-[32px] font-semibold md:text-[48px]"
						variants={fadeInUp}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						Explore by <span className="text-accent-blue">category</span>
					</motion.h2>
					<Link
						href={route.public.jobs}
						className="text-primary flex items-center gap-1 text-base font-semibold hover:underline"
					>
						Show all jobs →
					</Link>
				</div>
				<motion.div
					className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-80px" }}
				>
					{categories.map(cat => {
						const Icon = cat.icon;
						return (
							<motion.div
								key={cat.name}
								variants={fadeInUp}
								whileHover={{ y: -4 }}
								transition={{ type: "spring", stiffness: 300, damping: 20 }}
							>
								<Link
									href={`/jobs?category=${cat.name.toLowerCase()}`}
									className="group border-border bg-background hover:border-primary hover:bg-primary flex h-full flex-col gap-8 border p-6 transition-all hover:shadow-md"
								>
									<Icon className="text-primary group-hover:text-primary-foreground size-7" />
									<div className="flex flex-col gap-3">
										<p className="font-display text-foreground group-hover:text-primary-foreground text-[24px] font-semibold">
											{cat.name}
										</p>
										<p className="text-muted-foreground group-hover:text-primary-foreground/80 mt-1 text-lg font-normal">
											{cat.count} jobs available →
										</p>
									</div>
								</Link>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}
