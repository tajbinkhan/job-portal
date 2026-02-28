export const route = {
	public: {
		jobs: "/jobs"
	},
	private: {
		dashboard: "/dashboard",
		jobs: "/dashboard/jobs",
		createJob: "/dashboard/jobs/create",
		editJob: (id: string) => `/dashboard/jobs/${id}/edit`
	},
	protected: {
		login: "/login"
	}
};

export const apiRoute = {
	csrfToken: "/csrf",
	login: "/auth/login",
	logout: "/auth/logout",
	me: "/auth/me",
	jobs: "/jobs",
	job: (id: string) => `/jobs/${id}`,
	applications: "/applications"
} as const;
