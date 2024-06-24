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

	import { Button, buttonVariants } from '$lib/components/ui/button/index';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';

	import { addHotSpot, currentYawPitch } from '$lib/Pannellum';

	import { cn } from '$lib/utils.js';

	let className = '';
	export { className as class };

	let position: { yaw: number; pitch: number };
	let yaw = 0;
	let pitch = 0;
	let selected = { label: $scenes[$selectedScene].title, value: $selectedScene };
	let scene = $selectedScene;
	let id = 'MyHotSpot';
	let description = '';

	let dialogOpen = false;

	function updateToNewValues() {
		selected = { label: $scenes[$selectedScene].title, value: $selectedScene };
		scene = $selectedScene;

		position = currentYawPitch();
		yaw = position.yaw;
		pitch = position.pitch;
	}

	function addHotSpotToScene() {
		let hotSpot: HotSpot = { id: id, yaw: yaw, pitch: pitch, type: 'info', text: description };
		try {
			addHotSpot(hotSpot, scene);
			dialogOpen = false;
			toast.success(`'${id}' succesfully added to scene.`);
			$selectedScene = scene;
			$selectedHotSpot = id;
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error('An unknown error occurred.');
			}
		}
	}
</script>

<Dialog.Root bind:open={dialogOpen} onOpenChange={updateToNewValues}>
	<Dialog.Trigger class={cn(className)}><slot /></Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add HotSpot</Dialog.Title>
			<Dialog.Description>Add a HotSpot to the interactive panorama.</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="id" class="text-right">ID</Label>
				<Input id="id" bind:value={id} class="col-span-3" />
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="id" class="text-right">Scene</Label>
				<Select.Root
					portal={null}
					{selected}
					onSelectedChange={(s) => {
						s && (scene = s.value);
					}}
				>
					<Select.Trigger class="col-span-3 w-full">
						<Select.Value placeholder="Select a scene" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>Scenes</Select.Label>
							{#each Object.entries($scenes) as [key, scene]}
								<Select.Item value={key} label={scene.title}>{scene.title}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
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
		</div>
		<Dialog.Footer>
			<Button on:click={addHotSpotToScene}>Add hotSpot</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
