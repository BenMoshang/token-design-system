<!-- <script lang="ts">
	import { useScroll, useScrollAnimation, scrollReveal } from '$lib/animations/scroll.svelte';

	let basicElement: HTMLElement | undefined;
	let customElement: HTMLElement | undefined;

	let visible = $state(false);
	let progress = $state(0);

	// Initialize scroll tracking after elements are mounted
	$effect(() => {
		if (basicElement) {
			const { visible: visibleStore, progress: progressStore } = useScroll(basicElement, {
				threshold: 0.2,
				once: false
			});

			// Subscribe to stores
			const unsubscribeVisible = visibleStore.subscribe((value) => (visible = value));
			const unsubscribeProgress = progressStore.subscribe((value) => (progress = value));

			return () => {
				unsubscribeVisible();
				unsubscribeProgress();
			};
		}
	});

	// Custom animation action
	const customAnimation = (node: HTMLElement) => {
		return useScrollAnimation(node, {
			from: { opacity: 0, y: 50 },
			to: { opacity: 1, y: 0 },
			config: { threshold: 0.1, duration: 1000 }
		});
	};
</script>

<div class="demo-container">
	<h1>Scroll Animation Demo</h1>

	<section class="demo-section">
		<h2>1. Basic Scroll Tracking</h2>
		<div bind:this={basicElement} class="demo-box" class:visible style:opacity={progress}>
			<p>This box tracks scroll visibility and progress.</p>
			<p>Progress: {(progress * 100).toFixed(0)}%</p>
		</div>
	</section>

	<section class="demo-section">
		<h2>2. Custom Scroll Animation</h2>
		<div class="demo-box" bind:this={customElement}  use:customAnimation>
			<p>This box has a custom fade and slide animation.</p>
		</div>
	</section>

	<section class="demo-section">
		<h2>3. Simple Scroll Reveal</h2>
		<div
			use:scrollReveal={{
				threshold: 0.2,
				once: true,
				delay: 200
			}}
			class="demo-box"
		>
			<p>This box uses the simple scrollReveal action.</p>
		</div>
	</section>
</div>

<style lang="scss">
	.demo-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	.demo-section {
		margin: 100vh 0;
		padding: 2rem;
		text-align: center;

		h2 {
			margin-bottom: 2rem;
		}
	}

	.demo-box {
		background: var(--primary-color, #3498db);
		color: white;
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

		&.visible {
			background: var(--accent-color, #2ecc71);
		}

		p {
			margin: 0.5rem 0;
		}
	}

	// First section doesn't need top margin
	.demo-section:first-child {
		margin-top: 2rem;
	}

	// Last section doesn't need bottom margin
	.demo-section:last-child {
		margin-bottom: 2rem;
	}
</style> -->
