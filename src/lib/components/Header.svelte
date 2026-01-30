<script lang="ts">
	import { theme } from '$lib/stores/theme';
	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<header class="header">
	<div class="logo">AL</div>

	<button class="menu-toggle" onclick={toggleMenu}>
		{isMenuOpen ? 'Close' : 'Menu'}
	</button>

	<nav class="nav {isMenuOpen ? 'open' : ''}">
		<a href="#about" onclick={closeMenu}>About</a>
		<a href="/#work" onclick={closeMenu}>Work</a>
		<a href="/#contact" onclick={closeMenu}>Contact</a>
		<button onclick={() => ($theme = $theme === 'light' ? 'dark' : 'light')} class="theme-toggle">
			{$theme === 'light' ? 'Dark' : 'Light'}
		</button>
	</nav>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 4rem;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.logo {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.nav {
		display: flex;
		gap: 2rem;
		font-family: var(--font-body);
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.nav a {
		position: relative;
		transition: color 0.3s ease;
	}

	.nav a::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 0;
		height: 1px;
		background-color: currentColor;
		transition: width 0.3s ease;
	}

	.nav a:hover::after {
		width: 100%;
	}

	.theme-toggle {
		background: none;
		border: 1px solid currentColor;
		color: inherit;
		font-family: inherit;
		text-transform: uppercase;
		font-size: 0.8rem;
		padding: 0.25rem 0.75rem;
		cursor: pointer;
		border-radius: 999px;
		transition: all 0.3s ease;
	}

	.theme-toggle:hover {
		background-color: var(--color-text);
		color: var(--color-bg);
	}

	/* Mobile Menu Toggle */
	.menu-toggle {
		display: none;
		background: none;
		border: none;
		color: inherit;
		font-family: var(--font-heading);
		font-size: 1.2rem;
		text-transform: uppercase;
		cursor: pointer;
		z-index: 20;
	}

	@media (max-width: 768px) {
		.header {
			padding: 1.5rem;
		}

		.menu-toggle {
			display: block;
		}

		.nav {
			/* display: none; Removed this to allow toggle */
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			background-color: var(--color-bg);
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 4rem;
			font-size: 2rem;
			transform: translateY(-100%);
			transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
			z-index: 15;
		}

		.nav.open {
			transform: translateY(0);
		}
	}
</style>
