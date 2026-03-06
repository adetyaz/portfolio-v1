<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import { lenisStore } from '$lib/stores/lenis';

	import Lottie, { type AnimationItem } from 'lottie-web';
	import toggleJson from '$lib/assets/lottie/Toogle.json';

	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let isMenuOpen = $state(false);
	let lottieContainer: HTMLElement;
	let toggleAnim: AnimationItem | undefined;
	let lottieReady = $state(false);
	let lastTheme = $state($theme);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function handleNavClick(e: MouseEvent, target: string) {
		isMenuOpen = false;

		if (target.startsWith('#')) {
			e.preventDefault();
			const element = document.querySelector(target) as HTMLElement;
			if (element) {
				$lenisStore?.scrollTo(element);
			}
		}
	}

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		// Initialize Lottie
		if (lottieContainer) {
			toggleAnim = Lottie.loadAnimation({
				container: lottieContainer,
				renderer: 'svg',
				loop: false,
				autoplay: false,
				animationData: toggleJson
			});

			toggleAnim.addEventListener('DOMLoaded', () => {
				lottieReady = true;
				// Set initial frame correctly
				if ($theme === 'dark') {
					toggleAnim.goToAndStop(toggleAnim.totalFrames - 1, true);
				} else {
					toggleAnim.goToAndStop(0, true);
				}
			});
		}
	});

	// Reactive Lottie synchronization
	$effect(() => {
		if (lottieReady && toggleAnim && $theme !== lastTheme) {
			const totalFrames = toggleAnim.totalFrames;
			if ($theme === 'dark') {
				toggleAnim.playSegments([0, totalFrames - 1], true);
			} else {
				toggleAnim.playSegments([totalFrames - 1, 0], true);
			}
			lastTheme = $theme;
		}
	});

	async function toggleTheme(event: MouseEvent) {
		const x = event.clientX;
		const y = event.clientY;
		const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

		// Note: Animation logic is handled reactively by the $effect above

		// @ts-ignore
		if (!document.startViewTransition) {
			$theme = $theme === 'light' ? 'dark' : 'light';
			return;
		}

		// @ts-ignore
		const transition = document.startViewTransition(() => {
			$theme = $theme === 'light' ? 'dark' : 'light';
		});

		await transition.ready;

		document.documentElement.animate(
			{
				clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
			},
			{
				duration: 600,
				easing: 'ease-in-out',
				pseudoElement: '::view-transition-new(root)'
			}
		);
	}
</script>

<header class="header">
	<div class="logo">AL</div>

	<button class="menu-toggle" onclick={toggleMenu}>
		{isMenuOpen ? 'Close' : 'Menu'}
	</button>

	<nav class="nav {isMenuOpen ? 'open' : ''}">
		<a href="#about" onclick={(e) => handleNavClick(e, '#about')}>About</a>
		<a href="/#work" onclick={(e) => handleNavClick(e, '#work')}>Work</a>
		<a href="/#contact" onclick={(e) => handleNavClick(e, '#contact')}>Contact</a>
		<button onclick={toggleTheme} class="theme-toggle" aria-label="Toggle Theme">
			<div class="toggle-tooltip">
				{$theme === 'dark'
					? 'Click me if you want to see the light'
					: 'Click me if you want to see the dark'}
			</div>
			<div class="toggle-icon" bind:this={lottieContainer}></div>
		</button>
	</nav>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 4rem;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.logo {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.nav {
		display: flex;
		gap: 2rem;
		font-family: var(--font-body);
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		align-items: center; /* Precise vertical alignment for desktop */
	}

	.nav a {
		position: relative;
		transition: color 0.3s ease;
		display: flex;
		align-items: center;
		height: 48px; /* Standardize height for perfect alignment context */
		padding: 0 0.2rem;
	}

	.nav a::after {
		content: '';
		position: absolute;
		bottom: 12px; /* Positioned relative to the standardized box */
		left: 0;
		width: 0;
		height: 1px;
		background-color: currentColor;
		transition: width 0.3s ease;
	}

	.nav a:hover::after {
		width: 100%;
	}

	.theme-toggle {
		background: none;
		border: none;
		color: inherit;
		cursor: pointer;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 48px; /* Matches Nav A height exactly */
		transition: transform 0.3s ease;
		position: relative; /* Context for tooltip */
	}

	.theme-toggle:hover {
		transform: scale(1.1); /* "Click me" indicator */
	}

	.toggle-tooltip {
		position: absolute;
		top: 130%;
		right: 0;
		background: var(--color-text);
		color: var(--color-bg);
		padding: 0.5rem 1rem;
		border-radius: 8px;
		font-size: 0.7rem;
		font-weight: 600;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transform: translateY(-10px);
		transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		z-index: 100;
	}

	.theme-toggle:hover .toggle-tooltip {
		opacity: 1;
		transform: translateY(0);
		transition-delay: 0.2s;
	}

	.toggle-tooltip::after {
		content: '';
		position: absolute;
		bottom: 100%;
		right: 15px;
		border-width: 6px;
		border-style: solid;
		border-color: transparent transparent var(--color-text) transparent;
	}

	.toggle-icon {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Mobile Menu Toggle */
	.menu-toggle {
		display: none;
		background: none;
		border: none;
		color: inherit;
		font-family: var(--font-heading);
		font-size: 1.2rem;
		text-transform: uppercase;
		cursor: pointer;
		position: relative; /* Essential for z-index */
		z-index: 20;
	}

	@media (max-width: 768px) {
		.header {
			padding: 1.5rem;
			position: fixed; /* Keep header visible/interactive at all times on mobile */
			z-index: 50; /* Ensure header content is above everything */
		}

		.menu-toggle {
			display: block;
			/* No extra z-index needed if header is high, but keeping relative for safety */
			position: relative;
			z-index: 60; /* Higher than nav */
		}

		.nav {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100dvh;
			background-color: var(--color-bg);
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			padding-top: 8rem;
			gap: 3rem;
			font-size: 2.5rem;
			font-weight: 300;
			transform: translateY(-100%) !important; /* Force override of any lingering JS styles */
			transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
			z-index: 40; /* Below toggle but above page content */
			backdrop-filter: blur(10px);
		}

		.nav.open {
			transform: translateY(0) !important;
		}
	}
</style>
