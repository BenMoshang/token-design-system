import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			// Restrict file access outside the project root for better security
			allow: ['..']
		},
		//ben desktop
		// host: '192.168.0.167',
		//ben laptop
		// host: '192.168.0.85',
		port: 3000
	},
	ssr: {
		// Force Vite to include GSAP in the bundle for SSR so that
		// it doesn't bail out on 'import' statements.
		noExternal: ['gsap']
	},
	build: {
		// To improve performance by reducing the size of the built files
		minify: 'esbuild',
		target: 'esnext'
	},
	optimizeDeps: {
		// Optimize SvelteKit and Vite dependencies for better build times
		exclude: ['svelte', 'gsap']
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "$lib/scss/main.scss" as *;'
			}
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
