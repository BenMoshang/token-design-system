<script lang="ts">
	import ThemeToggle from '$lib/User/Preferences/ThemeToggle.svelte';
	let hideHeader = $state(false);
	let lastScrollY = $state(0);

	// Add scroll event listener when the component is mounted
	$effect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			hideHeader = currentScrollY > lastScrollY && currentScrollY > 50;
			lastScrollY = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		// Cleanup listener on component destroy
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<header class:hide={hideHeader}>
	<a class="header__logo" href="/">
		<h3 class="header__logo-company"><span>My</span><br />Modern</h3>
	</a>
	<ThemeToggle />

	<!-- MOBILE: Menu Toggle -->
	<label for="menu-toggle" class="header__menu-toggle-label">
		<input type="checkbox" id="menu-toggle" class="header__menu-toggle" aria-label="Toggle menu" />
		<svg viewBox="0 0 32 32">
			<path
				class="line line-top-bottom"
				d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
			></path>
			<path class="line" d="M7 16 27 16"></path>
		</svg>
	</label>
	<nav class="header__nav" aria-label="Main site navigation">
		<ul class="header__nav-list">
			<li class="header__nav-item"><a href="/">Home</a></li>
			<li class="header__nav-item"><a href="/">About</a></li>
			<li class="header__nav-item"><a href="/">Services</a></li>
			<li class="header__nav-item"><a href="/">Contact</a></li>
		</ul>
	</nav>
</header>

<style lang="scss">
	@use '$lib/scss/main.scss' as *;

	/*==========================
	OVERIVIEW: Styles Quick Reference
	==========================*/

	header {
		--header-height: #{$page-header-height};
		& a {
			text-decoration: none;
		}
	}
	/*==========================
	header
==========================*/
	header {
		@include flex-between;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		backdrop-filter: blur(16px) saturate(200%);
		-webkit-backdrop-filter: blur(16px) saturate(200%);
		inline-sizes: 100%;
		block-size: var(--header-height);
		padding-inline: get-sp('x4');
		background: light-dark(hsla(191, 15%, 85%, 0.2), hsla(200, 64%, 6%, 0.2));
		border-bottom-left-radius: $br-default;
		border-bottom-right-radius: $br-default;
		border-bottom: 1px solid rgba(255, 255, 255, 0.125);

		transition: transform 0.3s ease-in-out;
		transform: translateY(0);
	}
	/* Hides header by sliding it up */
	.hide {
		transform: translateY(-100%);
	}

	/*==========================
burger
==========================*/
	.header__menu-toggle-label {
		cursor: pointer;

		& input {
			display: none;
		}

		& svg {
			/* The size of the SVG defines the overall size */
			--svg-size: 2.5rem;
			--burger-centering: #{get-sp('x1')};
			width: var(--svg-size);
			height: var(--svg-size);
			padding-block: var(--burger-centering);
			padding-right: var(--burger-centering);

			/* Define the transition for transforming the SVG */
			transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
			background: get-light-dark('darkest', 'lightest');
			border-radius: $br-rounded;
		}

		& .line {
			fill: none;

			stroke: get-light-dark('lighter', 'darker');
			stroke-linecap: round;
			stroke-linejoin: round;
			stroke-width: 3;
			/* Define the transition for transforming the Stroke */
			transition:
				stroke-dasharray 500ms cubic-bezier(0.4, 0, 0.2, 1),
				stroke-dashoffset 500ms cubic-bezier(0.4, 0, 0.2, 1);
		}

		& .line-top-bottom {
			stroke-dasharray: 12 63;
		}
	}

	.header__menu-toggle-label input:checked + svg {
		transform: rotate(-45deg);
	}

	.header__menu-toggle-label input:checked + svg .line-top-bottom {
		stroke-dasharray: 20 300;
		stroke-dashoffset: -32.42;
	}

	/*==========================
	logo and logo text
==========================*/
	.header__logo-company {
		@extend %global__my-modern-logo;
	}

	/*==========================
	nav
==========================*/
	nav {
		display: none;
	}

	/*==========================
	Media Queries
==========================*/
	@media (min-width: $mobile-viewport) {
		.header__menu-burger {
			display: none;
		}
	}
</style>
