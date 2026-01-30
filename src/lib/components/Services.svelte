<script lang="ts">
	const services = [
		{
			id: '1',
			title: 'PRODUCT & \nVISUAL DESIGN',
			description:
				'CRAFTING INTUITIVE AND ENGAGING USER EXPERIENCES THROUGH RESEARCH-DRIVEN DESIGN AND VISUAL STORYTELLING. I BRING IDEAS TO LIFE WITH PIXEL-PERFECT PRECISION.'
		},
		{
			id: '2',
			title: 'FRONTEND \nENGINEERING',
			description:
				'BUILDING ROBUST, SCALEABLE APPLICATIONS USING MODERN TECHNOLOGIES LIKE REACT, SVELTE, AND GSAP. BRIDGE THE GAP BETWEEN DESIGN AND CODE SEAMLESSLY.'
		},
		{
			id: '3',
			title: 'WEB3 \nINTERFACES',
			description:
				'DESIGNING AND DEVELOPING SEAMLESS INTERFACES FOR DECENTRALIZED APPLICATIONS. MAKING COMPLEX BLOCKCHAIN INTERACTIONS FEEL SIMPLE AND INTUITIVE.'
		}
	];
</script>

<section class="services">
	<div class="services-header">
		<h2>SERVICES I PROVIDE</h2>
		<h3>Scroll to explore</h3>
	</div>

	<div class="services-list">
		{#each services as service}
			<div class="service-item">
				<span class="number">{service.id}</span>
				<div class="content">
					<h3>{@html service.title.replace(/\n/g, '<br>')}</h3>
					<p>{service.description}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.services {
		background-color: var(--color-bg-light);
		color: var(--color-text-light);
		padding: 8rem 2rem;
		display: flex;
		border-block: 1px solid #ccc;
	}

	.services-header {
		max-width: 1400px;
		margin: 0 auto 4rem;
		border-right: 1px solid #ccc;
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	h2 {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: 0.05em;
	}

	.services-list {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		gap: 2rem;
	}

	.service-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2rem;

		height: 100%;
	}

	.service-item:last-child {
		border-right: none;
	}
	.number {
		font-family: var(--font-heading);
		font-size: 8rem;
		line-height: 1;
		font-weight: 400;
	}

	.content h3 {
		font-family: var(--font-heading);
		font-size: 2rem;
		font-weight: 800;
		text-transform: uppercase;
		margin-bottom: 2rem;
		line-height: 1.1;
	}

	.content p {
		font-family: var(--font-body);
		font-size: 0.8rem;
		line-height: 1.4;
		text-transform: uppercase;
		max-width: 300px;
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.services-list {
			flex-direction: column;
			gap: 6rem;
		}
	}
</style>
