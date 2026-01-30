<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	// import SelectedWork from '$lib/components/SelectedWork.svelte';
	import About from '$lib/components/About.svelte';
	import WorkGrid from '$lib/components/WorkGrid.svelte';
	import Services from '$lib/components/Services.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Adetayo Lasisi | Portfolio</title>
</svelte:head>

<main>
	<Hero />
	<About />
	<!-- <SelectedWork /> -->
	<WorkGrid />
	<Services />
	<Testimonials />
	<Footer />
</main>

<style>
	main {
		width: 100%;
		overflow-x: hidden;
	}
</style>
