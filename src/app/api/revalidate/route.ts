import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const secret = request.headers.get("x-revalidate-secret");

	if (secret !== process.env.REVALIDATE_SECRET) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	let body: { tag?: string };
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
	}

	const { tag } = body;
	if (!tag || typeof tag !== "string") {
		return NextResponse.json({ message: "Missing or invalid 'tag' field" }, { status: 400 });
	}

	revalidateTag(tag, { expire: 0 });

	return NextResponse.json({ revalidated: true, tag });
}
