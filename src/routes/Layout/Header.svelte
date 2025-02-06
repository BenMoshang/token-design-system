<script lang="ts">
	import { onMount } from 'svelte';
	import ThemeToggle from '$lib/User/Preferences/ThemeToggle.svelte';
	import EmailButton from '$lib/Components/EmailButton.svelte';
	import Navigation from './Navigation.svelte';
	import BrandLogo from '$lib/Components/BrandLogo.svelte';

	let hideHeader = false;
	let lastScrollY = 0;
	let isNavOpen = false;

	function toggleNav() {
		isNavOpen = !isNavOpen;
		document.body.style.overflow = isNavOpen ? 'hidden' : '';
	}

	const navItems = [
		{ href: '/', text: 'HOME' },
		{ href: '/about', text: 'ABOUT' },
		{ href: '/services', text: 'SERVICES' },
		{ href: '/work', text: 'PORTFOLIO' },
		{ href: '/contact', text: 'CONTACT' }
	];

	onMount(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			hideHeader = currentScrollY > lastScrollY && currentScrollY > 100;
			lastScrollY = currentScrollY;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
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
				<li class="nav__list-item">
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
		// Use design tokens and mixins from the design system.
		--header-height: #{$page-header-height};
		@include flex-between;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		margin-top: get-static-sp('sm');
		inline-size: 100%;
		border-radius: $br-rounded;
		min-block-size: var(--header-height);
		padding: 1.25rem get-static-sp('md');
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
				display: block;
			}
		}

		//==========================
		// Header Content Wrapper
		//==========================
		&__content-wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: get-responsive-sp('md');
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
				width: 2rem;
				height: 2rem;
				padding: get-static-sp('xs');
				object-fit: cover;
				background: get-light-dark('darkest', 'lightest');
				border-radius: $br-rounded;
				transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
			}

			.line {
				fill: none;
				stroke: get-light-dark('lighter', 'dark');
				stroke-linecap: round;
				stroke-linejoin: round;
				stroke-width: 2;
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
	@include respond-to('tablet') {
		.header__burger {
			display: none;
		}
	}

	/*==========================
    NAVIGATION LINKS & LIST
  ==========================*/
	.nav__list {
		@include flex-center;
		gap: get-static-sp('lg');
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
