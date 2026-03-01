import { NextRequest, NextResponse } from "next/server";

const NEST_BASE = process.env.NEXT_PUBLIC_API_URL!;
const IS_PROD = process.env.NODE_ENV === "production";

/** Extract "name=value" from the first segment of a Set-Cookie header */
function setCookieFirstPart(header: string): string {
	return header.split(";")[0].trim();
}

/**
 * POST /api/auth/logout
 *
 * Flow:
 *  1. Read the access-token from the Next.js-domain cookie.
 *  2. Fetch a fresh CSRF token from NestJS (GET /csrf).
 *  3. Call NestJS POST /auth/logout server-to-server, forwarding the CSRF cookie + token
 *     and the access-token so NestJS can revoke the DB session.
 *  4. Clear the access-token cookie from the Next.js domain.
 */
export async function POST(request: NextRequest) {
	const accessToken = request.cookies.get("access-token")?.value;

	if (!accessToken) {
		// Nothing to do — already logged out
		return NextResponse.json({ message: "No active session" }, { status: 200 });
	}

	// ── Step 1: Fetch CSRF token from NestJS ──────────────────────────────────
	let csrfToken: string;
	let csrfCookiePart: string;

	try {
		const csrfRes = await fetch(`${NEST_BASE}/csrf`, {
			method: "GET",
			headers: { "ngrok-skip-browser-warning": "true" }
		});

		if (!csrfRes.ok) {
			return NextResponse.json({ message: "Failed to fetch CSRF token" }, { status: 502 });
		}

		const csrfJson = (await csrfRes.json()) as { data?: string } | string;
		csrfToken =
			typeof csrfJson === "string" ? csrfJson : ((csrfJson as { data?: string }).data ?? "");

		const setCookieHeader = csrfRes.headers.get("set-cookie") ?? "";
		csrfCookiePart = setCookieFirstPart(setCookieHeader); // "csrf-token=<value>"
	} catch {
		return NextResponse.json({ message: "Could not reach auth server" }, { status: 502 });
	}

	// ── Step 2: Call NestJS logout server-to-server ───────────────────────────
	try {
		const nestRes = await fetch(`${NEST_BASE}/auth/logout`, {
			method: "POST",
			headers: {
				"X-CSRF-Token": csrfToken,
				// Forward both the CSRF cookie and the session token
				Cookie: `${csrfCookiePart}; access-token=${accessToken}`,
				"ngrok-skip-browser-warning": "true"
			}
		});

		const nestBody = await nestRes.json();

		// Clear the Next.js-domain cookie regardless of NestJS response
		const response = NextResponse.json(nestBody, { status: nestRes.status });
		response.cookies.set("access-token", "", {
			httpOnly: true,
			secure: IS_PROD,
			sameSite: "lax",
			path: "/",
			maxAge: 0 // expire immediately
		});

		return response;
	} catch {
		// Even if NestJS is unreachable, clear the local cookie so the user is logged out
		const response = NextResponse.json({ message: "Logged out" }, { status: 200 });
		response.cookies.set("access-token", "", {
			httpOnly: true,
			secure: IS_PROD,
			sameSite: "lax",
			path: "/",
			maxAge: 0
		});
		return response;
	}
}
