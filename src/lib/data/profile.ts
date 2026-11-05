export const contact = {
	email: 'adetayo.lasisi@gmail.com',
	github: 'https://github.com/adetyaz',
	x: 'https://x.com/cupoftreats',
	linkedin: 'https://www.linkedin.com/in/adetayo-lasisi-aab8b722a/'
};

export interface Role {
	when: string;
	title: string;
	company: string;
	summary: string;
	points: string[];
}

export const roles: Role[] = [
	{
		when: '2026 – now',
		title: 'Full Stack Engineer',
		company: 'CyreneAI',
		summary: 'Web dApp plus two Android apps, for a Web3 startup.',
		points: [
			'Own the full product surface across web and mobile.',
			'Built the web dApp and its design system in Next.js and React.',
			'Shipped the CyreneAI mobile app to Google Play: Solana token discovery and trading, in Expo.',
			'Shipped Zygo to Google Play: a gig-work marketplace with real-time chat and UPI payments.',
			'Wired up Reown wallets and Solana libraries for the onchain parts.'
		]
	},
	{
		when: '2026',
		title: 'Frontend Engineer, contract',
		company: 'Timbuktu',
		summary: 'Online learning and exams for schools.',
		points: [
			'Built quizzes, live class streaming and course creation.',
			'React and Next.js on the front, tRPC and Drizzle for a type-safe data layer.'
		]
	},
	{
		when: '2025 – 2026',
		title: 'Full-Stack Engineer, freelance',
		company: 'FastAccs',
		summary: 'A two-sided store, built solo for a client.',
		points: [
			'Designed the schema and APIs on Neon Postgres for orders, catalog and checkout.',
			'Built the whole frontend in SvelteKit, including checkout and order tracking.',
			'Set up WhatsApp handoff for support and order confirmations.'
		]
	},
	{
		when: '2024 – now',
		title: 'Frontend Engineer',
		company: 'MyriadFlow',
		summary: 'Phygital marketplace with a mixed-reality showroom.',
		points: [
			'Led the frontend for Studio, the creator launchpad.',
			'Directed the WebXR experience where people handle products in 3D.',
			'Added an AI assistant inside the MR space.'
		]
	},
	{
		when: '2023 – now',
		title: 'Frontend Engineer',
		company: 'Lazarus Network · Netsepio',
		summary: 'Wallet extension with scam protection.',
		points: [
			'Owned wallet setup, key handling and the security UX.',
			'Built NFT-based site reviews and content archiving.',
			'Shipped to the Chrome Web Store, where it sits at 5.0.'
		]
	},
	{
		when: '2022 – now',
		title: 'Frontend Engineer & Technical Writer',
		company: 'LD Talent',
		summary: 'Company site, Hailcube, and an internal desktop tool.',
		points: [
			'Built and maintained the company website.',
			'Worked full-stack in Python and FastAPI on Hailcube.',
			'Built an internal Electron tool, plus docs and screencasts.'
		]
	},
	{
		when: '2023',
		title: 'Frontend Engineer',
		company: 'Gemspread',
		summary: 'Customer app for an author-services company.',
		points: ['Pixel-matched the designs.', 'GraphQL with Apollo, forms with React Hook Form and Zod.']
	},
	{
		when: '2022 – 2023',
		title: 'Frontend Engineer',
		company: 'DirectEd',
		summary: 'Three apps on Cardano.',
		points: [
			'Donation and NFT-gifting flows tied to onchain payment confirmation.',
			'Mentored an intern, ran code reviews, cut page load time by 20%.'
		]
	}
];

