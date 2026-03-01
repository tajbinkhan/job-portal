import { NextRequest, NextResponse } from "next/server";

const NEST_BASE = process.env.NEXT_PUBLIC_API_URL!;
const IS_PROD = process.env.NODE_ENV === "production";

/** Extract "name=value" from the first segment of a Set-Cookie header */
function setCookieFirstPart(header: string): string {
	return header.split(";")[0].trim();
}

/**
 * Parse the access-token value and Max-Age out of NestJS's Set-Cookie header.
 * Example: "access-token=eyJ...; Max-Age=604800; Path=/; HttpOnly; SameSite=Lax"
 */
function parseAccessTokenCookie(header: string): { value: string; maxAge: number } | null {
	const firstPart = header.split(";")[0].trim();
	const eqIdx = firstPart.indexOf("=");
	if (eqIdx === -1) return null;

	const name = firstPart.substring(0, eqIdx).trim();
	if (name !== "access-token") return null;

	const value = firstPart.substring(eqIdx + 1).trim();
	const maxAgeMatch = header.match(/[Mm]ax-[Aa]ge=(\d+)/);
	const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : 60 * 60 * 24 * 7; // default 7d

	return { value, maxAge };
}

/**
 * POST /api/auth/login
 *
 * Flow:
 *  1. Fetch a fresh CSRF token from NestJS (GET /csrf).
 *  2. Call NestJS POST /auth/login server-to-server, forwarding the CSRF cookie + token.
 *  3. Extract the access-token JWT from NestJS's Set-Cookie header.
 *  4. Re-plant it as an httpOnly cookie on the Next.js domain and return the JSON body.
 */
export async function POST(request: NextRequest) {
	let email: string, password: string;

	try {
		const body = (await request.json()) as { email?: string; password?: string };
		email = body.email ?? "";
		password = body.password ?? "";
	} catch {
		return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
	}

	if (!email || !password) {
		return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
	}

	// ── Step 1: Fetch CSRF token from NestJS ──────────────────────────────────
	let csrfToken: string;
	let csrfCookiePart: string; // "csrf-token=<value>"

	try {
		const csrfRes = await fetch(`${NEST_BASE}/csrf`, {
			method: "GET",
			headers: { "ngrok-skip-browser-warning": "true" }
		});

		if (!csrfRes.ok) {
			return NextResponse.json({ message: "Failed to fetch CSRF token" }, { status: 502 });
		}

		// The token value returned in the JSON body
		const csrfJson = (await csrfRes.json()) as { data?: string } | string;
		csrfToken =
			typeof csrfJson === "string" ? csrfJson : ((csrfJson as { data?: string }).data ?? "");

		// The csrf-token cookie set by NestJS — needed as a Cookie header in Step 2
		const setCookieHeader = csrfRes.headers.get("set-cookie") ?? "";
		csrfCookiePart = setCookieFirstPart(setCookieHeader); // "csrf-token=<value>"
	} catch {
		return NextResponse.json({ message: "Could not reach auth server" }, { status: 502 });
	}

	// ── Step 2: Call NestJS login server-to-server ───────────────────────────
	let nestRes: Response;
	try {
		nestRes = await fetch(`${NEST_BASE}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRF-Token": csrfToken,
				Cookie: csrfCookiePart,
				"ngrok-skip-browser-warning": "true"
			},
			body: JSON.stringify({ email, password })
		});
	} catch {
		return NextResponse.json({ message: "Could not reach auth server" }, { status: 502 });
	}

	const nestBody = await nestRes.json();

	if (!nestRes.ok) {
		return NextResponse.json(nestBody, { status: nestRes.status });
	}

	// ── Step 3: Extract access-token from NestJS Set-Cookie ──────────────────
	const rawSetCookie = nestRes.headers.get("set-cookie") ?? "";
	const tokenCookie = parseAccessTokenCookie(rawSetCookie);

	if (!tokenCookie) {
		return NextResponse.json(
			{ message: "Auth server did not return a session cookie" },
			{ status: 502 }
		);
	}

	// ── Step 4: Re-plant cookie on the Next.js domain ────────────────────────
	const response = NextResponse.json(nestBody, { status: nestRes.status });

	response.cookies.set("access-token", tokenCookie.value, {
		httpOnly: true,
		secure: IS_PROD,
		sameSite: "lax",
		path: "/",
		maxAge: tokenCookie.maxAge
	});

	return response;
}
