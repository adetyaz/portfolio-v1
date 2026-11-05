<!-- Ported from svelte-bits CountUp: spring count when scrolled into view. -->
<script lang="ts">
	import { animate } from 'motion';

	let {
		to,
		from = 0,
		duration = 1.6,
		delay = 0,
		class: cls = ''
	}: { to: number; from?: number; duration?: number; delay?: number; class?: string } = $props();

	let el: HTMLSpanElement;
	const decimals = $derived(String(to).includes('.') ? String(to).split('.')[1].length : 0);
	const fmt = (v: number) => v.toFixed(decimals);

	$effect(() => {
		el.textContent = fmt(from);
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			el.textContent = fmt(to);
			return;
		}
		let stop: (() => void) | undefined;
		let timer: ReturnType<typeof setTimeout>;
		const io = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return;
			io.disconnect();
			timer = setTimeout(() => {
				const c = animate(from, to, {
					type: 'spring',
					damping: 20 + 40 / duration,
					stiffness: 100 / duration,
					onUpdate: (v: number) => (el.textContent = fmt(v))
				});
				stop = () => c.stop();
			}, delay * 1000);
		});
		io.observe(el);
		return () => {
			io.disconnect();
			clearTimeout(timer);
			stop?.();
		};
	});
</script>

<span bind:this={el} class={cls}>{fmt(to)}</span>
