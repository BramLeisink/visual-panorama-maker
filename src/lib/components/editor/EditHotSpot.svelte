<script lang="ts">
	import { onMount } from 'svelte';

	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Toggle } from '$lib/components/ui/toggle/index';
	import * as Select from '$lib/components/ui/select/index';

	import {
		hotSpotsList,
		selectedHotSpot,
		viewerSettings,
		clickedLocation,
		pannellumSetup,
		selectedScene,
		scenes,
		hotSpotTypes,
		pannellumViewer
	} from '$lib/storedInfo';
	import type { HotSpot } from '$lib/types';

	import { removeHotSpot, editHotSpot } from '$lib/Pannellum';
	import { toast } from 'svelte-sonner';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import AddSceneDialog from '$lib/components/editor/AddSceneDialog.svelte';
	import { PackagePlus, Locate } from 'lucide-svelte';
	import { Content } from '$lib/components/ui/dialog';

	let scene: { label: string | undefined; value: string } = { label: '', value: '' };
	$: {
		let scenesArray = Object.entries($scenes);
		if (!scenesArray.length) {
			scene = { label: '', value: '' };
		} else if (!$selectedScene || !$scenes[$selectedScene]) {
			let firstSceneKey = scenesArray[0][0];
			let firstSceneTitle = scenesArray[0][1].title;
			scene = { label: firstSceneTitle, value: firstSceneKey };
			$selectedScene = firstSceneKey;
		} else {
			scene = {
				label: $scenes[$selectedScene].title || $selectedScene,
				value: $selectedScene
			};
		}
	}

	let hotSpotSettings: HotSpot;

	let locationPickerOn = false;

	function saveChanges() {
		try {
			editHotSpot(
				hotSpotSettings,
				scene.value,
				$scenes[$selectedScene].hotSpots[
					$scenes[$selectedScene].hotSpots.findIndex((hotSpot) => hotSpot.id === $selectedHotSpot)
				],
				$selectedScene
			);
			toast.success(`'${$selectedHotSpot}' succesfully saved.`);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error('An unknown error occurred.');
			}
		}
	}

	function removeHotSpotFromScene() {
		try {
			removeHotSpot($selectedHotSpot, $selectedScene);
			toast.success(`'${$selectedHotSpot}' succesfully removed from scene.`);
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			} else {
				toast.error('An unknown error occurred.');
			}
		}
	}

	onMount(() => {
		selectedHotSpot.subscribe((value) => {
			hotSpotSettings =
				$scenes[$selectedScene].hotSpots[
					$scenes[$selectedScene].hotSpots.findIndex((hotSpot) => hotSpot.id === $selectedHotSpot)
				];
		});

		clickedLocation.subscribe((value) => {
			locationPicker(value);
		});
	});

	function locationPicker(location: { yaw: number; pitch: number }) {
		if (locationPickerOn && location.yaw && location.pitch) {
			hotSpotSettings.yaw = Number(location.yaw);
			hotSpotSettings.pitch = Number(location.pitch);
			locationPickerOn = false;
		}
	}
</script>

