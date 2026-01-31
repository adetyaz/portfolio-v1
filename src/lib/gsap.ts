import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

// Register plugins globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable);
}

// Set global defaults if needed
gsap.defaults({
  duration: 0.8,
  ease: 'power2.out'
});

export { gsap, ScrollTrigger, Draggable };
