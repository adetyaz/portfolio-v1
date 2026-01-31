<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { gsap } from '$lib/gsap';

	let { oncomplete }: { oncomplete?: () => void } = $props();

	// Progress store
	const progress = tweened(0, {
		duration: 3500, // Slightly longer to accommodate quote reveal
		easing: cubicOut
	});

	let container = $state<HTMLElement>();
	let quoteFinished = false;

	const quoteLines = [
		'where must we go...',
		'we who wander this wasteland',
		'in search of our better selves'
	];

	onMount(() => {
		// Prevent scrolling during load
		document.body.style.overflow = 'hidden';

		// Start counting
		progress.set(100);

		// Animate Quote
		const tl = gsap.timeline({
			onComplete: () => {
				quoteFinished = true;
				checkCompletion();
			}
		});

		const lines = document.querySelectorAll('.preloader-quote-line');
		lines.forEach((line, i) => {
			const block = line.querySelector('.reveal-block-quote');
			const text = line.querySelector('.reveal-text-quote');

			// Slow block reveal
			tl.to(
				block,
				{
					scaleX: 1,
					duration: 0.8,
					ease: 'power3.inOut'
				},
				i === 0 ? '+=0.5' : '-=0.4'
			);

			tl.set(text, { opacity: 1 });

			tl.to(block, {
				scaleX: 0,
				transformOrigin: 'right',
				duration: 0.8,
				ease: 'power3.inOut'
			});
		});

		// Monitor progress for completion
		const unsubscribe = progress.subscribe((value) => {
			if (value === 100) {
				checkCompletion();
			}
		});

		return () => {
			unsubscribe();
			document.body.style.overflow = '';
		};
	});

	function checkCompletion() {
		// Only exit when both counter is 100% and quote is done
		if (Math.floor($progress) === 100 && quoteFinished) {
			finishLoading();
		}
	}

	function finishLoading() {
		if (!container) return;

		const tl = gsap.timeline({
			onComplete: () => {
				document.body.style.overflow = '';
			}
		});

		// Start hero animation as preloader begins its exit
		if (oncomplete) oncomplete();

		// Slide up curtain
		tl.to(container, {
			yPercent: -100,
			duration: 1.2,
			ease: 'power4.inOut',
			delay: 0.2 // Small hold at 100%
		});
	}
</script>

<div class="preloader" bind:this={container}>
	<div class="preloader-content">
		<div class="preloader-quote">
			{#each quoteLines as line}
				<div class="preloader-quote-line">
					<span class="reveal-text-quote">{line}</span>
					<div class="reveal-block-quote"></div>
				</div>
			{/each}
		</div>
	</div>

	<div class="counter">
		{Math.floor($progress)}%
	</div>
</div>

<style>
	.preloader {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: var(--color-bg);
		color: var(--color-text);
		z-index: 9999;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: clamp(1.5rem, 5vw, 4rem); /* Responsive padding */
	}

	.preloader-content {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center; /* Center content on small screens, left-align if needed elsewhere */
	}

	.preloader-quote {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		font-family: var(--font-body);
		font-size: clamp(0.8rem, 4vw, 1.5rem); /* More aggressive scaling */
		text-transform: uppercase;
		letter-spacing: 0.2em;
		opacity: 0.9;
		text-align: center; /* Better for mobile centering */
	}

	.preloader-quote-line {
		position: relative;
		overflow: hidden;
		display: inline-block;
		padding: 0.2rem 0.4rem;
	}

	.reveal-text-quote {
		display: inline-block;
		white-space: normal; /* Allow wrapping if absolutely necessary, though nowrap is cleaner for blocks */
		opacity: 0; /* Hidden by default to prevent flash */
	}

	.reveal-block-quote {
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

	.counter {
		position: absolute;
		bottom: 1.5rem;
		right: 1.5rem;
		font-family: var(--font-heading, sans-serif);
		font-size: clamp(3rem, 12vw, 10rem); /* Slightly smaller for better fit */
		font-weight: 700;
		line-height: 1;
		margin: 0;
		opacity: 0.1;
		pointer-events: none;
	}

	@media (max-width: 600px) {
		.preloader-content {
			justify-content: center;
		}

		.preloader-quote {
			font-size: 0.75rem;
			letter-spacing: 0.15em;
		}

		.counter {
			bottom: 1rem;
			right: 1rem;
			font-size: 4rem;
		}
	}
</style>
