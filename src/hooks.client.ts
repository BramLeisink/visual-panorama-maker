import { toast } from 'svelte-sonner';

/** @type {import('@sveltejs/kit').HandleClientError} */
export async function handleError({ error, event }) {
	const errorId = crypto.randomUUID();

	// Log the error (you can use any logging service here)
	console.error(`Error ID: ${errorId}`, error);

	// Show a toast notification with the error message
	if (error instanceof Error) {
		toast.error(error.message);
	} else {
		toast.error('An unknown error occurred.');
	}

	// Optionally, you can return additional information for the $page.error store
	return {
		message: 'Whoops!',
		errorId
	};
}
