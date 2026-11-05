<!-- Ported from svelte-bits CircularText: text on a ring that speeds up on hover. -->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		text,
		size = 116,
		spin = 18,
		children
	}: { text: string; size?: number; spin?: number; children?: Snippet } = $props();

	const letters = $derived(Array.from(text));
	let fast = $state(false);
</script>

<span
	class="ring"
	class:fast
	style:--size="{size}px"
	style:--spin="{spin}s"
	onmouseenter={() => (fast = true)}
	onmouseleave={() => (fast = false)}
	role="presentation"
>
	<span class="letters" aria-hidden="true">
		{#each letters as l, i (i)}
			<span style:rotate="{(360 / letters.length) * i}deg">{l}</span>
		{/each}
	</span>
	<span class="sr-only">{text}</span>
	{#if children}<span class="core">{@render children()}</span>{/if}
</span>

<style>
	.ring {
		position: relative;
		display: grid;
		place-items: center;
		width: var(--size);
		height: var(--size);
	}
	.letters {
		position: absolute;
		inset: 0;
		animation: spin var(--spin) linear infinite;
		transition: scale 0.4s var(--ease-spring);
	}
	.fast .letters {
		animation-duration: calc(var(--spin) / 4);
		scale: 1.06;
	}
	.letters span {
		position: absolute;
		left: 50%;
		top: 0;
		height: 50%;
		translate: -50% 0;
		transform-origin: bottom center;
		font-family: var(--f-mono);
		font-size: 10px;
		font-weight: 700;
		color: var(--ink);
	}
	.core {
		display: grid;
		place-items: center;
	}
	@keyframes spin {
		to {
			rotate: 360deg;
		}
	}
</style>
