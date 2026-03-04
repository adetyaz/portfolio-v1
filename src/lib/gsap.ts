import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { Draggable } from 'gsap/dist/Draggable';

// Register plugins globally
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

// Set global defaults if needed
gsap.defaults({
	duration: 0.8,
	ease: 'power2.out'
});

export { gsap, ScrollTrigger};
