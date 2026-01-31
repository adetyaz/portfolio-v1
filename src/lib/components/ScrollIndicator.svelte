<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap, ScrollTrigger } from '$lib/gsap';
	import Lottie from 'lottie-web';
	import boatJson from '$lib/assets/lottie/passing boat.json';

	let lottieContainer: HTMLElement;
	let textTarget: HTMLElement;
	let revealBlock: HTMLElement;

	onMount(() => {
		// Init Lottie
		const anim = Lottie.loadAnimation({
			container: lottieContainer,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: boatJson
		});

		// GSAP Scroll Animation
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: lottieContainer,
				start: 'top 85%',
				once: true
			}
		});

		tl.from(lottieContainer, {
			y: 30,
			opacity: 0,
			duration: 1.2,
			ease: 'power3.out'
		});

		// Block reveal for text
		const textTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: textTarget,
				start: 'top 85%',
				once: true
			}
		});

		textTimeline
			.to(revealBlock, {
				scaleX: 1,
				duration: 0.8,
				ease: 'power3.inOut'
			})
			.set(textTarget.querySelector('.text-content'), { opacity: 1 })
			.to(revealBlock, {
				scaleX: 0,
				transformOrigin: 'right',
				duration: 0.8,
				ease: 'power3.inOut'
			});

		return () => {
			anim.destroy();
		};
	});
</script>

<div class="scroll-indicator-container">
	<div class="lottie-wrapper" bind:this={lottieContainer}></div>
	<div class="text-reveal-wrapper" bind:this={textTarget}>
		<span class="text-content">just keep scrolling</span>
		<div class="reveal-block" bind:this={revealBlock}></div>
	</div>
</div>

<style>
	.scroll-indicator-container {
		display: none; /* Desktop only */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 6rem 0; /* Generous vertical spacing */
		width: 100%;
		background: var(--color-bg);
		margin-bottom: -10vh; /* Pull Services closer for a tighter flow */
		position: relative;
		z-index: 5;
	}

	@media (min-width: 1024px) {
		.scroll-indicator-container {
			display: flex;
		}
	}

	.lottie-wrapper {
		width: 200px; /* Slightly larger for presence */
		height: auto;
		margin-bottom: 2rem;
		opacity: 0.8;
	}

	.text-reveal-wrapper {
		position: relative;
		display: inline-block;
		overflow: hidden;
		padding: 0.2rem 0.4rem;
	}

	.text-content {
		font-family: var(--font-body);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.4em; /* Wider spacing for a premium feel */
		opacity: 0;
		color: var(--color-text);
		font-weight: 500;
		white-space: nowrap;
	}

	.reveal-block {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--color-text);
		transform: scaleX(0);
		transform-origin: left;
		z-index: 2;
	}
</style>
