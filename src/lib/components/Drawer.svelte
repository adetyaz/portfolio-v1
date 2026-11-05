<script lang="ts">
	import { slide, fade } from 'svelte/transition';
	import { roles, skillGroups, useCases } from '$lib/data/profile';
	import Sticker from './Sticker.svelte';

	const tabs = [
		{ id: 'roles', label: 'Roles', color: 'marigold' },
		{ id: 'skills', label: 'Skills', color: 'mint' },
		{ id: 'uses', label: 'Use cases', color: 'bubblegum' }
	] as const;
	type TabId = (typeof tabs)[number]['id'];

	let active = $state<TabId>('roles');
	let openRole = $state<number | null>(0);
	let picked = $state<string | null>('React Native');

	const pickedSkill = $derived(skillGroups.flatMap((g) => g.skills).find((s) => s.name === picked));

	function keyNav(e: KeyboardEvent, i: number) {
		if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
		const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
		active = tabs[next].id;
		(document.getElementById(`drawer-tab-${tabs[next].id}`) as HTMLElement)?.focus();
	}
</script>

<section class="drawer" aria-label="Roles, skills and use cases">
	<div class="tabs" role="tablist">
		{#each tabs as t, i (t.id)}
			<button
				id="drawer-tab-{t.id}"
				role="tab"
				class="tab {t.color}"
				class:on={active === t.id}
				aria-selected={active === t.id}
				aria-controls="drawer-panel"
				tabindex={active === t.id ? 0 : -1}
				onclick={() => (active = t.id)}
				onkeydown={(e) => keyNav(e, i)}
			>
				{t.label}
			</button>
		{/each}
	</div>

	<div id="drawer-panel" class="panel {tabs.find((t) => t.id === active)?.color}" role="tabpanel">
		{#key active}
			<div in:fade={{ duration: 220 }}>
				{#if active === 'roles'}
					<p class="lede hand">Where I've worked. Tap one to open it.</p>
					<ol class="roles">
						{#each roles as r, i (r.company + r.when)}
							<li class:open={openRole === i}>
								<button class="role" aria-expanded={openRole === i} onclick={() => (openRole = openRole === i ? null : i)}>
									<span class="when">{r.when}</span>
									<span class="who">
										<strong>{r.company}</strong>
										<span>{r.title}</span>
									</span>
									<span class="sum">{r.summary}</span>
									<span class="plus" aria-hidden="true">+</span>
								</button>
								{#if openRole === i}
									<ul class="points" transition:slide={{ duration: 260 }}>
										{#each r.points as p (p)}
											<li>{p}</li>
										{/each}
									</ul>
								{/if}
							</li>
						{/each}
					</ol>
				{:else if active === 'skills'}
					<p class="lede hand">Pick a skill to see where I used it.</p>
					<div class="groups">
						{#each skillGroups as g (g.label)}
							<div class="group">
								<h3 class="hand">{g.label}</h3>
								<div class="chips">
									{#each g.skills as s (s.name)}
										<button
											class="chip {g.color}"
											class:on={picked === s.name}
											aria-pressed={picked === s.name}
											onclick={() => (picked = s.name)}
										>
											{s.name}
										</button>
									{/each}
								</div>
							</div>
						{/each}
					</div>
					{#if pickedSkill}
						{#key pickedSkill.name}
							<p class="used" in:fade={{ duration: 200 }}>
								<span class="hand">{pickedSkill.name}, used in</span>
								{#each pickedSkill.usedIn as u, i (u)}
									<Sticker color="paper" rotate={i % 2 ? 2 : -2} draggable={false}>{u}</Sticker>
								{/each}
							</p>
						{/key}
					{/if}
				{:else}
					<p class="lede hand">If you need...</p>
					<div class="uses">
						{#each useCases as u (u.need)}
							<article class="use">
								<h3 class="hand">...{u.need}</h3>
								<p>{u.answer}</p>
								<div class="proof">
									{#each u.proof as pr (pr.label)}
										{#if pr.href}
											<a href={pr.href} class="proof-link">{pr.label} ↗</a>
										{:else}
											<span class="proof-plain">{pr.label}</span>
										{/if}
									{/each}
								</div>
							</article>
						{/each}
					</div>
				{/if}
			</div>
		{/key}
	</div>
</section>

<style>
	.drawer {
		margin-top: 40px;
	}
	.tabs {
		display: flex;
		gap: 4px;
		padding-left: 14px;
	}
	.tab {
		padding: 10px 22px 12px;
		font-family: var(--f-hand);
		font-size: 21px;
		font-weight: 700;
		line-height: 1;
		color: var(--sticker-ink);
		border-radius: 10px 10px 0 0;
		translate: 0 8px;
		filter: saturate(0.55) brightness(1.04);
		transition:
			translate 0.3s var(--ease-spring),
			filter 0.2s;
	}
	.tab:hover {
		translate: 0 3px;
	}
	.tab.on {
		translate: 0 0;
		filter: none;
	}
	.marigold {
		background: var(--marigold);
	}
	.mint {
		background: var(--mint);
	}
	.bubblegum {
		background: var(--bubblegum);
	}
	.panel {
		position: relative;
		padding: 30px clamp(18px, 4vw, 40px) 36px;
		border-radius: 14px;
		color: var(--sticker-ink);
		min-height: 420px;
		transition: background-color 0.3s;
	}
	.lede {
		font-size: 22px;
		margin-bottom: 18px;
	}

	/* roles */
	.roles {
		list-style: none;
		background: #fbfbf9;
		border-radius: 10px;
		box-shadow: 0 10px 30px -20px rgba(0, 0, 0, 0.6);
	}
	.roles > li + li {
		border-top: 1px dashed rgba(0, 0, 0, 0.18);
	}
	.role {
		display: grid;
		grid-template-columns: 110px minmax(0, 1.1fr) minmax(0, 1fr) 20px;
		gap: 16px;
		align-items: center;
		width: 100%;
		padding: 16px 20px;
		text-align: left;
	}
	.role:hover .plus {
		rotate: 90deg;
	}
	.when {
		font-family: var(--f-mono);
		font-size: 11px;
		color: #6a6862;
	}
	.who {
		display: flex;
		flex-direction: column;
	}
	.who strong {
		font-size: 18px;
		line-height: 1.2;
	}
	.who span,
	.sum {
		font-size: 14px;
		color: #55534e;
	}
	.plus {
		font-family: var(--f-mono);
		font-size: 18px;
		transition: rotate 0.3s var(--ease-spring);
	}
	.open .plus {
		rotate: 45deg;
	}
	.points {
		padding: 0 20px 18px calc(20px + 110px + 16px);
		display: grid;
		gap: 6px;
		font-size: 15px;
		list-style: none;
	}
	.points li {
		position: relative;
		padding-left: 18px;
		max-width: 64ch;
	}
	.points li::before {
		content: '✦';
		position: absolute;
		left: 0;
		font-size: 10px;
		top: 5px;
		color: var(--bubblegum);
	}

	/* skills */
	.groups {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 22px 32px;
	}
	.group h3 {
		font-size: 22px;
		margin-bottom: 8px;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.chip {
		padding: 6px 12px;
		font-size: 14px;
		background: #fbfbf9;
		border: 1.5px solid #1a1a1a;
		border-radius: 999px;
		transition:
			translate 0.2s var(--ease-spring),
			box-shadow 0.2s var(--ease-spring),
			background 0.2s;
	}
	.chip:hover {
		translate: 0 -2px;
		box-shadow: 0 3px 0 #1a1a1a;
	}
	.chip.on {
		box-shadow: 0 3px 0 #1a1a1a;
		translate: 0 -2px;
	}
	.chip.on.marigold {
		background: var(--marigold);
	}
	.chip.on.mint {
		background: var(--leaf);
		color: #fff;
	}
	.chip.on.cobalt {
		background: var(--cobalt);
		color: #fff;
	}
	.chip.on.bubblegum {
		background: var(--bubblegum);
	}
	.used {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
		margin-top: 28px;
		padding-top: 18px;
		border-top: 1.5px dashed rgba(0, 0, 0, 0.25);
	}
	.used .hand {
		font-size: 22px;
		font-weight: 700;
	}

	/* use cases */
	.uses {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
	}
	.use {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 18px;
		background: #fbfbf9;
		border-radius: 10px;
		rotate: -0.6deg;
		transition: rotate 0.3s var(--ease-spring);
	}
	.use:nth-child(even) {
		rotate: 0.8deg;
	}
	.use:hover {
		rotate: 0deg;
	}
	.use h3 {
		font-size: 22px;
		line-height: 1.05;
	}
	.use p {
		font-size: 15px;
		color: #55534e;
	}
	.proof {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: auto;
		padding-top: 6px;
	}
	.proof-link,
	.proof-plain {
		font-family: var(--f-mono);
		font-size: 11px;
		padding: 3px 8px;
		border-radius: 4px;
	}
	.proof-link {
		background: #1a1a1a;
		color: #fff;
	}
	.proof-link:hover {
		background: var(--cobalt);
	}
	.proof-plain {
		border: 1px solid rgba(0, 0, 0, 0.3);
	}

	@media (max-width: 860px) {
		.uses {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 640px) {
		.tab {
			padding: 9px 14px 11px;
			font-size: 18px;
		}
		.role {
			grid-template-columns: minmax(0, 1fr) 20px;
			gap: 4px 12px;
		}
		.when {
			grid-column: 1;
		}
		.who {
			grid-column: 1;
		}
		.sum {
			grid-column: 1;
		}
		.plus {
			grid-column: 2;
			grid-row: 1 / span 3;
		}
		.points {
			padding-left: 20px;
		}
		.groups,
		.uses {
			grid-template-columns: 1fr;
		}
	}
</style>
