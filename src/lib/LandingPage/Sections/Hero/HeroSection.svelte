<script lang="ts">
</script>

<section class="hero" aria-label="Hero Section">
	<h1 class="hero__title">MODERN<br />WEB DEV</h1>
</section>

<style lang="scss">
	.hero {
		block-size: 75vh;
		inline-size: 100%;
		// background-color: red;

		&__title {
			@extend %global__display--xl;
			text-align: center;
			text-wrap: balance;
			word-break: break-word;
			hyphens: auto;
			line-height: 0.9;
		}
	}
</style>
