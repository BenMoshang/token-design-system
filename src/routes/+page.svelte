<script lang="ts">
	import HeroSection from './LandingPage/Sections/Hero/HeroSection.svelte';
	import AboutSection from './LandingPage/Sections/AboutSection.svelte';
	import ServicesSection from './LandingPage/Sections/ServicesSection.svelte';
	import PortfolioSection from './LandingPage/Sections/PortfolioSection.svelte';
	import ContactSection from './LandingPage/Sections/ContactSection.svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let cards = [
		{ id: 'card1', title: 'About Section', component: AboutSection },
		{ id: 'card2', title: 'Services Section', component: ServicesSection },
		{ id: 'card3', title: 'Portfolio Section', component: PortfolioSection },
		{ id: 'card4', title: 'Contact Section', component: ContactSection }
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
	<!-- Make sure your site is added to the home screen -->
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<!-- Options: default, black, black-translucent -->
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
</svelte:head>

<HeroSection />
<AboutSection />

<!-- {#each cards as card, index}
	<section
		class="card"
		id={card.id}
		transition:fly={{ y: 50, duration: 500, delay: index * 150, easing: quintOut }}
	>
		<svelte:component this={card.component} />
	</section>
{/each} -->

<style lang="scss">
	:root {
		--cards: 5;
		--cardHeight: 90vh;
		--cardMargin: 4vw;
	}
	// .hero-wrapper {
	// 	width: 100%;
	// 	height: 100%;
	// 	position: absolute;
	// 	inset: 0;
	// 	margin: auto;
	// 	z-index: 100;
	// }

	// #cards {
	// 	list-style: none;
	// 	display: grid;
	// 	grid-template-columns: 1fr;
	// 	grid-template-rows: repeat(var(--cards), var(--cardHeight));
	// 	gap: var(--cardMargin);
	// }

	@for $i from 1 through 5 {
		#card#{$i} {
			--index: #{$i};
		}
	}

	.card {
		@extend %page-grid-item;
		position: sticky;
		top: 0;
	}
</style>
