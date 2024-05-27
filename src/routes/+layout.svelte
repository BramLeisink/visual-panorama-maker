<script lang="ts">
	import '../app.css';

	import Header from '$lib/components/Header.svelte';
</script>

<div class="flex h-screen flex-col">
	<div class="flex-shrink-0">
		<Header />
	</div>
	<div class="flex-grow">
		<slot />
	</div>
</div>
