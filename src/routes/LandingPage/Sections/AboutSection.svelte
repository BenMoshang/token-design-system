<script lang="ts">
</script>

<section class="about" aria-label="About Section">
	<h1 class="about__title">About</h1>
</section>

<style lang="scss">
	.about {
		@include section-base('light');
		&__title {
			@extend %global__display--h2;
			color: get-light-dark('lightest', 'darkest');
		}
	}
</style>
