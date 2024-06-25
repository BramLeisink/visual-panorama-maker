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
	import AddHotSpotDialog from '$lib/components/editor/AddHotSpotDialog.svelte';
	import { CircleArrowUp, CircleHelp, CirclePlus, Info, Trash2 } from 'lucide-svelte';

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
	{#if Object.keys($scenes).length != 0 && $selectedScene}
		{#if $scenes[$selectedScene].hotSpots.length != 0}
			<div class="flex flex-col gap-1 overflow-auto">
				<h3 class="text-lg font-semibold">HotSpots</h3>
				{#each $hotSpotsInSelectedScene as hotSpot}
					<Button
						class="group flex"
						variant={$selectedHotSpot === hotSpot.id ? 'secondary' : 'outline'}
						on:click={() => ($selectedHotSpot = hotSpot.id)}
					>
						<span class="mr-2">
							{#if hotSpot.cssClass}
								<div class={hotSpot.cssClass} />
							{:else if hotSpot.type == 'scene'}
								<CircleArrowUp class="h-5 w-5 text-muted-foreground" />
							{:else if hotSpot.type == 'info'}
								<Info class="h-5 w-5 text-muted-foreground" />
							{:else}
								<CircleHelp class="h-5 w-5 text-muted-foreground" />
							{/if}
						</span>
						<span class="flex-1 text-left">{hotSpot.id}</span>
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
		{:else}<AddHotSpotDialog class="h-full w-full p-2">
				<Button
					variant="empty"
					class="flex h-full w-full items-center justify-center rounded-2xl border border-2 border-dashed text-center hover:border-muted-foreground"
				>
					<div>
						<div class="flex flex-col items-center justify-center">
							<CirclePlus class="mb-1 h-8 w-8 text-accent" />
							<h2 class="text-lg font-bold">Add HotSpot</h2>
							<p class="text-sm text-muted-foreground">Click to add your first hotspot.</p>
						</div>
					</div>
				</Button>
			</AddHotSpotDialog>{/if}
	{:else}
		<div class="h-full w-full p-2">
			<div
				class="flex h-full w-full items-center justify-center rounded-2xl border border-2 border-dashed text-center"
			>
				<div>
					<div class="flex flex-col items-center justify-center">
						<CirclePlus class="mb-1 h-8 w-8 text-accent" />
						<h2 class="text-lg font-bold">HotSpots</h2>
						<p class="text-sm text-muted-foreground">First add a scene.</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
