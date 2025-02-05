// src/lib/stores/theme.ts
import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

function createThemeStore() {
	const { subscribe, set } = writable<Theme>('dark');

	return {
		subscribe,
		set: (value: Theme) => {
			if (typeof window !== 'undefined') {
				document.documentElement.setAttribute('data-theme', value);
				localStorage.setItem('theme', value);
			}
			set(value);
		},
		toggleTheme: () => {
			if (typeof window !== 'undefined') {
				const currentTheme = document.documentElement.getAttribute('data-theme') as Theme;
				const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
				document.documentElement.setAttribute('data-theme', newTheme);
				localStorage.setItem('theme', newTheme);
				set(newTheme);
			}
		}
	};
}

export const theme = createThemeStore();
