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

	import Dropzone from 'svelte-file-dropzone';

	let image: any;

	function handleFilesSelect(e: any) {
		const { acceptedFiles, fileRejections } = e.detail;
		image = acceptedFiles[0];
		console.log(image);
	}

	import { Button, buttonVariants } from '$lib/components/ui/button/index';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';

	import { cn } from '$lib/utils.js';

	let className = '';
	export { className as class };

	import { addScene } from '$lib/Pannellum';
	import { ImageUp, PackagePlus, Trash2 } from 'lucide-svelte';
	import Separator from '../ui/separator/separator.svelte';

	let id = 'MyScene';
	let name = '';

	let dialogOpen = false;

	function addSceneToPanorama() {
		try {
			if (!image) {
				throw new Error('No image selected');
			}
			let scene = {
				title: name,
				type: 'equirectangular',
				panorama: URL.createObjectURL(image),
				hotSpots: []
			};
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

	function formatFileSize(size: number): string {
		if (size === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		const i = Math.floor(Math.log(size) / Math.log(k));
		return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger class={cn(className)}><slot /></Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add Scene</Dialog.Title>
			<Dialog.Description>Add a Scene to the interactive panorama.</Dialog.Description>
		</Dialog.Header>
		<div class="space-y-2 py-4">
			<div class="space-y-1">
				<Label for="id" class="">ID</Label>
				<Input id="id" class="" bind:value={id} />
			</div>
			<div class="space-y-1">
				<Label for="name" class="">Name</Label>
				<Input id="name" class="" bind:value={name} />
			</div>
			<!-- <div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Image</Label>
				<Input id="name" class="col-span-3" type="url" bind:value={image} />
			</div> -->
			<div class="space-y-1">
				<Label for="id" class="">Image</Label>
				{#if image}
					<div class="flex flex-row rounded-lg border p-2">
						<img
							src={URL.createObjectURL(image)}
							alt="Uploaded"
							class="mr-3 h-auto w-32 rounded object-cover"
						/>
						<div>
							<h2 class="text-lg font-bold">
								{image.name}
							</h2>
							<p class="text-sm text-muted-foreground">
								{formatFileSize(image.size)} -
								<button
									type="button"
									class="text-primary underline-offset-4 hover:underline"
									on:click={() => (image = null)}
								>
									Remove
								</button>
							</p>
						</div>
					</div>
				{:else}
					<Dropzone
						disableDefaultStyles
						multiple={false}
						accept="image/*"
						on:drop={handleFilesSelect}
					>
						<div
							class="flex min-h-40 w-full items-center justify-center rounded-2xl border border-2 border-dashed text-center hover:border-muted-foreground"
						>
							<div>
								<div class="flex flex-col items-center justify-center">
									<ImageUp class="mb-1 h-8 w-8 text-primary" />

									<h2 class="text-md">
										<span class="font-bold">Click to upload</span> or drag and drop
									</h2>

									<p class="text-sm text-muted-foreground">SVG, PNG, JPG or GIF</p>
								</div>
							</div>
						</div>
					</Dropzone>
				{/if}
			</div>
		</div>
		<Dialog.Footer>
			<Button on:click={addSceneToPanorama}>Add Scene</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
