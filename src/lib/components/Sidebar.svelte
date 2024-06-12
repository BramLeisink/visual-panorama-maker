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

	import { hotspotInfo } from './storedInfo'; //imports the yaw pitch writable
	import { writable } from 'svelte/store';
	const hotspots = [
		{ icon: 'info', type: 'info hotspot' },
		{ icon: 'arrow_circle_up', type: 'scene hotspot' }
	]; //these are the hotspot types we have 2 an info and a scene hotspots we define the type
	//and the icon that is shown in the sidebar

	const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
	let visible: boolean[] = Array(2).fill(true); // if visible icon shows else input fields show.
	let scene = []; //define the scene array
	let imgSrc;
	function openInput(i: number) {
		visible = visible.map((state, index) => (index === i ? false : state));
	}

	function handleSubmit(index: number, event: Event): void {
		// function for handling the pitch and yaw values given
		console.log('works');
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const yaw = (form.querySelector('#yaw') as HTMLInputElement).value; //yaw
		const pitch = (form.querySelector('#pitch') as HTMLInputElement).value; //pitch
		const text = (form.querySelector('#text') as HTMLInputElement).value; // the text to display on hover of the hotspot
		const type = hotspots[index].type;
		console.log(`Yaw: ${yaw} Pitch: ${pitch}`);
		if (type == 'info hotspot') {
			const url = (form.querySelector('#url') as HTMLInputElement).value;
			hotspotInfo.update((values) => [...values, { yaw, pitch, type: type, text: text, URL: url }]);
		} else {
			hotspotInfo.update((values) => [...values, { yaw, pitch, type: type, text: text }]);
		}

		visible[index] = true;
	}

	function addScene(event) {
		const files = event.target.files;
		for (let i = 0; i < files.length; i++) {
			const imgSrc = URL.createObjectURL(files[i]);
			scene = [...scene, imgSrc];
		}
		console.log(scene);
	}
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
</svelte:head>

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
							{#if visible[i]}
								<button
									class="mt-12 h-24 w-32 cursor-pointer rounded"
									on:click={() => openInput(i)}
								>
									<label for="">{hotspot.type}</label>
									<span class="material-icons md-60">{hotspot.icon}</span></button
								>
							{:else}
								<form on:submit={(event) => handleSubmit(i, event)}>
									<input
										type="text"
										class="border"
										name="yaw"
										id="yaw"
										placeholder="yaw"
										required
									/>
									<input
										type="text"
										class="border"
										name="pitch"
										id="pitch"
										placeholder="pitch"
										required
									/>
									<input type="text" name="text" id="text" placeholder="Text to display on hover" />
									{#if hotspot.type == 'info hotspot'}
										<input type="url" name="url" id="url" placeholder="url" />
									{:else if hotspot.type == 'scene hotspot'}
										<input type="file" name="scene" id="scene" on:change={addScene} hidden /><br />
										<div class="sceneDiv w-max rounded bg-red-800">
											<label for="scene" class=" cursor-pointer">Upload scene</label>
										</div>
										<br />
									{/if}

									<input
										type="submit"
										class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
										value="submit"
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

<style>
	.material-icons.md-60 {
		font-size: 60px;
	}
</style>
