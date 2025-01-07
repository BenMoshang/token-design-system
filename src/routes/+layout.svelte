<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
</script>

<Header />
<main class="page-grid">
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

	/* Scrollbar Styles */
	:global(::-webkit-scrollbar) {
		width: 0.5rem;
	}

	:global(::-webkit-scrollbar-track) {
		background: white;
	}

	:global(::-webkit-scrollbar-thumb) {
		background-color: hsl(0, 0%, 53%);
		border-radius: 0.625rem;
		border: 0.125rem solid white;
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background-color: hsl(0, 0%, 33%);
	}

	:global(::-webkit-scrollbar-button) {
		display: none;
	}

	.page-grid {
		max-inline-size: $max-viewport;

		inline-size: 100%;
		min-block-size: 100vh;
		box-sizing: border-box;
		margin: 0 auto;
		overflow-x: clip;
		display: grid;
		// Define a 12-column layout:
		// Gutter between columns (adjust as needed):
		scroll-behavior: smooth;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeSpeed;
		margin: 0;
		padding: 0;
		border: 0;
		box-sizing: border-box;

		display: contents;
		// grid-template-columns: repeat(12, 1fr);
		// //gutter between columns
		// grid-column-gap: 1rem;

		// grid-template-areas: 'col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12';

		// //set grid column for each column
		// @for $i from 1 through 12 {
		// 	[data-area='col-#{$i}'] {
		// 		grid-column: $i;
		// 	}
		// }
	}
	@font-face {
		font-family: 'Inter';
		src: url('/Fonts/Inter/Inter-Italic.ttf') format('truetype');
		font-weight: 400;
		font-display: swap;
		font-style: italic;
	}

	@font-face {
		font-family: 'Inter';
		src: url('/Fonts/Inter/Inter.ttf') format('truetype');
		font-weight: 400;
		font-display: swap;
		font-style: normal;
	}

	@font-face {
		font-family: 'Bebas Neue';
		src: url('/Fonts/Bebas-Neue/BebasNeue-Regular.ttf') format('truetype');
		font-weight: 400;
		font-display: swap;
		font-style: normal;
	}
</style>
