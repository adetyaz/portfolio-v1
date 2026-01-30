<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
</script>

<section class="about-container" id="about">
	<div class="intro-section">
		<div class="number-display">1</div>
		<div class="bio-content">
			<h1>
				I'm Adetayo, a Frontend Engineer specializing in building immersive web experiences. With a
				focus on Web3 and Blockchain interfaces, I transform complex protocols into intuitive,
				user-centric applications using modern web technologies.
			</h1>
			<p class="motivation">
				I'm most motivated by the intersection of design and code, crafting pixel-perfect
				interfaces, and building scaleable applications that define the future of the web.
			</p>
		</div>
	</div>

	<div class="experience-section">
		<div class="role-list">
			<div class="role-item">
				<span class="dates">2023 - PRESENT</span>
				<span class="role">SENIOR FRONTEND ENGINEER</span>
				<span class="company">WEB3 PROTOCOL</span>
			</div>
			<div class="role-item">
				<span class="dates">2021 - 2023</span>
				<span class="role">UI ENGINEER</span>
				<span class="company">DEFI STARTUP</span>
			</div>
			<div class="role-item">
				<span class="dates">2019 - 2021</span>
				<span class="role">WEB DEVELOPER</span>
				<span class="company">AGENCY</span>
			</div>
			<div class="role-item">
				<span class="dates">2018 - 2019</span>
				<span class="role">FREELANCE DEVELOPER</span>
				<span class="company">REMOTE</span>
			</div>
		</div>
	</div>

	<div class="gallery-section">
		<div class="gallery-grid">
			<div class="gallery-item large">
				<!-- Placeholder for Desk Setup Image -->
				<div class="image-placeholder main-setup"></div>
			</div>
			<div class="gallery-item small">
				<!-- Placeholder for Keyboard Detail Image -->
				<div class="image-placeholder details"></div>
			</div>
		</div>
	</div>
</section>

<style>
	.about-container {
		/* Adjusted padding for in-page section, keeping top padding for anchor offset if needed, 
           but usually scroll-margin is better. Keeping similar spacing to original page. */
		padding: 4rem 0;
		background-color: var(--color-bg);
		color: var(--color-text);
		font-family: var(--font-body, sans-serif);
		scroll-margin-top: 100px;
	}

	/* Intro Section */
	.intro-section {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 2rem;
		padding: 4rem 6rem;
		align-items: flex-start;
	}

	.number-display {
		font-size: 15rem;
		font-weight: 700;
		line-height: 1;
		color: var(--color-text);
		font-family: var(--font-heading);
	}

	.bio-content {
		max-width: 800px;
		padding-top: 4rem;
	}

	.bio-content h1 {
		font-size: 1.5rem;
		font-weight: 400;
		line-height: 1.5;
		margin-bottom: 2rem;
	}

	.motivation {
		font-size: 1.5rem;
		font-weight: 400;
		line-height: 1.5;
		color: var(--color-text);
		opacity: 0.7;
	}

	/* Experience Section */
	.experience-section {
		padding: 4rem 6rem;
		display: flex;
		justify-content: flex-end;
	}

	.role-list {
		width: 100%;
		max-width: 800px; /* Align with bio content */
	}

	.role-item {
		display: grid;
		grid-template-columns: 150px 1fr 150px;
		gap: 2rem;
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--color-border, #ccc);
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		align-items: center;
	}

	.role-item::before {
		content: '◈';
		color: var(--color-text);
		font-size: 0.8rem;
		position: absolute;
		transform: translateX(-2rem);
	}

	.role-item {
		position: relative;
	}

	.dates {
		color: var(--color-text);
		opacity: 0.8;
	}

	.role {
		color: var(--color-text);
		font-weight: 700;
	}

	.company {
		color: var(--color-text);
		text-align: right;
		opacity: 0.8;
	}

	/* Gallery Section */
	.gallery-section {
		padding: 4rem 6rem;
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 4rem;
		align-items: flex-end;
	}

	.image-placeholder {
		background-color: var(--color-bg-alt, #222);
		border-radius: 4px;
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	.main-setup {
		aspect-ratio: 4/3;
		background-color: var(--color-bg-alt, #333);
	}

	.details {
		aspect-ratio: 1/1;
		background-color: var(--color-bg-alt, #333);
	}

	@media (max-width: 1024px) {
		.intro-section {
			grid-template-columns: 1fr;
			padding: 2rem;
		}

		.number-display {
			font-size: 8rem;
		}

		.bio-content {
			padding-top: 0;
		}

		.experience-section,
		.gallery-section {
			padding: 2rem;
		}

		.role-item {
			grid-template-columns: 100px 1fr 100px;
			gap: 1rem;
			font-size: 0.8rem;
		}
	}

	@media (max-width: 768px) {
		.gallery-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.role-item {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
			padding: 1rem 0;
		}

		.role-item::before {
			display: none;
		}

		.company {
			text-align: left;
		}
	}
</style>
