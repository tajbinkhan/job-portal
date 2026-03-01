"use client";

import { ExternalLink } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import { route } from "@/routes/routes";

interface ApplicationsTableProps {
	applications: Application[];
	totalPages: number;
	currentPage: number;
}

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}

function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
	const searchParams = useSearchParams();
	const router = useRouter();

	function goToPage(page: number) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", String(page));
		router.push(`${route.private.applications}?${params.toString()}`);
	}

	if (totalPages <= 1) return null;

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className="border-border flex items-center justify-between border-t px-4 py-3">
			<p className="text-muted-foreground text-sm">
				Page {currentPage} of {totalPages}
			</p>
			<div className="flex gap-1">
				<Button
					variant="outline"
					size="sm"
					disabled={currentPage <= 1}
					onClick={() => goToPage(currentPage - 1)}
				>
					Previous
				</Button>
				{pages.map(p => (
					<Button
						key={p}
						variant={p === currentPage ? "default" : "outline"}
						size="sm"
						onClick={() => goToPage(p)}
						className={p === currentPage ? "bg-indigo-700 text-white" : ""}
					>
						{p}
					</Button>
				))}
				<Button
					variant="outline"
					size="sm"
					disabled={currentPage >= totalPages}
					onClick={() => goToPage(currentPage + 1)}
				>
					Next
				</Button>
			</div>
		</div>
	);
}

export function ApplicationsTable({
	applications,
	totalPages,
	currentPage
}: ApplicationsTableProps) {
	if (applications.length === 0) {
		return (
			<div className="border-border flex flex-col items-center justify-center border py-16 text-center">
				<p className="text-muted-foreground text-sm">No applications found.</p>
			</div>
		);
	}

	return (
		<div className="border-border border">
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="bg-muted/40 border-border border-b">
							<th className="px-4 py-3 text-left font-semibold">Applicant</th>
							<th className="hidden px-4 py-3 text-left font-semibold md:table-cell">Email</th>
							<th className="hidden px-4 py-3 text-left font-semibold lg:table-cell">Cover Note</th>
							<th className="px-4 py-3 text-left font-semibold">Resume</th>
							<th className="hidden px-4 py-3 text-left font-semibold xl:table-cell">Applied</th>
						</tr>
					</thead>
					<tbody>
						{applications.map((app, idx) => (
							<tr
								key={app.id}
								className={`border-border border-b last:border-0 ${idx % 2 === 0 ? "" : "bg-muted/20"}`}
							>
								<td className="max-w-40 px-4 py-3">
									<p className="truncate font-semibold" title={app.name}>
										{app.name}
									</p>
								</td>
								<td className="hidden max-w-48 px-4 py-3 md:table-cell">
									<p className="text-muted-foreground truncate" title={app.email}>
										{app.email}
									</p>
								</td>
								<td className="hidden max-w-64 px-4 py-3 lg:table-cell">
									<p className="text-muted-foreground truncate" title={app.coverNote}>
										{app.coverNote}
									</p>
								</td>
								<td className="px-4 py-3">
									<a
										href={app.resumeLink}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1 text-indigo-600 transition-colors hover:text-indigo-800"
										title="Open resume"
									>
										<ExternalLink className="size-3.5" />
										<span>Resume</span>
									</a>
								</td>
								<td className="text-muted-foreground hidden px-4 py-3 xl:table-cell">
									{formatDate(app.createdAt)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Pagination currentPage={currentPage} totalPages={totalPages} />
		</div>
	);
}
