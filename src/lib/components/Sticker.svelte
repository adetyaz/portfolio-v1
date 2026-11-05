<script lang="ts">
	import type { Snippet } from 'svelte';

	type Color = 'marigold' | 'mint' | 'bubblegum' | 'cobalt' | 'peach' | 'paper';

	let {
		color = 'marigold',
		rotate = 0,
		hand = false,
		draggable = true,
		class: cls = '',
		children
	}: {
		color?: Color;
		rotate?: number;
		hand?: boolean;
		draggable?: boolean;
		class?: string;
		children: Snippet;
	} = $props();

	let dx = $state(0);
	let dy = $state(0);
	let dragging = $state(false);
	let start = { x: 0, y: 0, dx: 0, dy: 0 };

	function down(e: PointerEvent) {
		if (!draggable || e.button !== 0) return;
		dragging = true;
		start = { x: e.clientX, y: e.clientY, dx, dy };
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}
	function move(e: PointerEvent) {
		if (!dragging) return;
		dx = start.dx + e.clientX - start.x;
		dy = start.dy + e.clientY - start.y;
	}
	function up() {
		dragging = false;
	}
	function reset() {
		dx = 0;
		dy = 0;
	}
</script>

<span
	class="sticker {color} {cls}"
	class:hand
	class:dragging
	class:can-drag={draggable}
	style:--r="{rotate}deg"
	style:translate="{dx}px {dy}px"
	onpointerdown={down}
	onpointermove={move}
	onpointerup={up}
	onpointercancel={up}
	ondblclick={reset}
	role={draggable ? 'presentation' : undefined}
>
	{@render children()}
</span>

<style>
	.sticker {
		--bg: var(--marigold);
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		padding: 0.32em 0.7em 0.36em;
		font-family: var(--f-mono);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.02em;
		color: var(--sticker-ink);
		background: var(--bg);
		border-radius: 6px;
		box-shadow:
			0 1px 0 rgba(0, 0, 0, 0.12),
			0 6px 14px -8px rgba(0, 0, 0, 0.45);
		rotate: var(--r);
		white-space: nowrap;
		user-select: none;
		touch-action: none;
		transition:
			rotate 0.35s var(--ease-spring),
			scale 0.25s var(--ease-spring),
			box-shadow 0.25s ease;
	}
	.sticker.hand {
		font-family: var(--f-hand);
		font-size: 17px;
		font-weight: 700;
		letter-spacing: 0;
		padding: 0.15em 0.6em 0.2em;
	}
	.can-drag {
		cursor: grab;
	}
	.can-drag:hover {
		rotate: calc(var(--r) * -1);
		scale: 1.05;
	}
	.dragging {
		cursor: grabbing;
		scale: 1.1;
		rotate: calc(var(--r) + 4deg);
		box-shadow:
			0 2px 0 rgba(0, 0, 0, 0.1),
			0 18px 30px -12px rgba(0, 0, 0, 0.5);
		z-index: 50;
		position: relative;
	}
	.marigold {
		--bg: var(--marigold);
	}
	.mint {
		--bg: var(--mint);
	}
	.bubblegum {
		--bg: var(--bubblegum);
	}
	.cobalt {
		--bg: var(--cobalt);
		color: #fff;
	}
	.peach {
		--bg: var(--peach);
	}
	.paper {
		--bg: #fbfbf9;
	}
</style>
