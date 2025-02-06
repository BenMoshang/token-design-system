<script lang="ts">
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	const heroInjectable = {
		titleFirstHalf: 'MODERN WEB',
		titleSecondHalf: 'DEVELOPMENT',
		subtitle: 'FUTURE-READY WEBSITES, BUILT TODAY'
	};

	const benefitsInjectable = [
		{
			firstHalf: 'AVAILABLE',
			seperator: '•',
			secondHalf: 'EVERYWHERE'
		},

		{
			firstHalf: 'WEB DEVELOPMENT',
			seperator: '•',
			secondHalf: 'DESIGN'
		}
	];
	// If your scroll.svelte.ts already registers the plugin,
	// you can omit these two lines. Otherwise:
	gsap.registerPlugin(ScrollTrigger);
	import { onMount, onDestroy } from 'svelte';

	/* Refs to the top & bottom door panels */
	let topPanel: HTMLElement;
	let bottomPanel: HTMLElement;
	let heroSection: HTMLElement;

	/* We'll store the timeline so we can kill it onDestroy. */
	let doorTimeline: gsap.core.Timeline;

	onMount(() => {
		// Create a pinned scroll effect on the hero container
		doorTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: heroSection,
				start: 'top top',
				end: '+=120%',
				pin: true,
				pinSpacing: true,
				scrub: 2, // Reduced scrub time for snappier response
				markers: false,
				anticipatePin: 1,

				preventOverlaps: true, // Prevents overlapping animations
				onEnter: () => {
					// Ensure panels are in correct starting position
					gsap.set([topPanel, bottomPanel], { clearProps: 'all' });
				}
			}
		});

		// Animate panels with optimized settings
		doorTimeline
			.to(topPanel, {
				yPercent: -120,
				ease: 'power4.inOut', // Changed to power2 for better fast scroll handling
				duration: 4, // Reduced duration for snappier animation
				force3D: true,
				willChange: 'transform'
			})
			.to(
				bottomPanel,
				{
					yPercent: 120,
					ease: 'power4.inOut',
					duration: 4,
					force3D: true,
					willChange: 'transform'
				},
				'<'
			);
	});

	onDestroy(() => {
		if (doorTimeline) {
			doorTimeline.scrollTrigger?.kill();
			doorTimeline.kill();
		}
	});
</script>

<section class="hero" bind:this={heroSection}>
	<!-- !todo: change light mode color scheme to its on so its less straining on the eyes -->
	<!-- !todo: for header logo animate keyframes of letter spacing to 0 back to expanded  after hover -->
	<!-- !todo: change navigation back ground -->
	<!-- Top panel (door) -->
	<!--  -->
	<svg
		class="hero__background"
		xmlns="http://www.w3.org/2000/svg"
		version="1.1"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		xmlns:svgjs="http://svgjs.dev/svgjs"
		viewBox="0 0 800 800"
		><defs
			><radialGradient id="cccircular-grad" r="50%" cx="50%" cy="50%">
				<stop offset="15%" stop-color="currentColor" stop-opacity="0.5"></stop>
				<stop offset="75%" stop-color="currentColor" stop-opacity="1"></stop>
				<stop offset="100%" stop-color="currentColor" stop-opacity="1"></stop>
			</radialGradient></defs
		><g fill="currentColor"
			><circle r="352" cx="400" cy="400" opacity="0.05"></circle><circle
				r="320"
				cx="400"
				cy="400"
				opacity="0.15"
			></circle><circle r="288" cx="400" cy="400" opacity="0.24"></circle><circle
				r="256"
				cx="400"
				cy="400"
				opacity="0.33"
			></circle><circle r="224" cx="400" cy="400" opacity="0.43"></circle><circle
				r="192"
				cx="400"
				cy="400"
				opacity="0.53"
			></circle><circle r="160" cx="400" cy="400" opacity="0.62"></circle><circle
				r="128"
				cx="400"
				cy="400"
				opacity="0.71"
			></circle><circle r="96" cx="400" cy="400" opacity="0.81"></circle><circle
				r="64"
				cx="400"
				cy="400"
				opacity="0.91"
			></circle></g
		></svg
	>
	<div class="hero__panel hero__panel--top" bind:this={topPanel}>
		<h1 data-text={heroInjectable.titleFirstHalf} class="hero__title hero__title--top">
			{heroInjectable.titleFirstHalf}
		</h1>
	</div>

	<!-- Bottom panel (door) -->
	<div class="hero__panel hero__panel--bottom" bind:this={bottomPanel}>
		<h1 data-text={heroInjectable.titleSecondHalf} class="hero__title hero__title--bottom">
			{heroInjectable.titleSecondHalf}
		</h1>

		<h2 class="hero__subtitle">{heroInjectable.subtitle}</h2>

		<ul class="hero__benefits">
			<!-- Remote / Work -->
			<li class="hero__benefits-item">
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
				<strong class="hero__benefits-text">
					<span class="hero__benefits-text--first-half">{benefitsInjectable[0].firstHalf}</span>
					<span class="hero__benefits-text--seperator">{benefitsInjectable[0].seperator}</span>
					<span class="hero__benefits-text--second-half">{benefitsInjectable[0].secondHalf} </span>
				</strong>
			</li>

			<li class="hero__benefits-item">
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
				<strong class="hero__benefits-text">
					<span class="hero__benefits-text--first-half">{benefitsInjectable[1].firstHalf}</span>
					<span class="hero__benefits-text--seperator">{benefitsInjectable[1].seperator}</span>
					<span class="hero__benefits-text--second-half">{benefitsInjectable[1].secondHalf} </span>
				</strong>
			</li>
		</ul>
	</div>
