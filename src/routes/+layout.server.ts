import { env } from '$env/dynamic/private';
import { loadObjectFromCookies } from '$lib/utils/index.js';

export const load = async ({ cookies }) => {
	let authenticatedState = loadObjectFromCookies<{ password: string; username: string }>(
		cookies,
		'authenticatedState'
	);
	let authenticated = authenticatedState?.password === env.SUPER_SECRET_PASSWORD;

	return {
		authenticated
	};
};
