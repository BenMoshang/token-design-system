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
