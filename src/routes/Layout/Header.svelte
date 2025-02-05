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
	<!-- todo: active state for nav links-->
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

<style lang="scss">
	/*==========================
    HEADER & CHILD COMPONENTS
  ==========================*/
	.header {
		// Variables and base styles
		--header-height: #{$page-header-height};
		@include flex-between;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		margin-top: get-static-sp('s8');
		margin-inline: auto;
		inline-size: 100%;
		border-radius: $br-rounded;
		min-block-size: var(--header-height);
		padding-inline: get-static-sp('s24');
		padding-block: 1.25rem;
		transition: transform 0.3s ease-in-out;
		transform: translateY(0);
		z-index: 1000;

		// Remove text decoration from all links in header
		a {
			text-decoration: none;
		}

		// Desktop: limit header width
		@include respond-to('desktop') {
			inline-size: 80%;
			margin-inline: auto;
		}

		// Modifier: hide header by sliding it up
		&.hide {
			transform: translateY(-120%);
		}

		//==========================
		// Navigation (Desktop)
		//==========================
		&__nav--desktop {
			display: none;
			@include respond-to('desktop') {
				display: unset;
				margin-inline: auto;
			}
		}

		//==========================
		// Header Content Wrapper
		//==========================
		&__content-wrapper {
			display: flex;
			gap: get-static-sp('s16');
		}

		//==========================
		// Burger Menu (Mobile)
		//==========================
		&__burger {
			cursor: pointer;

			input {
				display: none;
				// When the checkbox is checked, animate the SVG burger
				&:checked + svg {
					transform: rotate(-45deg);
					.line-top-bottom {
						stroke-dasharray: 20 300;
						stroke-dashoffset: -32.42;
					}
				}
			}

			svg {
				--svg-size: 2rem;
				--burger-centering: #{get-static-sp('s4')};
				width: var(--svg-size);
				height: var(--svg-size);
				padding-block: var(--burger-centering);
				padding-right: var(--burger-centering);
				background: get-light-dark('darkest', 'lightest');
				border-radius: $br-rounded;
				transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
			}

			.line {
				fill: none;
				stroke: get-light-dark('lighter', 'dark');
				stroke-linecap: round;
				stroke-linejoin: round;
				stroke-width: 2.5;
				transition:
					stroke-dasharray 500ms cubic-bezier(0.4, 0, 0.2, 1),
					stroke-dashoffset 500ms cubic-bezier(0.4, 0, 0.2, 1);

				&-top-bottom {
					stroke-dasharray: 12 63;
				}
			}
		}
	}

	//==========================
	// Hide burger menu on larger screens
	//==========================
	@media (min-width: $mobile-breakpoint) {
		.header__burger {
			display: none;
		}
	}

	/*==========================
    NAVIGATION LINKS & LIST
  ==========================*/
	.nav__list {
		$spacing-gap: get-static-sp('s32');
		@include flex-center;
		align-self: flex-start;
		gap: $spacing-gap;
		list-style: none;

		&:last-child .nav__link {
			color: hrgb(0, 83, 146);
		}
	}

	.nav__link {
		@include body-overview;
		font-family: get-ff('display');
		position: relative;
		font-size: get-static-fsz('x2');
		line-height: 1;
		color: get-light-dark('dark', 'light');
		text-decoration: none;
		transition: color 0.3s ease;

		// Underline effect on hover/focus
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

		&:hover,
		&:focus {
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
</style>
