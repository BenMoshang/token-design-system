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

	// Listen for system theme changes
	if (typeof window !== 'undefined') {
		window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
			const currentTheme = document.documentElement.getAttribute('data-theme') as Theme;
			if (currentTheme === 'light') {
				const newTheme = e.matches ? 'light' : 'dark';
				document.documentElement.setAttribute('data-theme', newTheme);
				localStorage.setItem('theme', newTheme);
				set(newTheme);
			}
		});
	}

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
				console.log('newTheme', newTheme);
			}
		}
	};
}

export const theme = createThemeStore();
