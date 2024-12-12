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

	.layout__main {
		display: flex;
		flex-direction: column;
		inline-size: 100%;
		min-block-size: 100vh;

		box-sizing: border-box;
		margin: 0 auto;
		overflow-x: clip;
		gap: 1.875rem;


	}


</style>
	

