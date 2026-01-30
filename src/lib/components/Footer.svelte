<script lang="ts">
	import SpotifyWidget from './SpotifyWidget.svelte';
</script>

<footer class="footer" id="contact">
	<div class="cta-container">
		<h2 class="ola">!OLA</h2>
		<h2 class="say-hi">
			<span class="gray">SAY</span> HI
		</h2>
	</div>

	<div class="contact-button-container">
		<SpotifyWidget />
		<a href="mailto:adetayo.lasisi@gmail.com" class="contact-btn">
			<span>SAY HELLO</span>
			<div class="arrow">→</div>
		</a>
	</div>

	<div class="footer-bottom">
		<div class="left">
			<span>©2026</span>
		</div>
		<div class="center">
			<span>LINKEDIN</span>
			<span>TWITTER</span>
		</div>
		<div class="right">
			<span>SCROLL TO TOP</span>
		</div>
	</div>
</footer>

<style>
	.footer {
		background-color: var(--color-bg-light);
		color: var(--color-text-light);
		padding: 8rem 2rem 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 80vh;
		justify-content: space-between;
	}

	.cta-container {
		text-align: center;
		width: 100%;
	}

	h2 {
		font-size: clamp(3rem, 18vw, 14rem);
		line-height: 0.8;
		display: flex;
		justify-content: center;
		gap: 1rem;
		width: 100%;
	}

	.ola {
		/* First line */
	}

	.say-hi {
		/* Second line */
	}

	.gray {
		color: #ccc;
	}

	.contact-button-container {
		margin: 4rem 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.contact-btn {
		border: 2px solid #000;
		padding: 1rem 2rem;
		border-radius: 50px;
		display: flex;
		align-items: center;
		gap: 1rem;
		font-family: var(--font-body);
		font-weight: 700;
		font-size: 1.2rem;
		transition: all 0.3s ease;
	}

	.contact-btn:hover {
		background-color: #000;
		color: #fff;
	}

	.arrow {
		background-color: #000;
		color: #fff;
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		transition: all 0.3s ease;
	}

	.contact-btn:hover .arrow {
		background-color: #fff;
		color: #000;
		transform: rotate(-45deg);
	}

	.footer-bottom {
		width: 100%;
		max-width: 1400px;
		display: flex;
		justify-content: space-between;
		font-family: var(--font-body);
		font-size: 0.75rem;
		text-transform: uppercase;
		border-top: 1px solid #eee;
		padding-top: 2rem;
	}

	.center {
		display: flex;
		gap: 2rem;
	}

	@media (max-width: 768px) {
		h2 {
			flex-direction: column;
			gap: 0;
		}

		.footer-bottom {
			flex-direction: column;
			gap: 1rem;
			align-items: center;
		}
	}
</style>
