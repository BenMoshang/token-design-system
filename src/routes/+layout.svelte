<script lang="ts">
	import Footer from '../lib/Layout/Footer.svelte';
	import Header from '../lib/Layout/Header.svelte';

</script>

<!-- <Header /> -->
<main class="layout__main">
	<slot />
</main>
<!-- <Footer /> -->


<style lang="scss">
	.layout__main {
		display: flex;
		flex-direction: column;
		inline-size: 100%;
		min-block-size: 100vh;

		box-sizing: border-box;
		margin: 0 auto;
		overflow-x: clip;


	}

/* Roboto */
@font-face {
  font-family: 'Roboto';
  src: 
       url('/static/Fonts/Roboto-Regular.ttf') format('truetype');
  font-weight: 400;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: 
       url('/static/Fonts/Roboto-Medium.ttf') format('truetype');
  font-weight: 500;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto';
  src: 
       url('/static/Fonts/Roboto-Bold.ttf') format('truetype');
  font-weight: 600;
  font-display: swap;
  font-style: normal;
}


@font-face {
  font-family: 'Inter';
  src: url('/static/Fonts/Inter-VariableFont_opsz\,wght.ttf') format('truetype');
  font-weight: 400;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'Inter';
  src: url('/static/Fonts/Inter-Italic-VariableFont_opsz\,wght.ttf') format('truetype');
  font-weight: 400;
  font-display: swap;
  font-style: italic;
}

</style>
	

