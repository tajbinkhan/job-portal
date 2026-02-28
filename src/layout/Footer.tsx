import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
	About: ["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"],
	Resources: ["Help Docs", "Guide", "Updates", "Contact Us"]
};

export function Footer() {
	return (
		<footer className="text-background bg-[#202430]">
			<div className="mx-auto max-w-7xl px-6 py-16">
				<div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
					<div className="col-span-4 flex flex-col gap-4">
						<Image src="/images/logo-footer.png" alt="JobFinder Logo" width={150} height={150} />
						<p className="text-background/80 text-base leading-relaxed font-normal">
							Great platform for the job seeker that passionate about startups. Find your dream job
							easier.
						</p>
					</div>
					{Object.entries(footerLinks).map(([section, links]) => (
						<div key={section} className="col-span-2 flex flex-col gap-4">
							<h4 className="text-lg font-semibold tracking-wider text-white">{section}</h4>
							<ul className="flex flex-col gap-3">
								{links.map(link => (
									<li key={link}>
										<Link
											href="#"
											className="text-background/70 hover:text-background text-base font-normal transition-colors"
										>
											{link}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
					<div className="col-span-4 flex flex-col gap-4">
						<h4 className="text-lg font-semibold tracking-wider text-white">
							Get job notifications
						</h4>
						<p className="text-background/80 text-base font-normal">
							The latest job news, articles, sent to your inbox weekly.
						</p>
						<div className="flex gap-2">
							<Input
								type="email"
								placeholder="Email Address"
								className="h-auto rounded-md border-0 bg-white px-4 py-3 text-sm text-gray-800 focus-visible:ring-0 focus-visible:ring-offset-0"
							/>
							<Button className="border-0 bg-indigo-600 px-8 font-medium text-white hover:bg-indigo-700">
								Subscribe
							</Button>
						</div>
					</div>
				</div>
				<div className="border-background/10 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
					<p className="text-background/40 text-base font-normal">
						2021 © QuickHire. All rights reserved.
					</p>
					<div className="flex items-center gap-4">
						{[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
							<Link
								key={i}
								href="#"
								className="text-background/40 hover:text-background transition-colors"
							>
								<Icon className="size-4" />
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
