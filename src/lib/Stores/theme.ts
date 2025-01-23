// src/lib/stores/theme.ts
import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

function createThemeStore() {
	// Get initial theme from localStorage or system preference
	const getInitialTheme = (): Theme => {
		if (typeof window === 'undefined') return 'dark';

		const savedTheme = localStorage.getItem('theme') as Theme;
		if (savedTheme) return savedTheme;

		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};

	const { subscribe, set } = writable<Theme>(getInitialTheme());

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
				set(newTheme);
			}
		}
	};
}

export const theme = createThemeStore();
