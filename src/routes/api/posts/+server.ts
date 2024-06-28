import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types';

async function getPosts() {
	let posts: Post[] = [];

	const paths = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = `/docs/${path.split('/').at(-1)?.replace('.md', '')}`;

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;
			post.published && posts.push(post);
		}
	}

	// Categorize posts by folder
	const categorizedPosts: { [folder: string]: Post[] } = {};
	for (const post of posts) {
		if (!categorizedPosts[post.folder]) {
			categorizedPosts[post.folder] = [];
		}
		categorizedPosts[post.folder].push(post);
	}

	// Sort the posts within each folder by their index
	for (const folder in categorizedPosts) {
		categorizedPosts[folder] = categorizedPosts[folder].sort((a, b) => a.index - b.index);
	}

	// Define the order of the folders
	const folderOrder = ['getting started', 'folder3']; // Adjust this order as needed

	// Sort folders based on the predefined order
	const sortedCategorizedPosts: { [folder: string]: Post[] } = {};
	for (const folder of folderOrder) {
		if (categorizedPosts[folder]) {
			sortedCategorizedPosts[folder] = categorizedPosts[folder];
		}
	}

	// Add any remaining folders that were not in the predefined order
	for (const folder in categorizedPosts) {
		if (!(folder in sortedCategorizedPosts)) {
			sortedCategorizedPosts[folder] = categorizedPosts[folder];
		}
	}

	return sortedCategorizedPosts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
