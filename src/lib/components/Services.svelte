<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import cardImageOne from '$lib/assets/images/row-1-column-1.png';
	import cardImageTwo from '$lib/assets/images/row-1-column-2.png';
	import cardImageThree from '$lib/assets/images/row-1-column-3.png';

	const services = [
		{
			id: '01',
			title: ['Product &', 'Visual Design'],
			description:
				'Crafting intuitive and engaging user experiences through research-driven design and visual storytelling. I bring ideas to life with pixel-perfect precision.'
		},
		{
			id: '02',
			title: ['Frontend', 'Engineering'],
			description:
				'Building robust, scaleable applications using modern technologies like React, Svelte, and GSAP. Bridge the gap between design and code seamlessly.'
		},
		{
			id: '03',
			title: ['Web3', 'Interfaces'],
			description:
				'Designing and developing seamless interfaces for decentralized applications. Making complex blockchain interactions feel simple and intuitive.'
		}
	];

	let cardContainer: HTMLElement;
	let stickyHeader: HTMLElement;
	let stickySection: HTMLElement;
	let cardOne: HTMLElement;
	let cardTwo: HTMLElement;
	let cardThree: HTMLElement;

	let isGapAnimationCompleted = false;
	let isFlipAnimationCompleted = false;
	let resizeTimer: number;
	let servicesScrollTrigger: ScrollTrigger | null = null;

	function initAnimation() {
		// Kill only THIS component's scroll trigger
		if (servicesScrollTrigger) {
			servicesScrollTrigger.kill();
			servicesScrollTrigger = null;
		}

		const mm = gsap.matchMedia();

		mm.add('(max-width: 999px)', () => {
			// Clear any GSAP-applied styles on mobile to prevent conflicts with CSS
			if (stickyHeader) gsap.set(stickyHeader, { clearProps: 'all' });
			gsap.set([cardOne, cardTwo, cardThree], { clearProps: 'all' });
		});

		mm.add('(min-width: 1000px)', () => {
			servicesScrollTrigger = ScrollTrigger.create({
				trigger: stickySection,
				start: 'top top',
				end: `+=${window.innerHeight * 4}px`,
				pin: true,
				pinSpacing: true,
				scrub: 1,
				onUpdate: (self) => {
					const progress = self.progress;

					if (progress >= 0.1 && progress <= 0.25) {
						// Map raw progress (0.1 to 0.25) to a clean 0 to 1 range
						const headerProgress = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);
						const yValue = gsap.utils.mapRange(0, 1, 80, 0, headerProgress);
						const opacityValue = gsap.utils.mapRange(0, 1, 0, 1, headerProgress);

						gsap.set(stickyHeader, {
							y: yValue,
							opacity: opacityValue
						});
					} else if (progress < 0.1) {
						gsap.set(stickyHeader, { y: 80, opacity: 0 });
					} else if (progress > 0.25) {
						gsap.set(stickyHeader, { y: 0, opacity: 1 });
					}

					if (progress <= 0.25) {
						const widthPercentage = gsap.utils.mapRange(0, 0.25, 75, 60, progress);
						gsap.set(cardContainer, { width: `${widthPercentage}%` });
					} else {
						gsap.set(cardContainer, { width: '60%' });
					}

					if (progress >= 0.35 && !isGapAnimationCompleted) {
						gsap.to(cardContainer, {
							gap: '20px',
							duration: 0.5,
							ease: 'power3.out'
						});

						gsap.to([cardOne, cardTwo, cardThree], {
							borderRadius: '20px',
							duration: 0.5,
							ease: 'power3.out'
						});

						isGapAnimationCompleted = true;
					} else if (progress < 0.35 && isGapAnimationCompleted) {
						gsap.to(cardContainer, {
							gap: '0px',
							duration: 0.5,
							ease: 'power3.out'
						});

						gsap.to(cardOne, {
							borderRadius: '20px 0px 0px 20px',
							duration: 0.5,
							ease: 'power3.out'
						});

						gsap.to(cardTwo, {
							borderRadius: '0px',
							duration: 0.5,
							ease: 'power3.out'
						});

						gsap.to(cardThree, {
							borderRadius: '0px 20px 20px 0px',
							duration: 0.5,
							ease: 'power3.out'
						});

						isGapAnimationCompleted = false;
					}

					if (progress >= 0.7 && !isFlipAnimationCompleted) {
						gsap.to([cardOne, cardTwo, cardThree], {
							rotationY: 180,
							duration: 0.44,
							ease: 'power3.inOut',
							stagger: 0.26
						});

						gsap.to([cardOne, cardThree], {
							y: 30,
							rotateZ: (i) => [-15, 15][i],
							duration: 0.44,
							ease: 'power3.inOut'
						});

						isFlipAnimationCompleted = true;
					} else if (progress < 0.7 && isFlipAnimationCompleted) {
						gsap.to([cardOne, cardTwo, cardThree], {
							rotationY: 0,
							duration: 0.44,
							ease: 'power3.inOut',
							stagger: -0.26
						});

						gsap.to([cardOne, cardThree], {
							y: 0,
							rotateZ: 0,
							duration: 0.44,
							ease: 'power3.inOut'
						});

						isFlipAnimationCompleted = false;
					}
				}
			});
		});
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		initAnimation();

		// Handle resize
		const handleResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(() => {
				initAnimation();
			}, 250);
		};
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			if (servicesScrollTrigger) {
				servicesScrollTrigger.kill();
			}
		};
	});