</section>

<style scoped lang="scss">
	.hero {
		@extend %page-grid-item;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		min-height: 100dvh; /* One full viewport height */
		overflow: hidden; /* No scroll bars inside hero itself */
		overscroll-behavior: contain;
		& > * {
			flex: 1;
		}

		&__background {
			position: absolute;
			inset: 0;
			color: get-light-dark('medium', 'light');
			object-fit: cover;
			width: 100vw;
			height: 100vh;
			z-index: -1;
			opacity: 0.38;
		}
		&__panel {
			display: flex;
			flex-direction: column;
			// outline: 1px solid yellow;
			display: flex;
			transform: translateY(0%); /* default position */
			width: 100%;
			height: 100%;

			&--top {
				justify-content: flex-end;
			}
			&--bottom {
			}
		}

		&__title {
			@extend %global__display--h1;

			letter-spacing: -0.05em;
			@include gradient-text('dark', 'darkest', 'lightest', 'light', 145deg);
			position: relative;
			// Keep the text itself visible so the shadow works
			&::after {
				@include text-pop-up-top;

				content: attr(data-text);
				position: absolute;
				inset: 0;
				margin: auto;
				z-index: -1;

				// Make sure font-size, font-family, etc match the parent
			}

			&--top {
				// &::before {
				// 	content: '';
				// 	position: absolute;
				// 	top: 0;
				// 	left: 0;
				// 	right: 0;
				// 	margin-inline: auto;
				// 	border: none;
				// 	height: 0;
				// 	border-top: 0.0625rem solid get-light-dark('dark', 'light');
				// 	width: 50%;
				// }
			}

			&--bottom {
			}
		}

		&__subtitle {
			@extend %global__heading--h3;
			@include margin-not-related('top');
			margin-inline: auto;
			text-align: center;
			font-weight: get-fw('emphasis');
			text-transform: uppercase;
			text-wrap: pretty;

			@include respond-to('mobile') {
				word-spacing: get-responsive-sp('2xl');
			}
		}

		&__benefits {
			display: none;

			@include respond-to('mobile') {
				display: flex;
				margin-top: auto;
				margin-inline: auto;
				justify-content: space-between;
				align-items: center;
				list-style: none;
				padding-bottom: get-static-sp('sm');
				inline-size: 84%; //to stay in line with the grid
				& > * {
					flex-basis: 23%;
				}
			}
			& svg {
				--icon-size: #{get-fsz-range('label')};
				@include margin-closely-related('right');
				display: block;
				width: var(--icon-size);
				height: var(--icon-size);

				& path {
					fill: get-typography-color('tertiary');
				}
			}
		}

		&__benefits-item {
			@include flex-center;
		}

		&__benefits-text {
			@extend %global__label;
			font-family: get-ff('display');

			text-wrap: nowrap;
			line-height: none;

			&--first-half {
			}
			&--seperator {
			}
			&--second-half {
			}
		}
	}
</style>
