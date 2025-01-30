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
		@extend %page-grid-container;
	}
</style>
