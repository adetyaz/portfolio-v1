<script lang="ts">
	import { game } from '$lib/game.svelte';
	import { contact } from '$lib/data/profile';
	import Magnet from '$lib/bits/Magnet.svelte';

	let copied = $state(false);
	async function copy() {
		try {
			await navigator.clipboard.writeText(contact.email);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			location.href = `mailto:${contact.email}`;
		}
	}
</script>

<footer class="col">
	<p class="ask">Have something worth building?</p>
	<div class="row">
		<Magnet padding={40} strength={5}>
			<button class="email" onclick={copy}>
				<span class="label" class:gone={copied}>{contact.email}</span>
				<span class="label done" class:gone={!copied} aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
			</button>
		</Magnet>
		<nav class="links" aria-label="Elsewhere">
			<a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
			<a href={contact.x} target="_blank" rel="noreferrer">X</a>
			<a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
		</nav>
	</div>
	<p class="small">
		<span>© 2026 Adetayo Lasisi</span>
		<button class="hint" onclick={() => (game.shortcuts = true)}>Press ? for shortcuts</button>
	</p>
</footer>

<style>
	footer {
		margin-top: 140px;
		padding-bottom: 36px;
	}
	.ask {
		font-size: 15px;
		color: var(--muted);
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 16px 32px;
		margin-top: 6px;
		padding-bottom: 28px;
		border-bottom: 1px solid var(--line);
	}
	.email {
		display: grid;
		font-size: clamp(22px, 3vw, 28px);
		letter-spacing: -0.02em;
	}
	.label {
		grid-area: 1 / 1;
		transition:
			opacity 0.25s var(--ease),
			translate 0.35s var(--ease);
		background-image: linear-gradient(var(--accent), var(--accent));
		background-size: 0% 2px;
		background-position: 0 100%;
		background-repeat: no-repeat;
	}
	.email:hover .label:not(.done) {
		background-size: 100% 2px;
		transition:
			background-size 0.45s var(--ease),
			opacity 0.25s;
	}
	.done {
		color: var(--accent);
	}
	.gone {
		opacity: 0;
		translate: 0 -6px;
	}
	.links {
		display: flex;
		gap: 22px;
		font-size: 15px;
	}
	.links a {
		color: var(--muted);
		transition: color 0.2s;
	}
	.links a:hover {
		color: var(--ink);
	}
	.small {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		margin-top: 18px;
		font-size: 13px;
		color: var(--faint);
	}
	.hint:hover {
		color: var(--muted);
	}
</style>
