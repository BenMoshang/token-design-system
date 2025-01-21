<script>
    import { onMount } from 'svelte';
	import Lenis from '@studio-freight/lenis'; // Adjust the import if necessary
    onMount(() => {
		// Initialize Lenis with any desired options
		const lenis = new Lenis({
			duration: 1.5,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Improved easing function
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 2,
			infinite: false
		});

		// The RAF (requestAnimationFrame) loop to keep Lenis updated
		const raf = (time) => {
			lenis.raf(time);
			requestAnimationFrame(raf);
		};

		requestAnimationFrame(raf);

		// Optionally, you can return a cleanup function if needed
		return () => {
			// Add any cleanup or destroy logic for lenis here if the library provides it
		};
	});
  </script>
