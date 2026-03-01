export interface Job {
	id: number;
	title: string;
	company: string;
	logo: string; // single letter initial
	logoBg: string; // Tailwind bg class
	logoText: string; // Tailwind text class
	location: string;
	category: string;
	type: "Full-Time" | "Part-Time" | "Contract" | "Internship";
	tags: string[];
	shortDescription: string;
	fullDescription: string;
	requirements: string[];
	benefits: string[];
	salary: string;
	postedAt: string; // ISO date string
	isFeatured: boolean;
}

export const ALL_CATEGORIES = [
	"Design",
	"Sales",
	"Marketing",
	"Finance",
	"Technology",
	"Engineering",
	"Business",
	"Human Resource"
];

export const ALL_LOCATIONS = [
	"Florence",
	"Rome",
	"Milan",
	"Venice",
	"Naples",
	"Turin",
	"Bologna",
	"Paris",
	"London",
	"Berlin",
	"Madrid",
	"Barcelona",
	"Amsterdam",
	"Vienna",
	"Prague"
];

export const ALL_JOB_TYPES: Job["type"][] = ["Full-Time", "Part-Time", "Contract", "Internship"];

export const TAG_COLORS: Record<string, string> = {
	Marketing: "bg-orange-100 text-orange-700",
	Design: "bg-purple-100 text-purple-700",
	Business: "bg-green-100 text-green-700",
	Technology: "bg-blue-100 text-blue-700",
	Engineering: "bg-cyan-100 text-cyan-700",
	Finance: "bg-yellow-100 text-yellow-700",
	Sales: "bg-red-100 text-red-700",
	"Human Resource": "bg-pink-100 text-pink-700"
};
