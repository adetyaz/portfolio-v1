<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let {
		src,
		alt,
		strength = 0.2, // Strength of parallax effect (0.1 to 0.4 usually looks best)
		class: className = '',
		imgClass = ''
	} = $props();

	let container: HTMLElement;
	let image: HTMLImageElement;

	onMount(() => {
		if (!container || !image) return;

		// Create the parallax animation
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				start: 'top bottom', // Start when the top of the container hits the bottom of the viewport
				end: 'bottom top', // End when the bottom of the container hits the top of the viewport
				scrub: true // Smoothly scrubs the animation
			}
		});

		// Move the image vertically based on scroll
		tl.fromTo(
			image,
			{
				yPercent: -10 * strength * 10
			},
			{
				yPercent: 10 * strength * 10,
				ease: 'none'
			}
		);

		return () => {
			tl.kill();
		};
	});
</script>

<div bind:this={container} class="parallax-container {className}">
	<img bind:this={image} {src} {alt} class="parallax-image {imgClass}" loading="lazy" />
</div>

<style>
	.parallax-container {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	.parallax-image {
		width: 100%;
		height: 120%; /* Height > 100% to allow for movement without showing edges */
		object-fit: cover;
		position: absolute;
		top: -10%; /* Center the 120% height image */
		will-change: transform;
	}
</style>
