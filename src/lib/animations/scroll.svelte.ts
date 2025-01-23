/**
 * Simplified Scroll Animation Utilities for Svelte
 * Provides easy-to-use scroll-based animations and triggers
 */

import { onMount, onDestroy } from 'svelte';
import { writable, derived, type Writable } from 'svelte/store';

type ScrollConfig = {
	threshold?: number; // Intersection observer threshold (0-1)
	once?: boolean; // Trigger only once
	delay?: number; // Animation delay in ms
	duration?: number; // Animation duration in ms
};

/**
 * Creates a scroll trigger that tracks element visibility
 *
 * @example
 * ```svelte
 * <script>
 *   let element;
 *   const { visible, progress } = useScroll(element);
 * </script>
 *
 * <div bind:this={element}
 *      class:visible={$visible}
 *      style:opacity={$progress}>
 *   Content
 * </div>
 * ```
 */
export function useScroll(node: HTMLElement, config: ScrollConfig = {}) {
	const visible = writable(false);
	const progress = writable(0);

	let observer: IntersectionObserver;
	let cleanup: () => void;

	function setup() {
		if (!node) return;

		// Set up intersection observer
		observer = new IntersectionObserver(
			([entry]) => {
				visible.set(entry.isIntersecting);
				if (entry.isIntersecting && config.once) {
					observer.disconnect();
				}
			},
			{ threshold: config.threshold ?? 0.2 }
		);

		// Set up scroll tracking
		const updateProgress = () => {
			const rect = node.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			progress.set(Math.max(0, Math.min(1, 1 - rect.bottom / (windowHeight + rect.height))));
		};

		observer.observe(node);
		window.addEventListener('scroll', updateProgress, { passive: true });
		updateProgress();

		cleanup = () => {
			observer?.disconnect();
			window.removeEventListener('scroll', updateProgress);
		};
	}

	onMount(setup);
	onDestroy(() => cleanup?.());

	// Computed values for animation states
	const animating = derived(
		[visible, progress],
		([$visible, $progress]) => $visible || $progress > 0
	);
	const completed = derived(progress, ($progress) => $progress === 1);

	return {
		visible,
		progress,
		animating,
		completed
	};
}

/**
 * Creates a scroll-based animation
 *
 * @example
 * ```svelte
 * <script>
 *   let element;
 *   const animation = useScrollAnimation(element, {
 *     from: { opacity: 0, y: 20 },
 *     to: { opacity: 1, y: 0 }
 *   });
 * </script>
 *
 * <div bind:this={element} use:animation>
 *   Animated content
 * </div>
 * ```
 */
export function useScrollAnimation(
	node: HTMLElement,
	{
		from = { opacity: 0, y: 20 },
		to = { opacity: 1, y: 0 },
		config = {}
	}: {
		from?: Record<string, number>;
		to?: Record<string, number>;
		config?: ScrollConfig;
	} = {}
) {
	const { progress } = useScroll(node, config);

	function updateStyles(progressValue: number) {
		if (!node) return;

		const interpolate = (start: number, end: number) => start + (end - start) * progressValue;

		const styles = Object.keys(from).reduce(
			(acc, key) => {
				const value = interpolate(from[key], to[key]);
				if (key === 'y') {
					acc.transform = `translateY(${value}px)`;
				} else {
					acc[key] = value;
				}
				return acc;
			},
			{} as Record<string, string | number>
		);

		Object.assign(node.style, styles);
	}

	const unsubscribe = progress.subscribe(updateStyles);
	onDestroy(unsubscribe);

	return {
		update() {
			// This will be called by Svelte when the component updates
			progress.subscribe(updateStyles)();
		},
		destroy() {
			unsubscribe();
		}
	};
}

/**
 * Action to apply scroll reveal animation
 *
 * @example
 * ```svelte
 * <div use:scrollReveal>
 *   Content that fades in
 * </div>
 * ```
 */
export function scrollReveal(node: HTMLElement, config: ScrollConfig = {}) {
	return useScrollAnimation(node, {
		from: { opacity: 0, y: 20 },
		to: { opacity: 1, y: 0 },
		config
	});
}
