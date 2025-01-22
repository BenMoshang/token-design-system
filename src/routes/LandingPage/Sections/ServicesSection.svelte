<script lang="ts">
</script>

<section class="services" aria-label="Services Section">
	<h1 class="services__title">Services</h1>
</section>

<style lang="scss">
	.services {
		@include section-base('light');

		&__title {
			@extend %global__display--x4;
			color: get-light-dark('lightest', 'darkest');
		}
	}
</style>
