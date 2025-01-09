<script lang="ts">
	let { isOpen } = $props();

	// Track whether animations have completed
	let isTransitionComplete = $state(false);

	// Handle animation completion
	$effect(() => {
		if (isOpen) {
			// Reset transition state when menu opens
			isTransitionComplete = false;
			// Set complete after animation duration
			setTimeout(() => {
				isTransitionComplete = true;
			}, 600); // Matches total animation duration
		}
	});
</script>

{#if isOpen}
	<nav class="nav" class:nav--active={isOpen} class:nav--transition-complete={isTransitionComplete}>
		<div class="nav__content">
			<ul class="nav__list">
				<li class="nav__item">
					<a href="/" class="nav__link">Home</a>
				</li>
				<li class="nav__item">
					<a href="/about" class="nav__link">About</a>
				</li>
				<li class="nav__item">
					<a href="/work" class="nav__link">Work</a>
				</li>
				<li class="nav__item">
					<a href="/contact" class="nav__link">Contact</a>
				</li>
			</ul>
		</div>
	</nav>
{/if}

<style lang="scss">
	.nav {
		position: fixed;
		inset: 0;
		z-index: 1001;
		background: light-dark(hsla(191, 15%, 85%, 0.98), hsla(200, 64%, 6%, 0.98));
		backdrop-filter: blur(16px) saturate(200%);
		-webkit-backdrop-filter: blur(16px) saturate(200%);
		opacity: 0;
		transform: translateX(100%);
		transition:
			transform 0.6s cubic-bezier(0.77, 0, 0.175, 1),
			opacity 0.6s cubic-bezier(0.77, 0, 0.175, 1);

		&--active {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.nav__content {
		@include flex-center;
		height: 100vh;
		padding-block: get-sp('x8');
	}

	.nav__list {
		@include flex-column;
		gap: get-sp('x8');
		text-align: center;
	}

	.nav__item {
		opacity: 0;
		transform: translateY(20px);

		@for $i from 1 through 4 {
			&:nth-child(#{$i}) {
				transition:
					transform 0.4s cubic-bezier(0.77, 0, 0.175, 1) #{$i * 0.1 + 0.2}s,
					opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) #{$i * 0.1 + 0.2}s;
			}
		}

		.nav--transition-complete & {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.nav__link {
		@extend %global__heading--lg;
		position: relative;
		color: get-light-dark('darkest', 'lightest');
		text-decoration: none;
		transition: color 0.3s ease;

		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: -0.5rem;
			width: 0;
			height: 2px;
			background: get-light-dark('darkest', 'lightest');
			transition: width 0.3s ease;
		}

		&:hover {
			color: get-light-dark('dark', 'lighter');

			&::after {
				width: 100%;
			}
		}
	}
</style>
