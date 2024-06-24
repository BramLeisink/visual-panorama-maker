<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { pannellumSetup, selectedScene, scenes } from '$lib/storedInfo';
	import { PackagePlus } from 'lucide-svelte';
	import AddSceneDialog from './AddSceneDialog.svelte';
	import Button from './ui/button/button.svelte';
	import Label from './ui/label/label.svelte';

	let selected = { label: '', value: '' };
	$: {
		let scenesArray = Object.entries($scenes);
		if (!scenesArray.length) {
			selected = { label: '', value: '' };
		} else if (!$selectedScene || !$scenes[$selectedScene]) {
			let firstSceneKey = scenesArray[0][0];
			let firstSceneTitle = scenesArray[0][1].title;
			selected = { label: firstSceneTitle, value: firstSceneKey };
			$selectedScene = firstSceneKey;
		} else {
			selected = {
				label: $scenes[$selectedScene].title,
				value: $selectedScene
			};
		}
	}
</script>

<Select.Root
	portal={null}
	{selected}
	onSelectedChange={(s) => {
		s && ($selectedScene = s.value);
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
				<Select.Item value={key} label={scene.title}>{scene.title}</Select.Item>
			{/each}
		</Select.Group>
		<AddSceneDialog class="w-full"
			><Button variant="outline" class="mt-2 w-full"
				><PackagePlus class="mr-2 h-4 w-4" /> Add Scene</Button
			></AddSceneDialog
		>
	</Select.Content>
</Select.Root>
