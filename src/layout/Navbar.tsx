import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { route } from "@/routes/routes";

export function Navbar() {
	return (
		<header className="w-full bg-transparent">
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
				<div className="flex items-center gap-3">
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
			</div>
		</header>
	);
}
