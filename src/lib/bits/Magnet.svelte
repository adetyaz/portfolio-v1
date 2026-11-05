<!-- Ported from svelte-bits Magnet. Skips touch devices and reduced motion. -->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		padding = 80,
		strength = 3
	}: { children: Snippet; padding?: number; strength?: number } = $props();

	let el: HTMLSpanElement;
	let active = $state(false);
	let pos = $state({ x: 0, y: 0 });

	$effect(() => {
		if (
			window.matchMedia('(pointer: coarse)').matches ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		)
			return;
		const handle = (e: MouseEvent) => {
			const { left, top, width, height } = el.getBoundingClientRect();
			const cx = left + width / 2;
			const cy = top + height / 2;
			if (Math.abs(cx - e.clientX) < width / 2 + padding && Math.abs(cy - e.clientY) < height / 2 + padding) {
				active = true;
				pos = { x: (e.clientX - cx) / strength, y: (e.clientY - cy) / strength };
			} else if (active) {
				active = false;
				pos = { x: 0, y: 0 };
			}
		};
		window.addEventListener('mousemove', handle);
		return () => window.removeEventListener('mousemove', handle);
	});
</script>

<span bind:this={el} class="magnet">
	<span
		class="inner"
		style:transform="translate3d({pos.x}px,{pos.y}px,0)"
		style:transition={active ? 'transform 0.3s ease-out' : 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)'}
	>
		{@render children()}
	</span>
</span>

<style>
	.magnet {
		position: relative;
		display: inline-block;
	}
	.inner {
		display: inline-block;
		will-change: transform;
	}
</style>
