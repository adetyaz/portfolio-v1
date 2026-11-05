<script lang="ts">
	import { onMount } from 'svelte';
	import { game } from '$lib/game.svelte';
	import { contact } from '$lib/data/profile';

	const REAL = 'ADETAYO';
	const HANDLE = 'ADETYAZ';

	let text = $state(REAL);
	let clicks = 0;
	let landed = $state(false);
	let bump = $state<number | null>(null);

	function click() {
		clicks++;
		if (clicks === 5) {
			clicks = 0;
			text = HANDLE;
			game.unlock('name', 'That is my GitHub handle.');
			game.toast = game.toast && { ...game.toast, href: contact.github, linkText: 'github.com/adetyaz' };
			setTimeout(() => (text = REAL), 3200);
		} else {
			bump = clicks;
		}
	}

	onMount(() => {
		requestAnimationFrame(() => (landed = true));
	});
</script>

<div class="frame" class:landed>
	<button class="name pixel" onclick={click} aria-label="Adetayo">
		{#each text.split('') as ch, i (i + ch)}
			<span class="ch" style:--i={i} class:bump={bump !== null}>{ch}</span>
		{/each}
	</button>
	<span class="h tl"></span><span class="h tr"></span><span class="h bl"></span><span class="h br"></span>
	<span class="dims">Name · {text.length} letters</span>
</div>

<style>
	.frame {
		position: relative;
		display: inline-block;
		padding: 0.1em 0.18em 0.02em;
		border: 1.5px solid var(--coral);
		font-size: clamp(84px, 17vw, 196px);
	}
	.name {
		display: flex;
		font-size: 1em;
		line-height: 0.86;
		color: var(--ink);
		cursor: pointer;
		user-select: none;
	}
	.ch {
		display: inline-block;
		opacity: 0;
		translate: 0 -0.5em;
		transition:
			translate 0.55s var(--ease-spring) calc(var(--i) * 55ms + 150ms),
			opacity 0.3s ease calc(var(--i) * 55ms + 150ms),
			color 0.2s;
	}
	.landed .ch {
		opacity: 1;
		translate: 0 0;
	}
	.landed .ch:hover {
		translate: 0 -0.08em;
		transition-delay: 0s;
		transition-duration: 0.2s;
	}
	.ch:nth-child(7n + 1):hover {
		color: var(--bubblegum);
	}
	.ch:nth-child(7n + 2):hover {
		color: var(--cobalt);
	}
	.ch:nth-child(7n + 3):hover {
		color: var(--leaf);
	}
	.ch:nth-child(7n + 4):hover {
		color: var(--marigold);
	}
	.ch:nth-child(7n + 5):hover {
		color: var(--coral);
	}
	.ch:nth-child(7n + 6):hover {
		color: var(--bubblegum);
	}
	.ch:nth-child(7n):hover {
		color: var(--cobalt);
	}
	.name:active .ch {
		scale: 0.96;
	}

	.h {
		position: absolute;
		width: 8px;
		height: 8px;
		background: var(--paper);
		border: 1.5px solid var(--coral);
	}
	.tl {
		left: -5px;
		top: -5px;
	}
	.tr {
		right: -5px;
		top: -5px;
	}
	.bl {
		left: -5px;
		bottom: -5px;
	}
	.br {
		right: -5px;
		bottom: -5px;
	}
	.dims {
		position: absolute;
		left: 50%;
		bottom: -26px;
		translate: -50% 0;
		padding: 2px 6px;
		font-family: var(--f-mono);
		font-size: 10px;
		color: #fff;
		background: var(--coral);
		border-radius: 3px;
		white-space: nowrap;
		opacity: 0;
		scale: 0.9;
		transition:
			opacity 0.2s,
			scale 0.2s var(--ease-spring);
	}
	.frame:hover .dims {
		opacity: 1;
		scale: 1;
	}
</style>
