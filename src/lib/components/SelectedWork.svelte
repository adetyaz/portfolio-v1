<script lang="ts">
	import { projects } from '$lib/data/projects';
</script>

<section class="selected-work" id="work">
	<div class="header-container">
		<h2>Selected <br /> Work</h2>
	</div>

	<div class="gallery">
		{#each projects as project, i}
			<div class="project-card item-{i}">
				<a href="/work/{project.slug}" class="image-wrapper">
					<img src={project.image} alt={project.title} />
				</a>
				<div class="project-info">
					<span class="title">{project.title}</span>
					<span class="year">{project.year}</span>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.selected-work {
		background-color: var(--color-bg-dark);
		color: var(--color-text-dark);
		padding: 8rem 2rem;
		min-height: 100vh;
	}

	.header-container {
		max-width: 1400px;
		margin: 0 auto 6rem;
		border-bottom: 2px solid rgba(255, 255, 255, 0.1);
		padding-bottom: 2rem;
	}

	h2 {
		font-size: clamp(4rem, 10vw, 8rem);
		line-height: 0.9;
	}

	.gallery {
		max-width: 1400px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 2rem;
		/* row-gap: 8rem; To create the staggered look */
	}

	.project-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		transition: transform 0.4s ease;
		cursor: pointer;
	}

	.project-card:hover {
		transform: translateY(-10px);
	}

	.image-wrapper {
		width: 100%;
		aspect-ratio: 4/5;
		overflow: hidden;
		background-color: #333;
	}

	.image-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s ease;
	}

	.project-card:hover .image-wrapper img {
		transform: scale(1.05);
	}

	.project-info {
		display: flex;
		justify-content: space-between;
		font-family: var(--font-body);
		font-size: 0.9rem;
		text-transform: uppercase;
		font-weight: 500;
	}

	/* Simple grid placement for diversity */
	.item-0 {
		grid-column: 2 / span 4;
		margin-top: 0;
	}
	.item-1 {
		grid-column: 8 / span 4;
		margin-top: 15rem;
	}
	.item-2 {
		grid-column: 3 / span 5;
		margin-top: 5rem;
	}
	.item-3 {
		grid-column: 9 / span 3;
		margin-top: -5rem;
	}
	.item-4 {
		grid-column: 2 / span 3;
		margin-top: 10rem;
	}

	@media (max-width: 1024px) {
		.gallery {
			display: flex;
			flex-direction: column;
			gap: 6rem;
		}

		.project-card {
			margin-top: 0 !important;
			width: 100%;
			max-width: 600px;
			margin: 0 auto;
		}
	}
</style>
