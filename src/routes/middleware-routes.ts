import { route } from "@/routes/routes";

const DEFAULT_LOGIN_REDIRECT = route.private.dashboard;

const appRoutePrefix = process.env.NEXT_PUBLIC_FRONTEND_URL;
const apiRoutePrefix = process.env.NEXT_PUBLIC_API_URL;

export { apiRoutePrefix, appRoutePrefix, DEFAULT_LOGIN_REDIRECT };
