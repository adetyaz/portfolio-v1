<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { gsap, Draggable } from '$lib/gsap';
	import Lottie from 'lottie-web';
	import speakerLottie from '$lib/assets/lottie/Speaker.json';

	let loading = $state(true);
	let isPlaying = $state(false);
	let song = $state<any>(null);
	let interval: any;
	let widget = $state<HTMLElement | null>(null);
	let lottieContainer = $state<HTMLElement | null>(null);
	let lottieAnim: any = null;
	let isExpanded = $state(false);
	let expansionTimeout: any;

	const fetchNowPlaying = async () => {
		try {
			const res = await fetch('/api/now-playing');
			if (!res.ok) throw new Error('API request failed');

			const data = await res.json();
			if (data.debug) console.log('[Spotify Debug]:', data.debug);

			// Detect change in playing state to update Lottie
			if (isPlaying !== data.isPlaying) {
				isPlaying = data.isPlaying;
				loadStatusLottie();
			}

			song = data;
		} catch (e) {
			console.error('Spotify Fetch Error:', e);
			isPlaying = false;
		} finally {
			loading = false;
		}
	};

	function loadStatusLottie() {
		if (!lottieContainer) return;

		if (lottieAnim) {
			lottieAnim.destroy();
			lottieAnim = null;
		}

		// Only show Speaker Lottie when playing
		if (isPlaying) {
			try {
				lottieAnim = Lottie.loadAnimation({
					container: lottieContainer,
					renderer: 'svg',
					loop: true,
					autoplay: true,
					animationData: speakerLottie
				});
			} catch (e) {
				console.warn('Speaker Lottie initialization failed:', e);
			}
		}
	}

	onMount(() => {
		fetchNowPlaying();
		interval = setInterval(fetchNowPlaying, 10000);

		if (widget) {
			Draggable.create(widget, {
				type: 'x,y',
				edgeResistance: 0.65,
				bounds: window,
				inertia: true,
				onDragStart: () => {
					isExpanded = false; // Collapse while dragging
				}
			});
		}
	});

	onDestroy(() => {
		if (interval) clearInterval(interval);
		if (lottieAnim) lottieAnim.destroy();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_interactive_supports_focus -->
<div
	bind:this={widget}
	class="spotify-floating-pill {isExpanded ? 'expanded' : ''} {isPlaying ? 'playing' : 'offline'}"
	onmouseenter={() => {
		console.log('Widget hovered, tooltip should be visible now...');
		// Increased delay significantly to ensure tooltip is seen
		expansionTimeout = setTimeout(() => {
			console.log('Expanding widget now...');
			isExpanded = true;
		}, 1500);
	}}
	onmouseleave={() => {
		console.log('Widget left, collapsing...');
		clearTimeout(expansionTimeout);
		isExpanded = false;
	}}
	role="button"
	tabindex="0"
>
	<div class="tooltip">I'm draggable! Toss me around! 🎾</div>
	<div class="pill-content">
		<div class="lottie-icon" bind:this={lottieContainer}>
			{#if !isPlaying}
				<!-- Spotify Icon when nothing is playing -->
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="spotify-icon">
					<path
						d="M12 0C5.37293 0 0 5.37248 0 12C0 18.6275 5.37293 24 12 24C18.6271 24 24 18.6275 24 12C24 5.37248 18.6271 0 12 0ZM17.5255 17.3061C17.2038 17.817 16.5398 17.9715 16.0354 17.6534C13.2954 15.9687 9.84594 15.6565 5.8 16.5828C5.22858 16.7115 4.66444 16.3496 4.53239 15.7791C4.40263 15.2079 4.76319 14.6393 5.33233 14.5098C9.8803 13.4687 13.7547 13.8427 16.8856 15.7709C17.3916 16.0827 17.5508 16.7485 17.5255 17.3061ZM18.9959 14.0321C18.6015 14.6548 17.7818 14.8569 17.1517 14.471C14.0336 12.5539 9.32448 12.0003 5.62002 13.1259C4.91897 13.3421 4.17237 12.9463 3.95152 12.2475C3.73142 11.5434 4.13576 10.8012 4.83296 10.5824C9.17223 9.27116 14.4287 9.91034 18.0645 12.1462C18.6879 12.5338 18.8911 13.3501 18.9959 14.0321ZM19.1466 10.6358C15.2536 8.32479 8.89209 8.11306 5.21557 9.23126C4.62534 9.40871 4.00845 9.07434 3.82424 8.48493C3.64003 7.89304 3.97439 7.27533 4.5638 7.09355C8.80784 5.79979 15.8454 6.03714 20.3235 8.69482C20.8528 9.00659 21.0315 9.68953 20.7134 10.2224C20.3953 10.7517 19.7099 10.926 19.1466 10.6358Z"
						fill="#1DB954"
					/>
				</svg>
			{/if}
		</div>

		<div class="expand-content">
			{#if loading}
				<span class="loading-text">Connecting...</span>
			{:else if isPlaying && song}
				<div class="song-info">
					<span class="title">{song.title}</span>
					<span class="artist">{song.artist}</span>
				</div>
			{:else}
				<div class="song-info">
					<span class="title">Nothing is playing</span>
					<span class="artist">comeback later</span>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.spotify-floating-pill {
		position: fixed;
		bottom: 2rem;
		left: 2rem;
		z-index: 1000;
		background: var(--color-bg);
		opacity: 0.95;
		backdrop-filter: blur(10px);
		border: 1px solid var(--color-border);
		border-radius: 40px;
		cursor: grab;
		overflow: visible; /* CRITICAL for tooltip */
		transition:
			width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			background 0.3s ease;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	}

	.spotify-floating-pill.playing {
		border-color: rgba(29, 185, 84, 0.3);
	}

	.spotify-floating-pill:active {
		cursor: grabbing;
	}

	.spotify-floating-pill.expanded {
		width: 240px;
		background: var(--color-bg-alt);
		padding-right: 1.5rem;
	}

	.pill-content {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 0 13px;
		pointer-events: none;
		/* overflow: hidden removed from here too as it might clip the tooltip if it's near the edge */
		border-radius: inherit;
	}

	.lottie-icon {
		width: 24px;
		height: 24px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.expand-content {
		margin-left: 1rem;
		display: flex;
		flex-direction: column;
		opacity: 0;
		transform: translateX(-10px);
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
		white-space: nowrap;
		overflow: hidden;
		pointer-events: none;
	}

	.expanded .expand-content {
		opacity: 1;
		transform: translateX(0);
	}

	.song-info {
		display: flex;
		flex-direction: column;
		line-height: 1.2;
	}

	.title {
		font-size: 0.85rem;
		font-weight: 700;
		color: var(--color-text);
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 170px;
	}

	.artist {
		font-size: 0.7rem;
		opacity: 0.6;
		color: var(--color-text);
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 170px;
	}

	.loading-text {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-text);
		opacity: 0.7;
	}

	.spotify-icon {
		width: 24px;
		height: 24px;
	}

	:global(.theme-dark) .spotify-floating-pill {
		background: rgba(26, 26, 26, 0.8);
	}

	.tooltip {
		position: absolute;
		bottom: 75px;
		left: 0;
		background: #ff0000; /* BRIGHT RED TO PROVE IT WORKS */
		color: #ffffff;
		padding: 0.8rem 1.5rem;
		border-radius: 30px;
		font-size: 0.9rem;
		font-weight: 900;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		z-index: 999999; /* ABSOLUTELY ON TOP */
		transform: translateY(30px);
		transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8);
		border: 3px solid white;
		display: block !important;
	}

	.tooltip::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 20px;
		border-width: 6px;
		border-style: solid;
		border-color: var(--color-text) transparent transparent transparent;
	}

	.spotify-floating-pill:hover .tooltip {
		opacity: 1;
		transform: translateY(0);
		transition-delay: 0.1s;
	}

	/* Removed display: none for expanded tooltip */
</style>
