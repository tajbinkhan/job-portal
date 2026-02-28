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

const baseFullDescription = (title: string, company: string) =>
	`We are looking for a talented ${title} to join the ${company} team. You'll work closely with cross-functional teams to deliver impactful solutions that shape how millions of users experience our product.\n\nAs a ${title}, you will be responsible for driving initiatives from concept through execution. You'll collaborate with product managers, engineers, and other stakeholders to align on priorities and deliver outstanding results.\n\nIn this role you will have the opportunity to make a real impact, mentor junior team members, and grow your skills in a fast-paced, collaborative environment. We value creative thinkers who are not afraid to challenge the status quo and bring fresh ideas to the table.`;

export const jobs: Job[] = [
	{
		id: 1,
		title: "Email Marketing Specialist",
		company: "Revolut",
		logo: "R",
		logoBg: "bg-foreground",
		logoText: "text-background",
		location: "Madrid",
		category: "Marketing",
		type: "Full-Time",
		tags: ["Marketing", "Design"],
		shortDescription:
			"Revolut is looking for an Email Marketing Specialist to help the team craft compelling campaigns that drive engagement and growth.",
		fullDescription: baseFullDescription("Email Marketing Specialist", "Revolut"),
		requirements: [
			"3+ years of experience in email marketing or digital marketing",
			"Proficiency with email platforms (Klaviyo, Mailchimp, or similar)",
			"Strong copywriting and communication skills",
			"Experience with A/B testing and campaign optimization",
			"Data-driven mindset with ability to derive insights from analytics",
			"Familiarity with HTML/CSS for email template editing"
		],
		benefits: [
			"Competitive salary & equity",
			"Flexible remote work",
			"Private health insurance",
			"Annual learning budget",
			"Home office stipend",
			"30 days paid leave"
		],
		salary: "$60,000 – $80,000",
		postedAt: "2026-02-20",
		isFeatured: true
	},
	{
		id: 2,
		title: "Brand Designer",
		company: "Dropbox",
		logo: "D",
		logoBg: "bg-blue-500",
		logoText: "text-white",
		location: "London",
		category: "Design",
		type: "Full-Time",
		tags: ["Design", "Business"],
		shortDescription:
			"Dropbox is seeking a Brand Designer to shape and evolve the visual identity of one of the world's leading file-sharing platforms.",
		fullDescription: baseFullDescription("Brand Designer", "Dropbox"),
		requirements: [
			"5+ years of brand design experience",
			"Expert knowledge of Figma and Adobe Creative Suite",
			"Portfolio showcasing strong brand identity work",
			"Experience working with global design systems",
			"Excellent communication and presentation skills",
			"Ability to manage multiple projects in a fast-paced environment"
		],
		benefits: [
			"Competitive salary & RSUs",
			"Flexible hybrid schedule",
			"Comprehensive health coverage",
			"Wellness reimbursement",
			"Career development programs",
			"Parental leave"
		],
		salary: "$90,000 – $120,000",
		postedAt: "2026-02-18",
		isFeatured: true
	},
	{
		id: 3,
		title: "Customer Success Manager",
		company: "Pitch",
		logo: "P",
		logoBg: "bg-gray-800",
		logoText: "text-white",
		location: "Berlin",
		category: "Business",
		type: "Full-Time",
		tags: ["Business", "Marketing"],
		shortDescription:
			"Pitch is looking for a Customer Success Manager to ensure clients achieve their goals and maximize value from our platform.",
		fullDescription: baseFullDescription("Customer Success Manager", "Pitch"),
		requirements: [
			"3+ years in a customer success or account management role",
			"Experience with SaaS products",
			"Strong communication and relationship-building skills",
			"Ability to analyze customer data and surface actionable insights",
			"Familiarity with CRM tools (HubSpot, Salesforce)",
			"Proactive problem-solving mindset"
		],
		benefits: [
			"Competitive salary",
			"Stock options",
			"Remote-friendly culture",
			"Annual team retreats",
			"Generous PTO",
			"Learning & development budget"
		],
		salary: "$70,000 – $95,000",
		postedAt: "2026-02-15",
		isFeatured: false
	},
	{
		id: 4,
		title: "Visual Designer",
		company: "Blinklist",
		logo: "B",
		logoBg: "bg-green-500",
		logoText: "text-white",
		location: "Barcelona",
		category: "Design",
		type: "Contract",
		tags: ["Design"],
		shortDescription:
			"Blinklist is seeking a Visual Designer to create stunning visuals and illustrations for our rapidly growing content platform.",
		fullDescription: baseFullDescription("Visual Designer", "Blinklist"),
		requirements: [
			"Portfolio demonstrating strong visual design sensibility",
			"4+ years of visual or graphic design experience",
			"Mastery of Figma, Illustrator, and Photoshop",
			"Experience designing for digital products and web",
			"Understanding of typography, color, and layout principles",
			"Able to deliver high-quality work under deadline"
		],
		benefits: [
			"Competitive contract rate",
			"Flexible working hours",
			"Creative, supportive team",
			"Option to convert to full-time",
			"Remote-first"
		],
		salary: "$60 – $80/hr",
		postedAt: "2026-02-12",
		isFeatured: false
	},
	{
		id: 5,
		title: "Product Designer",
		company: "ClassPass",
		logo: "C",
		logoBg: "bg-orange-500",
		logoText: "text-white",
		location: "London",
		category: "Design",
		type: "Full-Time",
		tags: ["Design", "Technology"],
		shortDescription:
			"ClassPass is hiring a Product Designer to craft seamless user experiences across our fitness and wellness marketplace.",
		fullDescription: baseFullDescription("Product Designer", "ClassPass"),
		requirements: [
			"4+ years of product design experience",
			"Strong UX research and prototyping skills",
			"Experience designing for mobile (iOS and Android)",
			"Expertise in Figma",
			"Ability to translate complex user needs into elegant solutions",
			"Experience working in agile teams"
		],
		benefits: [
			"Free ClassPass membership",
			"Competitive compensation",
			"Flexible work schedule",
			"Health & dental insurance",
			"401(k) matching",
			"Professional development budget"
		],
		salary: "$100,000 – $130,000",
		postedAt: "2026-02-10",
		isFeatured: true
	},
	{
		id: 6,
		title: "Lead UX Designer",
		company: "Canva",
		logo: "C",
		logoBg: "bg-teal-500",
		logoText: "text-white",
		location: "Amsterdam",
		category: "Design",
		type: "Full-Time",
		tags: ["Design", "Business"],
		shortDescription:
			"Canva is looking for a Lead UX Designer to guide design strategy and mentor a growing team of talented designers.",
		fullDescription: baseFullDescription("Lead UX Designer", "Canva"),
		requirements: [
			"7+ years of UX design experience",
			"Proven track record leading design teams",
			"Deep expertise in user research methodologies",
			"Experience with large-scale design systems",
			"Excellent stakeholder communication skills",
			"Data-informed design approach"
		],
		benefits: [
			"Above-market salary",
			"Equity package",
			"Global remote options",
			"Home office budget",
			"Generous parental leave",
			"Health & wellness benefits"
		],
		salary: "$130,000 – $160,000",
		postedAt: "2026-02-08",
		isFeatured: true
	},
	{
		id: 7,
		title: "Brand Strategist",
		company: "GoDaddy",
		logo: "G",
		logoBg: "bg-green-600",
		logoText: "text-white",
		location: "Madrid",
		category: "Marketing",
		type: "Full-Time",
		tags: ["Marketing", "Business"],
		shortDescription:
			"GoDaddy is hiring a Brand Strategist to develop and execute strategies that strengthen our global brand presence.",
		fullDescription: baseFullDescription("Brand Strategist", "GoDaddy"),
		requirements: [
			"5+ years in brand strategy or marketing",
			"Strong analytical and creative thinking skills",
			"Experience with market research and competitive analysis",
			"Ability to influence and collaborate cross-functionally",
			"Excellent written and verbal communication",
			"Experience in tech or SaaS industry preferred"
		],
		benefits: [
			"Competitive salary",
			"Performance bonuses",
			"Remote flexibility",
			"Comprehensive benefits package",
			"Employee resource groups",
			"Paid volunteer time"
		],
		salary: "$85,000 – $110,000",
		postedAt: "2026-02-05",
		isFeatured: false
	},
	{
		id: 8,
		title: "Data Analyst",
		company: "Twitter",
		logo: "T",
		logoBg: "bg-sky-500",
		logoText: "text-white",
		location: "Paris",
		category: "Technology",
		type: "Full-Time",
		tags: ["Technology", "Business"],
		shortDescription:
			"Twitter is seeking a Data Analyst to transform complex datasets into actionable insights that drive product and business decisions.",
		fullDescription: baseFullDescription("Data Analyst", "Twitter"),
		requirements: [
			"3+ years of data analysis experience",
			"Proficiency in SQL and Python or R",
			"Experience with BI tools (Tableau, Looker, or similar)",
			"Ability to communicate findings clearly to non-technical stakeholders",
			"Statistical analysis background",
			"Experience with large-scale data pipelines"
		],
		benefits: [
			"Competitive salary",
			"Equity grants",
			"Medical, dental, vision coverage",
			"Mental health support",
			"Home office allowance",
			"Unlimited PTO"
		],
		salary: "$80,000 – $105,000",
		postedAt: "2026-02-03",
		isFeatured: false
	},
	{
		id: 9,
		title: "Frontend Engineer",
		company: "Netlify",
		logo: "N",
		logoBg: "bg-teal-500",
		logoText: "text-white",
		location: "Amsterdam",
		category: "Engineering",
		type: "Full-Time",
		tags: ["Technology", "Engineering"],
		shortDescription:
			"Netlify is looking for a Frontend Engineer to build exceptional web experiences and contribute to an industry-leading deployment platform.",
		fullDescription: baseFullDescription("Frontend Engineer", "Netlify"),
		requirements: [
			"4+ years of frontend development experience",
			"Expertise in React and TypeScript",
			"Strong understanding of web performance optimization",
			"Experience with CI/CD pipelines and deployment workflows",
			"Knowledge of modern CSS techniques and tooling",
			"Passion for developer experience"
		],
		benefits: [
			"Competitive salary",
			"Equity options",
			"Fully remote",
			"Home office stipend",
			"Health insurance",
			"Conference & learning budget"
		],
		salary: "$110,000 – $145,000",
		postedAt: "2026-01-30",
		isFeatured: true
	},
	{
		id: 10,
		title: "Sales Development Representative",
		company: "Maze",
		logo: "M",
		logoBg: "bg-pink-500",
		logoText: "text-white",
		location: "Paris",
		category: "Sales",
		type: "Full-Time",
		tags: ["Sales", "Marketing"],
		shortDescription:
			"Maze is hiring an SDR to drive top-of-funnel growth by identifying and qualifying high-value leads for our product research platform.",
		fullDescription: baseFullDescription("Sales Development Representative", "Maze"),
		requirements: [
			"1–3 years of SDR or sales experience",
			"Strong interpersonal and communication skills",
			"Experience with CRM software (Salesforce preferred)",
			"Ability to handle objections and persist through challenges",
			"Goal-oriented with a competitive mindset",
			"SaaS experience is a plus"
		],
		benefits: [
			"Base salary + commission",
			"Equity",
			"Remote-first",
			"International team",
			"Health coverage",
			"Quarterly team events"
		],
		salary: "$50,000 – $70,000 + commission",
		postedAt: "2026-01-28",
		isFeatured: false
	},
	{
		id: 11,
		title: "Infrastructure Engineer",
		company: "Terraform",
		logo: "T",
		logoBg: "bg-yellow-500",
		logoText: "text-white",
		location: "Berlin",
		category: "Engineering",
		type: "Full-Time",
		tags: ["Engineering", "Technology"],
		shortDescription:
			"Terraform is looking for an Infrastructure Engineer to architect and manage scalable, reliable cloud infrastructure for our growing platform.",
		fullDescription: baseFullDescription("Infrastructure Engineer", "Terraform"),
		requirements: [
			"5+ years of infrastructure / DevOps experience",
			"Expertise with AWS, GCP, or Azure",
			"Proficiency in Infrastructure-as-Code (Terraform, Pulumi)",
			"Experience with Kubernetes and Docker",
			"Strong Linux systems administration background",
			"Security-conscious approach to infrastructure design"
		],
		benefits: [
			"Top-tier salary",
			"Generous equity",
			"Fully remote",
			"Hardware budget",
			"Health & wellness allowance",
			"Flexible PTO"
		],
		salary: "$120,000 – $155,000",
		postedAt: "2026-01-25",
		isFeatured: false
	},
	{
		id: 12,
		title: "Instructional Designer",
		company: "Udacity",
		logo: "U",
		logoBg: "bg-indigo-500",
		logoText: "text-white",
		location: "Vienna",
		category: "Design",
		type: "Part-Time",
		tags: ["Design", "Business"],
		shortDescription:
			"Udacity is seeking an Instructional Designer to create engaging, effective learning experiences for thousands of students worldwide.",
		fullDescription: baseFullDescription("Instructional Designer", "Udacity"),
		requirements: [
			"3+ years of instructional design or eLearning development",
			"Familiarity with ADDIE or SAM instructional design models",
			"Experience with authoring tools (Articulate, Adobe Captivate)",
			"Strong project management and communication skills",
			"Ability to translate technical content into learner-friendly formats",
			"Background in adult learning principles"
		],
		benefits: [
			"Part-time flexible schedule",
			"Free Udacity courses",
			"Remote work",
			"Collaborative team environment",
			"Stipend for tools and resources"
		],
		salary: "$45,000 – $60,000",
		postedAt: "2026-01-22",
		isFeatured: false
	},
	{
		id: 13,
		title: "HR Business Partner",
		company: "Packer",
		logo: "P",
		logoBg: "bg-orange-500",
		logoText: "text-white",
		location: "Prague",
		category: "Human Resource",
		type: "Full-Time",
		tags: ["Human Resource", "Business"],
		shortDescription:
			"Packer is looking for an HR Business Partner to foster a high-performing, inclusive culture and support leadership with strategic people initiatives.",
		fullDescription: baseFullDescription("HR Business Partner", "Packer"),
		requirements: [
			"5+ years of HR generalist or HRBP experience",
			"Deep knowledge of employment law (EU preferred)",
			"Strong coaching and conflict-resolution skills",
			"Experience with performance management systems",
			"Data-driven approach to HR decisions",
			"Exceptional interpersonal and communication skills"
		],
		benefits: [
			"Competitive salary",
			"Hybrid work model",
			"Comprehensive health plan",
			"Professional HR certification support",
			"Paid parental leave",
			"Team social events"
		],
		salary: "$75,000 – $95,000",
		postedAt: "2026-01-18",
		isFeatured: false
	},
	{
		id: 14,
		title: "Full Stack Developer",
		company: "Webflow",
		logo: "W",
		logoBg: "bg-blue-700",
		logoText: "text-white",
		location: "Amsterdam",
		category: "Engineering",
		type: "Full-Time",
		tags: ["Technology", "Engineering"],
		shortDescription:
			"Webflow is hiring a Full Stack Developer to build powerful features that empower designers and developers to create the web without code.",
		fullDescription: baseFullDescription("Full Stack Developer", "Webflow"),
		requirements: [
			"5+ years of full-stack development experience",
			"Proficiency in Node.js, React, and TypeScript",
			"Experience with PostgreSQL and NoSQL databases",
			"Understanding of REST APIs and GraphQL",
			"Passion for web standards and accessibility",
			"Strong problem-solving and debugging skills"
		],
		benefits: [
			"Competitive salary + equity",
			"Remote-first culture",
			"Health, dental, and vision",
			"401(k) with match",
			"Generous PTO",
			"Annual team offsite"
		],
		salary: "$115,000 – $150,000",
		postedAt: "2026-01-15",
		isFeatured: true
	},
	{
		id: 15,
		title: "Financial Analyst",
		company: "Nomad",
		logo: "N",
		logoBg: "bg-green-500",
		logoText: "text-white",
		location: "London",
		category: "Finance",
		type: "Full-Time",
		tags: ["Finance", "Business"],
		shortDescription:
			"Nomad is seeking a Financial Analyst to build models, analyse performance metrics, and provide strategic guidance to our leadership team.",
		fullDescription: baseFullDescription("Financial Analyst", "Nomad"),
		requirements: [
			"3+ years of financial analysis or investment banking experience",
			"Advanced Excel and financial modelling skills",
			"Experience with ERP systems (SAP, Oracle, or similar)",
			"CFA candidate or qualified preferred",
			"Strong attention to detail and accuracy",
			"Excellent presentation and communication skills"
		],
		benefits: [
			"Competitive salary",
			"Annual bonus",
			"Remote-compatible role",
			"Health insurance",
			"Learning & certification support",
			"Collaborative team environment"
		],
		salary: "$85,000 – $110,000",
		postedAt: "2026-01-12",
		isFeatured: false
	},
	{
		id: 16,
		title: "Recruiter",
		company: "Canva",
		logo: "C",
		logoBg: "bg-teal-500",
		logoText: "text-white",
		location: "Barcelona",
		category: "Human Resource",
		type: "Full-Time",
		tags: ["Human Resource", "Sales"],
		shortDescription:
			"Canva is hiring a Recruiter to attract and hire world-class talent to help us achieve our mission of empowering the world to design.",
		fullDescription: baseFullDescription("Recruiter", "Canva"),
		requirements: [
			"3+ years of full-cycle recruiting experience",
			"Experience hiring for technical and non-technical roles",
			"Proficiency with ATS systems (Greenhouse, Lever, or similar)",
			"Strong sourcing strategies (Boolean, LinkedIn Recruiter, etc.)",
			"Excellent candidate experience mindset",
			"Ability to manage multiple requisitions simultaneously"
		],
		benefits: [
			"Competitive salary",
			"Equity package",
			"Unlimited Canva Pro",
			"Flexible work arrangements",
			"Health & wellness perks",
			"International team culture"
		],
		salary: "$70,000 – $90,000",
		postedAt: "2026-01-10",
		isFeatured: false
	},
	{
		id: 17,
		title: "Backend Engineer",
		company: "Revolut",
		logo: "R",
		logoBg: "bg-foreground",
		logoText: "text-background",
		location: "London",
		category: "Engineering",
		type: "Full-Time",
		tags: ["Engineering", "Technology"],
		shortDescription:
			"Revolut is looking for a Backend Engineer to design and build the highly scalable systems that power global financial services for millions of users.",
		fullDescription: baseFullDescription("Backend Engineer", "Revolut"),
		requirements: [
			"5+ years of backend engineering experience",
			"Strong proficiency in Java, Kotlin, or Go",
			"Experience with microservices and distributed systems",
			"Understanding of financial domain and compliance",
			"Familiarity with event-driven architectures (Kafka, RabbitMQ)",
			"Commitment to code quality and testing"
		],
		benefits: [
			"Top-tier compensation",
			"Stock options",
			"Global mobility options",
			"Private health insurance",
			"Mental health support",
			"Learning budget"
		],
		salary: "$130,000 – $165,000",
		postedAt: "2026-01-08",
		isFeatured: false
	},
	{
		id: 18,
		title: "Account Executive",
		company: "Pitch",
		logo: "P",
		logoBg: "bg-gray-800",
		logoText: "text-white",
		location: "Berlin",
		category: "Sales",
		type: "Full-Time",
		tags: ["Sales", "Business"],
		shortDescription:
			"Pitch is looking for an Account Executive to close enterprise deals and build lasting relationships with key accounts across Europe.",
		fullDescription: baseFullDescription("Account Executive", "Pitch"),
		requirements: [
			"4+ years of B2B SaaS sales experience",
			"Proven track record of exceeding quota",
			"Excellent negotiation and closing skills",
			"Familiarity with MEDDIC or similar sales methodologies",
			"Experience managing complex enterprise sales cycles",
			"Strong written and verbal communication in English (German a plus)"
		],
		benefits: [
			"Competitive base + uncapped commission",
			"Equity",
			"Flexible hybrid work",
			"International sales team",
			"Health coverage",
			"Company events & offsites"
		],
		salary: "$90,000 – $120,000 + commission",
		postedAt: "2026-01-05",
		isFeatured: false
	},
	{
		id: 19,
		title: "Content Marketing Manager",
		company: "Udacity",
		logo: "U",
		logoBg: "bg-indigo-500",
		logoText: "text-white",
		location: "Paris",
		category: "Marketing",
		type: "Full-Time",
		tags: ["Marketing", "Business"],
		shortDescription:
			"Udacity is seeking a Content Marketing Manager to develop and execute content strategies that attract, engage, and convert learners globally.",
		fullDescription: baseFullDescription("Content Marketing Manager", "Udacity"),
		requirements: [
			"4+ years of content marketing experience",
			"Excellent writing and editing skills",
			"SEO knowledge and experience with content analytics",
			"Ability to manage content calendars and editorial workflows",
			"Experience with CDNs, CMS platforms, and email marketing",
			"Creative storytelling ability across multiple formats"
		],
		benefits: [
			"Competitive salary",
			"Fully remote",
			"Free Udacity Nanodegree programs",
			"Health benefits",
			"Career growth opportunities",
			"Collaborative global team"
		],
		salary: "$75,000 – $100,000",
		postedAt: "2026-01-03",
		isFeatured: false
	},
	{
		id: 20,
		title: "Finance Operations Intern",
		company: "Webflow",
		logo: "W",
		logoBg: "bg-blue-700",
		logoText: "text-white",
		location: "Vienna",
		category: "Finance",
		type: "Internship",
		tags: ["Finance", "Business"],
		shortDescription:
			"Webflow is offering an internship in Finance Operations for a motivated student eager to gain hands-on experience in a fast-growing tech company.",
		fullDescription: baseFullDescription("Finance Operations Intern", "Webflow"),
		requirements: [
			"Currently enrolled in a Finance, Accounting, or related degree",
			"Basic understanding of accounting principles",
			"Proficiency in Excel or Google Sheets",
			"Strong attention to detail",
			"Eagerness to learn in a fast-paced environment",
			"Good communication skills"
		],
		benefits: [
			"Paid internship",
			"Mentorship from senior finance team",
			"Remote-flexible",
			"Potential for full-time offer",
			"Certificate of completion"
		],
		salary: "$25/hr",
		postedAt: "2026-01-01",
		isFeatured: false
	}
];
