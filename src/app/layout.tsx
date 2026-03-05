import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

const epilogue = Epilogue({
	subsets: ["latin"],
	variable: "--font-sans",
	weight: ["400", "500", "600", "700", "800"]
});

const clashDisplay = localFont({
	src: [
		{ path: "../../public/fonts/ClashDisplay-Extralight.otf", weight: "200" },
		{ path: "../../public/fonts/ClashDisplay-Light.otf", weight: "300" },
		{ path: "../../public/fonts/ClashDisplay-Regular.otf", weight: "400" },
		{ path: "../../public/fonts/ClashDisplay-Medium.otf", weight: "500" },
		{ path: "../../public/fonts/ClashDisplay-Semibold.otf", weight: "600" },
		{ path: "../../public/fonts/ClashDisplay-Bold.otf", weight: "700" }
	],
	variable: "--font-display"
});

const APP_URL = process.env.NEXT_PUBLIC_FRONTEND_URL ?? "http://localhost:3000";
const APP_TITLE = "QuickHire";
const APP_DESCRIPTION =
	"QuickHire is your go-to platform for discovering and applying to thousands of job opportunities across various categories and locations. Whether you're looking for remote work, part-time gigs, or full-time careers, QuickHire connects you with the best employers in the industry.";

export const metadata: Metadata = {
	metadataBase: new URL(APP_URL),
	title: {
		default: `${APP_TITLE} - Find Your Dream Job`,
		template: `%s | ${APP_TITLE}`
	},
	description: APP_DESCRIPTION,
	keywords: ["jobs", "careers", "hiring", "employment", "job search", "remote work"],
	robots: { index: true, follow: true },
	openGraph: {
		type: "website",
		siteName: APP_TITLE,
		title: `${APP_TITLE} - Find Your Dream Job`,
		description: APP_DESCRIPTION,
		url: APP_URL,
		images: [{ url: "/og", width: 1200, height: 630, alt: APP_TITLE }]
	},
	twitter: {
		card: "summary_large_image",
		title: `${APP_TITLE} - Find Your Dream Job`,
		description: APP_DESCRIPTION,
		images: ["/og"]
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${epilogue.variable} ${clashDisplay.variable}`}
			suppressHydrationWarning
		>
			<body className={`antialiased`} suppressHydrationWarning>
				{children}
			</body>
		</html>
	);
}

