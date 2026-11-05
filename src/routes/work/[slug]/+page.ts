import { error } from '@sveltejs/kit';
import { getProject, projects } from '$lib/data/projects';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const project = getProject(params.slug);
	if (!project) error(404, 'Project not found');
	const i = projects.indexOf(project);
	const next = projects[(i + 1) % projects.length];
	return { project, next };
};
