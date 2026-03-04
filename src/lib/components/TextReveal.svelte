<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	let { text = '', class: className = '', stagger = 0.02, duration = 1.2 } = $props();

	let container: HTMLElement;
	let words: string[] = $derived(text.split(' '));

	onMount(() => {
		if (!container) return;

		const wordElements = container.querySelectorAll('.reveal-word');

		gsap.from(wordElements, {
			y: '100%',
			opacity: 0,
			duration,
			ease: 'power4.out',
			stagger,
			scrollTrigger: {
				trigger: container,
				start: 'top 90%',
				toggleActions: 'play none none reverse'
			}
		});
	});
</script>

<div bind:this={container} class="reveal-container {className}">
	{#each words as word, i (i)}
		<span class="reveal-wrapper">
			<span class="reveal-word">{word}&nbsp;</span>
		</span>
	{/each}
</div>

<style>
	.reveal-container {
		display: flex;
		flex-wrap: wrap;
	}

	.reveal-wrapper {
		display: inline-block;
		overflow: hidden;
		vertical-align: top;
	}

	.reveal-word {
		display: inline-block;
		will-change: transform;
	}
</style>
