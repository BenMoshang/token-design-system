<script lang="ts">
</script>

<section class="hero" aria-label="Hero Section">
	<h1 class="hero__title">MODERN<br />WEB DEV</h1>
</section>

<style lang="scss">
	.hero {
		@include flex-center;
		block-size: 75vh;
		inline-size: 100%;

		&__title {
			@extend %global__display--xl;
		}
	}
</style>
