import { getJob } from "@/lib/api/jobs";

import { EditJobTemplate } from "@/templates/Dashboard/Jobs/Edit/EditJobTemplate";

interface Props {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
	const { id } = await params;
	const result = await getJob(id);
	return {
		title: result?.data ? `Edit: ${result.data.title} | Dashboard` : "Edit Job | Dashboard"
	};
}

export default async function EditJobPage({ params }: Props) {
	const { id } = await params;
	return <EditJobTemplate id={id} />;
}
