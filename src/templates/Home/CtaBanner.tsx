"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { fadeIn, fadeInUp } from "@/lib/motion-variants";

import { Button } from "@/components/ui/button";

export function CtaBanner() {
	return (
		<section className="mx-auto max-w-7xl md:px-6">
			<div className="bg-primary relative overflow-hidden rounded-lg py-12 [clip-path:polygon(20%_0%,100%_0,100%_82%,82%_100%,0_100%,0_18%)] md:py-28 md:[clip-path:polygon(15%_0%,100%_0,100%_75%,85%_100%,0_100%,0_25%)]">
				<div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-6 md:flex-row md:items-center md:justify-between">
					<motion.div
						className="ml-7.5 flex flex-col gap-5"
						variants={fadeInUp}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						<h2 className="text-primary-foreground font-display text-[32px] leading-tight font-semibold md:text-[48px]">
							Start posting
							<br />
							jobs today
						</h2>
						<p className="text-primary-foreground text-base font-medium">
							Start posting jobs for only $10.
						</p>
						<Button
							variant="outline"
							className="border-primary-foreground/60 text-primary hover:text-primary w-fit bg-white text-[16px] font-bold"
						>
							Sign Up For Free
						</Button>
					</motion.div>
					<motion.div
						className="relative z-50 mt-6 w-full px-4 md:absolute md:right-10 md:bottom-0 md:mt-0 md:max-w-135 md:px-0"
						variants={fadeIn}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						transition={{ delay: 0.25, duration: 0.6 }}
					>
						<Image
							src="/images/cta-dashboard.png"
							alt="QuickHire dashboard"
							width={1000}
							height={1000}
							className="z-50 w-full object-contain drop-shadow-2xl"
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
