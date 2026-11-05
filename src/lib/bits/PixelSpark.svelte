<!-- Ported from svelte-bits ClickSpark: page-wide, square "pixel" sparks in the site palette. -->
<script lang="ts">
	type Spark = { x: number; y: number; angle: number; start: number; color: string };

	let {
		colors = ['#f2c230', '#ff5ca8', '#22b06b', '#2643e9'],
		count = 8,
		radius = 26,
		size = 5,
		duration = 480
	}: { colors?: string[]; count?: number; radius?: number; size?: number; duration?: number } = $props();

	let canvas: HTMLCanvasElement;
	const sparks: Spark[] = [];
	let raf = 0;

	const ease = (t: number) => t * (2 - t);

	function resize() {
		const dpr = window.devicePixelRatio || 1;
		canvas.width = innerWidth * dpr;
		canvas.height = innerHeight * dpr;
		canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	function draw(now: number) {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		ctx.clearRect(0, 0, innerWidth, innerHeight);
		for (let i = sparks.length - 1; i >= 0; i--) {
			const s = sparks[i];
			const t = (now - s.start) / duration;
			if (t >= 1) {
				sparks.splice(i, 1);
				continue;
			}
			const d = ease(t) * radius;
			const px = size * (1 - t * 0.6);
			// snap to a 2px grid so the sparks read as pixels
			const x = Math.round((s.x + d * Math.cos(s.angle)) / 2) * 2;
			const y = Math.round((s.y + d * Math.sin(s.angle)) / 2) * 2;
			ctx.fillStyle = s.color;
			ctx.fillRect(x - px / 2, y - px / 2, px, px);
		}
		raf = sparks.length ? requestAnimationFrame(draw) : 0;
	}

	function burst(e: PointerEvent) {
		if (e.button !== 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const now = performance.now();
		const offset = Math.random() * Math.PI;
		for (let i = 0; i < count; i++) {
			sparks.push({
				x: e.clientX,
				y: e.clientY,
				angle: offset + (2 * Math.PI * i) / count,
				start: now,
				color: colors[i % colors.length]
			});
		}
		if (!raf) raf = requestAnimationFrame(draw);
	}

	$effect(() => {
		resize();
		return () => cancelAnimationFrame(raf);
	});
</script>

<svelte:window onresize={resize} onpointerdown={burst} />

<canvas bind:this={canvas} aria-hidden="true"></canvas>

<style>
	canvas {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		z-index: 200;
	}
</style>
