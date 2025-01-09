<script lang="ts">
	let { isOpen } = $props();

	// Track whether animations have completed and if element should be shown
	let isTransitionComplete = $state(false);
	let shouldShow = $state(false);

	// Navigation items
	const navItems = [
		{ href: '/', text: 'Home'.toUpperCase() },
		{ href: '/about', text: 'About'.toUpperCase() },
		{ href: '/about', text: 'Services'.toUpperCase() },
		{ href: '/work', text: 'Portfolio'.toUpperCase() },
		{ href: '/contact', text: 'Contact'.toUpperCase() }
	];

	// Handle animation states
	$effect(() => {
		if (isOpen) {
			shouldShow = true;
			isTransitionComplete = false;
			setTimeout(() => {
				isTransitionComplete = true;
			}, 500);
		} else {
			isTransitionComplete = false;
			// Wait for exit animation to complete before removing from DOM
			setTimeout(() => {
				shouldShow = false;
			}, 500);
		}
	});
</script>

{#if shouldShow}
	<nav
		class="nav"
		class:nav--active={isOpen}
		class:nav--inactive={!isOpen}
		class:nav--transition-complete={isTransitionComplete}
		aria-label="Main Navigation"
	>
		<ul class="nav__list" role="menubar" aria-label="Main menu">
			{#each navItems as { href, text }}
				<li class="nav__list-item" role="none">
					<a
						{href}
						class="nav__link"
						role="menuitem"
						aria-current={href === '/' ? 'page' : undefined}
						tabindex={isOpen ? 0 : -1}
					>
						<span class="nav__link-text">{text}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style lang="scss">
	/*=============================================
=          Navigation Background         =
=============================================*/

	$nav-timing: 0.4s;
	.nav {
		$background-opacity: 0.8;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		z-index: 999;
		inline-size: 100vw;
		block-size: 100vh;
		background: light-dark(
			hsla(191, 15%, 85%, $background-opacity),
			hsla(200, 64%, 6%, $background-opacity)
		);
		backdrop-filter: blur(16px) saturate(200%);
		-webkit-backdrop-filter: blur(16px) saturate(200%);
		opacity: 0;
		transition:
			transform $nav-timing cubic-bezier(0.77, 0, 0.175, 1),
			opacity $nav-timing cubic-bezier(0.77, 0, 0.175, 1);

		&--active {
			-webkit-animation: scale-in-tr $nav-timing cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
			animation: scale-in-tr $nav-timing cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
		}
		&--inactive {
			-webkit-animation: scale-out-tr $nav-timing cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
			animation: scale-out-tr $nav-timing cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
		}
	}

	/*=============================================
=          Navigation Content         =
=============================================*/

	.nav__list {
		padding-top: $page-header-height;
		@include flex-column-center;
		list-style: none;
		gap: get-sp('x8');

		inline-size: 100%;
		block-size: 100%;
		position: absolute;
		inset: 0;
		margin: auto;
		text-align: center;
	}

	.nav__list-item {
		opacity: 0;
		transform: translateY(20px);

		@for $i from 1 through 5 {
			&:nth-child(#{$i}) {
				transition:
					transform $nav-timing cubic-bezier(0.77, 0, 0.175, 1) #{$i * 0.1 + 0.2}s,
					opacity $nav-timing cubic-bezier(0.77, 0, 0.175, 1) #{$i * 0.1 + 0.2}s;
			}
		}

		.nav--transition-complete & {
			opacity: 1;
			transform: translateY(0);
		}
	}
	/*=============================================
=          Navigation Typography styling         =
=============================================*/
	.nav__link {
		@extend %global__display--base;
		position: relative;
		font-size: get-static-fsz('display', 'sm');
		color: get-light-dark('darkest', 'lightest');
		text-decoration: none;
		transition: color 0.3s ease;
		-webkit-animation: text-pop-up-top 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
		animation: text-pop-up-top 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
		// Underline effect
		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: -0.25rem;
			width: 0;
			height: 2px;
			background: get-light-dark('darkest', 'lightest');
			transition: width 0.3s ease;
		}

		&:hover {
			color: get-light-dark('dark', 'lighter');
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
