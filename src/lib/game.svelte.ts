import { browser } from '$app/environment';

export const SECRETS = [
	{ id: 'name', title: 'Name game', hint: 'Names can be clicked. More than once.' },
	{ id: 'lamp', title: 'Lights out', hint: 'The little circle in the corner is a switch.' },
	{ id: 'help', title: 'Ask nicely', hint: 'Press the key that asks a question.' },
	{ id: 'cat', title: 'Cat person', hint: 'Leave the page alone for a while. Then pat what shows up, three times.' },
	{ id: 'hire', title: 'Say the word', hint: 'Type a four-letter word starting with h. Anywhere.' },
	{ id: 'konami', title: 'Old school', hint: '↑ ↑ ↓ ↓ ← → ← → B A' },
	{ id: 'lost', title: 'Lost on purpose', hint: 'Visit a page that does not exist.' }
] as const;

export type SecretId = (typeof SECRETS)[number]['id'];

type Toast = { id: number; text: string; href?: string; linkText?: string };

const KEY = 'adetayo:secrets';

class Game {
	found = $state<SecretId[]>([]);
	toast = $state<Toast | null>(null);
	shortcuts = $state(false);
	stamp = $state(0);
	blueprint = $state(false);
	theme = $state<'light' | 'dark' | null>(null);
	#timer: ReturnType<typeof setTimeout> | undefined;

	#loaded = false;

	constructor() {
		this.init();
	}

	init() {
		if (!browser || this.#loaded) return;
		this.#loaded = true;
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) this.found = JSON.parse(raw);
			const t = localStorage.getItem('theme');
			if (t === 'light' || t === 'dark') this.theme = t;
		} catch {
			/* storage blocked: secrets just won't persist */
		}
	}

	has(id: SecretId) {
		return this.found.includes(id);
	}

	unlock(id: SecretId, message?: string) {
		const fresh = !this.has(id);
		if (fresh) {
			this.found = [...this.found, id];
			try {
				localStorage.setItem(KEY, JSON.stringify(this.found));
			} catch {
				/* ignore */
			}
		}
		const s = SECRETS.find((x) => x.id === id)!;
		const count = `${this.found.length}/${SECRETS.length}`;
		this.say(
			fresh ? `Secret found: ${s.title} (${count})${message ? '. ' + message : ''}` : (message ?? `${s.title} again.`),
			fresh ? { href: '/#secrets', linkText: 'See the list' } : undefined
		);
		if (fresh && this.found.length === SECRETS.length) {
			setTimeout(() => confetti(), 300);
		}
	}

	reset() {
		this.found = [];
		try {
			localStorage.removeItem(KEY);
		} catch {
			/* ignore */
		}
	}

	say(text: string, link?: { href: string; linkText: string }, ms = 3200) {
		clearTimeout(this.#timer);
		this.toast = { id: Date.now(), text, ...link };
		this.#timer = setTimeout(() => (this.toast = null), ms);
	}

	toggleTheme() {
		const current =
			this.theme ??
			(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		this.theme = current === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = this.theme;
		try {
			localStorage.setItem('theme', this.theme);
		} catch {
			/* ignore */
		}
	}

	toggleBlueprint() {
		this.blueprint = !this.blueprint;
		document.documentElement.classList.toggle('blueprint', this.blueprint);
	}

	async copyEmail(email: string) {
		try {
			await navigator.clipboard.writeText(email);
			this.say(`Copied ${email}`);
		} catch {
			this.say(email);
		}
	}
}

export const game = new Game();

const COLORS = ['#2b3bff', '#171717', '#a3a3a3'];

/** Small DOM confetti, no canvas. */
export function confetti(x = window.innerWidth / 2, y = window.innerHeight / 3) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	for (let i = 0; i < 46; i++) {
		const el = document.createElement('span');
		const size = 6 + Math.random() * 8;
		Object.assign(el.style, {
			position: 'fixed',
			left: `${x}px`,
			top: `${y}px`,
			width: `${size}px`,
			height: `${size * (Math.random() > 0.5 ? 1 : 0.45)}px`,
			background: COLORS[i % COLORS.length],
			zIndex: '9999',
			pointerEvents: 'none',
			borderRadius: Math.random() > 0.7 ? '50%' : '1px'
		});
		document.body.appendChild(el);
		const angle = Math.random() * Math.PI * 2;
		const dist = 120 + Math.random() * 260;
		const anim = el.animate(
			[
				{ transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1 },
				{
					transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist + 220}px) rotate(${Math.random() * 720}deg)`,
					opacity: 0
				}
			],
			{ duration: 1100 + Math.random() * 700, easing: 'cubic-bezier(.2,.7,.4,1)' }
		);
		anim.onfinish = () => el.remove();
	}
}
