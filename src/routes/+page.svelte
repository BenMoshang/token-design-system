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
		--cardTopPadding: 2.5rem;
		--cardMargin: 5vw;
	}

	.container {
		inline-size: 100%;
		margin-inline: 0;
	}

	#cards {
		list-style: none;
		padding-left: 0;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(var(--cards), var(--cardHeight));
		gap: var(--cardMargin);
	}

	#card1 {
		--index: 1;
	}
	#card2 {
		--index: 2;
	}
	#card3 {
		--index: 3;
	}
	#card4 {
		--index: 4;
	}
	#card5 {
		--index: 5;
	}

	.card {
		position: sticky;
		top: 0;
		// padding-top: calc(var(--index) * var(--cardTopPadding));
	}

	#card1 .card-body {
		background-color: #52b2cf;
	}
	#card2 .card-body {
		background-color: #e5a36f;
	}
	#card3 .card-body {
		background-color: #9cadce;
	}
	#card4 .card-body {
		background-color: #d4afb9;
	}

	#card5 .card-body {
		background-color: #2e3537;
	}

	.card-body {
		box-sizing: border-box;
		padding: 30px;
		border-radius: 50px;
		box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3);
		height: var(--cardHeight);
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	h2 {
		font-size: 2.5rem;
	}
</style>
