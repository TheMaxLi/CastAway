import { env } from '$env/dynamic/private';
import { loadObjectFromCookies } from '$lib/utils/index.js';

export const load = async ({ cookies }) => {
	let secret_password = loadObjectFromCookies<{ password: string }>(cookies, 'secret_password');
	let authenticated = secret_password?.password === env.SUPER_SECRET_PASSWORD;

	return {
		authenticated
	};
};
