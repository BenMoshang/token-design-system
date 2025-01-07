<script lang="ts">
	let isMobile: boolean = false;
</script>

<header>
	<a class="header__logo" href="/">
		<h3 class="header__logo-company">MY MODERN</h3>
	</a>
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

<style lang="scss" scoped>
	@use '$lib/scss/base/global-variables' as gv;

	/*==========================
	OVERIVIEW: Styles Quick Reference
	==========================*/

	header {
		--header-background: #{get-light-dark('lightest', 'darkest')};
		--header-height: 5rem;
		& a {
			text-decoration: none;
		}
	}

	/*==========================
burger
==========================*/
	.header__menu-toggle-label {
		cursor: pointer;
	}

	.header__menu-toggle-label input {
		display: none;
	}

	.header__menu-toggle-label svg {
		/* The size of the SVG defines the overall size */
		height: 3em;
		/* Define the transition for transforming the SVG */
		transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.line {
		fill: none;
		stroke: get-light-dark('light', 'lighter');
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 3;
		/* Define the transition for transforming the Stroke */
		transition:
			stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
			stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	.line-top-bottom {
		stroke-dasharray: 12 63;
	}

	.header__menu-toggle-label input:checked + svg {
		transform: rotate(-45deg);
	}

	.header__menu-toggle-label input:checked + svg .line-top-bottom {
		stroke-dasharray: 20 300;
		stroke-dashoffset: -32.42;
	}

	/*==========================
	logo
==========================*/
	.header__logo-company {
		@extend %global__display--base;
		color: get-light-dark('darkest', 'lightest');
		font-weight: get-fw('light');
		letter-spacing: get-ls('loose');
	}

	/*==========================
	nav
==========================*/
	nav {
		display: none;
	}
	header {
		@include flex-between;
		height: var(--header-height);
		padding-inline: get-sp('x4');
		background: var(--header-background);
	}
	/*==========================
	Media Queries
==========================*/
	@media (min-width: gv.$mobile-viewport) {
		.header__menu-burger {
			display: none;
		}
	}
</style>
