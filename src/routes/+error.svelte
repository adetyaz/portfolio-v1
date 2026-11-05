<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { game } from '$lib/game.svelte';
	import TopBar from '$lib/components/TopBar.svelte';

	onMount(() => {
		if (page.status === 404) game.unlock('lost', 'You meant to do that.');
	});
</script>

<svelte:head>
	<title>{page.status} · Adetayo Lasisi</title>
</svelte:head>

<TopBar />

<section class="col err">
	<p class="code">{page.status}</p>
	<p class="msg">
		{page.status === 404 ? `Nothing lives at ${page.url.pathname}.` : page.error?.message}
	</p>
	<a href="/">Back home <span aria-hidden="true">→</span></a>
</section>

<style>
	.err {
		padding-top: clamp(80px, 18vh, 180px);
	}
	.code {
		font-size: clamp(64px, 12vw, 120px);
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.04em;
		color: var(--accent);
	}
	.msg {
		margin-top: 12px;
		font-size: clamp(22px, 3vw, 30px);
		letter-spacing: -0.015em;
	}
	a {
		display: inline-block;
		margin-top: 24px;
		color: var(--muted);
	}
	a:hover {
		color: var(--ink);
	}
</style>
