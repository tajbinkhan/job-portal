"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginApi } from "@/lib/api/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { route } from "@/routes/routes";

const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address."),
	password: z.string().min(1, "Password is required.")
});
type LoginFormData = z.infer<typeof loginSchema>;

export function LoginTemplate() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const from = searchParams.get("from") ?? route.private.dashboard;
	const [showPassword, setShowPassword] = useState(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "admin@quickhire.com", password: "Admin@1234" }
	});

	async function onSubmit(data: LoginFormData) {
		setServerError(null);
		try {
			await loginApi(data.email, data.password);
			router.push(from);
			router.refresh();
		} catch (err: unknown) {
			setServerError(err instanceof Error ? err.message : "Invalid credentials. Please try again.");
		}
	}

	return (
		<div className="flex min-h-screen">
			{/* Left panel */}
			<div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
				<div className="w-full max-w-md">
					<Link href="/" className="mb-10 inline-block">
						<Image src="/images/logo.png" alt="QuickHire" width={140} height={40} />
					</Link>
					<div className="mb-8">
						<h1 className="font-display text-foreground mb-2 text-3xl font-semibold">
							Admin Sign In
						</h1>
						<p className="text-muted-foreground text-sm">
							Access the admin dashboard to manage job listings.
						</p>
					</div>
					{serverError && (
						<div className="mb-5 flex items-start gap-2.5 border border-red-200 bg-red-50 p-3 text-sm text-red-700">
							<AlertCircle className="mt-0.5 size-4 shrink-0" />
							<span>{serverError}</span>
						</div>
					)}
					<form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
						<div className="flex flex-col gap-1.5">
							<label className="text-foreground text-sm font-semibold">Email Address</label>
							<Input
								type="email"
								placeholder="admin@company.com"
								{...register("email")}
								aria-invalid={!!errors.email}
								className="h-11"
							/>
							{errors.email && (
								<p className="text-destructive flex items-center gap-1 text-xs">
									<AlertCircle className="size-3.5 shrink-0" />
									{errors.email.message}
								</p>
							)}
						</div>
						<div className="flex flex-col gap-1.5">
							<label className="text-foreground text-sm font-semibold">Password</label>
							<div className="relative">
								<Input
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									{...register("password")}
									aria-invalid={!!errors.password}
									className="h-11 pr-10"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(p => !p)}
									className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
									tabIndex={-1}
								>
									{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
								</button>
							</div>
							{errors.password && (
								<p className="text-destructive flex items-center gap-1 text-xs">
									<AlertCircle className="size-3.5 shrink-0" />
									{errors.password.message}
								</p>
							)}
						</div>
						<Button
							type="submit"
							disabled={isSubmitting}
							className="mt-2 h-11 w-full bg-indigo-700 text-white hover:bg-indigo-800"
						>
							{isSubmitting ? (
								<>
									<Loader2 className="size-4 animate-spin" />
									Signing in…
								</>
							) : (
								"Sign In"
							)}
						</Button>
					</form>
					<p className="text-muted-foreground mt-6 text-center text-sm">
						<Link href={route.public.jobs} className="text-indigo-700 hover:underline">
							← Back to job listings
						</Link>
					</p>
				</div>
			</div>

			{/* Right panel — decorative */}
			<div className="bg-primary/5 border-border hidden flex-col items-center justify-center border-l px-10 lg:flex lg:w-[40%]">
				<div className="max-w-sm text-center">
					<div className="bg-primary/10 mx-auto mb-6 flex size-20 items-center justify-center">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							className="text-primary size-10"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
							/>
						</svg>
					</div>
					<h2 className="font-display text-foreground mb-3 text-2xl font-semibold">
						Admin Dashboard
					</h2>
					<p className="text-muted-foreground text-sm leading-relaxed">
						Create and manage job listings, review the posting catalog, and keep your hiring
						pipeline up to date — all from one place.
					</p>
				</div>
			</div>
		</div>
	);
}
