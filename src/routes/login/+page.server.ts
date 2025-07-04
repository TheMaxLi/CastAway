import { saveObjectToCookies } from '$lib/utils/index.js';
import { fail } from '@sveltejs/kit';

export const actions = {
	savePassword: async ({ request, cookies }) => {
		const formData = await request.formData();
		const password = formData.get('password')?.toString() as string;

		saveObjectToCookies<{ password: string }>(cookies, 'secret_password', { password });

		
	}
};
