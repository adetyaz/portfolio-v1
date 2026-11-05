<!-- Ported from svelte-bits FallingText: words drop with matter-js physics and can be thrown around. -->
<script lang="ts">
	import Matter from 'matter-js';

	type Word = { text: string; color: string };

	let {
		words,
		gravity = 0.9,
		height = 300,
		started = $bindable(false)
	}: { words: Word[]; gravity?: number; height?: number; started?: boolean } = $props();

	let box: HTMLDivElement;
	let els: HTMLSpanElement[] = $state([]);

	$effect(() => {
		if (!started) return;
		const { Engine, World, Bodies, Body, Mouse, MouseConstraint } = Matter;
		const rect = box.getBoundingClientRect();
		const w = rect.width;
		const h = rect.height;

		const engine = Engine.create();
		engine.gravity.y = gravity;
		const wall = { isStatic: true };
		const bounds = [
			Bodies.rectangle(w / 2, h + 25, w * 2, 50, wall),
			Bodies.rectangle(-25, h / 2, 50, h * 3, wall),
			Bodies.rectangle(w + 25, h / 2, 50, h * 3, wall),
			Bodies.rectangle(w / 2, -h, w * 2, 50, wall)
		];

		const items = els.filter(Boolean).map((el) => {
			const r = el.getBoundingClientRect();
			const body = Bodies.rectangle(r.left - rect.left + r.width / 2, r.top - rect.top + r.height / 2, r.width, r.height, {
				chamfer: { radius: 6 },
				restitution: 0.5,
				frictionAir: 0.012,
				friction: 0.3
			});
			Body.setVelocity(body, { x: (Math.random() - 0.5) * 6, y: -Math.random() * 3 });
			Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
			return { el, body };
		});

		items.forEach(({ el }) => {
			el.style.position = 'absolute';
		});

		const mouse = Mouse.create(box);
		// let the page scroll when the wheel is used over the box
		const m = mouse as unknown as { element: HTMLElement; mousewheel: EventListener };
		m.element.removeEventListener('wheel', m.mousewheel);
		m.element.removeEventListener('mousewheel', m.mousewheel);
		m.element.removeEventListener('DOMMouseScroll', m.mousewheel);
		const grab = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });

		World.add(engine.world, [...bounds, grab, ...items.map((i) => i.body)]);

		let raf = 0;
		let last = performance.now();
		const loop = (now: number) => {
			Engine.update(engine, Math.min(32, now - last));
			last = now;
			for (const { el, body } of items) {
				el.style.left = `${body.position.x}px`;
				el.style.top = `${body.position.y}px`;
				el.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(raf);
			World.clear(engine.world, false);
			Engine.clear(engine);
		};
	});
</script>

<div class="jar" bind:this={box} style:height="{height}px">
	<div class="words">
		{#each words as w, i (w.text)}
			<span class="word" bind:this={els[i]} style:--c={w.color}>{w.text}</span>
		{/each}
	</div>
</div>

<style>
	.jar {
		position: relative;
		width: 100%;
		overflow: hidden;
		touch-action: pan-y;
	}
	.words {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 10px 12px;
		padding: 18px 12px;
	}
	.word {
		display: inline-block;
		padding: 0.45em 0.9em;
		font-family: var(--f-mono);
		font-size: 14px;
		font-weight: 700;
		color: #1a1a1a;
		background: var(--c);
		border-radius: 6px;
		box-shadow: 0 6px 14px -8px rgba(0, 0, 0, 0.5);
		user-select: none;
		white-space: nowrap;
		cursor: grab;
	}
	@media (max-width: 600px) {
		.words {
			gap: 8px;
			padding: 12px 6px;
		}
		.word {
			font-size: 12px;
			padding: 0.4em 0.7em;
		}
	}
</style>
