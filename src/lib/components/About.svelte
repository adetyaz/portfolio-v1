<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap, ScrollTrigger } from '$lib/gsap';

	import catGif from '$lib/assets/lottie/Loader cat.gif';

	onMount(() => {
		// 1. Text Reveal for Roles
		const roles = document.querySelectorAll('.role');
		roles.forEach((role) => {
			const text = role.textContent || '';
			role.innerHTML = text
				.split('')
				.map(
					(char) =>
						`<span class="char-wrapper"><span class="reveal-char-about">${char === ' ' ? '&nbsp;' : char}</span></span>`
				)
				.join('');

			gsap.from(role.querySelectorAll('.reveal-char-about'), {
				y: '100%',
				opacity: 0,
				duration: 0.8,
				ease: 'power3.out',
				stagger: 0.01,
				scrollTrigger: {
					trigger: role,
					start: 'top 90%'
				}
			});
		});

		// 2. Block Reveal for Dates and Company
		const blockTargets = document.querySelectorAll('.dates, .company');
		blockTargets.forEach((target) => {
			const originalContent = target.innerHTML;
			target.innerHTML = `<span class="reveal-text">${originalContent}</span>`;

			const block = document.createElement('div');
			block.className = 'reveal-block-about';
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
				background: 'var(--color-text)', // Dynamic opposite color
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

		// 3. Text Highlight Scroll Effect for Bio
		const bioElements = document.querySelectorAll('.bio-content h1, .motivation');
		bioElements.forEach((el) => {
			const text = el.textContent || '';
			el.innerHTML = text
				.split('')
				.map((char) => `<span class="highlight-char">${char === ' ' ? ' ' : char}</span>`)
				.join('');

			gsap.fromTo(
				el.querySelectorAll('.highlight-char'),
				{
					opacity: 0.2
				},
				{
					opacity: 1,
					stagger: 0.1,
					ease: 'none',
					scrollTrigger: {
						trigger: el,
						start: 'top 80%',
						end: 'top 20%',
						scrub: true
					}
				}
			);
		});

		// Ensure ScrollTrigger updates after DOM modifications
		ScrollTrigger.refresh();
	});
</script>

<section class="about-container" id="about">
	<div class="intro-section">
		<div class="cat-visual">
			<img src={catGif} alt="Loading Cat" />
		</div>
		<div class="bio-content">
			<h1>
				I'm Adetayo, a Frontend Engineer specializing in building immersive web experiences. With a
				focus on Web3 and Blockchain interfaces, I transform complex protocols into intuitive,
				user-centric applications. Beyond the traditional web, I am deeply skilled in architecting
				performant browser extensions that enhance user workflows.
			</h1>
			<p class="motivation">
				I am a builder at heart, fueled by the competitive energy of buildathons and hackathons. I'm
				proud to have won two major Web3 hackathons, and I continually participate in buildathons to
				push the boundaries of what's possible at the intersection of design and code.
			</p>
		</div>
	</div>

	<div class="experience-section">
		<div class="role-list">
			<div class="role-item">
				<div class="dates-wrapper">
					<span class="dates">2025 - PRESENT</span>
				</div>
				<span class="role">FULLSTACK FRONTEND ENGINEER</span>
				<div class="company-wrapper">
					<span class="company">CYRENEAI</span>
				</div>
			</div>
			<div class="role-item">
				<div class="dates-wrapper">
					<span class="dates">2023 - 2025</span>
				</div>
				<span class="role">BROWSER EXTENSION ENGINEER</span>
				<div class="company-wrapper">
					<span class="company">NETSEPIO</span>
				</div>
			</div>
			<div class="role-item">
				<div class="dates-wrapper">
					<span class="dates">2025</span>
				</div>
				<span class="role">FULLSTACK FRONTEND ENGINEER</span>
				<div class="company-wrapper">
					<span class="company">HAILCUBEAI</span>
				</div>
			</div>
			<div class="role-item">
				<div class="dates-wrapper">
					<span class="dates">2021 - 2024</span>
				</div>
				<span class="role">FULLSTACK FRONTEND ENGINEER</span>
				<div class="company-wrapper">
					<span class="company">LDTALENTNETWORK</span>
				</div>
			</div>
			<div class="role-item">
				<div class="dates-wrapper">
					<span class="dates">2020 - PRESENT</span>
				</div>
				<span class="role">FREELANCE DEVELOPER</span>
				<div class="company-wrapper">
					<span class="company">REMOTE</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about-container {
		padding: 4rem 0;
		background-color: var(--color-bg);
		color: var(--color-text);
		font-family: var(--font-body, sans-serif);
		scroll-margin-top: 100px;
	}

	.intro-section {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: 2rem;
		padding: 4rem 6rem;
		align-items: flex-start;
	}

	.bio-content {
		grid-column: 2;
		max-width: 800px;
	}

	.bio-content h1 {
		font-family: var(--font-body);
		text-transform: none;
		font-size: 1.5rem;
		font-weight: 400;
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.motivation {
		font-family: var(--font-body);
		font-size: 1.2rem;
		font-weight: 400;
		line-height: 1.6;
		color: var(--color-text);
		opacity: 0.7;
	}

	.experience-section {
		padding: 4rem 6rem;
		display: flex;
		justify-content: flex-end;
	}

	.role-list {
		width: 100%;
		max-width: 800px;
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
		position: relative;
	}

	.role-item::before {
		content: '◈';
		color: var(--color-text);
		font-size: 0.8rem;
		position: absolute;
		transform: translateX(-2rem);
	}

	.dates {
		color: var(--color-text);
		opacity: 0.8;
	}

	.role {
		color: var(--color-text);
		font-weight: 700;
		display: inline-block;
	}

	.company {
		color: var(--color-text);
		text-align: right;
		opacity: 0.8;
	}

	@media (max-width: 1024px) {
		.intro-section {
			grid-template-columns: 1fr;
			padding: 2rem;
		}

		.bio-content {
			grid-column: 1;
		}

		.experience-section {
			padding: 2rem;
		}

		.role-item {
			grid-template-columns: 100px 1fr 100px;
			gap: 1rem;
			font-size: 0.8rem;
		}
	}

	@media (max-width: 768px) {
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

	:global(.char-wrapper) {
		display: inline-block;
		overflow: hidden;
		vertical-align: top;
	}

	:global(.reveal-char-about) {
		display: inline-block;
		will-change: transform;
		padding: 0.2em 0; /* Prevents top/bottom clipping */
		margin: -0.2em 0; /* Offsets padding */
	}

	.dates-wrapper,
	.company-wrapper {
		display: inline-flex;
		align-items: center;
	}

	:global(.reveal-block-about) {
		pointer-events: none;
	}

	:global(.highlight-char) {
		display: inline;
		transition: opacity 0.1s ease;
	}

	.cat-visual {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cat-visual img {
		width: 300px; /* Increased size */
		max-width: 100%;
		height: auto;
		object-fit: contain;
	}

	@media (max-width: 1024px) {
		.cat-visual {
			margin-bottom: 2rem;
		}
	}

	@media (max-width: 768px) {
		.cat-visual {
			display: none;
		}
	}
</style>