</script>

<section class="sticky" bind:this={stickySection}>
	<div class="sticky-header">
		<h1 bind:this={stickyHeader}>SERVICES I PROVIDE</h1>
	</div>
	<div class="card-container" bind:this={cardContainer}>
		<div class="card" id="card-1" bind:this={cardOne}>
			<div class="card-front">
				<img src={cardImageOne} alt={services[0].title.join(' ')} />
			</div>
			<div class="card-back">
				<span>({services[0].id})</span>
				<p class="service-title">{@html services[0].title.join('<br>')}</p>
				<p class="service-description">{services[0].description}</p>
			</div>
		</div>
		<div class="card" id="card-2" bind:this={cardTwo}>
			<div class="card-front">
				<img src={cardImageTwo} alt={services[1].title.join(' ')} />
			</div>
			<div class="card-back">
				<span>({services[1].id})</span>
				<p class="service-title">{@html services[1].title.join('<br>')}</p>
				<p class="service-description">{services[1].description}</p>
			</div>
		</div>
		<div class="card" id="card-3" bind:this={cardThree}>
			<div class="card-front">
				<img src={cardImageThree} alt={services[2].title.join(' ')} />
			</div>
			<div class="card-back">
				<span>({services[2].id})</span>
				<p class="service-title">{@html services[2].title.join('<br>')}</p>
				<p class="service-description">{services[2].description}</p>
			</div>
		</div>
	</div>
</section>

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 1;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		font-family: var(--font-heading);
	}

	p {
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.2;
	}

	section {
		position: relative;
		width: 100%;
		height: 100vh;
		background-color: var(--color-bg);
		color: var(--color-text);
	}

	.sticky {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sticky-header {
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.sticky-header h1 {
		position: relative;
		text-align: center;
		will-change: transform, opacity;
		transform: translateY(40px);
		opacity: 0;
	}

	.card-container {
		position: relative;
		width: 75%;
		display: flex;
		perspective: 1000px;
		transform: translateY(40px);
		will-change: width;
	}

	.card {
		position: relative;
		flex: 1;
		aspect-ratio: 5/7;
		transform-style: preserve-3d;
		transform-origin: top;
	}

	#card-1 {
		border-radius: 20px 0 0 20px;
	}

	#card-3 {
		border-radius: 0 20px 20px 0;
	}

	.card-front,
	.card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		border-radius: inherit;
		overflow: hidden;
	}

	.card-back {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		transform: rotateY(180deg);
		padding: 2rem;
	}

	#card-1 .card-back {
		background-color: #e8e3d5;
		color: #1a1a1a;
	}

	#card-2 .card-back {
		background-color: #1a1a1a;
		color: #ffffff;
	}

	#card-3 .card-back {
		background-color: #2e4a3d;
		color: #e8f4ea;
	}

	.card-back span {
		position: absolute;
		top: 2rem;
		left: 2rem;
		opacity: 0.4;
		font-size: 1rem;
	}

	.service-title {
		font-family: var(--font-heading);
		font-size: 1.8rem;
		font-weight: 800;
		text-transform: uppercase;
		line-height: 1.1;
		margin-bottom: 1.5rem;
	}

	.service-description {
		font-family: var(--font-body);
		font-size: 0.7rem;
		line-height: 1.4;
		text-transform: uppercase;
		max-width: 85%;
		font-weight: 500;
		opacity: 0.85;
	}

	@media (max-width: 1000px) {
		h1 {
			font-size: 2rem;
		}

		.sticky {
			height: auto;
			padding: 4rem 2rem;
			flex-direction: column;
		}

		.sticky-header {
			position: relative;
			top: 0;
			left: 0;
			transform: none;
			margin-bottom: 4rem;
		}

		.sticky-header h1 {
			width: 100%;
			transform: none !important;
			opacity: 1 !important;
		}

		.card-container {
			width: 100%;
			flex-direction: column;
			gap: 2rem;
			transform: none;
		}

		.card {
			width: 100%;
			max-width: 400px;
			margin: 0 auto;
			border-radius: 20px !important;
		}

		#card-1,
		#card-2,
		#card-3 {
			transform: rotateY(180deg) !important;
		}

		.service-title {
			display: block;
			font-family: var(--font-heading);
			font-size: 1.3rem;
			font-weight: 800;
			text-transform: none;
			margin-bottom: 0.75rem;
			text-align: left;
		}

		.card-back {
			text-align: left;
			align-items: flex-start;
			justify-content: flex-start;
			padding: 2.5rem 1.5rem 1.5rem;
		}

		.service-description {
			font-family: var(--font-body);
			font-size: 1rem;
			line-height: 1.5;
			text-transform: none;
			max-width: 100%;
			opacity: 0.95;
		}

		.card-back span {
			top: 1rem;
			left: 1.5rem;
		}
	}
</style>
