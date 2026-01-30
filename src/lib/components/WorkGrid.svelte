<script lang="ts">
	import { projects } from '$lib/data/projects';
</script>

<section class="work-grid-section" id="work">
	<div class="section-header">
		<h2>WORKS</h2>
	</div>
	<div class="grid-container">
		{#each projects as project, i}
			<article class="project-card">
				<header class="card-header">
					<h3>{project.title}</h3>
					<div class="card-meta">
						<span class="category">{project.category}</span>
						<span class="divider">/</span>
						<span class="number">0{project.id}</span>
					</div>
				</header>
				<a
					href="/work/{project.slug}"
					class="image-container"
					style="background-color: {project.bgcolor || '#eee'}"
				>
					<div class="img-wrapper">
						<img src={project.image} alt={project.title} />
					</div>
				</a>
			</article>
		{/each}
	</div>
</section>

<style>
	.work-grid-section {
		padding: 4rem;
		background-color: var(--color-bg);
		color: var(--color-text);
		min-height: 100vh;
	}

	.section-header {
		max-width: 1600px;
		margin: 0 auto 4rem;
		border-top: 2px solid var(--color-border, #ccc);
		padding-top: 1rem;
	}

	h2 {
		font-family: var(--font-heading);
		font-size: 2rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.grid-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem;
		max-width: 1600px;
		margin: 0 auto;
	}

	.project-card {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		border-top: 1px solid var(--color-border, #ccc);
		padding-top: 2rem;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-family: var(--font-body, sans-serif);
		padding-bottom: 0.5rem;
		border-bottom: 1px solid transparent;
		/* The design doesn't show a border, but strict alignment */
	}

	h3 {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0;
	}

	.card-meta {
		font-size: 0.9rem;
		color: var(--color-text);
		opacity: 0.6;
		text-transform: uppercase;
		display: flex;
		gap: 0.5rem;
	}

	.image-container {
		width: 100%;
		aspect-ratio: 1/1; /* Square ratio as seen in image */
		display: flex;
		justify-content: center;
		align-items: center;
		transition: transform 0.4s ease;
		overflow: hidden;
		cursor: pointer;
	}

	.image-container:hover {
		transform: scale(0.98);
		border-radius: 4px;
	}

	.img-wrapper {
		width: 70%; /* Smaller image inside the container for the "framed" look */
		height: 60%;
		overflow: hidden;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		transition: transform 0.6s ease;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.image-container:hover .img-wrapper {
		transform: scale(1.05);
	}

	/* Responsive adjustments */
	@media (max-width: 1200px) {
		.grid-container {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.grid-container {
			grid-template-columns: 1fr;
			gap: 4rem;
		}

		.work-grid-section {
			padding: 2rem;
		}
	}
</style>
