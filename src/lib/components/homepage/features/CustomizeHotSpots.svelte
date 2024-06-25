<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Toggle } from '$lib/components/ui/toggle/index';
	import * as Select from '$lib/components/ui/select/index';

	import { Locate } from 'lucide-svelte';

	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { PackagePlus } from 'lucide-svelte';

	let locationPickerOn = false;

	const scenes = {
		house: { title: 'House' },
		busStop: { title: 'Bus Stop' }
	};

	const hotSpotTypes = {
		scene: 'Scene',
		info: 'Info',
		custom: 'Custom'
	};

	let type = 'scene';

	let selectedScene = 'busStop';
</script>

<Tabs.Root value="appearance" class="w-full">
	<Tabs.List class="grid w-full grid-cols-3 shadow">
		<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
		<Tabs.Trigger value="appearance">Appearance</Tabs.Trigger>
		<Tabs.Trigger value="interactivity">Interactivity</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="settings" class="shadow">
		<Card.Root class="h-full w-full">
			<Card.Header>
				<Card.Title>Edit HotSpot</Card.Title>
				<Card.Description>Make changes to the selected hotSpot.</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="space-y-1">
					<Label for="id">ID</Label>
					<Input id="id" value="goToHome" />
				</div>
				<div class="flex flex-row items-end justify-stretch gap-2">
					<div class="flex-1 space-y-1">
						<Label for="yaw">Yaw</Label>
						<Input id="yaw" value="10" type="number" />
					</div>
					<div class="flex-1 space-y-1">
						<Label for="pitch">Pitch</Label>
						<Input id="pitch" value="-56" type="number" />
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

					<Select.Root selected={{ value: 'house', label: 'House' }}>
						<Select.Trigger class="w-full">
							<Select.Value placeholder="Select a scene" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Scenes</Select.Label>
								{#each Object.entries(scenes) as [key, scene]}
									<Select.Item value={key} label={scene.title || key}
										>{scene.title || key}</Select.Item
									>
								{/each}
							</Select.Group>

							<Button variant="outline" class="mt-2 w-full"
								><PackagePlus class="mr-2 h-4 w-4" /> Add Scene</Button
							>
						</Select.Content>
					</Select.Root>
				</div>
				<div class="space-y-1">
					<Label for="tooltip">Tooltip</Label>
					<Input id="tooltip" value="Go Home" />
				</div>
			</Card.Content>
			<Card.Footer>
				<div class="flex flex-wrap gap-2">
					<Button>Save changes</Button>
					<Button variant="destructive">Delete HotSpot</Button>
				</div>
			</Card.Footer>
		</Card.Root>
	</Tabs.Content>
	<Tabs.Content value="appearance">
		<Card.Root class="h-full w-full">
			<Card.Header>
				<Card.Title>Appearance</Card.Title>
				<Card.Description>Change the looks of the HotSpot here.</Card.Description>
			</Card.Header>
			<Card.Content class="w-full space-y-2">
				<div class="flex w-full items-center space-x-2">
					<Switch id="scale" />
					<Label for="scale">Scale with panorama</Label>
				</div>
				<div class="space-y-1">
					<Label for="cssclass">Css Classes (tailwindCSS)</Label>
					<Textarea
						id="cssclass"
						value="w-5 h-5 bg-green-300 hover:bg-green-500 rounded border-4 border-red-500 transition-all"
					/>
				</div>
			</Card.Content>
			<Card.Footer>
				<div class="flex flex-wrap gap-2">
					<Button>Save changes</Button>
					<Button variant="destructive">Delete HotSpot</Button>
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
							value: type,
							label: hotSpotTypes[type] || 'Undefined'
						}}
						onSelectedChange={(s) => {
							s && (type = s.value);
							console.log(s);
						}}
					>
						<Select.Trigger class="w-full">
							<Select.Value placeholder="Select a scene" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>HotSpot Type</Select.Label>
								{#each Object.entries(hotSpotTypes) as [key, hotspotType]}
									<Select.Item value={key} label={hotspotType || key}
										>{hotspotType || key}</Select.Item
									>
								{/each}
							</Select.Group>

							<Button variant="outline" class="mt-2 w-full"
								><PackagePlus class="mr-2 h-4 w-4" /> Add Scene</Button
							>
						</Select.Content>
					</Select.Root>
					<Separator class="m-2" />
					{#if type == 'info'}
						<div class="space-y-1">
							<Label for="url">URL</Label>
							<Input id="url" value="https://github.com/BramLeisink/visual-panorama-maker" />
						</div>
					{:else}
						<Label for="targetScene">Target Scene</Label>

						<Select.Root
							selected={{
								value: selectedScene,
								label: scenes[selectedScene].title || ''
							}}
							onSelectedChange={(s) => {
								s && (selectedScene = s.value);
								console.log(s);
							}}
						>
							<Select.Trigger class="w-full">
								<Select.Value placeholder="Select a scene" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Label>Scenes</Select.Label>
									{#each Object.entries(scenes) as [key, scene]}
										<Select.Item value={key} label={scene.title || key}
											>{scene.title || key}</Select.Item
										>
									{/each}
								</Select.Group>

								<Button variant="outline" class="mt-2 w-full"
									><PackagePlus class="mr-2 h-4 w-4" /> Add Scene</Button
								>
							</Select.Content>
						</Select.Root>
						<div class="flex flex-row items-end justify-stretch gap-2">
							<div class="flex-1 space-y-1">
								<Label for="targetYaw">Target Yaw</Label>
								<Input id="targetYaw" value="-75" type="number" />
							</div>
							<div class="flex-1 space-y-1">
								<Label for="targetPitch">Target Pitch</Label>
								<Input id="targetPitch" value="31" type="number" />
							</div>
							<div class="flex-1 space-y-1">
								<Label for="targetHfov">Target Hfov</Label>
								<Input id="targetHfov" value="10" type="number" />
							</div>
						</div>
					{/if}
				</div>
			</Card.Content>
			<Card.Footer>
				<div class="flex flex-wrap gap-2">
					<Button>Save changes</Button>
					<Button variant="destructive">Delete HotSpot</Button>
				</div>
			</Card.Footer>
		</Card.Root>
	</Tabs.Content>
</Tabs.Root>
