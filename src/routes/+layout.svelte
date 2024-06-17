<script lang="ts">
	import '../app.css';

	import Header from '$lib/components/Header.svelte';
	import { ModeWatcher } from 'mode-watcher';
</script>

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
