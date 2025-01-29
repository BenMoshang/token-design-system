<script lang="ts">
	import Header from './Layout/Header.svelte';
	import Footer from './Layout/Footer.svelte';
	// import Cursor from '../lib/Components/Cursor.svelte';
	// import SmoothScroll from '../lib/Components/SmoothScroll.svelte';
</script>

<!-- <SmoothScroll /> -->
<svelte:head></svelte:head>

<Header />
<!-- ADDED GRAIN OVERLAY -->
<!-- <img
	src="/static/Images/nnnoise.svg"
	alt="Grain"
	class="grain-overlay"
	loading="eager"
	decoding="async"
/> -->

<main class="page-container">
	<slot />
</main>

<!-- <img src="/images/grain.svg" alt="Grain" class="grain-overlay" loading="eager" decoding="async" /> -->

<!-- <Footer /> -->

<style global lang="scss">
	@use '$lib/scss/main.scss' as *;

	.page-container {
		@include flex-column-center;
		position: relative;
		box-sizing: border-box;
		margin: 0 auto;
		overflow-x: clip;
		max-inline-size: $section-max-width;
		padding-inline: get-static-sp('x4');
	}

	/*--------------------------------------
	 BASE LAYER
	 - Global element-level styles.
  ---------------------------------------*/
	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}

	:global(html) {
		color-scheme: dark;
		hyphens: auto;
		-webkit-hyphens: auto;
		@media (prefers-color-scheme: dark) {
			color-scheme: dark;
			&[data-theme='dark'] {
				color-scheme: dark;
			}
		}
		@media (prefers-color-scheme: light) {
			color-scheme: light;

			[data-theme='light'] {
				color-scheme: light;
			}
		}

		margin: 0;
		padding: 0;
		scrollbar-color: get-light-dark('lightest', 'darkest') get-light-dark('light', 'dark');
		scrollbar-width: thin;
		scroll-behavior: smooth;
		background: transparent;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
		text-rendering: geometricPrecision;
		-webkit-font-x1oothing: antialiased;
		-moz-osx-font-x1oothing: grayscale;
		-webkit-text-size-adjust: 100% !important; /* Prevents iOS from auto-resizing text */
		min-block-size: 100vh;
		inline-size: 100%;

		// scroll-behavior: smooth;
	}
	:global(body) {
		block-size: 100%;
		inline-size: 100%;
		scroll-behavior: smooth;

		background: get-light-dark('lightest', 'darkest');
		@media (min-width: $mobile-breakpoint) {
			cursor: auto;
		}
	}

	/* Example: A simple CSS reset 
     (You can replace or expand this with a more extensive reset or normalize) */
	:global(html),
	:global(body),
	:global(p),
	:global(h1),
	:global(h2),
	:global(h3),
	:global(h4),
	:global(h5),
	:global(h6),
	:global(ul),
	:global(li) {
		margin: 0;
		padding: 0;
	}

	/* Interactive Elements */
	:global(button),
	:global([role='button']),
	:global(select) {
		cursor: pointer;
	}

	/* Form Elements */
	:global(input),
	:global(button),
	:global(textarea),
	:global(select) {
		font: inherit;
	}

	/* Typography */
	:global(p),
	:global(h1),
	:global(h2),
	:global(h3),
	:global(h4),
	:global(h5),
	:global(h6) {
		overflow-wrap: break-word;
	}
	:global(textarea, input) {
		font: inherit;
		letter-spacing: inherit;
		word-spacing: inherit;
	}
	/*=================================
	Media Reset
	=================================*/

	:global(img),
	:global(picture),
	:global(video),
	:global(canvas),
	:global(svg) {
		max-inline-size: 100%;
		block-size: auto;
		vertical-align: middle;
		font-style: italic;
		background-repeat: no-repeat;
		background-size: cover;
		shape-margin: 1rem;
	}

	/* Tables */
	:global(table) {
		border-collapse: collapse;
		border-spacing: 0;
	}

	/* Blockquotes */
	:global(blockquote),
	:global(q) {
		quotes: none;
	}

	:global(blockquote::before),
	:global(blockquote::after),
	:global(q::before),
	:global(q::after) {
		content: '';
	}
</style>
