<script lang="ts">
	import { page } from '$app/state';
	import { untrack } from 'svelte';
	import { game } from '$lib/game.svelte';
	import { contact } from '$lib/data/profile';
	import Icon from './Icon.svelte';

	const tabs = [
		{ href: '/', label: 'Home', glyph: '★' },
		{ href: '/about', label: 'About', glyph: '☻' },
		{ href: '/work', label: 'Work', glyph: '▦' },
		{ href: '/playground', label: 'Playground', glyph: '◆' }
	];

	let links: HTMLAnchorElement[] = $state([]);
	let pill = $state({ left: 0, width: 0, ready: false });
	let spins = $state(0);
	let pulled = $state(false);

	const activeIndex = $derived.by(() => {
		const path = page.url.pathname;
		if (path === '/') return 0;
		return tabs.findIndex((t, i) => i > 0 && path.startsWith(t.href));
	});

	function place() {
		const el = untrack(() => links[activeIndex]);
		if (!el) {
			pill = { left: 0, width: 0, ready: untrack(() => pill.ready) };
			return;
		}
		pill = { left: el.offsetLeft, width: el.offsetWidth, ready: true };
	}

	$effect(() => {
		activeIndex;
		place();
	});

	$effect(() => {
		document.fonts?.ready.then(place);
	});

	function pull() {
		pulled = true;
		setTimeout(() => (pulled = false), 380);
		game.toggleTheme();
		game.unlock('lamp', game.theme === 'dark' ? 'Lights off.' : 'Lights on.');
	}
</script>

<svelte:window onresize={place} />

<header class="bar">
	<div class="inner">
		<button
			class="logo"
			style:rotate="{spins * 360}deg"
			onclick={() => spins++}
			aria-label="Spin the logo"
		>
			<svg viewBox="0 0 16 16" width="22" height="22" aria-hidden="true">
				<circle cx="8" cy="8" r="8" fill="var(--bubblegum)" />
				<rect x="5" y="5" width="2" height="2" fill="#1a1a1a" />
				<rect x="9" y="5" width="2" height="2" fill="#1a1a1a" />
				<path d="M4.5 9.5h1v1h5v-1h1v1.2h-1v1h-5v-1h-1z" fill="#1a1a1a" />
			</svg>
		</button>

		<nav class="tabs" aria-label="Main">
			<span
				class="pill"
				class:ready={pill.ready}
				style:translate="{pill.left}px 0"
				style:width="{pill.width}px"
				aria-hidden="true"
			></span>
			{#each tabs as tab, i (tab.href)}
				<a
					bind:this={links[i]}
					href={tab.href}
					class:active={i === activeIndex}
					aria-current={i === activeIndex ? 'page' : undefined}
				>
					<span class="glyph" aria-hidden="true">{tab.glyph}</span>
					<span class="label">{tab.label}</span>
				</a>
			{/each}
		</nav>

		<div class="right">
			<a class="dot" style:--c="var(--marigold)" href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub"
				><Icon name="github" size={12} /></a
			>
			<a class="dot" style:--c="var(--bubblegum)" href={contact.x} target="_blank" rel="noreferrer" aria-label="X"
				><Icon name="x" size={11} /></a
			>
			<a class="dot" style:--c="var(--leaf)" href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
				><Icon name="linkedin" size={11} /></a
			>
			<a class="contact" href="mailto:{contact.email}"><span aria-hidden="true">♥</span> Contact</a>
		</div>
	</div>

	<button class="cord" class:pulled onclick={pull} aria-label="Pull the cord to switch light and dark">
		<span class="string"></span>
		<span class="knob"></span>
	</button>
</header>

<style>
	.bar {
		position: sticky;
		top: 0;
		z-index: 40;
		padding: 10px var(--gutter) 0;
	}
	.inner {
		max-width: var(--wrap);
		margin-inline: auto;
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 6px 8px;
		background: color-mix(in srgb, var(--card) 88%, transparent);
		backdrop-filter: blur(10px);
		border: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
		border-radius: 10px;
		box-shadow: 0 8px 24px -18px rgba(0, 0, 0, 0.5);
	}
	.logo {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		transition: rotate 0.7s var(--ease-spring);
	}
	.tabs {
		position: relative;
		display: flex;
		gap: 2px;
	}
	.pill {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		background: var(--marigold);
		border-radius: 6px;
		box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.12);
	}
	.pill.ready {
		transition:
			translate 0.45s var(--ease-spring),
			width 0.45s var(--ease-spring);
	}
	.tabs a {
		position: relative;
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 7px 11px;
		font-family: var(--f-mono);
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--ink-soft);
		border-radius: 6px;
		transition: color 0.2s;
	}
	.tabs a:hover {
		color: var(--ink);
	}
	.tabs a.active {
		color: var(--sticker-ink);
	}
	.glyph {
		font-size: 12px;
		display: inline-block;
		transition: rotate 0.4s var(--ease-spring);
	}
	.tabs a:hover .glyph {
		rotate: -18deg;
	}
	.right {
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.dot {
		display: grid;
		place-items: center;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: var(--c);
		color: #1a1a1a;
		transition: translate 0.25s var(--ease-spring);
	}
	.dot:hover {
		translate: 0 -3px;
	}
	.contact {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-left: 4px;
		padding: 5px 10px;
		font-family: var(--f-mono);
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		border: 1.5px solid var(--edge);
		border-radius: 6px;
		transition:
			background 0.2s,
			color 0.2s;
	}
	.contact:hover {
		background: var(--ink);
		color: var(--paper);
	}
	.contact:hover span {
		color: var(--bubblegum);
	}

	.cord {
		position: absolute;
		right: max(calc(var(--gutter) + 22px), calc((100vw - var(--wrap)) / 2 + 22px));
		top: 100%;
		width: 24px;
		height: 64px;
		display: flex;
		flex-direction: column;
		align-items: center;
		transform-origin: top center;
		animation: sway 5s ease-in-out infinite;
	}
	.string {
		width: 1.5px;
		flex: 1;
		background: var(--ink-faint);
		transition: scale 0.3s var(--ease-spring);
		transform-origin: top;
	}
	.knob {
		width: 10px;
		height: 14px;
		border-radius: 3px 3px 6px 6px;
		background: var(--marigold);
		border: 1.5px solid var(--edge);
		transition: translate 0.3s var(--ease-spring);
	}
	.cord:hover .knob {
		translate: 0 3px;
	}
	.cord.pulled .string {
		scale: 1 1.35;
	}
	.cord.pulled .knob {
		translate: 0 22px;
	}
	@keyframes sway {
		0%,
		100% {
			rotate: -3deg;
		}
		50% {
			rotate: 3deg;
		}
	}

	@media (max-width: 760px) {
		.dot {
			display: none;
		}
	}
	@media (max-width: 560px) {
		.tabs a {
			padding: 8px 10px;
		}
		.tabs a .label {
			display: none;
		}
		.tabs a.active .label {
			display: inline;
		}
		.contact {
			padding: 5px 8px;
		}
		.contact {
			font-size: 0;
			gap: 0;
		}
		.contact span {
			font-size: 13px;
		}
		.cord {
			right: calc(var(--gutter) + 14px);
		}
	}
</style>
