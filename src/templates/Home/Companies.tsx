import Image from "next/image";

const companies = [
	{ name: "Vodafone", logo: "/images/companies/vodafone.png" },
	{ name: "Intel", logo: "/images/companies/intel.png" },
	{ name: "Tesla", logo: "/images/companies/tesla.png" },
	{ name: "AMD", logo: "/images/companies/amd.png" },
	{ name: "Talkit", logo: "/images/companies/talkit.png" }
];

export function Companies() {
	return (
		<section className="py-12">
			<div className="mx-auto max-w-7xl px-6">
				<p className="text-muted-foreground mb-8 text-lg font-normal">Companies we helped grow</p>
				<div className="flex flex-wrap items-center justify-between gap-12">
					{companies.map(({ name, logo }) => (
						<Image
							key={name}
							src={logo}
							alt={name}
							width={120}
							height={40}
							className="h-8 object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
						/>
					))}
				</div>
			</div>
		</section>
	);
}
