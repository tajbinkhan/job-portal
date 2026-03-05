"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { fadeIn, staggerFast } from "@/lib/motion-variants";

const companies = [
	{ name: "Vodafone", logo: "/images/companies/vodafone.png" },
	{ name: "Intel", logo: "/images/companies/intel.png" },
	{ name: "Tesla", logo: "/images/companies/tesla.png" },
	{ name: "AMD", logo: "/images/companies/amd.png" },
	{ name: "Talkit", logo: "/images/companies/talkit.png" }
];

export function Companies() {
	return (
		<section className="py-12">
			<div className="mx-auto max-w-7xl px-6">
				<p className="text-muted-foreground mb-8 text-lg font-normal">Companies we helped grow</p>
				<motion.div
					className="flex flex-wrap items-center justify-between gap-8 md:justify-between md:gap-12"
					variants={staggerFast}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{companies.map(({ name, logo }) => (
						<motion.div key={name} variants={fadeIn}>
							<Image src={logo} alt={name} width={120} height={40} className="h-8 object-contain" />
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
