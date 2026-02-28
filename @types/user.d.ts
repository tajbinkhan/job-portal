interface User {
	id: string;
	name: string | null;
	email: string;
	password: string | null;
	emailVerified: boolean;
	role: "ADMIN" | "SUBSCRIBER";
	createdAt: string;
	updatedAt: string;
}
