import type { Post } from '$lib/types';

async function getCategorizedPosts(fetch: typeof globalThis.fetch) {
	const response = await fetch('/api/posts');
	const categorizedPosts: { [folder: string]: Post[] } = await response.json();
	return categorizedPosts;
}

export async function load(event: { fetch: typeof globalThis.fetch }) {
	const categorizedPosts = await getCategorizedPosts(event.fetch);
	return { categorizedPosts };
}
