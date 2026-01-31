<script lang="ts">
	import { onMount } from 'svelte';
	import Hero from '$lib/components/Hero.svelte';
	// import SelectedWork from '$lib/components/SelectedWork.svelte';
	import About from '$lib/components/About.svelte';
	import WorkGrid from '$lib/components/WorkGrid.svelte';
	import Services from '$lib/components/Services.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Preloader from '$lib/components/Preloader.svelte';
	import ScrollIndicator from '$lib/components/ScrollIndicator.svelte';

	let heroAnimate = false;

	function handlePreloaderComplete() {
		heroAnimate = true;
	}
</script>

<svelte:head>
	<title>Adetayo Lasisi | Portfolio</title>
</svelte:head>

<Preloader oncomplete={handlePreloaderComplete} />

<main>
	<Hero startAnimation={heroAnimate} />
	<About />
	<ScrollIndicator />
	<!-- <SelectedWork /> -->
	<Services />
	<WorkGrid />
	<Footer />
</main>

<style>
	main {
		width: 100%;
		overflow-x: hidden;
	}
</style>
