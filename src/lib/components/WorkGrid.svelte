<script lang="ts">
	import { onMount } from 'svelte';
	import { projects } from '$lib/data/projects';
	import ParallaxImage from '$lib/components/ParallaxImage.svelte';
	import { gsap } from '$lib/gsap';

	onMount(() => {
		const h2 = document.querySelector('.work-grid-section h2');
		if (h2) {
			const text = h2.textContent || '';
			h2.innerHTML = text
				.split('')
				.map(
					(char) =>
						`<span class="char-wrapper"><span class="reveal-char-work">${char === ' ' ? '&nbsp;' : char}</span></span>`
				)
				.join('');

			gsap.from('.reveal-char-work', {
				y: '100%',
				opacity: 0,
				duration: 1.2,
				ease: 'power4.out',
				stagger: 0.05,
				scrollTrigger: {
					trigger: '.work-grid-section',
					start: 'top 80%'
				}
			});
		}
	});
</script>

<section class="work-grid-section" id="work">
	<div class="section-header">
		<h2>SELECTED WORKS</h2>
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
					<div class="img-wrapper-full">
						<img src={project.image} alt={project.title} />
					</div>
					<div class="overlay">
						<span class="view-btn">View Project</span>
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
		font-size: 1.7rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		margin: 0;
		overflow: hidden;
	}

	:global(.char-wrapper) {
		display: inline-block;
		overflow: hidden;
		vertical-align: top;
	}

	:global(.reveal-char-work) {
		display: inline-block;
		will-change: transform;
		padding: 0.15em 0;
		margin: -0.15em 0;
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
		aspect-ratio: 16/10; /* Wider aspect ratio better for screenshots */
		display: flex;
		justify-content: center;
		align-items: center;
		transition: transform 0.4s ease;
		overflow: hidden;
		cursor: pointer;
		position: relative;
	}

	.image-container:hover {
		transform: scale(0.98);
	}

	.img-wrapper-full {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		transition: transform 0.6s ease;
	}

	/* Target key image styles to blend seamlessly */
	.img-wrapper-full img {
		width: 85%;
		max-width: 85%;
		height: auto;
		max-height: 85%;
		object-fit: contain;
		border-radius: 4px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08); /* Subtle shadow for depth */
		display: block;
		margin: 0 auto; /* Force horizontal centering */
	}

	.image-container:hover .img-wrapper-full img {
		transform: scale(1.02);
		transition: transform 0.6s ease;
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

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		opacity: 0;
		transition: opacity 0.4s ease;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2;
	}

	.image-container:hover .overlay {
		opacity: 1;
	}

	.view-btn {
		background-color: #fff;
		color: #000;
		padding: 1rem 2rem;
		border-radius: 50px;
		font-family: var(--font-body);
		font-weight: 700;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transform: translateY(20px);
		opacity: 0;
		transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
	}

	.image-container:hover .view-btn {
		transform: translateY(0);
		opacity: 1;
	}

	.img-wrapper-full img {
		transition: transform 0.6s ease;
	}

	.image-container:hover .img-wrapper-full img {
		transform: scale(1.05); /* Slight zoom on image too */
	}
</style>
