<!-- Ported from svelte-bits RotatingText: per-character spring swap, staggered from the end. -->
<script lang="ts">
	import { animate } from 'motion';
	import { untrack } from 'svelte';

	let {
		texts,
		interval = 2400,
		stagger = 0.025,
		class: cls = ''
	}: { texts: string[]; interval?: number; stagger?: number; class?: string } = $props();

	let index = $state(0);
	let chars: HTMLSpanElement[] = $state([]);
	const current = $derived(Array.from(texts[index]));

	async function swap() {
		const nodes = chars.filter(Boolean);
		const n = nodes.length;
		await Promise.all(
			nodes.map(
				(node, i) =>
					animate(node, { y: '-120%', opacity: 0 }, { type: 'spring', damping: 25, stiffness: 300, delay: (n - 1 - i) * stagger })
						.finished
			)
		);
		index = (index + 1) % texts.length;
	}

	$effect(() => {
		const len = current.length;
		const nodes = untrack(() => chars.slice(0, len).filter(Boolean));
		const n = nodes.length;
		nodes.forEach((node, i) => {
			node.style.transform = 'translateY(100%)';
			node.style.opacity = '0';
			animate(node, { y: 0, opacity: 1 }, { type: 'spring', damping: 25, stiffness: 300, delay: (n - 1 - i) * stagger });
		});
	});

	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const id = setInterval(swap, interval);
		return () => clearInterval(id);
	});
</script>

<span class="rot {cls}">
	<span class="sr-only">{texts[index]}</span>
	<span class="track" aria-hidden="true">
		{#key index}
			{#each current as ch, i (i)}
				<span class="ch" bind:this={chars[i]}>{ch === ' ' ? ' ' : ch}</span>
			{/each}
		{/key}
	</span>
</span>

<style>
	.rot {
		display: inline-flex;
		vertical-align: bottom;
	}
	.track {
		display: inline-flex;
		overflow: hidden;
		padding-bottom: 0.08em;
	}
	.ch {
		display: inline-block;
		will-change: transform;
	}
</style>
