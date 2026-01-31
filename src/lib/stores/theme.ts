import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

const userTheme = browser ? (localStorage.getItem('theme') as Theme) : 'dark';
const initialTheme = userTheme || 'dark';

export const theme = writable<Theme>(initialTheme);

if (browser) {
    theme.subscribe((value) => {
        localStorage.setItem('theme', value);
        document.documentElement.setAttribute('data-theme', value);
    });
}
