<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import {
		hotSpotsList,
		viewport,
		selectedHotSpot,
		scenes,
		selectedScene,
		pannellumViewer
	} from '$lib/storedInfo';
	import { get } from 'svelte/store';
	import type { HotSpot } from '$lib/types';
	import { toast } from 'svelte-sonner';

	// import Dropzone from 'svelte-file-dropzone';

	// let image;

	// function handleFilesSelect(e) {
	// 	const { acceptedFiles, fileRejections } = e.detail;
	// 	image = acceptedFiles[0];
	// 	console.log(image);
	// }

	import { Button, buttonVariants } from '$lib/components/ui/button/index';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';

	import { cn } from '$lib/utils.js';

	let className = '';
	export { className as class };

	import { addScene } from '$lib/Pannellum';
	import { ImageUp, PackagePlus } from 'lucide-svelte';

	let id = 'MyScene';
	let name = '';
	let image = '';

	let dialogOpen = false;

	function addSceneToPanorama() {
		let scene = {
			title: name,
			type: 'equirectangular',
			panorama: image,
			hotSpots: []
		};
		try {
			addScene(id, scene);
			dialogOpen = false;
			toast.success(`'${id}' succesfully added.`);
			selectedScene.set(id);
			selectedHotSpot.set($scenes[id].hotSpots[0]?.id || '');
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error('An unknown error occurred.');
			}
		}
	}
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger class={cn(className)}><slot /></Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add Scene</Dialog.Title>
			<Dialog.Description>Add a Scene to the interactive panorama.</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="id" class="text-right">ID</Label>
				<Input id="id" class="col-span-3" bind:value={id} />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Name</Label>
				<Input id="name" class="col-span-3" bind:value={name} />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Image</Label>
				<Input id="name" class="col-span-3" type="url" bind:value={image} />
			</div>
			<!-- <Dropzone disableDefaultStyles multiple={false} accept="image/*" on:drop={handleFilesSelect}>
				<div
					class="flex min-h-40 w-full items-center justify-center rounded-2xl border border-2 border-dashed text-center hover:border-muted-foreground"
				>
					<div>
						<div class="flex flex-col items-center justify-center">
							<ImageUp class="mb-1 h-8 w-8 text-muted-foreground" />
							{#if image}
								<h2 class="text-lg font-bold">Chosen image</h2>
								<p class="text-sm text-muted-foreground">
									{image.name}
								</p>
							{:else}
								<h2 class="text-lg font-bold">Upload image</h2>

								<p class="text-sm text-muted-foreground">Upload an image to use</p>
							{/if}
						</div>
					</div>
				</div>
			</Dropzone> -->
		</div>
		<Dialog.Footer>
			<Button on:click={addSceneToPanorama}>Add Scene</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
