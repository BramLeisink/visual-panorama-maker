<script lang="ts">
	// Import necessary components and functions
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { hotspotsList, viewport, selectedHotspot } from '$lib/storedInfo';
	import { Button } from '$lib/components/ui/button/index';
	import AddHotspotDialog from '$lib/components/AddHotspotDialog.svelte';
	import { Trash2 } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card/index.js';

	// Define variables and functions
	let info: Record<string, any> = {};
	let currentSelectedHotspot: string | null = null;

	export let currentViewport = { yaw: 0, pitch: 0 };

	// Function to remove hotspot by key
	function removeHotspot(key: string) {
		hotspotsList.update((currentHotspots) => {
			const { [key]: _, ...rest } = currentHotspots; // Use destructuring to remove the hotspot
			return rest;
		});
		if (currentSelectedHotspot == key) {
			selectedHotspot.set("");
		}
	}

	// Function to select a hotspot by key
	function selectHotspot(key: string) {
		currentSelectedHotspot = key;
		selectedHotspot.set(key);
	}

	// On mount, subscribe to hotspotsList changes
	onMount(() => {
		hotspotsList.subscribe((value) => {
			info = value;
		});
		viewport.subscribe((value) => {
			currentViewport = value;
		});
		selectedHotspot.subscribe((value) => {
			currentSelectedHotspot = value;
		});
	});
</script>

<div class="flex-spread flex h-full w-full flex-col justify-between p-1">
	<div class="flex flex-col gap-1 overflow-auto">
		<h3 class="text-lg font-semibold">Hotspots</h3>
		{#each Object.entries(info) as [key, item]}
			<Button
				class="group flex items-center justify-between"
				variant={currentSelectedHotspot === key ? 'secondary' : 'outline'}
				on:click={() => selectHotspot(key)}
			>
				<span>{item.id}</span>
				<Button
					variant="destructive"
					size="icon"
					class="h-6 w-6 opacity-0 group-hover:opacity-100"
					on:click={() => removeHotspot(key)}
				>
					<Trash2 class="h-4 w-4" />
				</Button>
			</Button>
		{/each}
	</div>
	<AddHotspotDialog position={currentViewport}>
		<Button class="w-full">Add Hotspot</Button>
	</AddHotspotDialog>
</div>
