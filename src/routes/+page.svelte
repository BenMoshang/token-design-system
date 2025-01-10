<script lang="ts">
	import HeroSection from '../lib/LandingPage/Sections/Hero/HeroSection.svelte';
	import FontTesting from '$lib/Testing/FontTesting.svelte';
</script>

<svelte:head>
	<title>My Modern Site</title>
	<meta
		name="description"
		content="Refresh your web presence with our expert web development services tailored for B2B enterprises. Our agency specializes in creating modern, scalable, and innovative digital solutions to drive your business forward. Partner with us for expert web design, development, and digital marketing strategies that deliver measurable results."
	/>
</svelte:head>

<HeroSection />

<!-- <FontTesting /> -->
<!-- <img src="../static/Images/city.jpg" alt="city" />
<img src="../static/Images/city.jpg" alt="city" />
<img src="../static/Images/city.jpg" alt="city" />
<img src="../static/Images/city.jpg" alt="city" />
<img src="../static/Images/city.jpg" alt="city" /> -->

<style lang="scss">
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>
