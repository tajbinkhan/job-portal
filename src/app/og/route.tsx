import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const title = searchParams.get("title") ?? "Find Your Dream Job";
	const company = searchParams.get("company") ?? "";
	const isJob = !!company;

	return new ImageResponse(
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				height: "100%",
				backgroundColor: "#F8F8FD",
				fontFamily: "sans-serif",
				position: "relative"
			}}
		>
			{/* Top accent bar */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					height: 6,
					background: "linear-gradient(90deg, #4338CA 0%, #26A4FF 100%)"
				}}
			/>

			{/* Main content */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					flex: 1,
					padding: "60px 80px"
				}}
			>
				{/* Logo text */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 10,
						marginBottom: 40
					}}
				>
					<div
						style={{
							width: 36,
							height: 36,
							backgroundColor: "#4338CA",
							borderRadius: 6,
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						<div style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>Q</div>
					</div>
					<span style={{ fontSize: 26, fontWeight: 700, color: "#1E1E2E", letterSpacing: -0.5 }}>
						QuickHire
					</span>
				</div>

				{/* Title */}
				<div
					style={{
						fontSize: isJob ? 52 : 64,
						fontWeight: 700,
						color: "#1E1E2E",
						lineHeight: 1.15,
						letterSpacing: -1,
						maxWidth: 900
					}}
				>
					{title}
				</div>

				{/* Company name */}
				{isJob && company && (
					<div style={{ marginTop: 20, fontSize: 28, color: "#6B7280", fontWeight: 500 }}>
						{company}
					</div>
				)}

				{/* CTA */}
				{!isJob && (
					<div style={{ marginTop: 24, fontSize: 22, color: "#4338CA", fontWeight: 500 }}>
						Browse thousands of jobs → quickhire.app
					</div>
				)}
			</div>

			{/* Bottom band */}
			<div
				style={{
					height: 64,
					backgroundColor: "#4338CA",
					display: "flex",
					alignItems: "center",
					paddingLeft: 80,
					paddingRight: 80,
					justifyContent: "space-between"
				}}
			>
				<span style={{ color: "#A5B4FC", fontSize: 16, fontWeight: 500 }}>quickhire.app</span>
				{isJob && (
					<span
						style={{
							backgroundColor: "#26A4FF",
							color: "#fff",
							fontSize: 14,
							fontWeight: 600,
							padding: "6px 16px",
							borderRadius: 4
						}}
					>
						Apply Now
					</span>
				)}
			</div>
		</div>,
		{
			width: 1200,
			height: 630
		}
	);
}
