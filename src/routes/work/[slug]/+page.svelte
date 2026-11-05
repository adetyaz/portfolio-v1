<script lang="ts">
	import TopBar from '$lib/components/TopBar.svelte';

	let { data } = $props();
	const p = $derived(data.project);
	const live = $derived(p.liveUrl && p.liveUrl !== '#');
</script>

<svelte:head>
	<title>{p.title} · Adetayo Lasisi</title>
	<meta name="description" content={p.tagline} />
</svelte:head>

<TopBar />

<article class="col case">
	<a class="back" href="/"><span aria-hidden="true">←</span> All work</a>

	<h1>{p.title}</h1>
	<p class="tag">{p.tagline}</p>

	<dl class="facts">
		<div><dt>Year</dt><dd>{p.date}</dd></div>
		<div><dt>Built with</dt><dd>{p.services.join(', ')}</dd></div>
		<div>
			<dt>Link</dt>
			<dd>
				{#if live}<a href={p.liveUrl} target="_blank" rel="noreferrer">{new URL(p.liveUrl!).hostname.replace('www.', '')} ↗</a>
				{:else}Not live yet{/if}
			</dd>
		</div>
	</dl>

	<p class="about">{p.description}</p>
</article>

<div class="shots">
	{#each p.images as img, i (img)}
		<figure style:--bg={p.bgcolor}>
			<img src={img} alt="{p.title} screen {i + 1}" loading={i ? 'lazy' : 'eager'} />
		</figure>
	{/each}
</div>

<nav class="col next">
	<span class="label">Next</span>
	<a href="/work/{data.next.slug}">{data.next.title} <span aria-hidden="true">→</span></a>
</nav>

<style>
	.case {
		padding-top: clamp(64px, 12vh, 120px);
	}
	.back {
		font-size: 15px;
		color: var(--muted);
		transition: color 0.2s;
	}
	.back span {
		display: inline-block;
		transition: translate 0.3s var(--spring);
	}
	.back:hover {
		color: var(--ink);
	}
	.back:hover span {
		translate: -4px 0;
	}
	h1 {
		margin-top: 40px;
		font-size: clamp(40px, 7vw, 64px);
		line-height: 1;
		letter-spacing: -0.035em;
	}
	.tag {
		margin-top: 12px;
		font-size: clamp(20px, 2.6vw, 26px);
		letter-spacing: -0.015em;
		color: var(--muted);
	}
	.facts {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		gap: 24px;
		margin-top: 44px;
		padding: 16px 0;
		border-block: 1px solid var(--line);
		font-size: 15px;
	}
	dt {
		color: var(--muted);
		font-size: 13px;
	}
	dd a {
		color: var(--accent);
	}
	dd a:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.about {
		margin-top: 28px;
		max-width: 60ch;
	}
	.shots {
		display: grid;
		gap: 24px;
		max-width: 1040px;
		margin: 64px auto 0;
		padding-inline: var(--gutter);
	}
	figure {
		padding: clamp(12px, 3vw, 32px);
		background: var(--bg);
		border: 1px solid var(--line);
		border-radius: 10px;
	}
	figure img {
		width: 100%;
		border-radius: 4px;
	}
	.next {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-top: 64px;
		padding-top: 16px;
		border-top: 1px solid var(--line);
	}
	.label {
		font-size: 14px;
		color: var(--muted);
	}
	.next a {
		font-size: 22px;
		letter-spacing: -0.015em;
		transition: color 0.2s;
	}
	.next a span {
		display: inline-block;
		transition: translate 0.3s var(--spring);
	}
	.next a:hover {
		color: var(--accent);
	}
	.next a:hover span {
		translate: 4px 0;
	}
	@media (max-width: 560px) {
		.facts {
			grid-template-columns: 1fr 1fr;
		}
		.facts > div:nth-child(2) {
			grid-column: 1 / -1;
			grid-row: 2;
		}
	}
</style>
