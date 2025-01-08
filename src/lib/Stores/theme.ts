import { writable } from 'svelte/store';

export const theme = writable<'light' | 'dark'>('light');

theme.subscribe((value) => {
	if (typeof window !== 'undefined') {
		document.documentElement.classList.toggle('dark', value === 'dark');
		localStorage.setItem('theme', value);
	}
});
