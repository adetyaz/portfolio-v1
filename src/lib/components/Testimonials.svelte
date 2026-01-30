<script lang="ts">
	/* No dynamic data needed for this static version */
</script>

<section class="testimonials">
	<div class="header">
		<h2>WHAT MY PARTNERS<br />ARE SAYING</h2>
	</div>

	<div class="card-container">
		<div class="polaroid">
			<div class="image-area">
				<img
					src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop"
					alt="Partner"
				/>
			</div>
			<div class="text-area">
				<p class="role">CO-FOUNDER AT SILKY</p>
				<p class="quote">
					"Working with Tusu has been an exceptional journey. They understand the UX language
					effortlessly and turn concepts into reality."
				</p>
				<div class="signature">
					<span>@ Spotify logo</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.testimonials {
		background-color: var(--color-bg-dark);
		color: var(--color-text-dark);
		padding: 8rem 2rem;
		min-height: 80vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.header {
		text-align: center;
		margin-bottom: 6rem;
	}

	h2 {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 800;
		text-transform: uppercase;
		line-height: 1.2;
	}

	.card-container {
		display: flex;
		justify-content: center;
		padding: 2rem;
	}

	.polaroid {
		background-color: white;
		color: black;
		padding: 1.5rem;
		border-radius: 20px;
		max-width: 350px;
		width: 100%;
		transform: rotate(-5deg);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		transition: transform 0.3s ease;
	}

	.polaroid:hover {
		transform: rotate(0deg) scale(1.05);
	}

	.image-area {
		width: 100%;
		aspect-ratio: 1;
		background-color: #eee;
		border-radius: 10px;
		overflow: hidden;
	}

	.image-area img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.text-area {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		text-align: center;
	}

	.role {
		font-family: var(--font-body);
		font-size: 0.7rem;
		font-weight: 700;
		color: #cc3333; /* Accent red color */
		text-transform: uppercase;
	}

	.quote {
		font-family: var(--font-heading); /* Using bold font for quote as typically seen in designs */
		font-family:
			'Times New Roman', Times, serif; /* Or actually maybe a serif for contrast? Reverting to body for cleanliness based on image analysis later if needed. Sticking to design cues. */
		font-family: var(--font-body);
		font-size: 0.9rem;
		font-weight: 600;
		font-style: italic;
	}

	.signature {
		margin-top: 1rem;
		font-size: 0.8rem;
		opacity: 0.6;
	}
</style>
