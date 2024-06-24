<script lang="ts">
	import { onMount } from 'svelte';
	import { PackagePlus } from 'lucide-svelte';
	import { scenes, selectedScene, pannellumSetup } from '$lib/storedInfo';
	import Button from './ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { Scene } from '$lib/types';

	let fileInput: HTMLInputElement;

	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const file = input.files[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				$scenes[$selectedScene].panorama = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		} else {
			console.log('No file selected');
		}
	}
</script>

{#if Object.keys($scenes).length == 0}
	<div class="h-full w-full p-4">
		<Button
			class="flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-dashed p-8"
			variant="outline"
		>
			<PackagePlus class="mb-2 h-10 w-10" />
			<h3 class="font-bold">No Scenes</h3>
			<p>Start by creating your first scene</p>
		</Button>
	</div>
{:else}
	<div class="h-full w-full overflow-y-auto">
		<h3 class="text-lg font-semibold">Scene settings</h3>
		<div class="space-y-2 p-2">
			<div class="space-y-1">
				<Label for="name">Name</Label>
				<Input id="name" bind:value={$scenes[$selectedScene].title} />
			</div>
			<div class="space-y-1">
				<Label for="image">Image</Label>
				<Input
					id="image"
					type="file"
					accept="image/png, image/jpeg"
					bind:this={fileInput}
					on:change={handleFileChange}
				/>
			</div>
			<div class="mt-2 flex flex-wrap gap-2">
				<Button class="flex-1" variant="destructive">Delete Scene</Button>
			</div>
		</div>
	</div>
{/if}
