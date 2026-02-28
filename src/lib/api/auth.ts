/**
 * Server-side auth helpers — uses plain fetch so they can be called from RSC.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function getMe(cookieHeader: string): Promise<User | null> {
	try {
		const res = await fetch(`${BASE}/auth/me`, {
			headers: { cookie: cookieHeader },
			cache: "no-store"
		});
		if (!res.ok) return null;
		const json: ApiResponse<User> = await res.json();
		return json.data ?? null;
	} catch {
		return null;
	}
}