{#if $selectedHotSpot}
	<Tabs.Root value="settings" class="w-full">
		<Tabs.List class="grid w-full grid-cols-3">
			<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
			<Tabs.Trigger value="appearance">Appearance</Tabs.Trigger>
			<Tabs.Trigger value="interactivity">Interactivity</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="settings">
			<Card.Root class="h-full w-full">
				<Card.Header>
					<Card.Title>Edit HotSpot</Card.Title>
					<Card.Description>
						Make changes to the selected hotSpot. Click save when you're done.
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<div class="space-y-1">
						<Label for="id">ID</Label>
						<Input disabled id="id" bind:value={hotSpotSettings.id} />
					</div>
					<div class="flex flex-row items-end justify-stretch gap-2">
						<div class="flex-1 space-y-1">
							<Label for="yaw">Yaw</Label>
							<Input id="yaw" bind:value={hotSpotSettings.yaw} type="number" />
						</div>
						<div class="flex-1 space-y-1">
							<Label for="pitch">Pitch</Label>
							<Input id="pitch" bind:value={hotSpotSettings.pitch} type="number" />
						</div>
						<Toggle
							variant="outline"
							aria-label="Toggle location picker"
							bind:pressed={locationPickerOn}
						>
							<Locate class="h-4 w-4" />
						</Toggle>
					</div>
					<div class="space-y-1">
						<Label for="scene">Scene</Label>

						<Select.Root
							selected={scene}
							onSelectedChange={(s) => {
								s && (scene = { label: s.label, value: s.value });
								console.log(s);
							}}
						>
							<Select.Trigger class="w-full">
								<Select.Value placeholder="Select a scene" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Label>Scenes</Select.Label>
									{#each Object.entries($scenes) as [key, scene]}
										<Select.Item value={key} label={scene.title || key}
											>{scene.title || key}</Select.Item
										>
									{/each}
								</Select.Group>

								<AddSceneDialog class="w-full"
									><Button variant="outline" class="mt-2 w-full"
										><PackagePlus class="mr-2 h-4 w-4" /> Add Scene</Button
									></AddSceneDialog
								>
							</Select.Content>
						</Select.Root>
					</div>
					<div class="space-y-1">
						<Label for="tooltip">Tooltip</Label>
						<Input id="tooltip" bind:value={hotSpotSettings.text} />
					</div>
				</Card.Content>
				<Card.Footer>
					<div class="flex flex-wrap gap-2">
						<Button on:click={saveChanges}>Save changes</Button>
						<Button on:click={removeHotSpotFromScene} variant="destructive">Delete HotSpot</Button>
					</div>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="appearance">
			<Card.Root>
				<Card.Header>
					<Card.Title>Appearance</Card.Title>
					<Card.Description>Change the looks of the HotSpot here.</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<div class="flex items-center space-x-2">
						<Switch id="scale" bind:checked={hotSpotSettings.scale} />
						<Label for="scale">Scale with panorama</Label>
					</div>
					<div class="space-y-1">
						<Label for="cssclass">Css Classes (tailwindCSS)</Label>
						<Textarea id="cssclass" bind:value={hotSpotSettings.cssClass} />
					</div>
				</Card.Content>
				<Card.Footer>
					<div class="flex flex-wrap gap-2">
						<Button on:click={saveChanges}>Save changes</Button>
						<Button on:click={removeHotSpotFromScene} variant="destructive">Delete HotSpot</Button>
					</div>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="interactivity">
			<Card.Root>
				<Card.Header>
					<Card.Title>Interactivity</Card.Title>
					<Card.Description>Change the interactivity with the HotSpot here.</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="space-y-1">
						<Label for="type">Hotspot Type</Label>

						<Select.Root
							selected={{
								value: hotSpotSettings.type,
								label: hotSpotTypes[hotSpotSettings.type] || 'Undefined'
							}}
							onSelectedChange={(s) => {
								s && (hotSpotSettings.type = s.value);
								console.log(s);
							}}
						>
							<Select.Trigger class="w-full">
								<Select.Value placeholder="Select a scene" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Label>HotSpot Type</Select.Label>
									{#each Object.entries(hotSpotTypes) as [key, scene]}
										<Select.Item value={key} label={scene || key}>{scene || key}</Select.Item>
									{/each}
								</Select.Group>

								<AddSceneDialog class="w-full"
									><Button variant="outline" class="mt-2 w-full"
										><PackagePlus class="mr-2 h-4 w-4" /> Add Scene</Button
									></AddSceneDialog
								>
							</Select.Content>
						</Select.Root>
						<Separator class="m-2" />
						{#if hotSpotSettings.type == 'info'}
							<div class="space-y-1">
								<Label for="url">URL</Label>
								<Input id="url" bind:value={hotSpotSettings.URL} />
							</div>
						{:else if hotSpotSettings.type == 'scene'}
							<Label for="targetScene">Target Scene</Label>

							<Select.Root
								selected={{
									value: hotSpotSettings.sceneId || $selectedScene,
									label:
										$scenes[hotSpotSettings.sceneId || $selectedScene]?.title ||
										hotSpotSettings.sceneId ||
										$selectedScene
								}}
								onSelectedChange={(s) => {
									s && (hotSpotSettings.sceneId = s.value);
									console.log(s);
								}}
							>
								<Select.Trigger class="w-full">
									<Select.Value placeholder="Select a scene" />
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										<Select.Label>Scenes</Select.Label>
										{#each Object.entries($scenes) as [key, scene]}
											<Select.Item value={key} label={scene.title || key}
												>{scene.title || key}</Select.Item
											>
										{/each}
									</Select.Group>

									<AddSceneDialog class="w-full"
										><Button variant="outline" class="mt-2 w-full"
											><PackagePlus class="mr-2 h-4 w-4" /> Add Scene</Button
										></AddSceneDialog
									>
								</Select.Content>
							</Select.Root>
							<div class="flex flex-row items-end justify-stretch gap-2">
								<div class="flex-1 space-y-1">
									<Label for="targetYaw">Target Yaw</Label>
									<Input id="targetYaw" bind:value={hotSpotSettings.targetYaw} type="number" />
								</div>
								<div class="flex-1 space-y-1">
									<Label for="targetPitch">Target Pitch</Label>
									<Input id="targetPitch" bind:value={hotSpotSettings.targetPitch} type="number" />
								</div>
								<div class="flex-1 space-y-1">
									<Label for="targetHfov">Target Hfov</Label>
									<Input id="targetHfov" bind:value={hotSpotSettings.targetHfov} type="number" />
								</div>
							</div>
						{/if}
					</div>
				</Card.Content>
				<Card.Footer>
					<div class="flex flex-wrap gap-2">
						<Button on:click={saveChanges}>Save changes</Button>
						<Button on:click={removeHotSpotFromScene} variant="destructive">Delete HotSpot</Button>
					</div>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
{/if}
