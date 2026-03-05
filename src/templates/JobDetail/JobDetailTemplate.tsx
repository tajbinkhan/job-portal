import { Bookmark, Briefcase, Calendar, ChevronRight, Clock, MapPin, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getJob } from "@/lib/api/jobs";
import { TAG_COLORS } from "@/lib/jobs-data";
import { cn } from "@/lib/utils";

import { Footer } from "@/layout/Footer";
import { Navbar } from "@/layout/Navbar";
import { route } from "@/routes/routes";
import { ApplyForm } from "@/templates/JobDetail/ApplyForm";

const COMPANY_COLORS = [
	"bg-blue-100 text-blue-700",
	"bg-indigo-100 text-indigo-700",
	"bg-purple-100 text-purple-700",
	"bg-green-100 text-green-700",
	"bg-orange-100 text-orange-700",
	"bg-red-100 text-red-700",
	"bg-yellow-100 text-yellow-700",
	"bg-pink-100 text-pink-700"
];

function getCompanyColor(name: string): string {
	let hash = 0;
	for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) & 0xffffffff;
	return COMPANY_COLORS[Math.abs(hash) % COMPANY_COLORS.length];
}

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}

interface JobDetailTemplateProps {
	id: string;
}

export async function JobDetailTemplate({ id }: JobDetailTemplateProps) {
	const res = await getJob(id);
	if (!res?.data) notFound();
	const job = res.data;

	const tagColor = TAG_COLORS[job.category] ?? "bg-gray-100 text-gray-700";
	const descriptionParagraphs = job.description.split("\n\n").filter(Boolean);

	const APP_URL = process.env.NEXT_PUBLIC_FRONTEND_URL ?? "http://localhost:3000";

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "JobPosting",
		title: job.title,
		description: job.description,
		identifier: {
			"@type": "PropertyValue",
			name: job.company,
			value: job.id
		},
		datePosted: job.createdAt,
		validThrough: job.updatedAt ?? job.createdAt,
		employmentType: job.employmentType?.toUpperCase().replace("-", "_") ?? "FULL_TIME",
		hiringOrganization: {
			"@type": "Organization",
			name: job.company,
			...(job.companyLogoUrl ? { logo: job.companyLogoUrl } : {})
		},
		jobLocation: {
			"@type": "Place",
			address: {
				"@type": "PostalAddress",
				addressLocality: job.location
			}
		},
		url: `${APP_URL}/jobs/${job.id}`,
		...(job.isFeatured ? { featured: true } : {}),
		occupationalCategory: job.category
	};

	return (
		<div className="flex min-h-screen flex-col">
			{/* JSON-LD structured data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>

			<Navbar />

			{/* Hero / Header */}
			<section className="bg-[#F8F8FD] py-12">
				<div className="mx-auto max-w-7xl px-6">
					<nav className="text-muted-foreground mb-8 flex items-center gap-1.5 text-sm">
						<Link href="/" className="hover:text-foreground transition-colors">
							Home
						</Link>
						<ChevronRight className="size-3.5" />
						<Link href={route.public.jobs} className="hover:text-foreground transition-colors">
							Jobs
						</Link>
						<ChevronRight className="size-3.5" />
						<span className="text-foreground max-w-xs truncate font-medium">{job.title}</span>
					</nav>

					<div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
						<div className="flex items-start gap-5">
							{job.companyLogoUrl ? (
								<div
									className="flex size-16 shrink-0 overflow-hidden"
									style={{
										clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
									}}
								>
									<Image
										src={job.companyLogoUrl}
										alt={job.company}
										width={64}
										height={64}
										className="h-full w-full object-cover"
									/>
								</div>
							) : (
								<div
									className={cn(
										"flex size-16 shrink-0 items-center justify-center text-xl font-bold",
										getCompanyColor(job.company)
									)}
									style={{
										clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
									}}
								>
									{job.company.charAt(0).toUpperCase()}
								</div>
							)}
							<div className="flex flex-col gap-2">
								<div className="flex flex-wrap items-center gap-2">
									<h1 className="font-display text-foreground text-[32px] leading-tight font-semibold sm:text-[40px]">
										{job.title}
									</h1>
									{job.isFeatured && (
										<span className="bg-primary/10 text-primary mt-2 self-start px-2 py-0.5 text-xs font-semibold">
											Featured
										</span>
									)}
								</div>
								<p className="text-muted-foreground text-lg font-semibold">{job.company}</p>
								<div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
									<span className="flex items-center gap-1.5">
										<MapPin className="size-4 shrink-0" />
										{job.location}
									</span>
									<span className="flex items-center gap-1.5">
										<Briefcase className="size-4 shrink-0" />
										{job.employmentType}
									</span>
									<span className="flex items-center gap-1.5">
										<Calendar className="size-4 shrink-0" />
										Posted {formatDate(job.createdAt)}
									</span>
								</div>
								<div className="flex flex-wrap gap-2 pt-1">
									{job.tags.map(tag => (
										<span key={tag} className={cn("px-2.5 py-0.5 text-sm font-medium", tagColor)}>
											{tag}
										</span>
									))}
								</div>
							</div>
						</div>
						<div className="flex shrink-0 items-center gap-3 self-start">
							<button className="border-border text-muted-foreground hover:text-foreground flex items-center gap-1.5 border px-3 py-2 text-sm transition-colors">
								<Bookmark className="size-4" />
								Save
							</button>
							<button className="border-border text-muted-foreground hover:text-foreground flex items-center gap-1.5 border px-3 py-2 text-sm transition-colors">
								<Share2 className="size-4" />
								Share
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Body */}
			<main className="bg-background flex-1 py-14">
				<div className="mx-auto max-w-7xl px-6">
					<div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
						{/* Left: description */}
						<div className="flex min-w-0 flex-1 flex-col gap-10">
							<article>
								<h2 className="font-display text-foreground mb-5 text-2xl font-semibold">
									About the Role
								</h2>
								<div className="flex flex-col gap-4">
									{descriptionParagraphs.map((para, i) => (
										<p
											key={i}
											className="text-muted-foreground text-base leading-[180%] font-normal"
										>
											{para}
										</p>
									))}
								</div>
							</article>
						</div>

						{/* Right: sticky summary card */}
						<aside className="shrink-0 lg:w-72 xl:w-80">
							<div className="border-border sticky top-24 flex flex-col gap-5 border p-6">
								<h3 className="font-display text-foreground text-lg font-semibold">Job Overview</h3>
								<div className="flex flex-col gap-4">
									{[
										{ icon: <Briefcase />, label: "Employment Type", value: job.employmentType },
										{ icon: <MapPin />, label: "Location", value: job.location },
										{ icon: <Briefcase />, label: "Category", value: job.category },
										{ icon: <Clock />, label: "Posted", value: formatDate(job.createdAt) }
									].map(({ icon, label, value }) => (
										<div key={label} className="flex items-start gap-3">
											<div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center [&>svg]:size-4">
												{icon}
											</div>
											<div className="flex flex-col gap-0.5">
												<span className="text-muted-foreground text-xs">{label}</span>
												<span className="text-foreground text-sm font-semibold">{value}</span>
											</div>
										</div>
									))}
								</div>
								<hr className="border-border" />
								<a
									href="#apply"
									className="bg-primary text-primary-foreground hover:bg-primary/80 flex w-full items-center justify-center py-3 text-sm font-semibold transition-colors"
								>
									Apply Now
								</a>
								<Link
									href={route.public.jobs}
									className="text-primary flex w-full items-center justify-center text-sm font-semibold hover:underline"
								>
									← Back to all jobs
								</Link>
							</div>
						</aside>
					</div>
				</div>
			</main>

			{/* Apply section */}
			<section id="apply" className="bg-[#F8F8FD] py-16">
				<div className="mx-auto max-w-7xl px-6">
					<div className="max-w-2xl">
						<h2 className="font-display text-foreground mb-2 text-[36px] font-semibold">
							Apply for this <span className="text-accent-blue">position</span>
						</h2>
						<p className="text-muted-foreground mb-10 text-base font-normal">
							Fill in the form below and we&apos;ll get back to you as soon as possible.
						</p>
						<ApplyForm jobTitle={job.title} jobId={job.id} />
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
