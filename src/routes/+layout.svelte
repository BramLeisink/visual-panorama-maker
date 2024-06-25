<script lang="ts">
	import '../app.css';
	import { ModeWatcher, mode } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<Toaster richColors theme={$mode} closeButton />
<ModeWatcher />
<slot />