<script lang="ts">
	import { game } from '$lib/game.svelte';
	import { contact } from '$lib/data/profile';
	import DecryptedText from '$lib/bits/DecryptedText.svelte';

	let { home = false }: { home?: boolean } = $props();

	let clicks = 0;
	let name = $state('Adetayo Lasisi');

	function tapName(e: MouseEvent) {
		if (!home) return;
		e.preventDefault();
		clicks++;
		if (clicks === 5) {
			clicks = 0;
			name = 'adetyaz';
			game.unlock('name', 'That is my GitHub handle.');
			if (game.toast) game.toast = { ...game.toast, href: contact.github, linkText: 'github.com/adetyaz' };
			setTimeout(() => (name = 'Adetayo Lasisi'), 3500);
		}
	}

	function lights() {
		game.toggleTheme();
		game.unlock('lamp', game.theme === 'dark' ? 'Lights off.' : 'Lights on.');
	}
</script>

<header class="col bar">
	<a class="name" href="/" onclick={tapName}>
		{#key name}<DecryptedText text={name} speed={28} />{/key}
	</a>
	<div class="right">
		<span class="status"><span class="dot" aria-hidden="true"></span>Open to remote roles</span>
		<button class="switch" onclick={lights} aria-label="Switch light and dark">
			<span></span>
		</button>
	</div>
</header>

<style>
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding-top: 28px;
		font-size: 15px;
	}
	.name {
		font-weight: 700;
		user-select: none;
	}
	.right {
		display: flex;
		align-items: center;
		gap: 18px;
	}
	.status {
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--muted);
	}
	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--accent);
		animation: breathe 2.6s ease-in-out infinite;
	}
	@keyframes breathe {
		50% {
			opacity: 0.35;
		}
	}
	.switch {
		position: relative;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 1.5px solid var(--ink);
		overflow: hidden;
		transition: rotate 0.6s var(--spring);
	}
	.switch span {
		position: absolute;
		inset: 0 50% 0 0;
		background: var(--ink);
	}
	.switch:hover {
		rotate: 180deg;
	}
	@media (max-width: 480px) {
		.status {
			font-size: 0;
			gap: 0;
		}
	}
</style>
