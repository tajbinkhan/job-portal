import { Suspense } from "react";

import { LoginTemplate } from "@/templates/Authentication/Login/LoginTemplate";

export const metadata = { title: "Sign In | Admin" };

export default function LoginPage() {
	return (
		<Suspense>
			<LoginTemplate />
		</Suspense>
	);
}

