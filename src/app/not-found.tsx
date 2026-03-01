import { MoveLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Footer } from "@/layout/Footer";
import { Navbar } from "@/layout/Navbar";
import { route } from "@/routes/routes";

export const metadata = {
	title: "404 – Page Not Found | QuickHire"
};

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />

			<main className="flex flex-1 items-center justify-center px-6 py-24">
				<div className="flex max-w-lg flex-col items-center gap-6 text-center">
					{/* Large 404 */}
					<p className="font-display text-muted-foreground/30 text-[10rem] leading-none font-bold select-none">
						404
					</p>

					{/* Heading & description */}
					<div className="flex flex-col gap-2">
						<h1 className="font-display text-foreground text-3xl font-bold tracking-tight">
							Page not found
						</h1>
						<p className="text-muted-foreground text-base">
							The page you&apos;re looking for doesn&apos;t exist or may have been moved.
						</p>
					</div>

					{/* Actions */}
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Link href={route.public.jobs}>
							<Button className="bg-indigo-700 hover:bg-indigo-800">Browse Jobs</Button>
						</Link>
						<Link href="/">
							<Button variant="outline">
								<MoveLeft className="size-4" />
								Back to Home
							</Button>
						</Link>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
