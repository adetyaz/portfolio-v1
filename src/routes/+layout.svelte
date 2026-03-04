<script lang="ts">
	import favicon from '$lib/assets/favicon.ico';
	import '../app.css';

	import Lenis from '$lib/components/Lenis.svelte';
	// import { theme } from '$lib/stores/theme';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Lenis>
	{@render children()}
</Lenis>
