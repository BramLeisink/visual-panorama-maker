<script lang="ts">
	import {
		hotSpotsList,
		viewport,
		selectedHotSpot,
		pannellumSetup,
		selectedScene,
		viewerSettings,
		scenes,
		hotSpotsInSelectedScene,
		pannellumViewer
	} from '$lib/storedInfo';

	import { removeScene } from '$lib/Pannellum';
	import { toast } from 'svelte-sonner';

	import { Button } from '$lib/components/ui/button/index';
	import AddSceneDialog from '$lib/components/editor/AddSceneDialog.svelte';
	import { Trash2, PackagePlus, Package, Variable, Badge } from 'lucide-svelte';

	function removeSceneFromPanorama(id: string) {
		try {
			let sceneTitle = $scenes[id].title;
			removeScene(id);
			toast.success(`'${sceneTitle || id}' succesfully removed.`);
			console.log($scenes);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error('An unknown error occurred.');
			}
		}
	}
</script>

<div class="flex-spread flex h-full w-full flex-col justify-between p-1">
	{#if Object.keys($scenes).length != 0}
		<div class="flex flex-col gap-1 overflow-auto">
			<h3 class="text-lg font-semibold">Scenes</h3>
			{#each Object.entries($scenes) as [key, scene]}
				<Button
					class="group flex items-center justify-between"
					variant={$selectedScene === key ? 'secondary' : 'outline'}
					on:click={() => ($selectedScene = key)}
				>
					<span>{scene.title || key}</span>
					{#if $pannellumSetup.firstScene == key}
						<Badge class="ml-2 h-4 w-4 fill-primary stroke-none" />
					{/if}
					<div class="flex-1" />
					<Button
						variant="destructive"
						size="icon"
						class="h-6 w-6 opacity-0 group-hover:opacity-100"
						on:click={() => removeSceneFromPanorama(key)}
					>
						<Trash2 class="h-4 w-4" />
					</Button>
				</Button>
			{/each}
		</div>
		<div class="flex gap-2 pt-2">
			<Button class="flex-1">Edit scene</Button>
			<AddSceneDialog>
				<Button variant="outline" size="icon"><PackagePlus class="h-4 w-4" /></Button>
			</AddSceneDialog>
		</div>
	{:else}
		<AddSceneDialog class="h-full w-full p-2">
			<Button
				variant="empty"
				class="flex h-full w-full items-center justify-center rounded-2xl border border-2 border-dashed text-center hover:border-muted-foreground"
			>
				<div>
					<div class="flex flex-col items-center justify-center">
						<PackagePlus class="mb-1 h-8 w-8 text-accent" />
						<h2 class="text-lg font-bold">Add scene</h2>
						<p class="text-sm text-muted-foreground">Click to add your first scene.</p>
					</div>
				</div>
			</Button>
		</AddSceneDialog>
	{/if}
</div>
