/**
 * Server-side API helpers — safe to import in RSC (no "use client" restriction).
 * Uses plain fetch so Next.js can apply caching/revalidation strategies.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL;

function buildParams(query: JobsQuery): string {
	const params = new URLSearchParams();
	Object.entries(query).forEach(([key, value]) => {
		if (value !== undefined && value !== "") {
			params.set(key, String(value));
		}
	});
	return params.toString();
}

export async function getJobs(query: JobsQuery = {}): Promise<ApiResponse<Job[]>> {
	const qs = buildParams(query);
	const res = await fetch(`${BASE}/jobs${qs ? `?${qs}` : ""}`, {
		next: { tags: ["jobs"] }
	});
	if (!res.ok) throw new Error("Failed to fetch jobs");
	return res.json() as Promise<ApiResponse<Job[]>>;
}

export async function getJob(id: string): Promise<ApiResponse<Job> | null> {
	const res = await fetch(`${BASE}/jobs/${id}`, {
		next: { tags: ["jobs", `job-${id}`] }
	});
	if (res.status === 404) return null;
	if (!res.ok) throw new Error("Failed to fetch job");
	return res.json() as Promise<ApiResponse<Job>>;
}

export async function getJobFilters(): Promise<ApiResponse<JobFilters>> {
	const res = await fetch(`${BASE}/jobs/assets`, {
		next: { revalidate: 3600, tags: ["job-filters"] }
	});
	if (!res.ok) throw new Error("Failed to fetch job filters");
	return res.json() as Promise<ApiResponse<JobFilters>>;
}
