"use client";

import axiosApi from "@/lib/axios-config";

import { apiRoute } from "@/routes/routes";

/* ── Auth ─────────────────────────────────────────────────────────────── */

export async function loginApi(email: string, password: string): Promise<ApiResponse<User>> {
	const res = await axiosApi.post<ApiResponse<User>>(apiRoute.login, { email, password });
	return res.data;
}

export async function logoutApi(): Promise<void> {
	await axiosApi.post(apiRoute.logout);
}

export async function getMeApi(): Promise<ApiResponse<User>> {
	const res = await axiosApi.get<ApiResponse<User>>(apiRoute.me);
	return res.data;
}

/* ── Jobs ─────────────────────────────────────────────────────────────── */

export async function getJobsApi(query: JobsQuery = {}): Promise<ApiResponse<Job[]>> {
	const params = new URLSearchParams();
	Object.entries(query).forEach(([k, v]) => {
		if (v !== undefined && v !== "") params.set(k, String(v));
	});
	const qs = params.toString();
	const res = await axiosApi.get<ApiResponse<Job[]>>(`${apiRoute.jobs}${qs ? `?${qs}` : ""}`);
	return res.data;
}

export async function createJobApi(data: JobFormData): Promise<ApiResponse<Job>> {
	const res = await axiosApi.post<ApiResponse<Job>>(apiRoute.jobs, data);
	return res.data;
}

export async function updateJobApi(
	id: string,
	data: Partial<JobFormData>
): Promise<ApiResponse<Job>> {
	const res = await axiosApi.patch<ApiResponse<Job>>(apiRoute.job(id), data);
	return res.data;
}

export async function deleteJobApi(id: string): Promise<void> {
	await axiosApi.delete(apiRoute.job(id));
}

/* ── Applications ─────────────────────────────────────────────────────── */

export async function submitApplicationApi(
	payload: ApplicationPayload
): Promise<ApiResponse<Application>> {
	const res = await axiosApi.post<ApiResponse<Application>>(apiRoute.applications, payload);
	return res.data;
}

export async function getApplicationsApi(
	query: ApplicationsQuery = {}
): Promise<ApiResponse<Application[]>> {
	const params = new URLSearchParams();
	Object.entries(query).forEach(([k, v]) => {
		if (v !== undefined && v !== "") params.set(k, String(v));
	});
	const qs = params.toString();
	const res = await axiosApi.get<ApiResponse<Application[]>>(
		`${apiRoute.applications}${qs ? `?${qs}` : ""}`
	);
	return res.data;
}
