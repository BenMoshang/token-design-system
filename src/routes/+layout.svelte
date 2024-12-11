<script lang="ts">

	import Footer from '../lib/Layout/Footer.svelte';
	import Header from '../lib/Layout/Header.svelte';


</script>

<Header />
<main class="layout__main">
	<slot />
</main>
<Footer />

<style lang="scss">
@use '../app.scss' as *;


	.layout__main {
		display: flex;
		flex-direction: column;
		inline-size: 100%;
		box-sizing: border-box;
		margin: 0 auto;
		gap: 1.875rem;
		overflow: visible;
	}
</style>
