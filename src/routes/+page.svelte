<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { slide } from 'svelte/transition';
	import TopBar from '$lib/components/TopBar.svelte';
	import Preview from '$lib/components/Preview.svelte';
	import RotatingText from '$lib/bits/RotatingText.svelte';
	import { projects, alsoShipped, openSource } from '$lib/data/projects';
	import { roles, skillGroups, useCases } from '$lib/data/profile';
	import { game, SECRETS } from '$lib/game.svelte';

	type TabId = 'work' | 'roles' | 'skills' | 'uses' | 'secrets';

	const baseTabs: { id: TabId; label: string }[] = [
		{ id: 'work', label: 'work' },
		{ id: 'roles', label: 'roles' },
		{ id: 'skills', label: 'skills' },
		{ id: 'uses', label: 'use cases' }
	];

	let active = $state<TabId>('work');
	let preview = $state<string | null>(null);
	let openRole = $state<number | null>(null);
	let openUse = $state<number | null>(null);
	let skill = $state<string | null>(null);
	let hint = $state<string | null>(null);

	const showSecrets = $derived(game.found.length > 0);
	const tabs = $derived(showSecrets ? [...baseTabs, { id: 'secrets' as TabId, label: 'secrets' }] : baseTabs);
	const usedIn = $derived(skillGroups.flatMap((g) => g.skills).find((s) => s.name === skill)?.usedIn ?? []);

	function select(id: TabId) {
		active = id;
		preview = null;
		history.replaceState(history.state, '', id === 'work' ? location.pathname : `#${id}`);
	}

	function keyNav(e: KeyboardEvent, i: number) {
		if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
		e.preventDefault();
		const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
		select(next.id);
		document.getElementById(`tab-${next.id}`)?.focus();
	}

	function fromHash() {
		const h = location.hash.slice(1) as TabId;
		if (['work', 'roles', 'skills', 'uses', 'secrets'].includes(h)) active = h;
	}

	onMount(fromHash);
</script>

<svelte:window onhashchange={fromHash} />

<svelte:head>
	<title>Adetayo Lasisi, frontend engineer</title>
</svelte:head>

<TopBar home />

