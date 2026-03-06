import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		version: {
			pollInterval: 0
		}
	},

	vite: {
		ssr: {
			noExternal: ['gsap']
		}
	}
};

export default config;
