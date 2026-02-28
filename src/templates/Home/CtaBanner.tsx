import Image from "next/image";

import { Button } from "@/components/ui/button";

export function CtaBanner() {
	return (
		<section className="mx-auto max-w-7xl px-6">
			<div
				className="bg-primary relative overflow-hidden rounded-lg py-24 md:py-28"
				style={{ clipPath: "polygon(15% 0%, 100% 0, 100% 75%, 85% 100%, 0 100%, 0 25%)" }}
			>
				<div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-6 md:flex-row md:items-center md:justify-between">
					<div className="ml-7.5 flex flex-col gap-5">
						<h2 className="text-primary-foreground font-display text-[48px] leading-tight font-semibold">
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
					</div>
					<div className="absolute right-10 bottom-0 z-50 hidden w-full max-w-135 md:block">
						<Image
							src="/images/cta-dashboard.png"
							alt="QuickHire dashboard"
							width={1000}
							height={1000}
							className="z-50 w-full object-contain drop-shadow-2xl"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
