<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	import { removeScene } from '$lib/Pannellum';
	import { scenes, selectedHotSpot, selectedScene } from '$lib/storedInfo';
	import { toast } from 'svelte-sonner';
	import { get } from 'svelte/store';

	function removeSceneFromPanorama(id: string = sceneId) {
		let sceneTitle = $scenes[id].title;
		if (removeScene(id)) {
			toast.success(`'${sceneTitle || id}' succesfully removed.`);
			console.log($scenes);
		}
	}

	export let sceneId = get(selectedScene);

	let className = '';
	export { className as class };
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger class={className}>
		<slot />
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete '{sceneId}' and remove all its
				data.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action on:click={() => removeSceneFromPanorama()}>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
