<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	import type { HotSpot } from '$lib/types';

	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';

	import { hotSpotInfo } from '$lib/storedInfo'; //imports the yaw pitch writable
	import { writable } from 'svelte/store';
	const hotSpots = [
		{ icon: 'info', type: 'info hotSpot' },
		{ icon: 'arrow_circle_up', type: 'scene hotSpot' }
	]; //these are the hotSpot types we have 2 an info and a scene hotSpots we define the type
	//and the icon that is shown in the sidebar

	const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
	let visible: boolean[] = Array(2).fill(true); // if visible icon shows else input fields show.
	let scene: any[] = []; //define the scene array
	let imageSrc;
	function openInput(i: number) {
		visible = visible.map((state, index) => (index === i ? false : state));
	}

	function handleSubmit(index: number, event: Event): void {
		// function for handling the pitch and yaw values given
		console.log('works');
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const hotSpotname = (form.querySelector('#hotSpotname') as HTMLInputElement).value; //yaw
		const yaw = (form.querySelector('#yaw') as HTMLInputElement).value; //yaw
		const pitch = (form.querySelector('#pitch') as HTMLInputElement).value; //pitch
		const text = (form.querySelector('#text') as HTMLInputElement).value; // the text to display on hover of the hotSpot
		const type = hotSpots[index].type;
		console.log(`Yaw: ${yaw} Pitch: ${pitch}`);
		if (type == 'info hotSpot') {
			const url = (form.querySelector('#url') as HTMLInputElement).value;
			hotSpotInfo.update((values) => [...values, {hotSpotname, yaw, pitch, type: type, text: text, URL: url }]);
		} else {
			hotSpotInfo.update((values) => [
				...values,
				{hotSpotname, yaw, pitch, type: type, text: text, URL: null }
			]);
		}

		visible[index] = true;
	}

	function addScene(event: any) {
		const files = event.target.files;
		for (let i = 0; i < files.length; i++) {
			const imageSrc = URL.createObjectURL(files[i]);
			scene = [...scene, imageSrc];
		}
		console.log(scene);
	}
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
</svelte:head>

<div class="h-full max-h-screen overflow-y-auto">
	<Tabs.Root value="hotSpots" class="w-full">
		<Tabs.List class="grid w-full grid-cols-2">
			<Tabs.Trigger value="hotSpots">HotSpots</Tabs.Trigger>
			<Tabs.Trigger value="customize">Customize</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="hotSpots">
			<Card.Root>
				<Card.Header>
					<Card.Title>Default hotSpots</Card.Title>
					<Card.Description>
						Drag and drop these default hotSpots into your image, you can always customize them
						later.
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<div class="flex flex-wrap items-center justify-center gap-2">
						{#each hotSpots as hotSpot, i}
							{#if visible[i]}
								<button
									class="mt-12 h-24 w-32 cursor-pointer rounded"
									on:click={() => openInput(i)}
								>
									<label for="">{hotSpot.type}</label>
									<span class="material-icons md-60">{hotSpot.icon}</span></button
								>
							{:else}
								<form on:submit={(event) => handleSubmit(i, event)}>
									<input
										type="text"
										class="border"
										name="hotSpotname"
										id="hotSpotname"
										placeholder="Name"
										required
									/>

									<input
										type="text"
										class="border"
										name="yaw"
										id="yaw"
										placeholder="Yaw"
										required
									/>
									<input
										type="text"
										class="border"
										name="pitch"
										id="pitch"
										placeholder="Pitch"
										required
									/>
									<input type="text" name="text" id="text" placeholder="Text to display on hover" />

									{#if hotSpot.type == 'info hotSpot'}
										<input type="url" name="url" id="url" placeholder="URL" />
									{:else if hotSpot.type == 'scene hotSpot'}
										<input type="file" name="scene" id="scene" on:change={addScene} hidden /><br />
										<div class="sceneDiv w-max rounded bg-red-800">
											<label for="scene" class="cursor-pointer">Upload scene</label>
										</div>
										<br />
									{/if}

									<input
										type="submit"
										class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
										value="Submit"
									/>
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
					<Card.Title>Customize hotSpot</Card.Title>
					<Card.Description>
						Change the look and behaviour of the currently selected hotSpot
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<div class="space-y-1">
						<Label for="hotSpot-name">Name</Label>
						<Input id="hotSpot-name" type="text" />
					</div>
					<div class="space-y-1">
						<Label for="hotSpot-tooltip">Tooltip</Label>
						<Input id="hotSpot-tooltip" type="text" />
					</div>
					<div class="space-y-1">
						<Label for="hotSpot-color">Color</Label>
						<Input id="hotSpot-color" type="color" />
					</div>
				</Card.Content>
				<Card.Footer>
					<Button>Save changes</Button>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</div>

<style>
	.material-icons.md-60 {
		font-size: 60px;
	}
</style>
