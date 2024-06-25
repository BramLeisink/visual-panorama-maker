<script lang="ts">
	import { writable, derived } from 'svelte/store';

	import * as Tabs from '$lib/components/ui/tabs/index';
	import * as Card from '$lib/components/ui/card/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { Badge } from '$lib/components/ui/badge/index';
	import { Switch } from '$lib/components/ui/switch/index';
	import { Skeleton } from '$lib/components/ui/skeleton/index';
	import { hotSpotInfo, hotSpotsList, pannellumSetup } from '$lib/storedInfo';
	import { Textarea } from '$lib/components/ui/textarea/index';
	import { onMount } from 'svelte';
	import { copyText } from 'svelte-copy';
	import { twi } from 'tw-to-css';
	import { FileJson, TriangleAlert } from 'lucide-svelte';

	const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

	let hotSpots = [];
	let cssFile = '';

	let keepTailwind = true;

	function removeHotSpot(index: number) {
		hotSpotInfo.update((currentHotSpots) => {
			return currentHotSpots.filter((item, i) => i !== index);
		});
	}

	const jsonConfigWithTailwind = derived(pannellumSetup, ($pannellumSetup) =>
		JSON.stringify($pannellumSetup, null, '\t')
	);
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
</svelte:head>

<Card.Root>
	<Card.Header>
		<Card.Title>Export to Pannellum</Card.Title>
		<Card.Description>Description</Card.Description>
	</Card.Header>
	<Card.Content class="space-y-2">
		<!-- <div class="flex items-center space-x-2">
			<Switch id="airplane-mode" bind:checked={keepTailwind} />
			<Label for="airplane-mode">Keep TailwindCSS classes</Label>
		</div> -->

		<!-- {#if !keepTailwind}
			<h3 class="text-lg font-bold">pannellum.config.json</h3>
			<Textarea placeholder="The final code goes here" bind:value={jsonConfigWithoutTailwind} />
			<h3 class="text-lg font-bold">
				pannellum-hotSpots.css <Badge variant="destructive" class="ml-2"
					><TriangleAlert class="mr-2 h-3 w-3" />Experimental</Badge
				>
			</h3>
			<Textarea placeholder="The final code goes here" bind:value={cssFile} />
		{:else} -->
		<h3 class="text-lg font-bold"><FileJson class="h-4 w-4 mr-1 inline" /> pannellum.config.json</h3>
		<Textarea placeholder="The final code goes here" bind:value={$jsonConfigWithTailwind} />
		<!-- {/if} -->
	</Card.Content>
	<!-- <Card.Footer>
				<div class="flex flex-wrap gap-2">
					<Button>Download</Button>
					<Button
						variant="secondary"
						on:click={() => {
							copyText(jsonConfigWithTailwind);
						}}
						on:svelte-copy={(event) => alert(event.detail)}>Copy</Button
					>
				</div>
			</Card.Footer> -->
</Card.Root>
