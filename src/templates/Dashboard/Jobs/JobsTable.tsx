"use client";

import { Loader2, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { deleteJobApi } from "@/lib/api/client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { route } from "@/routes/routes";

interface JobsTableProps {
	jobs: Job[];
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

function DeleteButton({ jobId, title }: { jobId: string; title: string }) {
	const router = useRouter();
	const [deleting, setDeleting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleDelete() {
		setDeleting(true);
		setError(null);
		try {
			await deleteJobApi(jobId);
			router.refresh();
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "Delete failed.");
			setDeleting(false);
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button
					className="hover:text-destructive p-1 transition-colors"
					title="Delete job"
					disabled={deleting}
				>
					{deleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Job</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete{" "}
						<span className="text-foreground font-semibold">{title}</span>? This action cannot be
						undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				{error && <p className="text-destructive text-sm">{error}</p>}
				<AlertDialogFooter>
					<AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						disabled={deleting}
						className="bg-destructive hover:bg-destructive/90 text-white"
					>
						{deleting ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
	const searchParams = useSearchParams();
	const router = useRouter();
	function goToPage(page: number) {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", String(page));
		router.push(`${route.private.jobs}?${params.toString()}`);
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

export function JobsTable({ jobs, totalPages, currentPage }: JobsTableProps) {
	if (jobs.length === 0) {
		return (
			<div className="border-border flex flex-col items-center justify-center border py-16 text-center">
				<p className="text-muted-foreground text-sm">No jobs found.</p>
				<Link href={route.private.createJob} className="mt-4">
					<Button className="bg-indigo-700 hover:bg-indigo-800">Create First Job</Button>
				</Link>
			</div>
		);
	}
	return (
		<div className="border-border border">
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="bg-muted/40 border-border border-b">
							<th className="px-4 py-3 text-left font-semibold">Title</th>
							<th className="px-4 py-3 text-left font-semibold">Company</th>
							<th className="hidden px-4 py-3 text-left font-semibold md:table-cell">Category</th>
							<th className="hidden px-4 py-3 text-left font-semibold lg:table-cell">Type</th>
							<th className="px-4 py-3 text-left font-semibold">Status</th>
							<th className="hidden px-4 py-3 text-left font-semibold xl:table-cell">Created</th>
							<th className="px-4 py-3 text-right font-semibold">Actions</th>
						</tr>
					</thead>
					<tbody>
						{jobs.map((job, idx) => (
							<tr
								key={job.id}
								className={`border-border border-b last:border-0 ${idx % 2 === 0 ? "" : "bg-muted/20"}`}
							>
								<td className="max-w-50 px-4 py-3">
									<p className="truncate font-semibold" title={job.title}>
										{job.title}
									</p>
								</td>
								<td className="max-w-35 px-4 py-3">
									<p className="text-muted-foreground truncate" title={job.company}>
										{job.company}
									</p>
								</td>
								<td className="hidden px-4 py-3 md:table-cell">
									<span className="text-muted-foreground">{job.category}</span>
								</td>
								<td className="hidden px-4 py-3 lg:table-cell">
									<span className="text-muted-foreground">{job.employmentType}</span>
								</td>
								<td className="px-4 py-3">
									{job.isFeatured ? (
										<Badge
											variant="default"
											className="border-amber-200 bg-amber-100 text-amber-700"
										>
											Featured
										</Badge>
									) : (
										<Badge variant="outline" className="text-muted-foreground">
											Regular
										</Badge>
									)}
								</td>
								<td className="text-muted-foreground hidden px-4 py-3 xl:table-cell">
									{formatDate(job.createdAt)}
								</td>
								<td className="px-4 py-3">
									<div className="flex items-center justify-end gap-2">
										<Link
											href={route.private.editJob(job.id)}
											className="text-muted-foreground hover:text-foreground p-1 transition-colors"
											title="Edit job"
										>
											<Pencil className="size-4" />
										</Link>
										<DeleteButton jobId={job.id} title={job.title} />
									</div>
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
