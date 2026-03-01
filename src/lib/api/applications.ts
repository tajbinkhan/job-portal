/**
 * Server-side API helpers — safe to import in RSC (no "use client" restriction).
 * Forwards the request's cookie header so the admin session is authenticated.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL;

function buildParams(query: ApplicationsQuery): string {
	const params = new URLSearchParams();
	Object.entries(query).forEach(([key, value]) => {
		if (value !== undefined && value !== "") {
			params.set(key, String(value));
		}
	});
	return params.toString();
}

export async function getApplications(
	cookieHeader: string,
	query: ApplicationsQuery = {}
): Promise<ApiResponse<Application[]>> {
	const qs = buildParams(query);
	const res = await fetch(`${BASE}/applications${qs ? `?${qs}` : ""}`, {
		headers: { cookie: cookieHeader },
		cache: "no-store"
	});
	if (!res.ok) throw new Error("Failed to fetch applications");
	return res.json() as Promise<ApiResponse<Application[]>>;
}
