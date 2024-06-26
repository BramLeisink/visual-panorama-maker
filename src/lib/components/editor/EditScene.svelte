<!-- <script lang="ts">
	import { onMount } from 'svelte';

	import {
		hotSpotsList,
		viewport,
		selectedHotSpot,
		scenes,
		selectedScene,
		pannellumViewer
	} from '$lib/storedInfo';

	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { Scene } from '$lib/types';
	import { editScene } from '$lib/Pannellum';

	let className = '';
	export { className as class };
	import { toast } from 'svelte-sonner';

	import Dropzone from 'svelte-file-dropzone';
	import { ImageUp } from 'lucide-svelte';

	let image: any;
	let sceneSettings: Scene;
	let selectedSceneId: string;
	let imageSize: number = 0;

	function handleFilesSelect(e: any) {
		const { acceptedFiles, fileRejections } = e.detail;
		image = acceptedFiles[0];
		console.log(image);
	}

	onMount(() => {
		selectedScene.subscribe(async (value) => {
			sceneSettings = $scenes[value];
			selectedSceneId = value;
			if (sceneSettings.panorama) {
				imageSize = await getImageSize(sceneSettings.panorama);
			}
		});
	});

	async function getImageSize(url: string): Promise<number> {
		const response = await fetch(url);
		const blob = await response.blob();
		return blob.size;
	}

	function formatFileSize(size: number): string {
		if (size === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		const i = Math.floor(Math.log(size) / Math.log(k));
		return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	function saveSceneChanges() {
		try {
			if (!sceneSettings.panorama && !image) {
				throw new Error('No image selected');
			}
			editScene(selectedSceneId, sceneSettings);
			sheetOpen = false;
			toast.success(`'${selectedSceneId}' succesfully modified.`);
			selectedScene.set(selectedSceneId);
		} catch (error) {
			if (error instanceof Error) {
				console.error(error);
				toast.error(error.message);
			} else {
				toast.error('An unknown error occurred.');
			}
		}
	}

	let sheetOpen = false;
</script>

<Sheet.Root bind:open={sheetOpen}>
	<Sheet.Trigger class={className}>
		<slot />
	</Sheet.Trigger>
	<Sheet.Content side="right">
		<Sheet.Header>
			<Sheet.Title>Edit Scene</Sheet.Title>
		</Sheet.Header>
		<div class="space-y-2 py-4">
			<div class="space-y-1">
				<Label for="id">ID</Label>
				<Input disabled id="id" bind:value={selectedSceneId} />
			</div>
			<div class="space-y-1">
				<Label for="title">Title</Label>
				<Input id="title" bind:value={sceneSettings.title} />
			</div>
			<div class="space-y-1">
				<Label for="id" class="">Image</Label>
				{#if sceneSettings.panorama}
					<div class="flex flex-row rounded-lg border p-2">
						<img
							src={sceneSettings.panorama}
							alt="Uploaded"
							class="mr-3 h-auto w-32 rounded object-cover"
						/>
						<div>
							<h2 class="text-lg font-bold">
								{sceneSettings.title || selectedSceneId}
							</h2>
							<p class="text-sm text-muted-foreground">
								{formatFileSize(imageSize)} -
								<button
									type="button"
									class="text-primary underline-offset-4 hover:underline"
									on:click={() => (sceneSettings.panorama = undefined)}
								>
									Remove
								</button>
							</p>
						</div>
					</div>
				{:else if image}
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
		<Sheet.Footer>
			<Sheet.Close>
				<Button on:click={saveSceneChanges}>Save changes</Button>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root> -->
