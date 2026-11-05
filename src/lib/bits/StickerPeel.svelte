<!-- Ported from svelte-bits StickerPeel: draggable sticker whose corner peels back on hover. -->
<script lang="ts">
	import { gsap } from 'gsap';
	import { Draggable } from 'gsap/Draggable';

	let {
		src,
		alt = '',
		width = 120,
		rotate = 0,
		peelHover = 28,
		peelActive = 40,
		ondragend
	}: {
		src: string;
		alt?: string;
		width?: number;
		rotate?: number;
		peelHover?: number;
		peelActive?: number;
		ondragend?: (distance: number) => void;
	} = $props();

	const pad = 10;
	let target: HTMLDivElement;
	let box: HTMLDivElement;
	let light: SVGFEPointLightElement;
	const uid = Math.random().toString(36).slice(2, 8);

	$effect(() => {
		gsap.registerPlugin(Draggable);
		const bounds = target.closest('[data-peel-bounds]') ?? document.body;
		const d = Draggable.create(target, {
			type: 'x,y',
			bounds,
			onDrag(this: Draggable) {
				gsap.to(target, { rotation: gsap.utils.clamp(-24, 24, this.deltaX * 0.4), duration: 0.15 });
			},
			onDragEnd(this: Draggable) {
				gsap.to(target, { rotation: 0, duration: 0.8, ease: 'power2.out' });
				ondragend?.(Math.hypot(this.x, this.y));
			}
		})[0];
		const move = (e: MouseEvent) => {
			const r = box.getBoundingClientRect();
			gsap.set(light, { attr: { x: e.clientX - r.left, y: e.clientY - r.top } });
		};
		box.addEventListener('mousemove', move);
		return () => {
			d.kill();
			box.removeEventListener('mousemove', move);
		};
	});
</script>

<div
	class="peel"
	bind:this={target}
	style:--w="{width}px"
	style:--p="{pad}px"
	style:--hover="{peelHover}%"
	style:--active="{peelActive}%"
>
	<svg width="0" height="0" aria-hidden="true">
		<defs>
			<filter id="light-{uid}">
				<feGaussianBlur stdDeviation="1" result="blur" />
				<feSpecularLighting result="spec" in="blur" specularExponent="100" specularConstant="0.12" lighting-color="white">
					<fePointLight bind:this={light} x="100" y="100" z="300" />
				</feSpecularLighting>
				<feComposite in="spec" in2="SourceGraphic" result="lit" />
				<feComposite in="lit" in2="SourceAlpha" operator="in" />
			</filter>
			<filter id="shadow-{uid}">
				<feDropShadow dx="2" dy="4" stdDeviation="2" flood-color="black" flood-opacity="0.45" />
			</filter>
			<filter id="back-{uid}">
				<feFlood flood-color="rgb(214,214,208)" result="flood" />
				<feComposite operator="in" in="flood" in2="SourceAlpha" />
			</filter>
		</defs>
	</svg>
	<div class="box" bind:this={box} style:rotate="{rotate}deg">
		<div class="main" style:filter="url(#shadow-{uid})">
			<div style:filter="url(#light-{uid})">
				<img {src} {alt} draggable="false" />
			</div>
		</div>
		<div class="flap">
			<img src={src} alt="" draggable="false" style:filter="url(#back-{uid})" />
		</div>
	</div>
</div>

<style>
	.peel {
		position: absolute;
		cursor: grab;
		touch-action: none;
		user-select: none;
		-webkit-user-select: none;
		z-index: 5;
	}
	.peel:active {
		cursor: grabbing;
	}
	.box {
		position: relative;
		--s: calc(-1 * var(--p));
		--e: calc(100% + var(--p));
	}
	.peel {
		width: var(--w);
	}
	img {
		display: block;
		width: var(--w);
		max-width: none;
		pointer-events: none;
	}
	.main {
		clip-path: polygon(var(--s) var(--s), var(--e) var(--s), var(--e) var(--e), var(--s) var(--e));
		transition: clip-path 0.6s ease-out;
	}
	.flap {
		position: absolute;
		left: 0;
		width: 100%;
		height: 100%;
		top: calc(-100% - 2 * var(--p));
		transform: scaleY(-1);
		clip-path: polygon(var(--s) var(--s), var(--e) var(--s), var(--e) var(--s), var(--s) var(--s));
		transition: all 0.6s ease-out;
	}
	.box:hover .main {
		clip-path: polygon(var(--s) var(--hover), var(--e) var(--hover), var(--e) var(--e), var(--s) var(--e));
	}
	.box:hover .flap {
		clip-path: polygon(var(--s) var(--s), var(--e) var(--s), var(--e) var(--hover), var(--s) var(--hover));
		top: calc(-100% + 2 * var(--hover) - 1px);
	}
	.box:active .main {
		clip-path: polygon(var(--s) var(--active), var(--e) var(--active), var(--e) var(--e), var(--s) var(--e));
	}
	.box:active .flap {
		clip-path: polygon(var(--s) var(--s), var(--e) var(--s), var(--e) var(--active), var(--s) var(--active));
		top: calc(-100% + 2 * var(--active) - 1px);
	}
</style>
