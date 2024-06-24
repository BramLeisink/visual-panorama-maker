<script lang="ts">
	import { onMount } from 'svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Toggle } from './ui/toggle/index';

	import { Locate } from 'lucide-svelte';

	import { hotSpotsList, selectedHotSpot, viewerSettings, clickedLocation } from '$lib/storedInfo';
	let info: Record<string, any> = {};
	let hotSpot: string = '';
	let errorMessage = '';
	let locationPickerOn = false;

	onMount(() => {
		hotSpotsList.subscribe((value) => {
			info = value;
		});
		selectedHotSpot.subscribe((value) => {
			hotSpot = value;
			errorMessage = '';
		});

		clickedLocation.subscribe((value) => {
			locationPicker(value);
		});
	});

	function saveChanges() {
		const isValidId = /^[a-zA-Z0-9_-]+$/.test(info[hotSpot].id); // Check for valid characters (alphanumeric, hyphen, underscore)
		const isUniqueId = Object.keys(info).every(
			(key) => key === hotSpot || info[key].id !== info[hotSpot].id
		); // Check for uniqueness

		if (!isValidId) {
			errorMessage = 'ID must only contain letters, numbers, hyphens, and underscores.';
			console.log(errorMessage);
		} else if (!isUniqueId) {
			errorMessage = 'ID must be unique. This ID is already in use.';
			console.log(errorMessage);
		} else {
			errorMessage = '';
			if (hotSpot && info[hotSpot]) {
				hotSpotsList.update((values) => ({
					...values,
					[hotSpot]: {
						...values[hotSpot],
						id: info[hotSpot].id,
						yaw: info[hotSpot].yaw,
						pitch: info[hotSpot].pitch,
						text: info[hotSpot].text,
						cssClass: info[hotSpot].cssClass
					}
				}));
			}
		}
	}

	function removeHotSpot() {
		if (hotSpot && info[hotSpot]) {
			hotSpotsList.update((currentHotSpots) => {
				const { [hotSpot]: _, ...rest } = currentHotSpots; // Use destructuring to remove the hotSpot
				return rest;
			});
			selectedHotSpot.set('');
		}
	}

	function locationPicker(location: { yaw: number; pitch: number }) {
		if (locationPickerOn && location.yaw && location.pitch) {
			info[hotSpot].yaw = Number(location.yaw);
			info[hotSpot].pitch = Number(location.pitch);
			locationPickerOn = false;
		}
	}
</script>

{#if hotSpot}
	<Tabs.Root value="settings" class="w-full">
		<Tabs.List class="grid w-full grid-cols-2">
			<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
			<Tabs.Trigger value="appearance">Appearance</Tabs.Trigger>
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
						<Input id="id" bind:value={info[hotSpot].id} />
					</div>
					<div class="flex flex-row items-end justify-stretch gap-2">
						<div class="flex-1 space-y-1">
							<Label for="yaw">Yaw</Label>
							<Input id="yaw" bind:value={info[hotSpot].yaw} type="number" />
						</div>
						<div class="flex-1 space-y-1">
							<Label for="pitch">Pitch</Label>
							<Input id="pitch" bind:value={info[hotSpot].pitch} type="number" />
						</div>
						<Toggle variant="outline" aria-label="Toggle italic" bind:pressed={locationPickerOn}>
							<Locate class="h-4 w-4" />
						</Toggle>
					</div>
					<div class="space-y-1">
						<Label for="tooltip">Tooltip</Label>
						<Input id="tooltip" bind:value={info[hotSpot].text} />
					</div>
					<div class="space-y-1">
						<Label for="cssclass">Css Classes (tailwindCSS)</Label>
						<Input id="cssclass" bind:value={info[hotSpot].cssClass} />
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
	</Tabs.Root>
{/if}
