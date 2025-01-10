<script lang="ts">
</script>

<section class="about" aria-label="About Section">
	<h1 class="about__title">About</h1>
</section>

<style lang="scss">
	.about {
		@include flex-center;
		block-size: 75vh;
		inline-size: 100%;
		background: get-light-dark('lightest', 'darkest');

		&__title {
			@extend %global__display--xl;
			color: #000000;
		}
	}
</style>