<section class="col intro">
	<p class="lead">
		Frontend engineer. I build
		<RotatingText class="rot" texts={['web apps', 'mobile apps', 'Web3 apps', 'browser extensions']} />
		that feel easy to use.
	</p>

	<div class="lead tabs" role="tablist" aria-label="Sections">
		<span class="muted">See my</span>
		{#each tabs as t, i (t.id)}
			{' '}<span class="nw"><button
					id="tab-{t.id}"
					role="tab"
					class="tab"
					class:on={active === t.id}
					class:new={t.id === 'secrets'}
					aria-selected={active === t.id}
					aria-controls="panel"
					tabindex={active === t.id ? 0 : -1}
					onclick={() => select(t.id)}
					onkeydown={(e) => keyNav(e, i)}
					>{t.label}{#if t.id === 'secrets'}<sup class="count">{game.found.length}/{SECRETS.length}</sup>{/if}</button
				><span class="muted">{i < tabs.length - 2 ? ',' : i === tabs.length - 2 ? ' or' : '.'}</span></span
			>
		{/each}
	</div>
</section>

<div id="panel" class="col panel" role="tabpanel" aria-labelledby="tab-{active}">
	{#key active}
		<div in:fly={{ y: 10, duration: 420, easing: (t) => 1 - Math.pow(1 - t, 4) }}>
			{#if active === 'work'}
				<ul class="rows">
					{#each projects as p (p.slug)}
						<li>
							<a
								class="row work"
								href="/work/{p.slug}"
								onpointerenter={() => (preview = p.image)}
								onpointerleave={() => (preview = null)}
							>
								<span class="title">{p.title}</span>
								<span class="desc">{p.tagline}</span>
								<span class="meta">{p.date}<span class="arrow" aria-hidden="true">↗</span></span>
							</a>
						</li>
					{/each}
				</ul>
				<p class="sub">Open source and experiments</p>
				<ul class="rows">
					{#each openSource as o (o.title)}
						<li>
							<a
								class="row work"
								href={o.href}
								target="_blank"
								rel="noreferrer"
								onpointerenter={() => (preview = o.image)}
								onpointerleave={() => (preview = null)}
							>
								<span class="title">{o.title}</span>
								<span class="desc">{o.note}</span>
								<span class="meta">{o.meta}<span class="arrow" aria-hidden="true">↗</span></span>
							</a>
						</li>
					{/each}
				</ul>
				<p class="sub">Also shipped, no case study yet</p>
				<ul class="rows quiet">
					{#each alsoShipped as a (a.title)}
						<li class="row static">
							<span class="title">{a.title}</span>
							<span class="desc">{a.note}</span>
							<span class="meta">{a.stack}</span>
						</li>
					{/each}
				</ul>
			{:else if active === 'roles'}
				<ul class="rows">
					{#each roles as r, i (r.company + r.when)}
						<li>
							<button
								class="row role"
								aria-expanded={openRole === i}
								onclick={() => (openRole = openRole === i ? null : i)}
							>
								<span class="title">{r.company}</span>
								<span class="desc">{r.title}</span>
								<span class="meta">{r.when}<span class="plus" class:x={openRole === i} aria-hidden="true">+</span></span>
							</button>
							{#if openRole === i}
								<div class="more" transition:slide={{ duration: 280 }}>
									<p class="summary">{r.summary}</p>
									<ul class="points">
										{#each r.points as pt (pt)}<li>{pt}</li>{/each}
									</ul>
								</div>
							{/if}
						</li>
					{/each}
				</ul>
			{:else if active === 'skills'}
				<ul class="rows">
					{#each skillGroups as g (g.label)}
						<li class="row static skills">
							<span class="title">{g.label}</span>
							<span class="chips">
								{#each g.skills as s, i (s.name)}<button
										class="skill"
										class:on={skill === s.name}
										onpointerenter={() => (skill = s.name)}
										onfocus={() => (skill = s.name)}
										onclick={() => (skill = s.name)}>{s.name}</button
									>{#if i < g.skills.length - 1}<span class="sep">{", "}</span>{/if}{/each}
							</span>
						</li>
					{/each}
				</ul>
				<p class="used" aria-live="polite">
					{#if skill}
						{#key skill}
							<span in:fly={{ y: 6, duration: 260 }}>
								<strong>{skill}</strong> <span class="muted">used in</span> {usedIn.join(', ')}
							</span>
						{/key}
					{:else}
						<span class="muted">Point at a skill to see where I used it.</span>
					{/if}
				</p>
			{:else if active === 'uses'}
				<ul class="rows">
					{#each useCases as u, i (u.need)}
						<li>
							<button class="row use" aria-expanded={openUse === i} onclick={() => (openUse = openUse === i ? null : i)}>
								<span class="title"><span class="muted">If you need</span> {u.need}</span>
								<span class="meta"><span class="plus" class:x={openUse === i} aria-hidden="true">+</span></span>
							</button>
							{#if openUse === i}
								<div class="more" transition:slide={{ duration: 280 }}>
									<p class="summary">{u.answer}</p>
									<p class="proof">
										{#each u.proof as pr, j (pr.label)}
											{#if pr.href}<a href={pr.href}>{pr.label}</a>{:else}<span>{pr.label}</span>{/if}{#if j < u.proof.length - 1}<span class="muted">{", "}</span>{/if}
										{/each}
									</p>
								</div>
							{/if}
						</li>
					{/each}
				</ul>
			{:else if active === 'secrets'}
				<ul class="rows">
					{#each SECRETS as s (s.id)}
						{@const got = game.has(s.id)}
						<li>
							{#if got}
								<div class="row static secret">
									<span class="title">{s.title}</span>
									<span class="meta">found</span>
								</div>
							{:else}
								<button class="row secret locked" onclick={() => (hint = hint === s.id ? null : s.id)}>
									<span class="title">{hint === s.id ? s.hint : '· · ·'}</span>
									<span class="meta">{hint === s.id ? 'hint' : 'locked'}</span>
								</button>
							{/if}
						</li>
					{/each}
				</ul>
				<p class="used">
					<span class="muted">
						{game.found.length === SECRETS.length
							? 'All of them. You would be good at QA.'
							: 'Tap a locked one for a hint.'}
					</span>
					<button class="reset" onclick={() => { game.reset(); select('work'); }}>Hide them again</button>
				</p>
			{/if}
		</div>
	{/key}
</div>

<Preview src={preview} />

<style>
	.intro {
		padding-top: clamp(80px, 18vh, 180px);
	}
	.lead {
		font-size: clamp(26px, 3.6vw, 36px);
		line-height: 1.22;
		letter-spacing: -0.02em;
		max-width: 22em;
	}
	.lead + .lead {
		margin-top: 0.5em;
	}
	.lead :global(.rot) {
		color: var(--accent);
	}
	.muted {
		color: var(--muted);
	}

	.tab {
		position: relative;
		color: var(--ink);
		background-image: linear-gradient(currentColor, currentColor);
		background-size: 100% 1px;
		background-position: 0 92%;
		background-repeat: no-repeat;
		transition:
			color 0.25s var(--ease),
			background-size 0.35s var(--ease);
	}
	.tab:hover {
		color: var(--accent);
	}
	.tab.on {
		color: var(--accent);
		background-size: 100% 3px;
	}
	.tab.new {
		animation: arrive 0.7s var(--spring);
	}
	@keyframes arrive {
		from {
			opacity: 0;
			translate: 0 0.4em;
		}
	}
	.nw {
		white-space: nowrap;
	}
	.count {
		margin-left: 0.15em;
		font-size: 0.4em;
		color: var(--muted);
		letter-spacing: 0;
	}

	.panel {
		margin-top: 56px;
		min-height: 420px;
	}

	.rows {
		border-top: 1px solid var(--line);
	}
	.rows > li,
	.rows > .row {
		border-bottom: 1px solid var(--line);
	}
	.row {
		display: grid;
		grid-template-columns: 9.5em minmax(0, 1fr) auto;
		gap: 20px;
		align-items: baseline;
		width: 100%;
		padding: 15px 6px;
		margin-inline: -6px;
		width: calc(100% + 12px);
		border-radius: 4px;
		font-size: 16px;
		transition: background-color 0.2s;
	}
	a.row:hover,
	button.row:hover {
		background: var(--hover);
	}
	.title {
		font-weight: 700;
	}
	.desc {
		color: var(--muted);
	}
	.meta {
		display: flex;
		gap: 10px;
		align-items: baseline;
		color: var(--muted);
		font-size: 14px;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}
	.arrow {
		display: inline-block;
		color: var(--ink);
		transition:
			translate 0.3s var(--spring),
			color 0.2s;
	}
	.work:hover .arrow {
		translate: 3px -3px;
		color: var(--accent);
	}
	.plus {
		display: inline-block;
		width: 1ch;
		color: var(--ink);
		font-size: 18px;
		line-height: 1;
		transition: rotate 0.35s var(--spring);
	}
	.plus.x {
		rotate: 45deg;
		color: var(--accent);
	}
	.use {
		grid-template-columns: minmax(0, 1fr) auto;
	}
	.use .title {
		font-weight: 400;
	}
	.secret {
		grid-template-columns: minmax(0, 1fr) auto;
	}
	.secret.locked .title {
		font-weight: 400;
		color: var(--muted);
	}

	.more {
		padding: 0 6px 18px calc(9.5em + 20px);
		font-size: 16px;
	}
	.use + .more {
		padding-left: 0;
	}
	.summary {
		color: var(--muted);
		margin-bottom: 8px;
	}
	.points {
		display: grid;
		gap: 4px;
		max-width: 58ch;
	}
	.points li {
		position: relative;
		padding-left: 16px;
	}
	.points li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.7em;
		width: 6px;
		height: 1px;
		background: var(--ink);
	}
	.proof a {
		color: var(--accent);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.skills {
		grid-template-columns: 9.5em minmax(0, 1fr);
	}
	.chips {
		color: var(--muted);
	}
	.skill {
		color: var(--ink);
		transition: color 0.2s;
	}
	.skill:hover,
	.skill.on {
		color: var(--accent);
	}
	.used {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 12px;
		margin-top: 18px;
		min-height: 1.5em;
		font-size: 16px;
	}
	.reset {
		font-size: 14px;
		color: var(--muted);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.reset:hover {
		color: var(--ink);
	}

	.sub {
		margin: 40px 0 10px;
		font-size: 14px;
		color: var(--muted);
	}
	.quiet .title {
		font-weight: 400;
	}

	@media (max-width: 640px) {
		.row,
		.skills {
			grid-template-columns: minmax(0, 1fr) auto;
			gap: 2px 14px;
		}
		.row .desc {
			grid-column: 1 / -1;
			grid-row: 2;
			font-size: 15px;
		}
		.skills .chips {
			grid-column: 1 / -1;
		}
		.more {
			padding-left: 0;
		}
		.static .meta {
			grid-row: 1;
			grid-column: 2;
		}
	}
</style>
