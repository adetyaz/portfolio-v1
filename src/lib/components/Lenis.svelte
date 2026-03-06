<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import Lenis from 'lenis';

	import { lenisStore } from '$lib/stores/lenis';

	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let { children } = $props();
	let lenis: Lenis | null = null;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		// Initialize Lenis
		lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 2,
			infinite: false
		});

		lenisStore.set(lenis);

		// Connect Lenis to ScrollTrigger
		lenis.on('scroll', ScrollTrigger.update);

		const raf = (time: number) => {
			lenis?.raf(time * 1000);
		};

		gsap.ticker.add(raf);

		gsap.ticker.lagSmoothing(0);

		return () => {
			lenis?.destroy();
			gsap.ticker.remove(raf);
			lenisStore.set(null);
		};
	});

	// Reset scroll on navigation
	afterNavigate(() => {
		lenis?.scrollTo(0, { immediate: true });
		ScrollTrigger.refresh();
	});
</script>

<div class="lenis-wrapper">
	{@render children()}
</div>

<style>
	:global(html.lenis),
	:global(html.lenis body) {
		height: auto;
	}

	.lenis-wrapper {
		width: 100%;
	}
</style>
