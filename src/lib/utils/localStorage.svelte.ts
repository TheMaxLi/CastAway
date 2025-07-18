import { browser } from '$app/environment';

export function useLocalStorage<T>(key: string, value: T) {
	let storage = $state<{ value: T }>({ value });

	if (browser) {
		const item = localStorage.getItem(key);
		if (item) storage.value = JSON.parse(item);
	}

	$effect(() => {
		localStorage.setItem(key, JSON.stringify(storage.value));
	});

	return storage;
}
