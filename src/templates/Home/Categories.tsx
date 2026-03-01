import { Code2 } from "lucide-react";
import Link from "next/link";
import { CiMonitor } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { HiOutlineCash } from "react-icons/hi";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { LuPencilRuler } from "react-icons/lu";
import { PiBriefcase } from "react-icons/pi";
import { TbChartInfographic } from "react-icons/tb";

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
					<h2 className="text-foreground font-display text-[32px] font-semibold md:text-[48px]">
						Explore by <span className="text-accent-blue">category</span>
					</h2>
					<Link
						href={route.public.jobs}
						className="text-primary flex items-center gap-1 text-base font-semibold hover:underline"
					>
						Show all jobs →
					</Link>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{categories.map(cat => {
						const Icon = cat.icon;
						return (
							<Link
								key={cat.name}
								href={`/jobs?category=${cat.name.toLowerCase()}`}
								className="group border-border bg-background hover:border-primary hover:bg-primary flex flex-col gap-8 border p-6 transition-all hover:shadow-md"
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
						);
					})}
				</div>
			</div>
		</section>
	);
}
