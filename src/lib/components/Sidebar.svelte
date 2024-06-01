<script lang="ts">
	//@ts-nocheck
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';

	import { hotspotInfo } from './storedInfo';//imports the yaw pitch writable
	import { writable } from 'svelte/store';
	const hotspots = ['https://thirdspacelearning.com/wp-content/uploads/2023/05/Irregular-Polygons-image-1-US.png'

	];
	
	const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
	let visibleStates: boolean[]= Array(12).fill(true); // Initialize visibility state for 12 items
	
	function openInput(i: number) {
		visibleStates = visibleStates.map((state, index) => index === i ? false : state);
	}

	function handleSubmit(index: number, event: Event): void{
		// function for handling the pitch and yaw values given
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const yaw = (form.querySelector('#yaw' ) as HTMLInputElement).value; //yaw
		const pitch = (form.querySelector('#pitch') as HTMLInputElement).value; //pitch
		console.log(`Yaw: ${yaw} Pitch: ${pitch}`);
		hotspotInfo.update(values => [...values, { yaw, pitch, "type": "info", "text": "test"}]);
		
		visibleStates[index] = true;
	}
</script>

<div class="h-full max-h-screen overflow-y-auto">
	<Tabs.Root value="hotspots" class="w-full">
		<Tabs.List class="grid w-full grid-cols-2">
			<Tabs.Trigger value="hotspots">Hotspots</Tabs.Trigger>
			<Tabs.Trigger value="customize">Customize</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="hotspots">
			<Card.Root>
				<Card.Header>
					<Card.Title>Default hotspots</Card.Title>
					<Card.Description>
						Drag and drop these default hotspots into your image, you can always customize them
						later.
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<div class="flex flex-wrap items-center justify-center gap-2">
						{#each hotspots as hotspot, i}
							{#if visibleStates[i]}
								<button class="h-24 w-24 cursor-pointer rounded" on:click={() => openInput(i)}
									><img
										src={hotspot} 
										class="h-full w-full"
										alt=""
									/></button
								>
							{:else}
							<form on:submit={(event) => handleSubmit(i, event)}>
								<input type="text" class="border" name="pitch" id="pitch" placeholder="pitch" >
								<input type="text" class="border" name="yaw" id="yaw" placeholder="yaw">
								<input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="submit">
							</form>
								
							{/if}
						{/each}
					</div>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="customize">
			<Card.Root>
				<Card.Header>
					<Card.Title>Customize hotspot</Card.Title>
					<Card.Description>
						Change the look and behaviour of the currently selected hotspot
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<div class="space-y-1">
						<Label for="hotspot-name">Name</Label>
						<Input id="hotspot-name" type="text" />
					</div>
					<div class="space-y-1">
						<Label for="hotspot-tooltip">Tooltip</Label>
						<Input id="hotspot-tooltip" type="text" />
					</div>
					<div class="space-y-1">
						<Label for="hotspot-color">Color</Label>
						<Input id="hotspot-color" type="color" />
					</div>
				</Card.Content>
				<Card.Footer>
					<Button>Save changes</Button>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</div>
