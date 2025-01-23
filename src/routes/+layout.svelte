<script lang="ts">
	import Header from './Layout/Header.svelte';
	import Footer from './Layout/Footer.svelte';
	import Cursor from '../lib/Components/Cursor.svelte';
	import SmoothScroll from '../lib/Components/SmoothScroll.svelte';
</script>

<!-- <Cursor /> -->
<!-- <SmoothScroll /> -->
<svelte:head>
	<!-- Preload Helvetica Now fonts -->
	<link
		rel="preload"
		href="/Fonts/Bebas-Neue/BebasNeue-Regular.ttf"
		as="font"
		type="font/ttf"
		crossorigin="anonymous"
	/>
</svelte:head>

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

<Footer />

<style global lang="scss">
	// !TODO: REMOVE CURSOR NONE IF YOU WANT TO USE CURSOR
	@use '$lib/scss/main.scss' as *;
	// .grain-overlay {
	// 	position: fixed;
	// 	inset: 0;
	// 	width: 100vw;
	// 	height: 100vh;
	// 	object-fit: cover;
	// 	z-index: 5;
	// 	pointer-events: none;
	// 	mix-blend-mode: overlay;
	// 	opacity: 0.7;
	// 	filter: contrast(120%) brightness(0.8);
	// }
	.page-container {
		@include flex-column-center;
		position: relative;
		box-sizing: border-box;
		margin: 0 auto;
		overflow-x: clip;

		// max-inline-size: $max-viewport;

		padding-inline: get-sp('x4');
	}

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

	:global(html) {
		margin: 0;
		padding: 0;
		scrollbar-color: get-light-dark('lightest', 'darkest') get-light-dark('light', 'dark');
		scrollbar-width: thin;
		scroll-behavior: smooth;
		background: transparent;
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
		cursor: none; //remove this to bring cursor back
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
		src: url('/Fonts/Roboto/Roboto-Bold.ttf') format('truetype');
		font-weight: 700;
		font-style: normal;
	}

	@font-face {
		font-family: 'Bebas Neue';
		src:
			url('/Fonts/Bebas-Neue/BebasNeueThin-4B3mY.ttf') format('truetype'),
			url('/Fonts/Bebas-Neue/BebasNeueThin-owB7q.otf') format('opentype');
		font-weight: 100;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: 'Bebas Neue';
		src:
			url('/Fonts/Bebas-Neue/BebasNeueLight-L3ajy.ttf') format('truetype'),
			url('/Fonts/Bebas-Neue/BebasNeueLight-PK7jP.otf') format('opentype');
		font-weight: 300;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: 'Bebas Neue';
		src:
			url('/Fonts/Bebas-Neue/BebasNeueBook-d9A1l.ttf') format('truetype'),
			url('/Fonts/Bebas-Neue/BebasNeueBook-mLWvV.otf') format('opentype');
		font-weight: 400;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: 'Bebas Neue';
		src:
			url('/Fonts/Bebas-Neue/BebasNeueRegular-gxj83.ttf') format('truetype'),
			url('/Fonts/Bebas-Neue/BebasNeueRegular-X34j2.otf') format('opentype');
		font-weight: 500;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: 'Bebas Neue';
		src:
			url('/Fonts/Bebas-Neue/BebasNeueBold-7B9LE.ttf') format('truetype'),
			url('/Fonts/Bebas-Neue/BebasNeueBold-w1w42.otf') format('opentype');
		font-weight: 700;
		font-style: normal;
		font-display: swap;
	}
</style>
