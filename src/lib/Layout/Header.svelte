<script lang="ts">
	let isMobile: boolean = false;
</script>

<header>
	<a class="header__logo" href="/">
		<img src="/logo.svg" alt="Logo" />
	</a>
	<!-- MOBILE: Burger -->
	<button class="header__menu-burger" aria-label="Open menu">
		<span class="header__menu-burger-line"></span>
	</button>

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
	@use '$lib/scss/base/global-variables' as gv;

	/*==========================
	Overall Styles Quick Reference
==========================*/
	// !TODO: --CSS-variables
	header {
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
