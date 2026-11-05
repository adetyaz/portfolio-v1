<!-- Floating screenshot that trails the cursor while a work row is hovered. Fine pointers only. -->
<script lang="ts">
	let { src = null }: { src?: string | null } = $props();

	let x = 0;
	let y = 0;
	let tx = 0;
	let ty = 0;
	let el: HTMLDivElement | undefined = $state();
	let raf = 0;
	let enabled = $state(false);
	let last = $state<string | null>(null);

	$effect(() => {
		enabled =
			window.matchMedia('(pointer: fine)').matches &&
			!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	$effect(() => {
		if (src) last = src;
	});

	function move(e: PointerEvent) {
		tx = e.clientX;
		ty = e.clientY;
		if (!raf) raf = requestAnimationFrame(tick);
	}

	function tick() {
		x += (tx - x) * 0.16;
		y += (ty - y) * 0.16;
		const tilt = Math.max(-8, Math.min(8, (tx - x) * 0.08));
		if (el) el.style.transform = `translate(${x + 24}px, ${y - 90}px) rotate(${tilt}deg)`;
		raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(tick) : 0;
	}
</script>

<svelte:window onpointermove={enabled ? move : undefined} />

{#if enabled}
	<div class="preview" class:on={!!src} bind:this={el} aria-hidden="true">
		{#if last}<img src={last} alt="" />{/if}
	</div>
{/if}

<style>
	.preview {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 30;
		width: 280px;
		pointer-events: none;
		opacity: 0;
		scale: 0.85;
		transition:
			opacity 0.25s var(--ease),
			scale 0.35s var(--spring);
	}
	.preview.on {
		opacity: 1;
		scale: 1;
	}
	img {
		width: 100%;
		aspect-ratio: 16 / 10;
		object-fit: cover;
		object-position: top;
		border-radius: 6px;
		box-shadow: 0 24px 48px -20px rgba(0, 0, 0, 0.45);
	}
</style>
