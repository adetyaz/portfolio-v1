<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { fly, fade } from 'svelte/transition';
	import { game, confetti, SECRETS } from '$lib/game.svelte';
	import { contact } from '$lib/data/profile';
	import cat from '$lib/assets/lottie/Loader cat.gif';

	const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
	const TABS = ['', '#roles', '#skills', '#uses'];

	let keys: string[] = [];
	let typed = '';
	let catOut = $state(false);
	let pats = 0;
	let idle: ReturnType<typeof setTimeout>;
	let hired = $state(false);

	function isTyping(e: KeyboardEvent) {
		const t = e.target as HTMLElement;
		return t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName);
	}

	function onKey(e: KeyboardEvent) {
		wake();
		if (isTyping(e) || e.metaKey || e.ctrlKey || e.altKey) return;
		const k = e.key.toLowerCase();

		keys = [...keys, k].slice(-KONAMI.length);
		if (keys.join() === KONAMI.join()) {
			keys = [];
			game.toggleBlueprint();
			game.unlock('konami', game.blueprint ? 'Blueprint mode. Esc to leave.' : 'Back to normal.');
			return;
		}

		if (k.length === 1) {
			typed = (typed + k).slice(-4);
			if (typed === 'hire') {
				hired = true;
				confetti();
				game.unlock('hire');
			}
		}

		if (e.key === '?') {
			game.shortcuts = !game.shortcuts;
			if (game.shortcuts) game.unlock('help');
		} else if (e.key === 'Escape') {
			game.shortcuts = false;
			hired = false;
			if (game.blueprint) game.toggleBlueprint();
		} else if (/^[1-4]$/.test(e.key)) {
			goto('/' + TABS[Number(e.key) - 1]);
		} else if (k === 'd' && e.shiftKey) {
			game.toggleTheme();
		}
	}

	function wake() {
		clearTimeout(idle);
		if (catOut) catOut = false;
		idle = setTimeout(() => (catOut = true), 25000);
	}

	function pat() {
		pats++;
		if (pats === 3) game.unlock('cat', 'Purring.');
		else if (pats < 3) game.say(pats === 1 ? 'Mrrp.' : 'Mrrrp?');
	}

	onMount(() => {
		wake();
		console.log(
			`%cHello, source reader.%c\nThere are ${SECRETS.length} secrets on this site. Press ? for a start.\n${contact.github}`,
			'font:700 13px sans-serif;color:#2b3bff',
			'font:12px monospace'
		);
		return () => clearTimeout(idle);
	});
</script>

<svelte:window onkeydown={onKey} onpointermove={wake} onscroll={wake} />

<div class="toast-zone" aria-live="polite">
	{#if game.toast}
		{#key game.toast.id}
			<div class="toast" in:fly={{ y: 16, duration: 380 }} out:fade={{ duration: 160 }}>
				<span>{game.toast.text}</span>
				{#if game.toast.href}<a href={game.toast.href}>{game.toast.linkText}</a>{/if}
			</div>
		{/key}
	{/if}
</div>

{#if game.shortcuts}
	<div class="scrim" role="presentation" onclick={() => (game.shortcuts = false)} transition:fade={{ duration: 150 }}></div>
	<div class="card" role="dialog" aria-label="Keyboard shortcuts" transition:fly={{ y: 10, duration: 260 }}>
		<p class="card-title">Shortcuts</p>
		<dl>
			<dt><kbd>1</kbd> – <kbd>4</kbd></dt>
			<dd>Work, roles, skills, use cases</dd>
			<dt><kbd>⇧</kbd> <kbd>D</kbd></dt>
			<dd>Light or dark</dd>
			<dt><kbd>?</kbd></dt>
			<dd>This card</dd>
			<dt><kbd>Esc</kbd></dt>
			<dd>Close</dd>
		</dl>
		<p class="card-foot">A few other keys do things too.</p>
	</div>
{/if}

{#if hired}
	<div class="scrim" role="presentation" onclick={() => (hired = false)} transition:fade={{ duration: 150 }}></div>
	<div class="card hire" role="dialog" aria-label="Contact" transition:fly={{ y: 16, duration: 320 }}>
		<p class="big">Let's talk.</p>
		<a class="mail" href="mailto:{contact.email}?subject=Let's%20work%20together">Email {contact.email}</a>
	</div>
{/if}

<button class="cat" class:out={catOut} onclick={pat} aria-label="Pat the cat" tabindex={catOut ? 0 : -1}>
	<img src={cat} alt="" width="64" height="64" />
</button>

<style>
	.toast-zone {
		position: fixed;
		left: 50%;
		bottom: 24px;
		translate: -50% 0;
		z-index: 100;
		pointer-events: none;
		width: max-content;
		max-width: calc(100vw - 32px);
	}
	.toast {
		pointer-events: auto;
		display: flex;
		gap: 14px;
		align-items: baseline;
		padding: 10px 16px;
		font-size: 14px;
		background: var(--ink);
		color: var(--bg);
		border-radius: 999px;
	}
	.toast a {
		color: var(--bg);
		opacity: 0.7;
		text-decoration: underline;
		text-underline-offset: 3px;
		white-space: nowrap;
	}
	.scrim {
		position: fixed;
		inset: 0;
		z-index: 90;
		background: color-mix(in srgb, var(--bg) 70%, transparent);
		backdrop-filter: blur(2px);
	}
	.card {
		position: fixed;
		z-index: 91;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
		width: min(360px, calc(100vw - 32px));
		padding: 24px;
		background: var(--bg);
		border: 1px solid var(--line);
		border-radius: 10px;
		box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.35);
	}
	.card-title {
		font-weight: 700;
		margin-bottom: 14px;
	}
	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 10px 16px;
		font-size: 15px;
	}
	dd {
		color: var(--muted);
	}
	kbd {
		display: inline-block;
		min-width: 22px;
		padding: 1px 6px;
		font-family: inherit;
		font-size: 13px;
		text-align: center;
		border: 1px solid var(--line);
		border-bottom-width: 2px;
		border-radius: 4px;
	}
	.card-foot {
		margin-top: 16px;
		font-size: 13px;
		color: var(--faint);
	}
	.hire {
		text-align: center;
		padding: 36px 24px;
	}
	.big {
		font-size: 44px;
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1;
	}
	.mail {
		display: inline-block;
		margin-top: 16px;
		color: var(--accent);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.cat {
		position: fixed;
		right: 22px;
		bottom: -80px;
		z-index: 60;
		transition: bottom 0.7s var(--spring);
	}
	.cat.out {
		bottom: -6px;
	}
	.cat img {
		width: 64px;
		height: auto;
	}
</style>
