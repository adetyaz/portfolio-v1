import netsepioImg from '$lib/assets/images/works/netsepio-1.png';
import netsepioImg2 from '$lib/assets/images/works/netsepio-2.png';
import fastaccsImg from '$lib/assets/images/works/fastaccs.png';
import fastaccsImg2 from '$lib/assets/images/works/fastaccs-2.png';
import fastaccsImg3 from '$lib/assets/images/works/fastaccs-3.png';
import coindraftsImg from '$lib/assets/images/works/coindrafts-2.png';
import coindraftsImg2 from '$lib/assets/images/works/coindrafts-3.png';
import cyreneImg from '$lib/assets/images/works/cyrene-1.png';
import cyreneImg2 from '$lib/assets/images/works/cyrene-2.png';
import erebrusImg from '$lib/assets/images/works/erebrus-1.png';
import hailcubeImg from '$lib/assets/images/works/hailcube-1.png';
import hailcubeImg2 from '$lib/assets/images/works/hailcube-2.png';
import playgroundImg from '$lib/assets/images/works/playground.jpg';

export type Tag = 'web3' | 'svelte' | 'react' | 'ai';

export interface Project {
	id: number;
	title: string;
	slug: string;
	image: string;
	images: string[];
	year: string;
	category: string;
	client?: string;
	liveUrl?: string;
	date: string;
	services: string[];
	description: string;
	tagline: string;
	bgcolor: string;
	tags: Tag[];
}

export const projects: Project[] = [
	{
		id: 4,
		title: 'Cyrene AI',
		slug: 'cyrene-ai',
		image: cyreneImg,
		images: [cyreneImg, cyreneImg2],
		year: '2026',
		category: 'Next.js & React / AI',
		client: 'Cyrene',
		liveUrl: 'https://cyreneai.com/',
		date: '2026',
		services: ['Next.js', 'React', 'Solana', 'Reown'],
		description: 'AI-Powered Tokenization Infrastructure for Internet Capital Markets.',
		tagline: 'A Solana dApp on the web, with a mobile app beside it.',
		bgcolor: '#FCE0E8',
		tags: ['web3', 'react', 'ai']
	},
	{
		id: 1,
		title: 'Netsepio',
		slug: 'netsepio',
		image: netsepioImg,
		images: [netsepioImg, netsepioImg2],
		year: '2024',
		category: 'Svelte / Web3',
		client: 'Netsepio',
		liveUrl: 'http://chromewebstore.google.com/detail/netsepio/bbkfclgnbddljhepbfpongcollhocghd',
		date: '2024',
		services: ['Svelte', 'Extension Development', 'Web3'],
		description:
			'Secure VPN & crypto companion with AI-powered protection against scams, malicious sites, and built-in wallet for transactions.',
		tagline: 'A wallet extension that warns you before a bad site does damage.',
		bgcolor: '#E0EFFC',
		tags: ['web3', 'svelte']
	},
	{
		id: 2,
		title: 'FastAccs',
		slug: 'fastaccs',
		image: fastaccsImg,
		images: [fastaccsImg, fastaccsImg2, fastaccsImg3],
		year: '2025',
		category: 'Svelte / Marketplace',
		client: 'FastAccs',
		liveUrl: 'https://fastaccs.vercel.app/',
		date: '2025',
		services: ['SvelteKit', 'Neon Postgres', 'E-commerce'],
		description:
			"Nigeria's most trusted marketplace for verified social media accounts and boosting services. Fast, secure, and reliable delivery guaranteed.",
		tagline: 'A two-sided store, built solo from the database up.',
		bgcolor: '#FFF4E0',
		tags: ['svelte']
	},
	{
		id: 3,
		title: 'CoinDrafts',
		slug: 'coindrafts',
		image: coindraftsImg,
		images: [coindraftsImg, coindraftsImg2],
		year: '2025',
		category: 'Svelte & Rust / Web3 Game',
		client: 'CoinDrafts',
		liveUrl: '#',
		date: 'Coming soon',
		services: ['Svelte', 'Rust', 'Linera Chain'],
		description: 'A draft fantasy style crypto game built on Linera.',
		tagline: 'Fantasy drafts, but the players are coins.',
		bgcolor: '#E0FCF0',
		tags: ['web3', 'svelte']
	},
	{
		id: 5,
		title: 'Erebrus',
		slug: 'erebrus',
		image: erebrusImg,
		images: [erebrusImg],
		year: '2024',
		category: 'Next.js & React / Web3',
		client: 'Erebrus',
		liveUrl: 'https://erebrus.io',
		date: '2024',
		services: ['Next.js', 'React', 'Decentralized VPN'],
		description:
			'Erebrus delivers a decentralized VPN designed to put you in control of your online life. Protect your data, safeguard your privacy, and connect freely in a network built for security, transparency, and digital sovereignty.',
		tagline: 'A decentralized VPN with a calm front door.',
		bgcolor: '#E0E5FC',
		tags: ['web3', 'react']
	},
	{
		id: 6,
		title: 'Hailcube',
		slug: 'hailcube',
		image: hailcubeImg,
		images: [hailcubeImg, hailcubeImg2],
		year: '2025',
		category: 'React / AI Agent',
		client: 'Hailcube',
		liveUrl: 'https://www.hailcube.ai/',
		date: '2025',
		services: ['React', 'Python / FastAPI', 'AI Agents'],
		description:
			'Build AI-native businesses with automated task coordination, assignment, peer reviews, and merges. Context-aware AI manages ICs, MCP-enabled agents, and organizational memory.',
		tagline: 'Task coordination where some of the team are agents.',
		bgcolor: '#EAE0FC',
		tags: ['react', 'ai']
	}
];

/** Shipped work that has no screenshots in the repo yet. */
export const alsoShipped = [
	{
		title: 'CyreneAI mobile',
		note: 'Solana token discovery and trading, on Google Play.',
		stack: 'React Native · Expo'
	},
	{
		title: 'Zygo',
		note: 'Gig-work marketplace with in-app chat and UPI payments, on Google Play.',
		stack: 'React Native'
	},
	{
		title: 'Timbuktu',
		note: 'Online classes, quizzes and live streaming for schools.',
		stack: 'Next.js · tRPC · Drizzle'
	},
	{
		title: 'MyriadFlow',
		note: 'Phygital marketplace, creator launchpad and a WebXR showroom.',
		stack: 'Next.js · WebXR'
	}
];

/** Open source and personal work. Links go out; no case study page. */
export const openSource = [
	{
		title: 'svelte-pasito',
		note: 'A tiny, themeable fluid stepper for Svelte 5, published on npm. My port of pasito.',
		meta: 'npm · demo',
		href: 'https://svelte-pasito.vercel.app',
		image: null as string | null
	},
	{
		title: 'Svelte Bits',
		note: 'Contributor. Ported CursorGrid, MaskedHeading and ScrollExpand from React Bits, all merged. More in review.',
		meta: 'open source',
		href: 'https://github.com/DavidHDev/svelte-bits/pulls?q=is%3Apr+author%3Aadetyaz',
		image: null as string | null
	},
	{
		title: 'Playground',
		note: 'My lab. Nineteen motion studies in Svelte: 3D galleries, page transitions, text reveals.',
		meta: 'GSAP · Motion',
		href: 'https://github.com/adetyaz/svelte-playground',
		image: playgroundImg as string | null
	}
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
