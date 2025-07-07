import { env } from '$env/dynamic/private';
import { saveObjectToCookies } from '$lib/utils/index.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	savePassword: async ({ request, cookies }) => {
		const formData = await request.formData();
		const password = formData.get('password')?.toString() as string;

		saveObjectToCookies<{ password: string }>(cookies, 'secret_password', { password });

		let authenticated = password === env.SUPER_SECRET_PASSWORD;

		if (authenticated) {
			return redirect(308, '/');
		}

		return fail(401);
	}
};
