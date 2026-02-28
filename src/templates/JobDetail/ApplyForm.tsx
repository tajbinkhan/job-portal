"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { submitApplicationApi } from "@/lib/api/client";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { route } from "@/routes/routes";

interface ApplyFormProps {
	jobTitle: string;
	jobId: string;
}
interface FormValues {
	name: string;
	email: string;
	resumeLink: string;
	coverNote: string;
}
interface FormErrors {
	name?: string;
	email?: string;
	resumeLink?: string;
	coverNote?: string;
}

function validate(values: FormValues): FormErrors {
	const errors: FormErrors = {};
	if (!values.name.trim()) errors.name = "Full name is required.";
	if (!values.email.trim()) errors.email = "Email address is required.";
	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
		errors.email = "Please enter a valid email address.";
	if (!values.resumeLink.trim()) errors.resumeLink = "Resume link is required.";
	else {
		try {
			new URL(values.resumeLink);
		} catch {
			errors.resumeLink = "Please enter a valid URL (e.g. https://…).";
		}
	}
	if (!values.coverNote.trim()) errors.coverNote = "Cover note is required.";
	else if (values.coverNote.trim().length < 30)
		errors.coverNote = "Please write at least 30 characters.";
	return errors;
}

function FieldWrapper({
	label,
	error,
	children
}: {
	label: string;
	error?: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<label className="text-foreground text-sm font-semibold">{label}</label>
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

export function ApplyForm({ jobTitle, jobId }: ApplyFormProps) {
	const [values, setValues] = useState<FormValues>({
		name: "",
		email: "",
		resumeLink: "",
		coverNote: ""
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
	const [apiError, setApiError] = useState<string | null>(null);

	function handleChange(field: keyof FormValues, value: string) {
		setValues(prev => ({ ...prev, [field]: value }));
		if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
		if (apiError) setApiError(null);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const nextErrors = validate(values);
		if (Object.keys(nextErrors).length > 0) {
			setErrors(nextErrors);
			return;
		}
		setStatus("loading");
		setApiError(null);
		try {
			await submitApplicationApi({
				jobId,
				name: values.name.trim(),
				email: values.email.trim(),
				resumeLink: values.resumeLink.trim(),
				coverNote: values.coverNote.trim()
			});
			setStatus("success");
		} catch (err: unknown) {
			setStatus("idle");
			setApiError(
				err instanceof Error ? err.message : "Failed to submit application. Please try again."
			);
		}
	}

	if (status === "success") {
		return (
			<div className="flex flex-col items-center gap-6 py-16 text-center">
				<div className="bg-primary/10 flex size-20 items-center justify-center">
					<CheckCircle2 className="text-primary size-10" />
				</div>
				<div className="flex flex-col gap-2">
					<h3 className="font-display text-foreground text-2xl font-semibold">
						Application Submitted!
					</h3>
					<p className="text-muted-foreground max-w-md text-base font-normal">
						Your application for <span className="text-foreground font-semibold">{jobTitle}</span>{" "}
						has been received. We&apos;ll be in touch soon — good luck!
					</p>
				</div>
				<Button asChild variant="outline" size="sm">
					<Link href={route.public.jobs}>Browse More Jobs</Link>
				</Button>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
			<FieldWrapper label="Full Name" error={errors.name}>
				<Input
					type="text"
					placeholder="Jane Smith"
					value={values.name}
					onChange={e => handleChange("name", e.target.value)}
					className="h-11"
				/>
			</FieldWrapper>
			<FieldWrapper label="Email Address" error={errors.email}>
				<Input
					type="email"
					placeholder="jane@example.com"
					value={values.email}
					onChange={e => handleChange("email", e.target.value)}
					className="h-11"
				/>
			</FieldWrapper>
			<FieldWrapper label="Resume / CV Link" error={errors.resumeLink}>
				<Input
					type="url"
					placeholder="https://drive.google.com/your-resume"
					value={values.resumeLink}
					onChange={e => handleChange("resumeLink", e.target.value)}
					className="h-11"
				/>
				<p className="text-muted-foreground text-xs">
					Paste a link to your resume hosted on Google Drive, Dropbox, LinkedIn, etc.
				</p>
			</FieldWrapper>
			<FieldWrapper label="Cover Note" error={errors.coverNote}>
				<Textarea
					placeholder="Tell us why you're a great fit for this role…"
					value={values.coverNote}
					onChange={e => handleChange("coverNote", e.target.value)}
					rows={6}
					className={cn("resize-none", errors.coverNote && "border-destructive")}
				/>
				<p className="text-muted-foreground text-right text-xs">
					{values.coverNote.length} characters
				</p>
			</FieldWrapper>
			{apiError && (
				<div className="flex items-start gap-2 border border-red-200 bg-red-50 p-3 text-sm text-red-700">
					<AlertCircle className="mt-0.5 size-4 shrink-0" />
					<span>{apiError}</span>
				</div>
			)}
			<Button
				type="submit"
				disabled={status === "loading"}
				className="mt-2 w-full sm:w-auto sm:self-start"
			>
				{status === "loading" ? (
					<>
						<Loader2 className="size-4 animate-spin" />
						Submitting…
					</>
				) : (
					"Submit Application"
				)}
			</Button>
		</form>
	);
}
