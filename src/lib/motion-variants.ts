import type { Variants } from "motion/react";

/** Fade up from 20px below, opacity 0 → 1 */
export const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" }
	}
};

/** Simple opacity fade */
export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.5, ease: "easeOut" }
	}
};

/** Wrapper that staggers its children */
export const staggerContainer: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1
		}
	}
};

/** Stagger container with a tighter delay (e.g. logo rows) */
export const staggerFast: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.07
		}
	}
};
