import { NextRequest, NextResponse } from "next/server";

import { apiRoutePrefix } from "@/routes/middleware-routes";
import { apiRoute, route } from "@/routes/routes";

const DASHBOARD_PREFIX = route.private.dashboard; // "/dashboard"
const LOGIN_PATH = route.protected.login;

async function verifySession(request: NextRequest): Promise<boolean> {
	// The auth cookie lives on the Next.js domain; forward it explicitly to NestJS.
	const accessToken = request.cookies.get("access-token")?.value;
	if (!accessToken) return false;

	try {
		const response = await fetch(`${apiRoutePrefix}${apiRoute.me}`, {
			method: "GET",
			headers: {
				Cookie: `access-token=${accessToken}`,
				"ngrok-skip-browser-warning": "true"
			}
		});
		return response.ok;
	} catch {
		return false;
	}
}

export default async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Redirect authenticated users away from the login page
	if (pathname === LOGIN_PATH) {
		const isAuthenticated = await verifySession(request);
		if (isAuthenticated) {
			const dashboardUrl = request.nextUrl.clone();
			dashboardUrl.pathname = route.private.dashboard;
			dashboardUrl.search = "";
			return NextResponse.redirect(dashboardUrl);
		}
		return NextResponse.next();
	}

	// Only guard dashboard routes
	if (!pathname.startsWith(DASHBOARD_PREFIX)) {
		return NextResponse.next();
	}

	// Verify the session with the backend /me endpoint
	const isAuthenticated = await verifySession(request);
	if (!isAuthenticated) {
		const loginUrl = request.nextUrl.clone();
		loginUrl.pathname = LOGIN_PATH;
		loginUrl.searchParams.set("from", pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/login"]
};
