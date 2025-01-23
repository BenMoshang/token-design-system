<script lang="ts">
	// Provide constant hero text; note the updated spelling for 'DEVELOPMENT'
	import BenefitCard from './components/BenefitCard.svelte';
	const heroText = {
		title: 'MODERN WEB\nDEVELOPMENT',
		subtitle: 'Future-Ready Websites, Built Today',
		officeLocation: 'Baltimore, MD',
		available: 'Everywhere',
		Work: '+ Designing'
	} as const;
</script>

<section class="hero" aria-label="Hero Section">
	<h2 class="hero__subtitle">
		{heroText.subtitle}
		<hr class="hero__divider" />
	</h2>
	<h1 class="hero__title">{heroText.title}</h1>
	<BenefitCard {heroText} />
</section>

<style lang="scss">
	.hero {
		@include section-base; // assuming these mixins exist in your project
		@include flex-column-center;
		border-radius: 0;

		&__title {
			@extend %global__display--x4;
			margin-bottom: get-sp('x4');
			max-inline-size: 15ch;
			animation: text-pop-up-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
			// @include gradient-text(
			// 	get-light-dark('dark', 'light'),
			// 	get-light-dark('darkest', 'lightest')
			// );
		}

		// Hero Subtitle
		&__subtitle {
			@extend %global__display--base;
			font-size: get-res-fsz('heading', 'x1', 'x2');
			@include gradient-text('lightest', 'light', 'darkest', 'dark');
		}
	}

	hr {
		--hr-color-rgb: 255, 255, 255;

		margin-top: get-sp('x1');
		display: inline-block;
		border: none;
		height: 2px;
		background: linear-gradient(
			90deg,
			color-mix(in srgb, get-light-dark('darkest', 'lightest') 0%, transparent) 0%,
			get-light-dark('darkest', 'lightest') 50%,
			color-mix(in srgb, get-light-dark('darkest', 'lightest') 0%, transparent) 100%
		);
		inline-size: 100%;
		margin-inline: 0;
		margin-bottom: get-sp('x16');
		opacity: 0.5;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0% {
			opacity: 0.3;
		}
		50% {
			opacity: 0.7;
		}
		100% {
			opacity: 0.3;
		}
	}
</style>
