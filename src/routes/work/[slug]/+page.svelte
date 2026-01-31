<script lang="ts">
	import { page } from '$app/stores';
	import { projects } from '$lib/data/projects';
	import { error } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { gsap } from '$lib/gsap';
	import ParallaxImage from '$lib/components/ParallaxImage.svelte';
	import WalkingCarousel from '$lib/components/WalkingCarousel.svelte';

	// Get the slug from the URL
	$: slug = $page.params.slug;

	// Find the project data
	$: project = projects.find((p) => p.slug === slug);

	// Find next project
	$: currentIndex = projects.findIndex((p) => p.slug === slug);
	$: nextProject =
		currentIndex !== -1 && currentIndex < projects.length - 1
			? projects[currentIndex + 1]
			: projects[0];

	// Handle 404
	// Note: In a real SvelteKit load function this would be better, but doing it clientside for simplicity as allowed.
	$: if (slug && !project) {
		// Just show basic error or redirect logic if needed, but for now we assume valid links
	}

	onMount(() => {
		// Header text reveal
		const h1 = document.querySelector('.work-header h1');
		if (h1) {
			const text = h1.textContent || '';
			h1.innerHTML = text
				.split('')
				.map(
					(char) =>
						`<span class="char-wrapper"><span class="reveal-char-header">${char === ' ' ? '&nbsp;' : char}</span></span>`
				)
				.join('');

			gsap.from('.reveal-char-header', {
				y: '100%',
				opacity: 0,
				duration: 1,
				ease: 'power4.out',
				stagger: 0.02,
				delay: 0.3
			});
		}

		// Block reveal for meta values
		const metaValues = document.querySelectorAll('.value, .value-list');
		metaValues.forEach((target) => {
			const originalContent = target.innerHTML;
			target.innerHTML = `<span class="reveal-text">${originalContent}</span>`;

			const block = document.createElement('div');
			block.className = 'reveal-block-work';
			target.appendChild(block);

			const text = target.querySelector('.reveal-text');

			gsap.set(target, {
				position: 'relative',
				display: 'inline-block',
				overflow: 'hidden',
				opacity: 0
			});

			gsap.set(text, {
				display: 'inline-block'
			});

			gsap.set(block, {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				background: 'var(--color-text)',
				zIndex: 2
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: target,
					start: 'top 90%',
					toggleActions: 'play none none reverse'
				}
			});

			tl.set(text, { opacity: 0 })
				.set(target, { opacity: 1 })
				.fromTo(
					block,
					{ scaleX: 0, transformOrigin: 'left' },
					{ scaleX: 1, duration: 0.5, ease: 'power3.inOut' }
				)
				.set(text, { opacity: 1 })
				.to(block, {
					scaleX: 0,
					transformOrigin: 'right',
					duration: 0.5,
					ease: 'power3.inOut'
				});
		});
	});
</script>

<svelte:head>
	<title>{project ? project.title : 'Work'} | Adetayo Lasisi</title>
</svelte:head>

