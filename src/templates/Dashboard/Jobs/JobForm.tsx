"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createJobApi, updateJobApi } from "@/lib/api/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { route } from "@/routes/routes";

const jobSchema = z.object({
	title: z.string().min(1, "Title is required.").max(180, "Max 180 characters."),
	company: z.string().min(1, "Company is required.").max(180, "Max 180 characters."),
	companyLogoUrl: z
		.string()
		.max(2048)
		.refine(
			v => v === "" || /^https?:\/\/.+/.test(v),
			"Must be a valid URL starting with http(s)://"
		)
		.optional()
		.or(z.literal("")),
	location: z.string().min(1, "Location is required.").max(120),
	category: z.string().min(1, "Category is required."),
	employmentType: z.string().min(1, "Employment type is required."),
	description: z.string().min(1, "Description is required."),
	isFeatured: z.boolean()
});
type JobSchemaValues = z.infer<typeof jobSchema>;

interface JobFormProps {
	mode: "create" | "edit";
	jobId?: string;
	defaultValues?: Partial<Job>;
	filterAssets: JobFilters;
}

function Field({
	label,
	error,
	required,
	children
}: {
	label: string;
	error?: string;
	required?: boolean;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<label className="text-foreground text-sm font-semibold">
				{label}
				{required && <span className="text-destructive ml-0.5">*</span>}
			</label>
			{children}
			{error && (
				<p className="text-destructive flex items-center gap-1 text-xs">
					<AlertCircle className="size-3.5 shrink-0" />
					{error}
				</p>
			)}
		</div>
	);
}

export function JobForm({ mode, jobId, defaultValues, filterAssets }: JobFormProps) {
	const router = useRouter();
	const [serverError, setServerError] = useState<string | null>(null);
	const [tagInput, setTagInput] = useState("");
	const [tags, setTags] = useState<string[]>(defaultValues?.tags ?? []);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<JobSchemaValues>({
		resolver: zodResolver(jobSchema),
		defaultValues: {
			title: defaultValues?.title ?? "",
			company: defaultValues?.company ?? "",
			companyLogoUrl: defaultValues?.companyLogoUrl ?? "",
			location: defaultValues?.location ?? "",
			category: defaultValues?.category ?? "",
			employmentType: defaultValues?.employmentType ?? "Full-Time",
			description: defaultValues?.description ?? "",
			isFeatured: defaultValues?.isFeatured ?? false
		}
	});

	function addTag() {
		const val = tagInput.trim();
		if (val && !tags.includes(val)) setTags(prev => [...prev, val]);
		setTagInput("");
	}
	function removeTag(tag: string) {
		setTags(prev => prev.filter(t => t !== tag));
	}
	function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			addTag();
		}
	}

	async function onSubmit(data: JobSchemaValues) {
		setServerError(null);
		const payload: JobFormData = { ...data, companyLogoUrl: data.companyLogoUrl || null, tags };
		try {
			if (mode === "create") await createJobApi(payload);
			else await updateJobApi(jobId!, payload);
			router.push(route.private.jobs);
			router.refresh();
		} catch (err: unknown) {
			setServerError(
				err instanceof Error ? err.message : "Something went wrong. Please try again."
			);
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
			{serverError && (
				<div className="flex items-start gap-2.5 border border-red-200 bg-red-50 p-3 text-sm text-red-700">
					<AlertCircle className="mt-0.5 size-4 shrink-0" />
					<span>{serverError}</span>
				</div>
			)}

			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<Field label="Job Title" required error={errors.title?.message}>
					<Input
						{...register("title")}
						placeholder="e.g. Senior Frontend Developer"
						className="h-11"
					/>
				</Field>
				<Field label="Company" required error={errors.company?.message}>
					<Input {...register("company")} placeholder="e.g. Acme Corp" className="h-11" />
				</Field>
				<Field label="Location" required error={errors.location?.message}>
					<select
						{...register("location")}
						className="border-border bg-background h-11 w-full border px-3 text-sm focus:outline-none"
					>
						<option value="">Select location…</option>
						{filterAssets.locations.map(loc => (
							<option key={loc} value={loc}>
								{loc}
							</option>
						))}
					</select>
				</Field>
				<Field label="Category" required error={errors.category?.message}>
					<select
						{...register("category")}
						className="border-border bg-background h-11 w-full border px-3 text-sm focus:outline-none"
					>
						<option value="">Select category…</option>
						{filterAssets.categories.map(cat => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
				</Field>
				<Field label="Employment Type" required error={errors.employmentType?.message}>
					<select
						{...register("employmentType")}
						className="border-border bg-background h-11 w-full border px-3 text-sm focus:outline-none"
					>
						<option value="">Select employment type…</option>
						{filterAssets.employmentTypes.map(type => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</Field>
				<Field label="Company Logo URL" error={errors.companyLogoUrl?.message}>
					<Input
						{...register("companyLogoUrl")}
						type="url"
						placeholder="https://example.com/logo.png"
						className="h-11"
					/>
				</Field>
			</div>

			{/* Tags */}
			<Field label="Tags">
				<div className="border-border flex min-h-11 flex-wrap items-center gap-2 border px-3 py-2">
					{tags.map(tag => (
						<span
							key={tag}
							className="bg-primary/10 text-primary flex items-center gap-1 px-2 py-0.5 text-xs font-medium"
						>
							{tag}
							<button
								type="button"
								onClick={() => removeTag(tag)}
								className="hover:opacity-60"
								tabIndex={-1}
							>
								<X className="size-3" />
							</button>
						</span>
					))}
					<input
						type="text"
						value={tagInput}
						onChange={e => setTagInput(e.target.value)}
						onKeyDown={handleTagKeyDown}
						placeholder={tags.length === 0 ? "Type a tag and press Enter…" : "Add another…"}
						className="min-w-24 flex-1 bg-transparent text-sm outline-none"
					/>
					{tagInput && (
						<button type="button" onClick={addTag} className="text-primary text-xs hover:underline">
							<Plus className="size-4" />
						</button>
					)}
				</div>
				<p className="text-muted-foreground text-xs">Press Enter or comma (,) to add a tag.</p>
			</Field>

			{/* Description */}
			<Field label="Description" required error={errors.description?.message}>
				<Textarea
					{...register("description")}
					placeholder="Full job description…"
					rows={10}
					className="resize-y"
				/>
			</Field>

			{/* Featured toggle */}
			<div className="flex items-center gap-3">
				<input
					{...register("isFeatured")}
					type="checkbox"
					id="isFeatured"
					className="border-border accent-primary size-4 cursor-pointer"
				/>
				<label
					htmlFor="isFeatured"
					className="text-foreground cursor-pointer text-sm font-semibold"
				>
					Mark as Featured
				</label>
			</div>

			{/* Actions */}
			<div className="border-border flex items-center gap-3 border-t pt-5">
				<Button type="submit" disabled={isSubmitting} className="bg-indigo-700 hover:bg-indigo-800">
					{isSubmitting ? (
						<>
							<Loader2 className="size-4 animate-spin" />
							{mode === "create" ? "Creating…" : "Saving…"}
						</>
					) : mode === "create" ? (
						"Create Job"
					) : (
						"Save Changes"
					)}
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={() => router.push(route.private.jobs)}
					disabled={isSubmitting}
				>
					Cancel
				</Button>
			</div>
		</form>
	);
}
