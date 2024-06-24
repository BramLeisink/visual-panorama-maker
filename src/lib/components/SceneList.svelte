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
	import AddSceneDialog from './AddSceneDialog.svelte';
	import { Trash2, PackagePlus } from 'lucide-svelte';

	function removeSceneFromPanorama(id: string) {
		let sceneTitle = $scenes[id].title;
		removeScene(id);
		toast.success(`'${sceneTitle}' succesfully removed.`);
	}
</script>

<div class="flex-spread flex h-full w-full flex-col justify-between p-1">
	{#if $selectedScene && $scenes[$selectedScene]}
		<div class="flex flex-col gap-1 overflow-auto">
			<h3 class="text-lg font-semibold">Scenes</h3>
			{#each Object.entries($scenes) as [key, scene]}
				<Button
					class="group flex items-center justify-between"
					variant={$selectedScene === key ? 'secondary' : 'outline'}
					on:click={() => ($selectedScene = key)}
				>
					<span>{scene.title ? scene.title : key}</span>
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
	{/if}
	<div class="flex gap-2 pt-2">
		<Button class="flex-1">Edit scene</Button>
		<AddSceneDialog>
			<Button variant="outline" size="icon"><PackagePlus /></Button>
		</AddSceneDialog>
	</div>
</div>
