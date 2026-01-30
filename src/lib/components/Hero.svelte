<script lang="ts">
	import Header from './Header.svelte';
</script>

<section class="hero">
	<Header />

	<div class="content warning-no-scroll">
		<!-- Added temporary class to visualize boundary if needed -->
		<h1 class="name">
			<span class="first">Adetayo</span>
		</h1>

		<div class="main-visual">
			<div class="image-container">
				<!-- Placeholder image - using a nice portrait placeholder -->
				<img
					src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
					alt="Adetayo Lasisi"
				/>
			</div>
			<h1 class="name">
				<span class="last">Lasisi</span>
			</h1>

			<div class="side-text left">
				<span>blockchain</span>
				<span>design</span>
			</div>

			<div class="side-text right">
				<span>development</span>
				<span>code</span>
			</div>
		</div>

		<div class="bio">
			<p>
				FRONTEND ENGINEER CRAFTING DIGITAL EXPERIENCES AND PRODUCTS. I BUILD INTERFACES FOR WEB3
				PRODUCTS.
			</p>

			<div class="small-image">
				<!-- Smaller illustrative image -->
				<img
					src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=500&auto=format&fit=crop"
					alt="Creative Cat"
				/>
			</div>

			<div class="tech-stack-lines">
				<span>FIGMA - BLOCKCHAIN</span>
				<span>MOTION - SVELTE - REACT - GSAP</span>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 8rem; /* Space for fixed/absolute header */
		overflow: hidden;
		background-color: var(--color-bg-light);
	}

	.content {
		width: 100%;
		max-width: 1400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 0 2rem;
	}

	.name {
		font-size: clamp(3rem, 13vw, 12rem);
		line-height: 0.6;
		letter-spacing: -0.08em;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 0.5rem;
		width: 100%;
	}

	.name span {
		display: block;
	}

	.main-visual {
		position: relative;
		margin: 0.5rem 0 2rem;
		width: 100%;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.image-container {
		width: 100%;
		aspect-ratio: 3/4;
		overflow: hidden;
		/* background-color: #ccc;Placeholder color */
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.side-text {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		font-family: var(--font-body);
		font-size: 0.75rem;
		text-transform: uppercase;
		writing-mode: vertical-rl;
		letter-spacing: 0.1em;
		display: flex;
		gap: 4rem;
		height: 100%;
		justify-content: center;
	}

	.side-text.left {
		left: -3rem;
		transform: translateY(-50%) rotate(180deg);
	}

	.side-text.right {
		right: -3rem;
	}

	.bio {
		margin-top: 4rem;
		max-width: 600px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.bio p {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		text-transform: uppercase;
		line-height: 1.3;
		font-weight: 400;
	}

	.small-image {
		width: 150px;
		height: 150px;
		overflow: hidden;
	}

	.small-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.tech-stack-lines {
		font-family: var(--font-body);
		font-size: 0.7rem;
		text-transform: uppercase;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		opacity: 0.7;
	}

	@media (max-width: 768px) {
		.side-text {
			display: none;
		}

		.hero {
			padding-top: 0;
		}
	}
</style>
