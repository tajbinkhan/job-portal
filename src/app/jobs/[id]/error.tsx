"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function JobDetailError({
	error,
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
			<div className="flex flex-col items-center gap-3">
				<h2 className="font-display text-foreground text-2xl font-semibold">Job not available</h2>
				<p className="text-muted-foreground max-w-sm text-base">
					This job posting could not be loaded. It may have been removed or there was a network
					error.
				</p>
			</div>
			<div className="flex gap-3">
				<Button variant="outline" onClick={reset}>
					Try again
				</Button>
				<Button asChild>
					<Link href="/jobs">Browse all jobs</Link>
				</Button>
			</div>
		</div>
	);
}
