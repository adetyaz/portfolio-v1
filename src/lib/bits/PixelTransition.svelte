<!-- Ported from svelte-bits PixelTransition: random pixel grid swaps two layers on hover/focus. -->
<script lang="ts">
	import { gsap } from 'gsap';
	import type { Snippet } from 'svelte';

	let {
		first,
		second,
		grid = 10,
		color = 'var(--marigold)',
		step = 0.32,
		active = false
	}: { first: Snippet; second: Snippet; grid?: number; color?: string; step?: number; active?: boolean } = $props();

	let gridEl: HTMLDivElement;
	let secondEl: HTMLDivElement;
	let shown = false;
	let call: gsap.core.Tween | null = null;

	const cells = $derived(Array.from({ length: grid * grid }, (_, i) => ({ r: Math.floor(i / grid), c: i % grid })));

	function run(on: boolean) {
		if (on === shown) return;
		shown = on;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) {
			secondEl.style.display = on ? 'block' : 'none';
			return;
		}
		const px = gridEl.querySelectorAll<HTMLElement>('.px');
		gsap.killTweensOf(px);
		call?.kill();
		gsap.set(px, { display: 'none' });
		const each = step / px.length;
		gsap.to(px, { display: 'block', duration: 0, stagger: { each, from: 'random' } });
		call = gsap.delayedCall(step, () => {
			secondEl.style.display = on ? 'block' : 'none';
		});
		gsap.to(px, { display: 'none', duration: 0, delay: step, stagger: { each, from: 'random' } });
	}

	$effect(() => {
		run(active);
	});
</script>

<div class="pt">
	<div class="layer">{@render first()}</div>
	<div class="layer second" bind:this={secondEl} style="display:none">{@render second()}</div>
	<div class="grid" bind:this={gridEl} aria-hidden="true">
		{#each cells as c (c.r * grid + c.c)}
			<span
				class="px"
				style:background={color}
				style:width="{100 / grid}%"
				style:height="{100 / grid}%"
				style:left="{(c.c * 100) / grid}%"
				style:top="{(c.r * 100) / grid}%"
			></span>
		{/each}
	</div>
</div>

<style>
	.pt {
		position: relative;
		overflow: hidden;
		border-radius: inherit;
	}
	.layer {
		width: 100%;
		height: 100%;
	}
	.second {
		position: absolute;
		inset: 0;
		z-index: 2;
	}
	.grid {
		position: absolute;
		inset: 0;
		z-index: 3;
		pointer-events: none;
	}
	.px {
		position: absolute;
		display: none;
	}
</style>