{#if project}
	<main class="work-container">
		<WalkingCarousel />
		<header class="work-header">
			<div class="header-top">
				<h1>{project.title}</h1>
				<div class="meta-row">
					<span class="category">{project.category}</span>
					<span class="divider">/</span>
					<span class="id">0{project.id}</span>
				</div>
				<div class="year">{project.year}</div>
			</div>
		</header>

		<div class="content-grid">
			<!-- Left Column: Details -->
			<aside class="details-column">
				<div class="meta-grid">
					<div class="meta-item">
						<span class="label">Client</span>
						<span class="value">{project.client || 'Confidential'}</span>
					</div>
					<div class="meta-item">
						<span class="label">Live preview</span>
						<a href={project.liveUrl || '#'} class="value link">{project.liveUrl || 'N/A'}</a>
					</div>
					<div class="meta-item">
						<span class="label">Date</span>
						<span class="value">{project.date || project.year}</span>
					</div>
					<div class="meta-item">
						<span class="label">Development</span>
						<div class="value-list">
							{#if project.services}
								{#each project.services as service, i}
									<span class="service-item">
										{service}
										{#if i < project.services.length - 1}
											<span class="separator"> - </span>
										{/if}
									</span>
								{/each}
							{:else}
								<span>Design</span>
							{/if}
						</div>
					</div>
				</div>

				<div class="description">
					<p>{project.description || 'No description available.'}</p>
				</div>

				<a href="/#work" class="back-button">
					<span class="arrow">←</span>
				</a>
			</aside>

			<!-- Right Column: Visuals -->
			<section class="visuals-column">
				{#if project.images && project.images.length > 0}
					{#each project.images as img, i}
						<div
							class="image-container"
							style="background-color: {project.bgcolor || 'var(--color-bg-alt)'}"
						>
							<div class="img-wrapper-full">
								<img src={img} alt="{project.title} view {i + 1}" />
							</div>
						</div>
					{/each}
				{:else}
					<!-- Fallback if no images array, though data ensures it -->
					<div
						class="image-container"
						style="background-color: {project.bgcolor || 'var(--color-bg-alt)'}"
					>
						<div class="img-wrapper-full">
							<img src={project.image} alt={project.title} />
						</div>
					</div>
				{/if}
			</section>
		</div>

		<footer class="next-project">
			<a href="/work/{nextProject.slug}">
				<span class="label">Next Project</span>
				<span class="title">{nextProject.title}</span>
			</a>
		</footer>
	</main>
{:else}
	<div class="not-found">Project not found</div>
{/if}

<style>
	.work-container {
		padding-top: 120px;
		min-height: 100vh;
		background-color: var(--color-bg);
		color: var(--color-text);
		font-family: var(--font-body, sans-serif);
	}

	.work-header {
		padding: 2rem 4rem;
		margin-bottom: 4rem;
	}

	.header-top {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		border-bottom: 1px solid var(--color-border);
		padding-bottom: 2rem;
	}

	h1 {
		font-size: 2rem;
		font-weight: 600;
		margin: 0;
		text-transform: capitalize;
		overflow: hidden;
	}

	:global(.char-wrapper) {
		display: inline-block;
		overflow: hidden;
		vertical-align: top;
	}

	:global(.reveal-char-header) {
		display: inline-block;
		will-change: transform;
	}

	.meta-row {
		flex-grow: 1;
		margin-left: 2rem;
		color: var(--color-text);
		opacity: 0.6;
		text-transform: uppercase;
		font-size: 0.9rem;
	}

	.year {
		font-size: 0.9rem;
		color: var(--color-text);
		opacity: 0.6;
	}

	.content-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		padding: 0 4rem 6rem;
	}

	/* Details Column */
	.details-column {
		position: sticky;
		top: 140px;
		height: fit-content;
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	.meta-grid {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.meta-item {
		display: grid;
		grid-template-columns: 120px 1fr;
		align-items: flex-start;
		font-size: 0.9rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.label {
		font-weight: 600;
		color: var(--color-text);
	}

	.value {
		text-transform: uppercase;
		color: var(--color-text);
	}

	.link {
		text-decoration: underline;
	}

	.value-list {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		gap: 0.3rem; /* Reduced gap since separator adds space */
		text-transform: uppercase;
		color: var(--color-text);
		opacity: 0.8;
		line-height: 1.6;
	}

	.separator {
		opacity: 0.5;
		margin: 0 0.5rem; /* Add clear space around hyphen */
	}

	.description {
		font-size: 1.25rem;
		line-height: 1.5;
		font-weight: 500;
		max-width: 400px;
	}

	.back-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: var(--color-text);
		color: var(--color-bg);
		font-size: 1.5rem;
		text-decoration: none;
		transition: opacity 0.3s;
	}

	.back-button:hover {
		opacity: 0.8;
	}

	/* Visuals Column */
	.visuals-column {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.image-container {
		width: 100%;
		background-color: var(--color-bg-alt);
		aspect-ratio: 16/10; /* Wider aspect ratio */
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		position: relative;
		overflow: hidden;
	}

	.img-wrapper-full {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* Force standard image behavior even if ParallaxImage is used, 
	   but ideally we should swap to standard img for perfect control */
	:global(.img-wrapper-full img),
	:global(.img-wrapper-full .parallax-image) {
		width: 85% !important;
		max-width: 85% !important;
		height: auto !important;
		max-height: 85% !important;
		object-fit: contain !important;
		position: relative !important; /* Override parallax absolute */
		top: auto !important;
		border-radius: 4px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
		display: block;
		margin: 0 auto;
	}

	:global(.reveal-block-work) {
		pointer-events: none;
	}

	/* Footer Nav */
	.next-project {
		padding: 4rem;
		border-top: 1px solid var(--color-border);
		text-align: right;
	}

	.next-project a {
		text-decoration: none;
		color: var(--color-text);
		display: inline-block;
		transition: transform 0.3s;
	}

	.next-project:hover a {
		transform: translateX(10px);
	}

	.next-project .label {
		display: block;
		font-size: 0.9rem;
		color: var(--color-text);
		opacity: 0.6;
		margin-bottom: 0.5rem;
	}

	.next-project .title {
		font-size: 2rem;
		font-weight: 600;
	}

	@media (max-width: 1024px) {
		.content-grid {
			grid-template-columns: 1fr;
			gap: 4rem;
		}

		.details-column {
			position: relative;
			top: 0;
		}

		.work-header,
		.content-grid {
			padding: 2rem;
		}
	}
</style>
