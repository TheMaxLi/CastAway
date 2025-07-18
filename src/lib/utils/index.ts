export function clickOutside(node: HTMLElement, handler: () => void): { destroy: () => void } {
	const onClick = (event: MouseEvent) =>
		node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented && handler();

	document.addEventListener('mousedown', onClick, true);

	return {
		destroy() {
			document.removeEventListener('mousedown', onClick, true);
		}
	};
}

import type { Cookies } from '@sveltejs/kit';

export function saveObjectToCookies<T>(
	cookies: Omit<Cookies, 'getAll' | 'delete' | 'serialize' | 'get'>,
	key: string,
	object: T
) {
	cookies.set(key, JSON.stringify(object), {
		path: '/',
		expires: new Date(Date.now() + 24 * 60 * 60 * 100000000)
	});
}

export function loadObjectFromCookies<T>(cookies: Cookies, key: string): T | null {
	const saved = cookies.get(key);
	if (saved) {
		try {
			return JSON.parse(saved);
		} catch (e) {
			console.error('Invalid object in cookies', e);
		}
	}
	return null;
}

export let clientCookies: Omit<Cookies, 'getAll' | 'delete' | 'serialize' | 'get'> = {
	set: (name: string, value: string) => {
		const date = new Date();
		date.setTime(date.getTime() + 24 * 60 * 60 * 100000000); // 100 thousand days
		const expires = 'expires=' + date.toUTCString();
		document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
	}
};
