<script lang="ts">
	import { projects } from '$lib/data/projects';
	import Icon from './Icon.svelte';

	const picks = [
		{ slug: 'cyrene-ai', tone: 'dark', tab: 'cobalt' },
		{ slug: 'netsepio', tone: 'cobalt', tab: 'dark' },
		{ slug: 'fastaccs', tone: 'marigold', tab: 'marigold' }
	].map((p) => ({ ...p, project: projects.find((x) => x.slug === p.slug)! }));

	let active = $state(0);
</script>

<section class="spot" aria-label="Selected projects">
	<div class="tabs" role="tablist">
		{#each picks as p, i (p.slug)}
			<button
				role="tab"
				class="tab {p.tab}"
				class:on={active === i}
				aria-selected={active === i}
				aria-controls="spot-panel"
				style:z-index={active === i ? 5 : 3 - i}
				onclick={() => (active = i)}
			>
				✦ {p.project.title}
			</button>
		{/each}
	</div>

	<div id="spot-panel" class="stage" role="tabpanel">
		{#each picks as p, i (p.slug)}
			<article class="panel {p.tone}" class:on={active === i} aria-hidden={active !== i}>
				<div class="copy">
					<span class="date">● {p.project.date}</span>
					<h3>{p.project.title}</h3>
					<p>{p.project.tagline}</p>
					<a href="/work/{p.slug}" tabindex={active === i ? 0 : -1}>
						Read the case study <Icon name="arrow" size={12} />
					</a>
				</div>
				<figure>
					<img src={p.project.images[1] ?? p.project.image} alt="{p.project.title} screen" loading="lazy" />
					<img class="front" src={p.project.image} alt="" loading="lazy" />
				</figure>
			</article>
		{/each}
	</div>
</section>

<style>
	.spot {
		margin-top: 96px;
	}
	.tabs {
		display: flex;
		padding-left: 18px;
		overflow-x: auto;
		scrollbar-width: none;
	}
	.tab {
		position: relative;
		margin-right: -14px;
		padding: 10px 34px 10px 22px;
		font-family: var(--f-mono);
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		white-space: nowrap;
		clip-path: polygon(0 0, calc(100% - 26px) 0, 100% 100%, 0 100%);
		border-radius: 8px 0 0 0;
		translate: 0 6px;
		transition: translate 0.3s var(--ease-spring);
	}
	.tab:hover,
	.tab.on {
		translate: 0 0;
	}
	.tab.cobalt {
		background: var(--cobalt);
		color: #fff;
	}
	.tab.dark {
		background: var(--panel-dark);
		color: var(--panel-dark-ink);
	}
	.tab.marigold {
		background: var(--marigold);
		color: var(--sticker-ink);
	}
	.stage {
		display: grid;
	}
	.panel {
		grid-area: 1 / 1;
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		gap: 24px;
		min-height: 360px;
		padding: 36px 0 0 36px;
		border-radius: 0 14px 14px 14px;
		overflow: hidden;
		opacity: 0;
		visibility: hidden;
		translate: 0 18px;
		transition:
			opacity 0.35s ease,
			translate 0.5s var(--ease-spring),
			visibility 0s 0.35s;
	}
	.panel.on {
		opacity: 1;
		visibility: visible;
		translate: 0 0;
		transition:
			opacity 0.35s ease,
			translate 0.5s var(--ease-spring),
			visibility 0s;
	}
	.panel.dark {
		background: var(--panel-dark);
		color: var(--panel-dark-ink);
	}
	.panel.cobalt {
		background: var(--cobalt);
		color: #fff;
	}
	.panel.marigold {
		background: var(--marigold);
		color: var(--sticker-ink);
	}
	.copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
		padding-bottom: 36px;
	}
	.date {
		font-family: var(--f-mono);
		font-size: 11px;
	}
	h3 {
		font-size: clamp(34px, 4.5vw, 52px);
		line-height: 1;
		font-weight: 700;
		letter-spacing: -0.02em;
	}
	.copy p {
		max-width: 32ch;
		opacity: 0.8;
	}
	.copy a {
		margin-top: auto;
		display: inline-flex;
		gap: 6px;
		align-items: center;
		font-family: var(--f-mono);
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		padding-bottom: 3px;
		border-bottom: 1.5px solid currentColor;
	}
	.copy a:hover :global(svg) {
		translate: 2px -2px;
	}
	.copy a :global(svg) {
		transition: translate 0.2s;
	}
	figure {
		position: relative;
		align-self: end;
		min-height: 300px;
	}
	figure img {
		position: absolute;
		width: 92%;
		right: -8%;
		top: 0;
		border-radius: 10px;
		box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.6);
		rotate: 3deg;
		transition: rotate 0.5s var(--ease-spring), translate 0.5s var(--ease-spring);
	}
	figure .front {
		top: 70px;
		right: 6%;
		rotate: -3deg;
	}
	.panel:hover figure img {
		rotate: 5deg;
		translate: 6px -6px;
	}
	.panel:hover figure .front {
		rotate: -5deg;
		translate: -8px 4px;
	}

	@media (max-width: 760px) {
		.panel {
			grid-template-columns: 1fr;
			padding: 26px 0 0 22px;
		}
		.copy {
			padding-right: 22px;
			padding-bottom: 0;
		}
		figure {
			min-height: 230px;
		}
	}
</style>
