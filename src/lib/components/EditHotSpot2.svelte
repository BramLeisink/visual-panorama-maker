<script lang="ts">
	import { onMount } from 'svelte';

	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Toggle } from './ui/toggle/index';

	import {
		hotSpotsList,
		selectedHotSpot,
		viewerSettings,
		clickedLocation,
		pannellumSetup,
		selectedScene,

		scenes

	} from '$lib/storedInfo';
	import type { HotSpot } from '$lib/types';

	let hotSpotSettings: HotSpot;
	let errorMessage = '';

	function saveChanges() {
		const isValidId = /^[a-zA-Z0-9_-]+$/.test(hotSpotSettings.id); // Check for valid characters (alphanumeric, hyphen, underscore)
		const isUniqueId = true; // check if there is another hotSpot in any of the scenes with the same id

		if (!isValidId) {
			errorMessage = 'ID must only contain letters, numbers, hyphens, and underscores.';
			console.log(errorMessage);
		} else if (!isUniqueId) {
			errorMessage = 'ID must be unique. This ID is already in use.';
			console.log(errorMessage);
		} else {
			errorMessage = '';
			if ($selectedHotSpot && hotSpotSettings && $selectedScene) {
				let hotSpotIndex = $scenes[$selectedScene].hotSpots.findIndex(
					(hotSpot) => hotSpot.id === $selectedHotSpot
				);
				if (hotSpotIndex !== -1) {
					Object.keys(hotSpotSettings).forEach((key) => {
						$scenes[$selectedScene].hotSpots[hotSpotIndex][key] = hotSpotSettings[key] 
					});
				}
				$selectedHotSpot = hotSpotSettings.id;
			}
		}
	}

	function removeHotSpot() {
		let indexToRemove = $scenes[$selectedScene].hotSpots.findIndex(
			(hotSpot) => hotSpot.id === $selectedHotSpot
		);

		if (indexToRemove !== -1) {
			$scenes[$selectedScene].hotSpots.splice(indexToRemove, 1);

			if ($selectedHotSpot === $selectedHotSpot) {
				$selectedHotSpot = '';
			}
		}
	}

	onMount(() => {
		selectedHotSpot.subscribe((value) => {
			hotSpotSettings =
				$scenes[$selectedScene].hotSpots[
					$scenes[$selectedScene].hotSpots.findIndex(
						(hotSpot) => hotSpot.id === $selectedHotSpot
					)
				];
			errorMessage = '';
		});
	});
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
						<Input id="id" bind:value={hotSpotSettings.id} />
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
						<!-- <Toggle variant="outline" aria-label="Toggle italic" bind:pressed={locationPickerOn}>
							<Locate class="h-4 w-4" />
						</Toggle> -->
					</div>
					<div class="space-y-1">
						<Label for="tooltip">Tooltip</Label>
						<Input id="tooltip" bind:value={hotSpotSettings.text} />
					</div>
					<div class="space-y-1">
						<Label for="cssclass">Css Classes (tailwindCSS)</Label>
						<Input id="cssclass" bind:value={hotSpotSettings.cssClass} />
					</div>
					{#if errorMessage}
						<div class="text-center text-red-500">{errorMessage}</div>
					{/if}
				</Card.Content>
				<Card.Footer>
					<div class="flex flex-wrap gap-2">
						<Button on:click={saveChanges}>Save changes</Button>
						<Button on:click={removeHotSpot} variant="destructive">Delete HotSpot</Button>
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
				<Card.Footer>
					<Button>Save changes</Button>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="interactivity">
			<Card.Root>
				<Card.Header>
					<Card.Title>Interactivity</Card.Title>
					<Card.Description>Change the interactivity with the HotSpot here.</Card.Description>
				</Card.Header>
				<Card.Footer>
					<Button>Save changes</Button>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
{/if}
