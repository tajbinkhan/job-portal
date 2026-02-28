interface GlobalLayoutProps {
	children: React.ReactNode;
}

interface GlobalLayoutPropsWithLocale {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}

interface GlobalValues {
	[key: string]: string | string[] | undefined;
}

interface GlobalCommonValues {
	label: string;
	value: string;
}

interface ApiSearchParams {
	page: number;
	limit: number;
	sortBy: string;
	sortOrder: "asc" | "desc";
	search?: string;
	from?: Date;
	to?: Date;
}

interface TableSelectData {
	from: Date;
	to: Date;
}

interface Pagination {
	totalItems: number;
	limit: number;
	offset: number;
	currentPage: number;
	totalPages: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: number | null;
	nextPage: number | null;
}

interface CursorPagination {
	totalItems: number;
	hasMoreBefore: boolean;
	hasMoreAfter: boolean;
	beforeCursor: string;
	afterCursor: string;
	count: number;
}

interface ApiResponse<T> {
	statusCode: number;
	message: string;
	data?: T;
	pagination?: Pagination;
	timestamp: string;
	path: string;
	code?: string;
}

interface ApiCursorResponse<T> {
	statusCode: number;
	message: string;
	data?: T;
	cursorPagination?: CursorPagination;
	timestamp: string;
	path: string;
	code?: string;
}

interface Job {
	id: string;
	title: string;
	company: string;
	companyLogoUrl: string | null;
	location: string;
	category: string;
	employmentType: string;
	tags: string[];
	description: string;
	isFeatured: boolean;
	createdAt: string;
	updatedAt: string;
}

interface Application {
	id: string;
	jobId: string;
	name: string;
	email: string;
	resumeLink: string;
	coverNote: string;
	createdAt: string;
	updatedAt: string;
}

interface JobsQuery {
	page?: number;
	limit?: number;
	sortBy?: "title" | "createdAt";
	sortOrder?: "asc" | "desc";
	search?: string;
	category?: string;
	location?: string;
	employmentType?: string;
	isFeatured?: boolean;
}

interface ApplicationPayload {
	jobId: string;
	name: string;
	email: string;
	resumeLink: string;
	coverNote: string;
}

type JobFormData = Omit<Job, "id" | "createdAt" | "updatedAt">;

interface JobFilters {
	locations: string[];
	employmentTypes: string[];
	categories: string[];
}
