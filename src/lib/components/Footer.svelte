<script lang="ts">
	import { onMount } from 'svelte';

	import { lenisStore } from '$lib/stores/lenis';
	import Lottie from 'lottie-web';
	import circleMorphStr from '$lib/assets/lottie/Circle Shape Morphing animation.json';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let circleContainer: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const h2s = document.querySelectorAll('.footer h2');
		h2s.forEach((h2, i) => {
			const text = h2.textContent || '';
			h2.innerHTML = text
				.split('')
				.map(
					(char) =>
						`<span class="char-wrapper"><span class="reveal-char-footer-${i}">${char === ' ' ? '&nbsp;' : char}</span></span>`
				)
				.join('');

			gsap.from(`.reveal-char-footer-${i}`, {
				y: '100%',
				opacity: 0,
				duration: 1.2,
				ease: 'power4.out',
				stagger: 0.02,
				scrollTrigger: {
					trigger: '.footer',
					start: 'top 80%'
				}
			});
		});

		// Initialize Floating Circle Lottie
		if (circleContainer) {
			Lottie.loadAnimation({
				container: circleContainer,
				renderer: 'svg',
				loop: true,
				autoplay: true,
				animationData: circleMorphStr
			});
		}
	});

	function scrollToTop() {
		$lenisStore?.scrollTo(0);
	}
</script>

<footer class="footer" id="contact">
	<div class="cta-container">
		<div class="floating-circle-footer" bind:this={circleContainer}></div>
		<h2 class="ola">!OLA</h2>
		<h2 class="say-hi">
			<span class="gray">SAY</span> HI
		</h2>
	</div>

	<div class="contact-button-container">
		<a href="mailto:adetayo.lasisi@gmail.com" class="contact-btn">
			<span>SAY HELLO</span>
			<div class="arrow">→</div>
		</a>
	</div>

	<div class="footer-bottom">
		<div class="left">
			<span>©2026</span>
		</div>
		<div class="center">
			<a
				href="https://www.linkedin.com/in/adetayo-lasisi-aab8b722a/"
				target="_blank"
				rel="noopener noreferrer"
				class="social-link">LINKEDIN</a
			>
			<a
				href="https://x.com/cupoftreats"
				target="_blank"
				rel="noopener noreferrer"
				class="social-link">TWITTER</a
			>
		</div>
		<button class="right scroll-top-btn" onclick={scrollToTop} aria-label="Scroll to top">
			<span>SCROLL TO TOP</span>
		</button>
	</div>
</footer>

<style>
	.footer {
		background-color: var(--color-bg);
		color: var(--color-text);
		padding: 8rem 2rem 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 80vh;
		justify-content: space-between;
	}

	.cta-container {
		text-align: center;
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.floating-circle-footer {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 600px;
		height: 600px;
		z-index: 0;
		opacity: 0.6;
		pointer-events: none;
		mix-blend-mode: difference;
	}

	h2 {
		font-size: clamp(3rem, 18vw, 14rem);
		line-height: 0.8;
		display: flex;
		justify-content: center;
		gap: 1rem;
		width: 100%;
		overflow: visible; /* Allow characters to rise up */
		position: relative;
		z-index: 1;
	}

	:global(.char-wrapper) {
		display: inline-block;
		overflow: hidden;
		vertical-align: top;
	}

	:global(.reveal-char-footer-0),
	:global(.reveal-char-footer-1) {
		display: inline-block;
		will-change: transform;
	}

	.gray {
		color: #ccc;
	}

	.contact-button-container {
		margin: 4rem 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.contact-btn {
		border: 2px solid var(--color-text);
		padding: 1rem 2rem;
		border-radius: 50px;
		display: flex;
		align-items: center;
		gap: 1rem;
		font-family: var(--font-body);
		font-weight: 700;
		font-size: 1.2rem;
		transition: all 0.3s ease;
	}

	.contact-btn:hover {
		background-color: var(--color-text);
		color: var(--color-bg);
	}

	.arrow {
		background-color: var(--color-text);
		color: var(--color-bg);
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		transition: all 0.3s ease;
	}

	.contact-btn:hover .arrow {
		background-color: var(--color-bg);
		color: var(--color-text);
		transform: rotate(-45deg);
	}

	.scroll-top-btn {
		background: none;
		border: none;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		text-transform: inherit;
		cursor: pointer;
		padding: 0;
	}

	.footer-bottom {
		width: 100%;
		max-width: 1400px;
		display: flex;
		justify-content: space-between;
		font-family: var(--font-body);
		font-size: 0.75rem;
		text-transform: uppercase;
		border-top: 1px solid #eee;
		padding-top: 2rem;
	}

	.center {
		display: flex;
		gap: 2rem;
	}

	.social-link {
		cursor: pointer;
		color: var(--color-text);
		text-decoration: none;
		transition: opacity 0.3s ease;
	}

	.social-link:hover {
		opacity: 0.6;
	}

	@media (max-width: 768px) {
		h2 {
			flex-direction: column;
			gap: 0;
		}

		.footer-bottom {
			flex-direction: column;
			gap: 1rem;
			align-items: center;
		}
	}
</style>
