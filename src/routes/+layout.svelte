<script lang="ts">
	import Header from './Layout/Header.svelte';
</script>

<Header />

<main class="page-container">
	<slot />
</main>

<svelte:head>
	<link
		rel="preload"
		href="/Fonts/Inter/Inter.ttf"
		as="font"
		type="font/ttf"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="/Fonts/Inter/Inter-Italic.ttf"
		as="font"
		type="font/ttf"
		crossorigin="anonymous"
	/>

	<!-- Preload Helvetica Now fonts -->
	<link
		rel="preload"
		href="/Fonts/Bebas-Neue/BebasNeue-Regular.ttf"
		as="font"
		type="font/ttf"
		crossorigin="anonymous"
	/>
</svelte:head>

<!-- <Footer /> -->

<style global lang="scss">
	@use '$lib/scss/main.scss' as *;

	/*--------------------------------------
	 BASE LAYER
	 - Global element-level styles.
  ---------------------------------------*/
	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
		hyphens: auto;
		-webkit-hyphens: auto;
	}

	/* Theme Custom Properties */
	:global(html) {
		--scrollbar-track: light-dark(hsl(191, 15%, 85%), hsl(206, 45%, 12%));
		--scrollbar-thumb: light-dark(hsl(206, 18%, 35%), hsl(206, 30%, 21%));
		--scrollbar-thumb-hover: light-dark(hsl(206, 30%, 21%), hsl(206, 18%, 35%));
		--scrollbar-thumb-active: light-dark(hsl(206, 45%, 12%), hsl(191, 15%, 85%));
	}

	/* Scrollbar Styles with Mobile Optimization */
	@media (pointer: fine) {
		:global(::-webkit-scrollbar) {
			width: 0.125rem;
			height: 0.125rem;

			@media (max-width: 48rem) {
				width: 0.5rem;
				height: 0.5rem;
			}
		}

		:global(::-webkit-scrollbar-track) {
			background: var(--scrollbar-track);
			border-radius: 0.25rem;
		}

		:global(::-webkit-scrollbar-thumb) {
			background-color: var(--scrollbar-thumb);
			border-radius: 0.75rem;
			transition: background-color 200ms ease;

			&:hover {
				background-color: var(--scrollbar-thumb-hover);
			}

			&:active {
				background-color: var(--scrollbar-thumb-active);
			}
		}

		:global(::-webkit-scrollbar-corner) {
			background: transparent;
		}

		:global(::-webkit-scrollbar-button) {
			display: none;
		}
	}

	/* Touch Device Scrolling Optimization */
	// @media (pointer: coarse) {
	// 	:global(body) {
	// 		-webkit-overflow-scrolling: touch;
	// 		scroll-behavior: smooth;
	// 		overscroll-behavior-y: contain;
	// 	}

	// 	:global(*) {
	// 		-webkit-tap-highlight-color: transparent;
	// 	}
	// }

	.page-container {
		@include flex-column-center;
		box-sizing: border-box;
		margin: 0 auto;
		overflow-x: clip;
		max-inline-size: $max-viewport;
		inline-size: 100%;
		padding-top: $page-header-height;
		padding-inline: get-sp(x4);
	}

	:global(body) {
		min-block-size: 100vh;
		inline-size: 100%;

		scroll-behavior: smooth;
	}

	:global(html) {
		text-rendering: geometricPrecision;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-text-size-adjust: 100% !important; /* Prevents iOS from auto-resizing text */
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

	@font-face {
		font-family: 'Bebas Neue';
		src: url('/Fonts/Bebas-Neue/BebasNeue-Regular.ttf') format('truetype');
		font-weight: normal;

		font-style: normal;
	}

	@font-face {
		font-family: 'Roboto';
		src: url('/Fonts/Roboto/Roboto-Light.ttf') format('truetype');
		font-weight: 300;
		font-style: normal;
	}

	@font-face {
		font-family: 'Roboto';
		src: url('/Fonts/Roboto/Roboto-Regular.ttf') format('truetype');
		font-weight: 400;
		font-style: normal;
	}

	@font-face {
		font-family: 'Roboto';
		src: url('/Fonts/Roboto/Roboto-Medium.ttf') format('truetype');
		font-weight: 500;
		font-style: normal;
	}

	@font-face {
		font-family: 'Roboto';
		src: url('/Fonts/Roboto/Roboto-SemiBold.ttf') format('truetype');
		font-weight: 600;
		font-style: normal;
	}

	@font-face {
		font-family: 'Roboto';
		src: url('/Fonts/Roboto/Roboto-Bold.ttf') format('truetype');
		font-weight: 700;
		font-style: normal;
	}
</style>
