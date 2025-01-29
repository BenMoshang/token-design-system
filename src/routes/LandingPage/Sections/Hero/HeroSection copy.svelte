<script lang="ts">
	// Provide constant hero text; note the updated spelling for 'DEVELOPMENT'
	// import BenefitCard from './components/BenefitCard.svelte';
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

	<!-- <BenefitCard {heroText} /> -->
	<ul class="hero__benefits">
		<!-- Office Location -->
		<li class="util__stack hero__office-location-wrapper">
			<svg xmlns="http://www.w3.org/2000/svg" height="10" width="7.5" viewBox="0 0 384 512"
				><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
					fill="currentColor"
					d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
				/></svg
			>
			<p class="util__text--top">BASED IN,</p>
			<p class="util__text--bottom hero__office-location">{heroText.officeLocation}</p>
		</li>

		<!-- Availability -->
		<li class="util__stack">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="10"
				width="10"
				viewBox="0 0 512 512"
				aria-hidden="true"
			>
				<path
					fill="currentColor"
					d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z"
				/>
			</svg>
			<p class="util__text--top">AVAILABLE,</p>
			<p class="util__text--bottom">{heroText.available}</p>
		</li>

		<!-- Remote / Work -->
		<li class="util__stack">
			<svg
				fill="currentColor"
				height="200px"
				width="200px"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				aria-hidden="true"
			>
				<path
					d="M12.3,95.5v321.1c0,20.3,16.5,36.9,36.9,36.9h413.7c20.3,0,36.8-16.5,36.8-36.9V95.5c0-20.3-16.5-36.9-36.8-36.9H49.2
					C28.9,58.6,12.3,75.1,12.3,95.5z M462.8,428.9H49.2c-6.8,0-12.4-5.5-12.4-12.4V175.7h438.3v240.9
					C475.2,423.3,469.6,428.9,462.8,428.9z M475.2,95.5v55.7H36.8V95.5c0-6.8,5.5-12.4,12.4-12.4h413.7
					C469.6,83.1,475.2,88.7,475.2,95.5z"
				/>
				<path
					d="M70.9,129.4c3.2,0,6.4-1.3,8.7-3.6c2.3-2.3,3.6-5.4,3.6-8.7c0-3.2-1.3-6.4-3.6-8.7c-4.6-4.6-12.8-4.6-17.3,0
					c-2.3,2.3-3.6,5.4-3.6,8.7c0,3.2,1.3,6.4,3.6,8.7C64.5,128.1,67.6,129.4,70.9,129.4z"
				/>
				<path
					d="M117.2,129.4c3.2,0,6.4-1.3,8.6-3.6c2.3-2.3,3.6-5.4,3.6-8.7c0-3.2-1.3-6.4-3.6-8.7c-4.6-4.6-12.7-4.6-17.3,0
					c-2.3,2.3-3.6,5.4-3.6,8.7c0,3.2,1.3,6.4,3.6,8.7C110.7,128.1,113.9,129.4,117.2,129.4z"
				/>
				<path
					d="M163.4,129.4c3.2,0,6.4-1.3,8.7-3.6c2.3-2.3,3.6-5.4,3.6-8.7c0-3.2-1.3-6.4-3.6-8.7c-4.6-4.6-12.8-4.6-17.3,0
					c-2.3,2.3-3.6,5.4-3.6,8.7c0,3.2,1.3,6.4,3.6,8.7C157,128.1,160.2,129.4,163.4,129.4z"
				/>
				<path
					d="M337.6,232.3c-5.2-4.4-12.9-3.7-17.3,1.4c-4.4,5.2-3.7,12.9,1.4,17.3l61.8,52.3l-61.8,52.5c-5.2,4.4-5.8,12.1-1.4,17.3
					c2.4,2.9,5.9,4.3,9.3,4.3c2.8,0,5.6-1,7.9-2.9l72.9-61.8c2.7-2.3,4.3-5.7,4.3-9.4c0-3.6-1.6-7-4.3-9.3L337.6,232.3z"
				/>
				<path
					d="M128.4,303.3l61.7-52.3c5.2-4.4,5.8-12.1,1.4-17.3c-4.4-5.2-12.1-5.8-17.3-1.4l-72.8,61.6c-2.7,2.3-4.3,5.7-4.3,9.3
					c0,3.6,1.6,7,4.3,9.3l72.8,61.8c2.3,2,5.1,2.9,7.9,2.9c3.5,0,6.9-1.5,9.3-4.3c4.4-5.2,3.8-12.9-1.4-17.3L128.4,303.3z"
				/>
				<path
					d="M291.1,214.9c-6.3-2.5-13.4,0.5-15.9,6.8L213.5,376c-2.5,6.3,0.5,13.4,6.8,15.9c1.5,0.6,3,0.9,4.5,0.9
					c4.9,0,9.5-2.9,11.4-7.7l61.7-154.3C300.5,224.5,297.4,217.4,291.1,214.9z"
				/>
			</svg>
			<p class="util__text--top">WEB DEVELOPMENT</p>
			<p class="util__text--bottom">{heroText.Work}</p>
		</li>
	</ul>
</section>

<style lang="scss">
	.hero {
		& > * {
			outline: 1px solid red;
			& > * {
				outline: 1px solid blue;
				& > * {
					outline: 1px solid green;
					& > * {
						outline: 1px solid yellow;
					}
				}
			}
		}
		/*----title variables----*/
		--title-max-inline-size: 15ch;
		--title-margin-bottom: #{get-static-sp('x4')};

		/*----subtitle variables----*/
		--subtitle-font-size: #{get-fsz('x1', 'x2')};

		/*----icon variables----*/
		--icon-size: 1.5rem;
		--icon-margin-bottom: #{get-static-sp('x2')};
		--icon-color: #{get-light-dark('darkest', 'lightest')};
	}

	.hero {
		@include section-base;
		@include flex-column-center;
		border-radius: 0;

		&__divider {
			--hr-color-rgb: 255, 255, 255;
			border: none;
			display: inline-block;
			inline-size: 100%;
			block-size: 0.125rem;
			margin: get-static-sp('x1') 0 get-static-sp('x16');
			opacity: 0.5;
			background: linear-gradient(
				90deg,
				color-mix(in srgb, get-light-dark('darkest', 'lightest') 0%, transparent) 0%,
				get-light-dark('darkest', 'lightest') 50%,
				color-mix(in srgb, get-light-dark('darkest', 'lightest') 0%, transparent) 100%
			);
			animation: pulse 2s ease-in-out infinite;
		}

		&__title {
			@extend %global__display--h1;
			margin-bottom: var(--title-margin-bottom);
			max-inline-size: var(--title-max-inline-size);
			animation: text-pop-up-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
		}

		&__subtitle {
			display: none;
			@extend %global__heading--h2;
			@include gradient-text('dark', 'lighter', 'lighter', 'dark');
		}

		&__benefits {
			display: none;
			justify-content: space-around;

			& svg {
				width: var(--icon-size);
				height: var(--icon-size);
				margin-bottom: var(--icon-margin-bottom);

				& path {
					fill: var(--icon-color);
				}
			}
		}
	}

	.util {
		&__stack {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		&__text--top {
			@extend %global__body--lg;
			color: get-light-dark('darker', 'lighter');
			font-weight: 600;
			text-wrap: nowrap;
		}

		&__text--bottom {
			@extend %global__label;
			text-wrap: nowrap;
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.3;
		}
		50% {
			opacity: 0.7;
		}
	}
</style>
