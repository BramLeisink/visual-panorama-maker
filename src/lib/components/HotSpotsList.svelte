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

	import { removeHotSpot } from '$lib/Pannellum';
	import { toast } from 'svelte-sonner';

	import { Button } from '$lib/components/ui/button/index';
	import AddHotSpotDialog from '$lib/components/AddHotSpotDialog.svelte';
	import { Trash2 } from 'lucide-svelte';

	function removeHotSpotFromScene(hotSpotId: string) {
		try {
			removeHotSpot(hotSpotId, $selectedScene);
			toast.success(`'${hotSpotId}' succesfully removed from scene.`);
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
	{#if $scenes}
		<div class="flex flex-col gap-1 overflow-auto">
			<h3 class="text-lg font-semibold">HotSpots</h3>
			{#each $hotSpotsInSelectedScene as hotSpot}
				<Button
					class="group flex items-center justify-between"
					variant={$selectedHotSpot === hotSpot.id ? 'secondary' : 'outline'}
					on:click={() => ($selectedHotSpot = hotSpot.id)}
				>
					<span>{hotSpot.id}</span>
					<Button
						variant="destructive"
						size="icon"
						class="h-6 w-6 opacity-0 group-hover:opacity-100"
						on:click={() => removeHotSpotFromScene(hotSpot.id)}
					>
						<Trash2 class="h-4 w-4" />
					</Button>
				</Button>
			{/each}
		</div>
		<div class="flex gap-2 pt-2">
			<AddHotSpotDialog class="flex-1">
				<Button class="w-full">Add HotSpot</Button>
			</AddHotSpotDialog>
		</div>
	{:else}
		<div class="p-8">
			<div class="border-2">test</div>
		</div>
	{/if}
</div>
