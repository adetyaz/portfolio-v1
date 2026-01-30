<script lang="ts">
	import { onMount } from 'svelte';

	let loading = true;
	let isPlaying = false;
	let song: any = null;

	onMount(async () => {
		try {
			const res = await fetch('/api/now-playing');
			const data = await res.json();
			isPlaying = data.isPlaying;
			song = data;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	});
</script>

{#if !loading && isPlaying}
	<a href={song.songUrl} target="_blank" rel="noopener noreferrer" class="spotify-widget">
		<div class="icon-container">
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="spotify-icon"
			>
				<path
					d="M12 0C5.37293 0 0 5.37248 0 12C0 18.6275 5.37293 24 12 24C18.6271 24 24 18.6275 24 12C24 5.37248 18.6271 0 12 0ZM17.5255 17.3061C17.2038 17.817 16.5398 17.9715 16.0354 17.6534C13.2954 15.9687 9.84594 15.6565 5.8 16.5828C5.22858 16.7115 4.66444 16.3496 4.53239 15.7791C4.40263 15.2079 4.76319 14.6393 5.33233 14.5098C9.8803 13.4687 13.7547 13.8427 16.8856 15.7709C17.3916 16.0827 17.5508 16.7485 17.5255 17.3061ZM18.9959 14.0321C18.6015 14.6548 17.7818 14.8569 17.1517 14.471C14.0336 12.5539 9.32448 12.0003 5.62002 13.1259C4.91897 13.3421 4.17237 12.9463 3.95152 12.2475C3.73142 11.5434 4.13576 10.8012 4.83296 10.5824C9.17223 9.27116 14.4287 9.91034 18.0645 12.1462C18.6879 12.5338 18.8911 13.3501 18.9959 14.0321ZM19.1466 10.6358C15.2536 8.32479 8.89209 8.11306 5.21557 9.23126C4.62534 9.40871 4.00845 9.07434 3.82424 8.48493C3.64003 7.89304 3.97439 7.27533 4.5638 7.09355C8.80784 5.79979 15.8454 6.03714 20.3235 8.69482C20.8528 9.00659 21.0315 9.68953 20.7134 10.2224C20.3953 10.7517 19.7099 10.926 19.1466 10.6358Z"
					fill="#1DB954"
				/>
			</svg>
		</div>
		<div class="info">
			<div class="label">Now Playing</div>
			<div class="track">{song.title}</div>
			<div class="artist">{song.artist}</div>
		</div>
		<!-- Equalizer animation -->
		<div class="equalizer">
			<span class="bar b1"></span>
			<span class="bar b2"></span>
			<span class="bar b3"></span>
			<span class="bar b4"></span>
		</div>
	</a>
{/if}

<style>
	.spotify-widget {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1.5rem;
		background-color: var(--color-bg-alt, #f4f4f0);
		border-radius: 999px;
		text-decoration: none;
		color: var(--color-text);
		font-family: var(--font-body);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		border: 1px solid transparent;
	}

	.spotify-widget:hover {
		transform: translateY(-2px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
		border-color: rgba(0, 0, 0, 0.05);
		background-color: #fff;
	}

	.spotify-icon {
		width: 1.5rem;
		height: 1.5rem;
	}

	.info {
		display: flex;
		flex-direction: column;
		line-height: 1.1;
	}

	.label {
		font-size: 0.6rem;
		text-transform: uppercase;
		color: #999;
		font-weight: 700;
		margin-bottom: 2px;
	}

	.track {
		font-size: 0.8rem;
		font-weight: 700;
		max-width: 150px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.artist {
		font-size: 0.75rem;
		color: #666;
		max-width: 150px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.equalizer {
		display: flex;
		align-items: flex-end;
		gap: 2px;
		height: 12px;
		margin-left: 0.5rem;
	}

	.bar {
		width: 2px;
		background-color: #1db954;
		animation: equalizer 1s ease-in-out infinite;
	}

	.b1 {
		animation-duration: 0.8s;
		height: 6px;
	}
	.b2 {
		animation-duration: 1.1s;
		height: 10px;
	}
	.b3 {
		animation-duration: 0.9s;
		height: 4px;
	}
	.b4 {
		animation-duration: 1.2s;
		height: 8px;
	}

	@keyframes equalizer {
		0% {
			height: 2px;
		}
		50% {
			height: 100%;
		}
		100% {
			height: 2px;
		}
	}

	@media (max-width: 480px) {
		.label {
			display: none;
		}

		.track,
		.artist {
			max-width: 100px;
		}
	}
</style>
