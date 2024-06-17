<script>
	// @ts-nocheck
	import * as Tabs from '$lib/components/ui/tabs/index';
	import * as Card from '$lib/components/ui/card/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { Skeleton } from '$lib/components/ui/skeleton/index';
	import { hotspotsList } from '$lib/storedInfo';
	import { Textarea } from '$lib/components/ui/textarea/index';
	import { onMount } from 'svelte';
	import { copyText } from 'svelte-copy';
	export let data;
	const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

	let info = [];
	let infoText;
	function removeHotspot(index) {
		hotspotInfo.update((currentHotspots) => {
			return currentHotspots.filter((item, i) => i !== index);
		});
	}
	onMount(() => {
		hotspotsList.subscribe((value) => {
			info = Object.values(value);
			console.log(info)
			infoText =
				'{"type": "equirectangular", "panorama": "YOUR IMAGE HERE", "hotspots": ' +
				JSON.stringify(info, null, "\t") +
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
				<Card.Description
					><p>Current yaw: {data.yaw}, Current pitch: {data.pitch}</p></Card.Description
				>
			</Card.Header>
			<Card.Content class="space-y-2"
				><div class="hotspots w-full">
					{#each info as item, index}
						<div class="w-full bg-blue-500">
							<p>Hotspot {index + 1} Yaw: {item.yaw}, Pitch: {item.pitch}</p>
							<button on:click={() => removeHotspot(index)} class="material-icons">delete</button>
						</div>
					{/each}
				</div></Card.Content
			>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="export">
		<Card.Root>
			<Card.Header>
				<Card.Title>Customize hotspot</Card.Title>
				<Card.Description>Description</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
				<Textarea placeholder="The final code goes here" bind:value={infoText} />
			</Card.Content>
			<Card.Footer>
				<div class="flex flex-wrap gap-2">
					<Button>Download</Button>
					<Button variant="secondary" on:click={() => {copyText(infoText)}} on:svelte-copy={(event) => alert(event.detail)}>Copy</Button>
					
				</div>
			</Card.Footer>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
