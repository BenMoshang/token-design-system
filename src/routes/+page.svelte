<script lang="ts">
	import HeroSection from './LandingPage/Sections/Hero/HeroSection.svelte';
	import AboutSection from './LandingPage/Sections/AboutSection.svelte';
	import ServicesSection from './LandingPage/Sections/ServicesSection.svelte';
	import PortfolioSection from './LandingPage/Sections/PortfolioSection.svelte';
	import ContactSection from './LandingPage/Sections/ContactSection.svelte';
	import FontTesting from '$lib/Testing/FontTesting.svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let cards = [
		{ id: 'card1', title: 'Hero Section', component: HeroSection },
		{ id: 'card2', title: 'Services Section', component: ServicesSection },
		{ id: 'card3', title: 'Portfolio Section', component: PortfolioSection },
		{ id: 'card4', title: 'About Section', component: AboutSection },
		{ id: 'card5', title: 'Contact Section', component: ContactSection }
	];
</script>

<svelte:head>
	<title>My Modern Site</title>
	<meta
		name="description"
		content="Refresh your web presence with our expert web development services tailored for B2B enterprises. 
		Our agency specializes in creating modern, scalable, and innovative digital solutions to drive your business forward. 
		Partner with us for expert web design, development, and digital marketing strategies that deliver measurable results."
	/>
</svelte:head>

<div class="container">
	<ul id="cards">
		{#each cards as card, index}
			<li
				class="card"
				id={card.id}
				transition:fly={{ y: 50, duration: 500, delay: index * 150, easing: quintOut }}
			>
				<svelte:component this={card.component} />
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	:root {
		--cards: 5;
		--cardHeight: 90vh;
		--cardMargin: 4vw;
	}

	.container {
		inline-size: 100%;
		margin-inline: 0;
	}

	#cards {
		list-style: none;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(var(--cards), var(--cardHeight));
		gap: var(--cardMargin);
	}

	@for $i from 1 through 5 {
		#card#{$i} {
			--index: #{$i};
		}
	}

	.card {
		position: sticky;
		top: 0;
	}
</style>
