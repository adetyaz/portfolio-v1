<!-- Ported from svelte-bits DecryptedText (sequential reveal, on view + on hover). -->
<script lang="ts">
	let {
		text,
		speed = 45,
		characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+=?',
		class: cls = ''
	}: { text: string; speed?: number; characters?: string; class?: string } = $props();

	let display = $state('');
	let revealed = $state(0);
	let running = $state(false);
	let el: HTMLSpanElement;
	let timer: ReturnType<typeof setInterval> | undefined;

	function scramble(count: number) {
		return text
			.split('')
			.map((c, i) => (c === ' ' || i < count ? c : characters[Math.floor(Math.random() * characters.length)]))
			.join('');
	}

	function run() {
		if (running) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			display = text;
			return;
		}
		running = true;
		revealed = 0;
		let tick = 0;
		clearInterval(timer);
		timer = setInterval(() => {
			tick++;
			// reveal one character every second tick so the scramble is visible
			if (tick % 2 === 0) revealed++;
			display = scramble(revealed);
			if (revealed >= text.length) {
				clearInterval(timer);
				display = text;
				running = false;
			}
		}, speed);
	}

	$effect(() => {
		display = text;
		const io = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					run();
					io.disconnect();
				}
			},
			{ threshold: 0.2 }
		);
		io.observe(el);
		return () => {
			io.disconnect();
			clearInterval(timer);
		};
	});
</script>

<span bind:this={el} class="decrypt {cls}" onmouseenter={run} role="presentation">
	<span class="sr-only">{text}</span>
	<span aria-hidden="true">
		{#each display.split('') as ch, i (i)}<span class:hot={running && i >= revealed && ch !== ' '}>{ch}</span>{/each}
	</span>
</span>

<style>
	.decrypt {
		display: inline-block;
		white-space: pre-wrap;
	}
	.hot {
		color: var(--accent);
	}
</style>
