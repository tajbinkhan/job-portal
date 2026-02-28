import { NextRequest, NextResponse } from "next/server";

import { route } from "@/routes/routes";

const DASHBOARD_PREFIX = "/dashboard";
const LOGIN_PATH = route.protected.login;

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("access-token");

	// Redirect authenticated users away from the login page
	if (pathname === LOGIN_PATH) {
		if (token) {
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

	// Check for access-token cookie — fast edge check
	if (!token) {
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
