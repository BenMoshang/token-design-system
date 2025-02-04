<script lang="ts">
	import ThemeToggle from '$lib/User/Preferences/ThemeToggle.svelte';
	import EmailButton from '$lib/Components/EmailButton.svelte';
	import Navigation from './Navigation.svelte';
	import BrandLogo from '$lib/Components/BrandLogo.svelte';
	let hideHeader = $state(false);
	let lastScrollY = $state(0);

	let isNavOpen = $state(false);
	export function toggleNav() {
		isNavOpen = !isNavOpen;
		document.body.style.overflow = isNavOpen ? 'hidden' : '';
	}
	const navItems = [
		{ href: '/', text: 'Home'.toUpperCase() },
		{ href: '/about', text: 'About'.toUpperCase() },
		{ href: '/about', text: 'Services'.toUpperCase() },
		{ href: '/work', text: 'Portfolio'.toUpperCase() },
		{ href: '/contact', text: 'Contact'.toUpperCase() }
	];
	// Add scroll event listener when the component is mounted
	$effect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			hideHeader = currentScrollY > lastScrollY && currentScrollY > 100;
			lastScrollY = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		// Cleanup listener on component destroy
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<header class="header" class:hide={hideHeader}>
	<!-- todo: edit this to stack the Y over odern and do 1 big M -->
	<BrandLogo />
	<!-- DESKTOP NAV -->
	<nav class="header__nav--desktop">
		<ul class="nav__list" role="menubar" aria-label="Main menu">
			{#each navItems as { href, text }}
				<li class="nav__list-item" role="none">
					<a
						{href}
						class="nav__link"
						role="menuitem"
						aria-current={href === '/' ? 'page' : undefined}
					>
						<span>{text}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="header__content-wrapper">
		<ThemeToggle />

		<EmailButton />
		<!-- MOBILE: Menu Toggle -->
		<label for="menu-toggle" class="header__burger">
			<input
				class="header__menu-toggle"
				type="checkbox"
				id="menu-toggle"
				aria-label="Toggle menu"
				onclick={toggleNav}
			/>

			<svg viewBox="0 0 32 32">
				<path
					class="line line-top-bottom"
					d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
				></path>
				<path class="line" d="M7 16 27 16"></path>
			</svg>
		</label>
	</div>
</header>
<Navigation isOpen={isNavOpen} />

<!-- <Navigation isOpen={isNavOpen} /> -->

<style lang="scss">
	/*==========================
	OVERIVIEW: Styles Quick Reference
	==========================*/

	.header {
		--header-height: #{$page-header-height};
		& a {
			text-decoration: none;
		}
	}
	/*==========================
	header
==========================*/
	.header {
		@include flex-between;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		margin-top: get-static-sp('s4');
		margin-inline: auto;
		z-index: 1000;
		backdrop-filter: blur(1rem) saturate(100%);
		-webkit-backdrop-filter: blur(1rem) saturate(200%);
		inline-size: 80%;
		border-radius: $br-rounded;
		block-size: var(--header-height);
		padding-inline: get-static-sp('s24');
		padding-block: get-static-sp('s16');
		// background: light-dark(hsla(191, 15%, 85%, 0.2), hsla(200, 64%, 6%, 0.2));
		transition: transform 0.3s ease-in-out;
		transform: translateY(0);
		animation: slide-down $hero-initial-entrance-delay ease-in-out;
		@include shadow-low;
	}
	/* Hides header by sliding it up */
	.hide {
		transform: translateY(-100%);
	}
	/*==========================
	logo and logo text
==========================*/

	/*==========================
burger
==========================*/

	.header__burger {
		// @include hover-effect;
		cursor: pointer;

		/*---- Hide the checkbox ----*/
		& input {
			display: none;

			/*---- Animatesburger----*/

			&:checked + svg {
				transform: rotate(-45deg);

				& .line-top-bottom {
					stroke-dasharray: 20 300;
					stroke-dashoffset: -32.42;
				}
			}
		}

		& svg {
			--svg-size: 2rem;
			--burger-centering: #{get-static-sp('s4')};
			width: var(--svg-size);
			height: var(--svg-size);
			padding-block: var(--burger-centering);
			padding-right: var(--burger-centering);

			/*---- Speed of the animation----*/

			transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
			background: get-light-dark('darkest', 'lightest');
			border-radius: $br-rounded;
		}
		/*---- Line styling----*/

		& .line {
			fill: none;

			stroke: get-light-dark('lighter', 'dark');
			stroke-linecap: round;
			stroke-linejoin: round;
			stroke-width: 2.5;

			/* Define the transition for transforming the Stroke */
			transition:
				stroke-dasharray 500ms cubic-bezier(0.4, 0, 0.2, 1),
				stroke-dashoffset 500ms cubic-bezier(0.4, 0, 0.2, 1);

			&-top-bottom {
				stroke-dasharray: 12 63;
			}
		}
	}

	/*==========================
Content Nav
==========================*/
	.header__content-wrapper {
		display: flex;
		gap: get-static-sp('s16');
	}

	.header__nav--desktop {
		display: none;
	}

	@media (min-width: $mobile-breakpoint) {
		.header__nav--desktop {
			display: unset;
			margin-inline: auto;
		}

		.header__burger {
			display: none;
		}
	}

	.nav__link {
		@include body-overview;
		position: relative;

		line-height: 1;

		color: get-light-dark('darkest', 'lightest');

		text-decoration: none;
		transition: color 0.3s ease;
		// Underline effect

		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: -0.25rem;
			width: 0;
			height: 0.125rem;
			background: get-light-dark('darker', 'lighter');
			transition: width 0.3s ease;
		}

		&:hover {
			color: get-light-dark('darker', 'lighter');
			transform: translateY(-1px);

			&::after {
				width: 100%;
			}
		}

		&:active {
			transform: translateY(0);
		}
	}

	.nav__list {
		$spacing-gap: get-static-sp('s16');
		@include flex-center;
		align-self: flex-start;
		gap: $spacing-gap;
		list-style: none;
		margin-left: get-static-sp('s16');

		&:last-child .nav__link {
			color: hrgb(0, 83, 146);
		}
	}
</style>
