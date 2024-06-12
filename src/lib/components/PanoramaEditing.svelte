<script lang="ts">
	import { selectedFile } from '$lib/storedInfo';
	import { onMount } from 'svelte';

	let imageSrc: string | null | undefined; // This will hold the data URL of the image
	let showImage: boolean = false;

	// Listen to changes in selectedFile
	selectedFile.subscribe((file) => {
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				imageSrc = (e.target as FileReader).result as string;
				showImage = true; // Show the image when the file is loaded
			};
			reader.readAsDataURL(file);
		} else {
			showImage = false;
		}
	});

	function handleFileChange(event: any) {
		const file = event.target.files[0];
		if (file) {
			selectedFile.set(file);
		}
	}
</script>

<div class="flex h-full items-center justify-center p-6">
	<input
		type="file"
		name="image"
		id="image"
		accept="image/jpeg"
		on:change={handleFileChange}
		hidden
	/>

	<!-- Display the data URL of the image -->
	{#if showImage}
		<img src={imageSrc} alt="Preview" />
	{:else}
		<label for="image" class="cursor-pointer font-semibold">No image yet, click to select</label>
	{/if}
</div>

<style>
	img {
		max-width: 100%;
		height: auto;
	}
</style>
