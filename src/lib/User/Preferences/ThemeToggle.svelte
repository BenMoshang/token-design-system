<script lang="ts">
	import { theme } from '$lib/Stores/theme';

	// Use $state rune for reactive state
	let touchStartX = $state(0);
	let touchEndX = $state(0);
	let isDark = $state(false);

	// Update theme and save preference
	function toggleTheme() {
		isDark = !isDark;
		theme.set(isDark ? 'dark' : 'light');
	}

	// Handle touch events for better mobile interaction
	function handleTouchStart(e: TouchEvent) {
		e.preventDefault(); // Prevent default touch behavior
		touchStartX = e.touches[0].clientX;
	}

	function handleTouchMove(e: TouchEvent) {
		e.preventDefault(); // Prevent default touch behavior
		touchEndX = e.touches[0].clientX;
	}

	function handleTouchEnd(e: TouchEvent) {
		e.preventDefault(); // Prevent default touch behavior
		const SWIPE_THRESHOLD = 50;
		const swipeDistance = touchEndX - touchStartX;

		if (Math.abs(swipeDistance) >= SWIPE_THRESHOLD) {
			isDark = swipeDistance < 0;
			theme.set(isDark ? 'dark' : 'light');
		} else {
			// If it's not a swipe, treat it as a tap
			toggleTheme();
		}

		touchStartX = 0;
		touchEndX = 0;
	}

	// Handle click as fallback
	function handleClick() {
		if (touchStartX === 0 && touchEndX === 0) {
			// Only toggle if no touch event is in progress
			toggleTheme();
		}
	}

	// Use $effect for side effects
	$effect(() => {
		if (typeof window === 'undefined') return;

		// Check localStorage first
		const savedTheme = localStorage.getItem('theme');
		isDark = savedTheme === 'dark';

		// If no saved preference, check system preference
		if (!savedTheme) {
			isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			theme.set(isDark ? 'dark' : 'light');
		}

		// Listen for system theme changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = (e: MediaQueryListEvent) => {
			if (!localStorage.getItem('theme')) {
				isDark = e.matches;
				theme.set(isDark ? 'dark' : 'light');
			}
		};

		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	});

	// Subscribe to theme store changes
	$effect(() => {
		const unsubscribe = theme.subscribe((value) => {
			isDark = value === 'dark';
		});
		return unsubscribe;
	});
</script>

<!-- THEME SWITCH -->
<label for="theme-switch" class="header__theme-switch">
	<span class="sun" aria-hidden="true">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<g fill="#ffd43b">
				<circle r="5" cy="12" cx="12"></circle>
				<path
					d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"
				></path>
			</g>
		</svg>
	</span>
	<span class="moon" aria-hidden="true">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
			<path
				d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
			></path>
		</svg>
	</span>
	<input
		type="checkbox"
		id="theme-switch"
		class="input"
		bind:checked={isDark}
		role="switch"
		aria-checked={isDark}
		aria-label="Toggle dark mode"
		onclick={handleClick}
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
	/>
	<span class="slider" aria-hidden="true"></span>
</label>

<style lang="scss">
	/*==========================
	theme switch
==========================*/
	.header__theme-switch {
		@include hover-brightness;
		z-index: 1000;
		position: relative;
		display: inline-block;
		width: 4rem;
		height: 2.125rem;
		touch-action: pan-x;
		-webkit-tap-highlight-color: transparent;

		& input {
			opacity: 0;
			width: 0;
			height: 0;
			position: absolute;
		}

		& .slider {
			position: absolute;
			cursor: pointer;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #73c0fc;
			transition: 0.4s;
			border-radius: 30px;
			user-select: none;
			-webkit-user-select: none;

			&:before {
				position: absolute;
				content: '';
				height: 1.875rem;
				width: 1.875rem;
				border-radius: 1.25rem;
				left: 0.125rem;
				bottom: 0.125rem;
				z-index: 2;
				background-color: #e8e8e8;
				transition: 0.4s;
			}
		}

		@media (hover: hover) {
			&:hover .slider {
				background-color: #5ca8e6;
			}
		}

		@media (hover: none) {
			&:active .slider {
				background-color: #5ca8e6;
			}
		}
	}

	.sun svg {
		position: absolute;
		top: 0.375rem;
		left: 2.25rem;
		z-index: 1;
		width: 1.5rem;
		height: 1.5rem;
		animation: rotate 15s linear infinite;
		pointer-events: none;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.moon svg {
		fill: #73c0fc;
		position: absolute;
		top: 0.3125rem;
		left: 0.3125rem;
		z-index: 1;
		width: 1.5rem;
		height: 1.5rem;
		animation: tilt 5s linear infinite;
		pointer-events: none;
	}

	@keyframes tilt {
		0% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(-10deg);
		}
		75% {
			transform: rotate(10deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}

	.input:checked + .slider {
		background-color: #183153;
	}

	.input:focus-visible + .slider {
		box-shadow: 0 0 0 2px #73c0fc;
	}

	.input:checked + .slider:before {
		transform: translateX(1.875rem);
	}

	/* Ensure touch targets are large enough */
	@media (pointer: coarse) {
		.header__theme-switch {
			min-width: 3.5rem;
			min-height: 2rem;
			touch-action: none; /* Disable all browser touch actions */
		}

		.slider {
			cursor: pointer;
			-webkit-tap-highlight-color: transparent;
			-webkit-touch-callout: none;
		}
	}
</style>
