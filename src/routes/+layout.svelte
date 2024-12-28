<script lang="ts">
</script>

<!-- <Header /> -->
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

<style lang="scss">
	@use '$lib/scss/main.scss' as *;

	/*--------------------------------------
	 BASE LAYER
	 - Global element-level styles.
  ---------------------------------------*/

	*,
	*::before,
	*::after {
		box-sizing: border-box;
		hyphens: auto;
		-webkit-hyphens: auto;
	}

	/* Example: A simple CSS reset 
     (You can replace or expand this with a more extensive reset or normalize) */
	html,
	body,
	p,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	ul,
	li {
		margin: 0;
		padding: 0;
	}

	/* Interactive Elements */
	button,
	[role='button'],
	select {
		cursor: pointer;
	}

	/* Form Elements */
	input,
	button,
	textarea,
	select {
		font: inherit;
	}

	/* Typography */
	p,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		overflow-wrap: break-word;
	}

	img,
	picture,
	video,
	canvas,
	svg {
		max-inline-size: 100%;
		block-size: auto;
		vertical-align: middle;
		font-style: italic;
		background-repeat: no-repeat;
		background-size: cover;
		shape-margin: 1rem;
	}
	html,
	body {
		width: 100vw;
		height: 100vh;
		overflow-x: hidden;
		scroll-behavior: smooth;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeSpeed;
		margin: 0;
		padding: 0;
		border: 0;
		box-sizing: border-box;
	}

	/* Tables */
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	/* Blockquotes */
	blockquote,
	q {
		quotes: none;
	}

	blockquote::before,
	blockquote::after,
	q::before,
	q::after {
		content: '';
	}

	/* Scrollbar Styles */
	::-webkit-scrollbar {
		width: 0.5rem;
	}

	::-webkit-scrollbar-track {
		background: white;
	}

	::-webkit-scrollbar-thumb {
		background-color: hsl(0, 0%, 53%);
		border-radius: 0.625rem;
		border: 0.125rem solid white;
	}

	::-webkit-scrollbar-thumb:hover {
		background-color: hsl(0, 0%, 33%);
	}

	::-webkit-scrollbar-button {
		display: none;
	}

	.page-grid {
		inline-size: 100%;
		min-block-size: 100vh;
		box-sizing: border-box;
		margin: 0 auto;
		overflow-x: clip;
		max-inline-size: 75rem;
		display: grid;
		// Define a 12-column layout:
		// Gutter between columns (adjust as needed):

		grid-template-columns: repeat(12, 1fr);
		//gutter between columns
		grid-column-gap: 1rem;

		grid-template-areas: 'col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12';

		//set grid column for each column
		@for $i from 1 through 12 {
			[data-area='col-#{$i}'] {
				grid-column: $i;
			}
		}
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
