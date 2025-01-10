import { writable } from 'svelte/store';

export const theme = writable<'light' | 'dark'>('dark');

theme.subscribe((value) => {
	if (typeof window !== 'undefined') {
		document.documentElement.setAttribute('data-theme', value);
		localStorage.setItem('theme', value);
	}
});
