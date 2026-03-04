<script lang="ts">
	import { onMount } from 'svelte';

	import Lottie from 'lottie-web';
	import walkJson from '$lib/assets/lottie/Groovy Walk Cycle.json';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let container = $state<HTMLElement>();
	let lottieInstance: any;

	onMount(() => {
		if (!container) return;

		const target = container as gsap.TweenTarget;

		lottieInstance = Lottie.loadAnimation({
			container: container,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: walkJson
		});

		// Calculate total distance: viewport width + double the figure width to ensure clear entrance/exit
		const figureWidth = 150;

		const animate = () => {
			const totalWidth = window.innerWidth;

			gsap.fromTo(
				target,
				{
					x: -figureWidth,
					opacity: 1
				},
				{
					x: totalWidth + figureWidth,
					duration: 25,
					ease: 'none',
					repeat: -1,
					onRepeat: () => {
						// Responsive check: update width if window resized
						const currentWidth = window.innerWidth;
						gsap.set(target, { x: -figureWidth });
						// We could update the tween here if needed, but linear x: totalWidth + figureWidth is usually fine for a few repeat cycles
					}
				}
			);
		};

		animate();

		return () => {
			if (lottieInstance) lottieInstance.destroy();
			gsap.killTweensOf(target);
		};
	});
</script>

<div class="walking-carousel-wrapper">
	<div bind:this={container} class="walking-figure"></div>
</div>

<style>
	.walking-carousel-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100px;
		pointer-events: none;
		overflow: hidden;
		z-index: 5;
		/* Slightly above background, but below main content */
	}

	.walking-figure {
		width: 120px;
		height: 120px;
		display: block;
	}
</style>
