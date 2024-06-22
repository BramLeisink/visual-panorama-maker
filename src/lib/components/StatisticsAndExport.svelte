<script>
	// @ts-nocheck
	import * as Tabs from '$lib/components/ui/tabs/index';
	import * as Card from '$lib/components/ui/card/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { Badge } from '$lib/components/ui/badge/index';
	import { Switch } from '$lib/components/ui/switch/index';
	import { Skeleton } from '$lib/components/ui/skeleton/index';
	import { hotspotInfo, hotspotsList } from '$lib/storedInfo';
	import { Textarea } from '$lib/components/ui/textarea/index';
	import { onMount } from 'svelte';
	import { copyText } from 'svelte-copy';
	import { twi } from 'tw-to-css';
	import { TriangleAlert } from 'lucide-svelte';

	export let data;
	const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

	let hotspots = [];
	let jsonConfigWithTailwind;
	let jsonConfigWithoutTailwind;
	let cssFile = '';

	let keepTailwind = true;

	function removeHotspot(index) {
		hotspotInfo.update((currentHotspots) => {
			return currentHotspots.filter((item, i) => i !== index);
		});
	}

	onMount(() => {
		hotspotsList.subscribe((value) => {
			hotspots = Object.values(value);
			let hotspotsNoTailwind = [];
			cssFile = '';

			for (const hotspot of hotspots) {
				if (hotspot.cssClass) {
					cssFile += `.${hotspot.id} {${twi(hotspot.cssClass)}}\n`;
				}
				const hotspotWithoutTailwind = { ...hotspot, cssClass: hotspot.id };

				hotspotsNoTailwind.push(hotspotWithoutTailwind);
			}
			jsonConfigWithTailwind =
				'{"type": "equirectangular", "panorama": YOUR_IMAGE_HERE, "hotspots": ' +
				JSON.stringify(hotspots, null, '\t') +
				'}';
			jsonConfigWithoutTailwind =
				'{"type": "equirectangular", "panorama": YOUR_IMAGE_HERE, "hotspots": ' +
				JSON.stringify(hotspotsNoTailwind, null, '\t') +
				'}';
		});
	});
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
</svelte:head>
<Tabs.Root value="export" class="w-full">
	<Tabs.List class="grid w-full grid-cols-2">
		<Tabs.Trigger value="statistics">Statistics</Tabs.Trigger>
		<Tabs.Trigger value="export">Export</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="statistics">
		<Card.Root>
			<Card.Header>
				<Card.Title>Statistics</Card.Title>
			</Card.Header>
			<Card.Content><p>Current yaw: {data.yaw}, Current pitch: {data.pitch}</p></Card.Content>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="export">
		<Card.Root>
			<Card.Header>
				<Card.Title>Export to Pannellum</Card.Title>
				<Card.Description>Description</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="flex items-center space-x-2">
					<Switch id="airplane-mode" bind:checked={keepTailwind} />
					<Label for="airplane-mode">Keep TailwindCSS classes</Label>
				</div>

				{#if !keepTailwind}
					<h3 class="text-lg font-bold">pannellum.config.json</h3>
					<Textarea placeholder="The final code goes here" bind:value={jsonConfigWithoutTailwind} />
					<h3 class="text-lg font-bold">
						pannellum-hotspots.css <Badge variant="destructive" class="ml-2"><TriangleAlert class="w-3 h-3 mr-2" />Experimental</Badge>
					</h3>
					<Textarea placeholder="The final code goes here" bind:value={cssFile} />
				{:else}
					<h3 class="text-lg font-bold">pannellum.config.json</h3>
					<Textarea placeholder="The final code goes here" bind:value={jsonConfigWithTailwind} />
				{/if}
			</Card.Content>
			<Card.Footer>
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
			</Card.Footer>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
