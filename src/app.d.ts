// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		// App version
		declare const __VERSION__: string;
		// Date of last commit
		declare const __LASTMOD__: string;
	}
}

export {};
