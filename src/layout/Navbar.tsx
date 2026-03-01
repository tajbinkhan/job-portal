"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { route } from "@/routes/routes";

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="relative w-full bg-transparent">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
				<div className="flex items-center gap-12">
					<Link href="/" className="flex items-center gap-2">
						<Image src="/images/logo.png" alt="JobFinder Logo" width={130} height={130} />
					</Link>
					<nav className="hidden items-start gap-8 md:flex">
						<Link
							href={route.public.jobs}
							className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
						>
							Find Jobs
						</Link>
						<Link
							href="/companies"
							className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
						>
							Browse Companies
						</Link>
					</nav>
				</div>

				{/* Desktop actions */}
				<div className="hidden items-center gap-3 md:flex">
					<Link
						href="/login"
						className="px-4 py-2 text-sm font-bold text-indigo-700 transition-colors hover:text-indigo-900"
					>
						Login
					</Link>
					<Button
						size="default"
						className="rounded-md bg-indigo-700 px-6 text-sm font-semibold text-white hover:bg-indigo-800"
					>
						Sign Up
					</Button>
				</div>

				{/* Mobile hamburger */}
				<button
					className="flex items-center justify-center rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
					onClick={() => setMobileMenuOpen(prev => !prev)}
					aria-label="Toggle menu"
				>
					{mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
				</button>
			</div>

			{/* Mobile dropdown menu */}
			{mobileMenuOpen && (
				<div className="absolute top-full right-0 left-0 z-50 border-t border-gray-100 bg-white/95 px-6 py-5 shadow-lg backdrop-blur-sm md:hidden">
					<nav className="flex flex-col gap-4">
						<Link
							href={route.public.jobs}
							onClick={() => setMobileMenuOpen(false)}
							className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
						>
							Find Jobs
						</Link>
						<Link
							href="/companies"
							onClick={() => setMobileMenuOpen(false)}
							className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
						>
							Browse Companies
						</Link>
					</nav>
					<div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-5">
						<Link
							href="/login"
							onClick={() => setMobileMenuOpen(false)}
							className="text-center text-sm font-bold text-indigo-700 transition-colors hover:text-indigo-900"
						>
							Login
						</Link>
						<Button
							size="default"
							className="w-full rounded-md bg-indigo-700 text-sm font-semibold text-white hover:bg-indigo-800"
							onClick={() => setMobileMenuOpen(false)}
						>
							Sign Up
						</Button>
					</div>
				</div>
			)}
		</header>
	);
}
