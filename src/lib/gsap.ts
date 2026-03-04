import gsap from 'gsap';
import ScrollTriggerPlugin from 'gsap/ScrollTrigger';

const ScrollTrigger = ScrollTriggerPlugin;

// Register plugins globally
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

// Set global defaults if needed
gsap.defaults({
	duration: 0.8,
	ease: 'power2.out'
});

export { gsap, ScrollTrigger };
