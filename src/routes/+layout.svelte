<script lang="ts">
	import '../app.css';
	import { ModeWatcher, mode } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import { toast } from 'svelte-sonner';
	import { inject } from '@vercel/analytics';

	import { onMount } from 'svelte';

	onMount(() => {
		const report_error = (msg: string = 'unknown error') => {
			toast.error(msg, { action: { label: 'report', onClick: () => console.log('Undo') } });
		};

		const handle_rejection = (e: PromiseRejectionEvent) => {
			e.preventDefault();
			report_error(e?.reason);
			console.log(e);
		};

		const handle_error = (e: ErrorEvent) => {
			e.preventDefault();
			report_error(e?.message);
			console.log(e);
		};

		window.addEventListener('unhandledrejection', handle_rejection);
		window.addEventListener('error', handle_error);

		return () => {
			window.removeEventListener('unhandledrejection', handle_rejection);
			window.removeEventListener('error', handle_error);
		};
	});
</script>

<Toaster richColors theme={$mode} />
<ModeWatcher />

<slot />
