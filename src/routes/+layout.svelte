<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import Footer from '$lib/components/Footer.svelte';
	import Secrets from '$lib/components/Secrets.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	{@render children()}
</main>

<Footer />
<Secrets />

<style>
	main {
		min-height: 80vh;
	}
</style>
