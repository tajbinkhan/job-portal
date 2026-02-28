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

export const metadata: Metadata = {
	title: "QuickHire - Find Your Dream Job",
	description:
		"QuickHire is your go-to platform for discovering and applying to thousands of job opportunities across various categories and locations. Whether you're looking for remote work, part-time gigs, or full-time careers, QuickHire connects you with the best employers in the industry. Start your job search today and take the next step in your career with QuickHire!"
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

