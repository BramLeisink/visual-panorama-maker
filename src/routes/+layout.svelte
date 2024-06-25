<script lang="ts">
	import '../app.css';

	import Header from '$lib/components/Header.svelte';
	import { ModeWatcher, mode } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import WipAlert from '$lib/components/WipAlert.svelte';
</script>

<WipAlert dialogOpen={true}></WipAlert>
<Toaster richColors theme={$mode} closeButton />
<ModeWatcher></ModeWatcher>
<div id="body">
	<div class="h-[2.5rem]">
		<Header />
	</div>
	<slot />
</div>

<style>
	#body {
		width: 100%;
		height: calc(100vh - 2.5rem);
	}
</style>
