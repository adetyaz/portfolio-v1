import netsepioImg from '$lib/assets/images/works/netsepio-1.png';
import netsepioImg2 from '$lib/assets/images/works/netsepio-2.png';

import fastaccsImg from '$lib/assets/images/works/fastaccs.png';
import fastaccsImg2 from '$lib/assets/images/works/fastaccs-2.png';
import fastaccsImg3 from '$lib/assets/images/works/fastaccs-3.png';

import coindraftsImg from '$lib/assets/images/works/coindrafts-2.png';
import coindraftsImg2 from '$lib/assets/images/works/coindrafts-3.png';

import cyreneImg from '$lib/assets/images/works/cyrene-1.png';
import cyreneImg2 from '$lib/assets/images/works/cyrene-2.png';

import erebrusImg from '$lib/assets/images/works/erebrus-1.png'; // Need to check if there are more
import hailcubeImg from '$lib/assets/images/works/hailcube-1.png';
import hailcubeImg2 from '$lib/assets/images/works/hailcube-2.png';

export interface Project {
    bgcolor: string;
    id: number;
    title: string;
    slug: string;
    image: string; // Main thumbnail
    images?: string[]; // Additional detail images
    year: string;
    category: string;
    client?: string;
    liveUrl?: string;
    date?: string;
    services?: string[];
    description?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Netsepio",
        slug: "netsepio",
        image: netsepioImg,
        images: [netsepioImg, netsepioImg2],
        year: "2024",
        category: "Svelte / Web3",
        client: "Netsepio",
        liveUrl: "http://chromewebstore.google.com/detail/netsepio/bbkfclgnbddljhepbfpongcollhocghd",
        date: "2024",
        services: ["Svelte", "Extension Development", "Web3"],
        description: "Secure VPN & crypto companion with AI-powered protection against scams, malicious sites, and built-in wallet for transactions.",
        bgcolor: "#E0EFFC"
    },
    {
        id: 2,
        title: "FastAccs",
        slug: "fastaccs",
        image: fastaccsImg,
        images: [fastaccsImg, fastaccsImg2, fastaccsImg3],
        year: "2024",
        category: "Svelte / Marketplace",
        client: "FastAccs",
        liveUrl: "https://fastaccs.vercel.app/",
        date: "2024",
        services: ["Svelte", "E-commerce"],
        description: "Nigeria's most trusted marketplace for verified social media accounts and boosting services. Fast, secure, and reliable delivery guaranteed. (Moving to .com very soon)",
        bgcolor: "#FFF4E0"
    },
    {
        id: 3,
        title: "CoinDrafts",
        slug: "coindrafts",
        image: coindraftsImg,
        images: [coindraftsImg, coindraftsImg2],
        year: "2025",
        category: "Svelte & Rust / Web3 Game",
        client: "CoinDrafts",
        liveUrl: "#",
        date: "Coming Soon",
        services: ["Svelte", "Rust", "Linera Chain"],
        description: "A draft fantasy style crypto game built on Linera. (Coming soon)",
        bgcolor: "#E0FCF0"
    },
    {
        id: 4,
        title: "Cyrene AI",
        slug: "cyrene-ai",
        image: cyreneImg,
        images: [cyreneImg, cyreneImg2],
        year: "2025",
        category: "Next.js & React / AI",
        client: "Cyrene",
        liveUrl: "https://cyreneai.com/",
        date: "2025",
        services: ["Next.js", "React", "AI Integration"],
        description: "AI-Powered Tokenization Infrastructure for Internet Capital Markets.",
        bgcolor: "#FCE0E8"
    },
    {
        id: 5,
        title: "Erebrus",
        slug: "erebrus",
        image: erebrusImg,
        images: [erebrusImg], // Only one found so far, will use main
        year: "2024",
        category: "Next.js & React / Web3",
        client: "Erebrus",
        liveUrl: "https://erebrus.io",
        date: "2024",
        services: ["Next.js", "React", "Decentralized VPN"],
        description: "Erebrus delivers a decentralized VPN designed to put you in control of your online life. Protect your data, safeguard your privacy, and connect freely in a network built for security, transparency, and digital sovereignty.",
        bgcolor: "#E0E5FC"
    },
    {
        id: 6,
        title: "Hailcube",
        slug: "hailcube",
        image: hailcubeImg,
        images: [hailcubeImg, hailcubeImg2],
        year: "2025",
        category: "React / AI Agent",
        client: "Hailcube",
        liveUrl: "https://www.hailcube.ai/",
        date: "2025",
        services: ["React", "AI Agents", "Automation"],
        description: "Build AI-native businesses with automated task coordination, assignment, peer reviews, and merges. Watch your visions come to life as context-aware AI manages ICs, MCP-enabled agents, and organizational memory.",
        bgcolor: "#EAE0FC"
    }
];