export interface Skill {
	name: string;
	usedIn: string[];
}
export interface SkillGroup {
	label: string;
	color: 'marigold' | 'mint' | 'bubblegum' | 'cobalt';
	skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
	{
		label: 'Front of house',
		color: 'marigold',
		skills: [
			{ name: 'React', usedIn: ['CyreneAI', 'Hailcube', 'Gemspread'] },
			{ name: 'Next.js', usedIn: ['CyreneAI', 'Timbuktu', 'MyriadFlow', 'Erebrus', 'DirectEd'] },
			{ name: 'Svelte', usedIn: ['Netsepio', 'FastAccs', 'CoinDrafts', 'svelte-pasito', 'Svelte Bits', 'this site'] },
			{ name: 'SvelteKit', usedIn: ['FastAccs', 'this site'] },
			{ name: 'TypeScript', usedIn: ['pretty much everything'] },
			{ name: 'GSAP', usedIn: ['Playground', 'old portfolio'] }
		]
	},
	{
		label: 'Pocket-sized',
		color: 'mint',
		skills: [
			{ name: 'React Native', usedIn: ['Zygo', 'CyreneAI mobile'] },
			{ name: 'Expo', usedIn: ['CyreneAI mobile'] },
			{ name: 'Chrome extensions', usedIn: ['Netsepio'] },
			{ name: 'Electron', usedIn: ['LD Talent internal tool'] }
		]
	},
	{
		label: 'Behind the counter',
		color: 'cobalt',
		skills: [
			{ name: 'Python / FastAPI', usedIn: ['Hailcube'] },
			{ name: 'tRPC', usedIn: ['Timbuktu'] },
			{ name: 'Drizzle ORM', usedIn: ['Timbuktu'] },
			{ name: 'Postgres / Neon', usedIn: ['FastAccs'] },
			{ name: 'GraphQL + Apollo', usedIn: ['Gemspread'] },
			{ name: 'Zod', usedIn: ['Gemspread', 'Timbuktu'] }
		]
	},
	{
		label: 'Onchain',
		color: 'bubblegum',
		skills: [
			{ name: 'Solana', usedIn: ['CyreneAI'] },
			{ name: 'Aptos', usedIn: ['Netsepio'] },
			{ name: 'Cardano', usedIn: ['DirectEd'] },
			{ name: 'Linera / Rust', usedIn: ['CoinDrafts'] },
			{ name: 'Reown wallets', usedIn: ['CyreneAI'] },
			{ name: 'Non-custodial wallets', usedIn: ['Netsepio'] }
		]
	}
];

export interface UseCase {
	need: string;
	answer: string;
	proof: { label: string; href?: string }[];
}

export const useCases: UseCase[] = [
	{
		need: 'a crypto app normal people can use',
		answer: 'Wallet connect, token discovery and trading on Solana, on web and Android.',
		proof: [{ label: 'CyreneAI', href: '/work/cyrene-ai' }, { label: 'CyreneAI mobile' }]
	},
	{
		need: 'a marketplace that takes money',
		answer: 'Catalog, checkout, order tracking and payments, from the schema to the button.',
		proof: [{ label: 'FastAccs', href: '/work/fastaccs' }, { label: 'Zygo (UPI)' }]
	},
	{
		need: 'a browser extension or wallet',
		answer: 'Key handling, security UX, and getting it through Chrome Web Store review.',
		proof: [{ label: 'Netsepio', href: '/work/netsepio' }]
	},
	{
		need: 'real-time features',
		answer: 'In-app chat, live class streaming, things that update without a refresh.',
		proof: [{ label: 'Zygo chat' }, { label: 'Timbuktu live classes' }]
	},
	{
		need: 'an AI product with a real interface',
		answer: 'Agents and assistants with a UI people can follow, plus the API behind them.',
		proof: [{ label: 'Hailcube', href: '/work/hailcube' }, { label: 'MyriadFlow assistant' }]
	},
	{
		need: 'something a bit unusual',
		answer: 'A WebXR showroom, an onchain fantasy game, a portfolio with secrets in it.',
		proof: [{ label: 'MyriadFlow' }, { label: 'CoinDrafts', href: '/work/coindrafts' }]
	}
];
