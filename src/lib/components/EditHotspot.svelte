<script lang="ts">
	import { onMount } from 'svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Toggle } from './ui/toggle/index';

	import { Locate } from 'lucide-svelte';

	import { hotspotsList, selectedHotspot, viewerSettings, clickedLocation } from '$lib/storedInfo';
	let info: Record<string, any> = {};
	let hotspot: string = '';
	let errorMessage = '';
	let locationPickerOn = false;

	onMount(() => {
		hotspotsList.subscribe((value) => {
			info = value;
		});
		selectedHotspot.subscribe((value) => {
			hotspot = value;
			errorMessage = '';
		});

		clickedLocation.subscribe((value) => {
			locationPicker(value);
		});
	});

	function saveChanges() {
		const isValidId = /^[a-zA-Z0-9_-]+$/.test(info[hotspot].id); // Check for valid characters (alphanumeric, hyphen, underscore)
		const isUniqueId = Object.keys(info).every(
			(key) => key === hotspot || info[key].id !== info[hotspot].id
		); // Check for uniqueness

		if (!isValidId) {
			errorMessage = 'ID must only contain letters, numbers, hyphens, and underscores.';
			console.log(errorMessage);
		} else if (!isUniqueId) {
			errorMessage = 'ID must be unique. This ID is already in use.';
			console.log(errorMessage);
		} else {
			errorMessage = '';
			if (hotspot && info[hotspot]) {
				hotspotsList.update((values) => ({
					...values,
					[hotspot]: {
						...values[hotspot],
						id: info[hotspot].id,
						yaw: info[hotspot].yaw,
						pitch: info[hotspot].pitch,
						text: info[hotspot].text,
						cssClass: info[hotspot].cssClass
					}
				}));
			}
		}
	}

	function removeHotspot() {
		if (hotspot && info[hotspot]) {
			hotspotsList.update((currentHotspots) => {
				const { [hotspot]: _, ...rest } = currentHotspots; // Use destructuring to remove the hotspot
				return rest;
			});
			selectedHotspot.set('');
		}
	}

	function locationPicker(location: { yaw: number; pitch: number }) {
		if (locationPickerOn && location.yaw && location.pitch) {
			info[hotspot].yaw = Number(location.yaw);
			info[hotspot].pitch = Number(location.pitch);
			locationPickerOn = false;
		}
	}
</script>

{#if hotspot}
	<Tabs.Root value="settings" class="w-full">
		<Tabs.List class="grid w-full grid-cols-2">
			<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
			<Tabs.Trigger value="appearance">Appearance</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="settings">
			<Card.Root class="h-full w-full">
				<Card.Header>
					<Card.Title>Edit Hotspot</Card.Title>
					<Card.Description>
						Make changes to the selected hotspot. Click save when you're done.
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<div class="space-y-1">
						<Label for="id">ID</Label>
						<Input id="id" bind:value={info[hotspot].id} />
					</div>
					<div class="flex flex-row items-end justify-stretch gap-2">
						<div class="flex-1 space-y-1">
							<Label for="yaw">Yaw</Label>
							<Input id="yaw" bind:value={info[hotspot].yaw} type="number" />
						</div>
						<div class="flex-1 space-y-1">
							<Label for="pitch">Pitch</Label>
							<Input id="pitch" bind:value={info[hotspot].pitch} type="number" />
						</div>
						<Toggle variant="outline" aria-label="Toggle italic" bind:pressed={locationPickerOn}>
							<Locate class="h-4 w-4" />
						</Toggle>
					</div>
					<div class="space-y-1">
						<Label for="tooltip">Tooltip</Label>
						<Input id="tooltip" bind:value={info[hotspot].text} />
					</div>
					<div class="space-y-1">
						<Label for="cssclass">Css Classes (tailwindCSS)</Label>
						<Input id="cssclass" bind:value={info[hotspot].cssClass} />
					</div>
					{#if errorMessage}
						<div class="text-center text-red-500">{errorMessage}</div>
					{/if}
				</Card.Content>
				<Card.Footer>
					<div class="flex flex-wrap gap-2">
						<Button on:click={saveChanges}>Save changes</Button>
						<Button on:click={removeHotspot} variant="destructive">Delete Hotspot</Button>
					</div>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="appearance">
			<Card.Root>
				<Card.Header>
					<Card.Title>Appearance</Card.Title>
					<Card.Description>Change the looks of the Hotspot here.</Card.Description>
				</Card.Header>
				<Card.Footer>
					<Button>Save changes</Button>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
{/if}
