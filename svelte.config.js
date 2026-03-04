import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { adapter: adapter() },

	vite: {
		ssr: {
			noExternal: ['gsap']
		}
	}
};

export default config;
