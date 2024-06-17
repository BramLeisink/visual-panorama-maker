<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { hotspotsList, viewport, selectedHotspot } from '$lib/storedInfo';
	import { get } from 'svelte/store';

	import { Button, buttonVariants } from '$lib/components/ui/button/index';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';

	export let position = { yaw: 0, pitch: 0 };
	let yaw = position.yaw;
	let pitch = position.pitch;
	let id = 'MyHotspot';
	let description = '';
	let errorMessage = '';

	export let dialogOpen = false;

	function addHotspot() {
		const currentHotspots = get(hotspotsList);
		const isValidId = /^[a-zA-Z0-9_-]+$/.test(id); // Check for valid characters (alphanumeric, hyphen, underscore)
		const isUniqueId = !(id in currentHotspots); // Check for uniqueness

		if (!isValidId) {
			errorMessage = 'ID must only contain letters, numbers, hyphens, and underscores.';
			console.log(errorMessage);
		} else if (!isUniqueId) {
			errorMessage = 'ID must be unique. This ID is already in use.';
			console.log(errorMessage);
		} else {
			errorMessage = '';
			hotspotsList.update((values) => ({
				...values,
				[id]: {
					id,
					yaw: position.yaw,
					pitch: position.pitch,
					type: 'info',
					text: description,
					URL: null
				}
			}));
			selectedHotspot.set(id);
			dialogOpen = false;
		}
	}
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger><slot /></Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add Hotspot</Dialog.Title>
			<Dialog.Description>Add a Hotspot to the interactive panorama.</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="id" class="text-right">ID</Label>
				<Input id="id" bind:value={id} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="yaw" class="text-right">Yaw</Label>
				<Input id="yaw" bind:value={yaw} class="col-span-3" type="number" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="pitch" class="text-right">Pitch</Label>
				<Input id="pitch" bind:value={pitch} class="col-span-3" type="number" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="description" class="text-right">Tooltip</Label>
				<Input id="description" bind:value={description} class="col-span-3" />
			</div>
			{#if errorMessage}
				<div class="text-center text-red-500">{errorMessage}</div>
			{/if}
		</div>
		<Dialog.Footer>
			<Button on:click={addHotspot}>Add hotspot</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
