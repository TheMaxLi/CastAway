import type { Tags } from 'exifreader';
import type { GPSRef } from './type';

export function dmsToDecimal(dmsArray: number[], ref: GPSRef) {
	if (!dmsArray || dmsArray.length !== 3) return null;

	const degrees = dmsArray[0];
	const minutes = dmsArray[1];
	const seconds = dmsArray[2];

	let decimal = degrees + minutes / 60 + seconds / 3600;

	if (ref === 'S' || ref === 'W') {
		decimal = -decimal;
	}

	return decimal;
}

export function extractLocation(exifData: Tags) {
	try {
		const gpsLatitude = exifData.GPSLatitude?.value as number[] | undefined;
		const gpsLatitudeRef = exifData.GPSLatitudeRef?.value as GPSRef | undefined;
		const gpsLongitude = exifData.GPSLongitude?.value as number[] | undefined;
		const gpsLongitudeRef = exifData.GPSLongitudeRef?.value as GPSRef | undefined;

		if (!gpsLatitude || !gpsLongitude || !gpsLatitudeRef || !gpsLongitudeRef) {
			return null;
		}

		const latitude = dmsToDecimal(gpsLatitude, gpsLatitudeRef);
		const longitude = dmsToDecimal(gpsLongitude, gpsLongitudeRef);

		if (latitude === null || longitude === null) {
			return null;
		}

		return {
			latitude,
			longitude,
			altitude: exifData.GPSAltitude?.value || null,
			timestamp: exifData.GPSTimeStamp?.value || null
		};
	} catch (error) {
		console.error('Error extracting location:', error);
		return null;
	}
}

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
	cookies.set(key, JSON.stringify(object), { path: '/' });
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
