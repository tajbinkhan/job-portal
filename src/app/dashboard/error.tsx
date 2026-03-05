"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function DashboardError({
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
		<div className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
			<div className="flex flex-col items-center gap-3">
				<h2 className="font-display text-foreground text-2xl font-semibold">Dashboard error</h2>
				<p className="text-muted-foreground max-w-sm text-base">
					Something went wrong while loading this page. Try refreshing or go back to the dashboard
					overview.
				</p>
			</div>
			<div className="flex gap-3">
				<Button variant="outline" onClick={reset}>
					Try again
				</Button>
				<Button asChild>
					<Link href="/dashboard">Dashboard home</Link>
				</Button>
			</div>
		</div>
	);
}
