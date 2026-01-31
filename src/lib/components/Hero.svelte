<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Header from './Header.svelte';
	import ParallaxImage from '$lib/components/ParallaxImage.svelte';
	import { gsap } from '$lib/gsap';
	import headShot from '$lib/assets/images/portfolio.png';
	import Lottie from 'lottie-web';

	let { startAnimation = false }: { startAnimation?: boolean } = $props();

	// Coordination logic
	$effect(() => {
		if (startAnimation) {
			handleAnimationStart();
		}
	});

	async function handleAnimationStart() {
		// Ensure splitting has happened
		prepareSplits();
		await tick();
		runEntranceSequence();
	}

	function prepareSplits() {
		// Preparation: Split text into characters/words for animation
		// We use a check to prevent double-splitting
		const nameSpans = document.querySelectorAll('.name span:not(.char-wrapper)');
		nameSpans.forEach((span) => {
			const text = span.textContent || '';
			// Simple check to avoid re-splitting if already handled
			if (span.querySelector('.char-wrapper')) return;

			span.innerHTML = text
				.split('')
				.map(
					(char) =>
						`<span class="char-wrapper"><span class="reveal-char">${char === ' ' ? '&nbsp;' : char}</span></span>`
				)
				.join('');
		});

		const bioP = document.querySelector('.bio p:not(.word-wrapper)');
		if (bioP && !bioP.querySelector('.word-wrapper')) {
			const text = bioP.textContent || '';
			bioP.innerHTML = text
				.split(' ')
				.map(
					(word) =>
						`<span class="word-wrapper"><span class="reveal-word">${word}&nbsp;</span></span>`
				)
				.join('');
		}
	}

	function runEntranceSequence() {
		const tl = gsap.timeline();

		// Show containers immediately (they are hidden in CSS to prevent flash)
		gsap.set(['.name', '.bio', '.side-text'], { opacity: 1 });

		// 1. Image State & Animation (Slide + Scale)
		tl.fromTo(
			'.main-visual',
			{
				yPercent: 5,
				scale: 0.8,
				opacity: 0
			},
			{
				yPercent: 0,
				scale: 1,
				opacity: 1,
				duration: 2,
				ease: 'power3.out'
			}
		);

		// 1b. Ring Entrance (Smooth fade and scale)
		tl.fromTo(
			'.hero-ring',
			{
				opacity: 0,
				scale: 0.8
			},
			{
				opacity: 0.15, // Match its static CSS opacity
				scale: 1,
				duration: 2,
				ease: 'power3.out'
			},
			'<0.2' // Start slightly after main-visual slide begins
		);

		// 2. Name Reveal (Robust fromTo)
		tl.fromTo(
			'.name .reveal-char',
			{
				y: '100%',
				opacity: 0
			},
			{
				y: '0%',
				opacity: 1,
				duration: 0.8,
				ease: 'power4.out',
				stagger: 0.02
			},
			'-=1.8'
		);

		// 3. Bio Reveal
		tl.fromTo(
			'.bio .reveal-word',
			{
				y: '100%',
				opacity: 0
			},
			{
				y: '0%',
				opacity: 1,
				duration: 0.8,
				ease: 'power4.out',
				stagger: 0.015
			},
			'-=1.2'
		);

		// 3b. Small Bio Image Reveal
		tl.fromTo(
			'.small-image',
			{ opacity: 0, scale: 0.9 },
			{ opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
			'-=0.8'
		);

		// 4. Side texts
		tl.fromTo(
			'.side-text span',
			{ opacity: 0 },
			{
				opacity: 1,
				duration: 1,
				stagger: 0.1
			},
			'-=1'
		);

		// 5. Header Reveal
		tl.fromTo(
			'.header',
			{ opacity: 0, y: -20 },
			{ opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
			'-=1.5'
		);
	}

	onMount(() => {
		// Initialize splitting on mount just in case
		prepareSplits();

		// Independent floating animations
		gsap.to('.hero-ring', {
			rotation: 360,
			duration: 25,
			repeat: -1,
			ease: 'none'
		});

		const sideTexts = document.querySelectorAll('.side-text span');
		sideTexts.forEach((text, i) => {
			gsap.to(text, {
				y: 10,
				duration: 2 + i * 0.5,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				delay: i * 0.2
			});
		});

		// Block Reveal for Tech Stack (existing scroll-triggered)
		const stackLines = document.querySelectorAll('.tech-stack-lines span');
		stackLines.forEach((line) => {
			const originalContent = line.innerHTML;
			line.innerHTML = `<span class="reveal-text">${originalContent}</span>`;
			const block = document.createElement('div');
			block.className = 'reveal-block';
			line.appendChild(block);
			const text = line.querySelector('.reveal-text');
			gsap.set(line, {
				position: 'relative',
				display: 'inline-block',
				overflow: 'hidden',
				opacity: 0,
				padding: '0.1em 0'
			});
			gsap.set(text, { display: 'inline-block' });
			gsap.set(block, {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				background: 'var(--color-text)',
				zIndex: 2
			});

			const tl = gsap.timeline({
				scrollTrigger: { trigger: line, start: 'top 95%', toggleActions: 'play none none reverse' }
			});
			tl.set(text, { opacity: 0 })
				.set(line, { opacity: 1 })
				.fromTo(
					block,
					{ scaleX: 0, transformOrigin: 'left' },
					{ scaleX: 1, duration: 0.5, ease: 'power3.inOut' }
				)
				.set(text, { opacity: 1 })
				.to(block, { scaleX: 0, transformOrigin: 'right', duration: 0.5, ease: 'power3.inOut' });
		});
	});
</script>

<section class="hero">
	<Header />

	<div class="content warning-no-scroll">
		<h1 class="name">
			<span class="first">Adetayo</span>
		</h1>

		<div class="main-visual">
			<div class="hero-ring"></div>
			<div class="image-container">
				<ParallaxImage src={headShot} alt="Adetayo Lasisi" strength={0.3} />
			</div>
			<h1 class="name">
				<span class="last">Lasisi</span>
			</h1>

			<div class="side-text left">
				<span>blockchain</span>
				<span>design</span>
			</div>

			<div class="side-text right">
				<span>development</span>
				<span>code</span>
			</div>
		</div>

		<div class="bio">
			<p>
				FRONTEND ENGINEER CRAFTING DIGITAL EXPERIENCES AND PRODUCTS. I BUILD INTERFACES FOR WEB3
				PRODUCTS.
			</p>

			<div class="small-image">
				<ParallaxImage
					src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=500&auto=format&fit=crop"
					alt="Creative Cat"
					strength={0.3}
				/>
			</div>

			<div class="tech-stack-lines">
				<span>FIGMA - BLOCKCHAIN</span>
				<span>MOTION - SVELTE - REACT - GSAP</span>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 8rem;
		overflow: hidden;
		background-color: var(--color-bg);
	}

	.content {
		width: 100%;
		max-width: 1400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 0 2rem;
	}

	:global(.header) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 4rem;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		opacity: 0; /* Hidden until animated */
	}

	.name {
		font-size: clamp(3rem, 13vw, 8.5rem);
		line-height: 1.1;
		letter-spacing: -0.08em;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 0.5rem;
		width: 100%;
		opacity: 0; /* Hidden until animated */
	}

	.name span {
		display: block;
	}

	:global(.char-wrapper),
	:global(.word-wrapper) {
		display: inline-block;
		overflow: hidden;
		vertical-align: top;
	}

	:global(.reveal-char),
	:global(.reveal-word) {
		display: inline-block;
		will-change: transform, opacity;
		opacity: 0;
		transform: translateY(100%);
		padding: 0.25em 0;
		margin: -0.25em 0;
	}

	.main-visual {
		position: relative;
		margin: 0.5rem 0 2rem;
		width: 100%;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		opacity: 0; /* Hidden until animated */
	}

	.hero-ring {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 110%;
		height: 110%;
		border: 1px dashed var(--color-text);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
		opacity: 0; /* Hidden until animated */
		z-index: -1;
	}

	.image-container {
		width: 100%;
		aspect-ratio: 3/4;
		overflow: hidden;
	}

	.side-text {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		font-family: var(--font-body);
		font-size: 0.75rem;
		text-transform: uppercase;
		writing-mode: vertical-rl;
		letter-spacing: 0.1em;
		display: flex;
		flex-direction: column;
		gap: 3rem;
		height: 100%;
		justify-content: center;
		pointer-events: none;
	}

	.side-text span {
		display: block;
		pointer-events: auto;
		opacity: 0;
	}

	.side-text.left {
		left: -3rem;
		transform: translateY(-50%) rotate(180deg);
	}

	.side-text.right {
		right: -3rem;
	}

	.bio {
		margin-top: 4rem;
		max-width: 600px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		opacity: 0; /* Hidden until animated */
	}

	.bio p {
		font-family: var(--font-heading);
		font-size: 1.1rem;
		text-transform: uppercase;
		line-height: 1.3;
		font-weight: 400;
	}

	.small-image {
		width: 150px;
		height: 150px;
		overflow: hidden;
		opacity: 0; /* Hidden until animated */
	}

	.tech-stack-lines {
		font-family: var(--font-body);
		font-size: 0.7rem;
		text-transform: uppercase;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		opacity: 0.7;
		align-items: center;
	}

	@media (max-width: 768px) {
		.side-text {
			display: none;
		}

		.hero {
			padding-top: 25vh;
		}
	}
</style>
