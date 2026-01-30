<script lang="ts">
	import { page } from '$app/stores';
	import { projects } from '$lib/data/projects';
	import { error } from '@sveltejs/kit';

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
</script>

<svelte:head>
	<title>{project ? project.title : 'Work'} | Tusu Chowdhury</title>
</svelte:head>

{#if project}
	<main class="work-container">
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
								{#each project.services as service}
									<span>{service}</span>
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
				<div class="image-container">
					<img src={project.image} alt={project.title} />
				</div>
				<!-- Add more images here if available in the future -->
				<div class="image-container secondary">
					<img src={project.image} alt="Detail view" style="filter: brightness(0.9);" />
				</div>
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
		background-color: #fff; /* Light theme like the image */
		color: #111;
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
		border-bottom: 1px solid #eee;
		padding-bottom: 2rem;
	}

	h1 {
		font-size: 2rem;
		font-weight: 600;
		margin: 0;
		text-transform: capitalize;
	}

	.meta-row {
		flex-grow: 1;
		margin-left: 2rem;
		color: #666;
		text-transform: uppercase;
		font-size: 0.9rem;
	}

	.year {
		font-size: 0.9rem;
		color: #666;
	}

	.content-grid {
		display: grid;
		grid-template-columns: 1fr 2fr; /* 1/3 detail, 2/3 image */
		gap: 4rem;
		padding: 0 4rem 6rem;
	}

	/* Details Column */
	.details-column {
		position: sticky;
		top: 140px; /* Offset for header */
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
	}

	.label {
		font-weight: 600; /* Bold labels like the image */
		color: #111;
	}

	.value {
		text-transform: uppercase;
		color: #111;
	}

	.link {
		text-decoration: underline;
	}

	.value-list {
		display: flex;
		flex-direction: column;
		text-transform: uppercase;
		color: #666; /* Subtler for list */
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
		background-color: #f0f0f0;
		color: #111;
		font-size: 1.5rem;
		text-decoration: none;
		transition: background-color 0.3s;
	}

	.back-button:hover {
		background-color: #e0e0e0;
	}

	/* Visuals Column */
	.visuals-column {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.image-container {
		width: 100%;
		background-color: #f4f4f0; /* Beige-ish background like image */
		padding: 4rem;
		aspect-ratio: 4/3;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.image-container img {
		max-width: 90%;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		object-fit: cover;
	}

	/* Footer Nav */
	.next-project {
		padding: 4rem;
		border-top: 1px solid #eee;
		text-align: right;
	}

	.next-project a {
		text-decoration: none;
		color: #111;
		display: inline-block;
		transition: transform 0.3s;
	}

	.next-project:hover a {
		transform: translateX(10px);
	}

	.next-project .label {
		display: block;
		font-size: 0.9rem;
		color: #999;
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
