<script lang="ts">
	import { selectedFile } from '$lib/storedInfo';
	import { onMount } from 'svelte';
	import Button from './ui/button/button.svelte';

	let imageSrc: string | null | undefined; // This will hold the data URL of the image
	let showImage: boolean = false;
	let filename: string = '';

	// Listen to changes in selectedFile
	selectedFile.subscribe((file) => {
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				imageSrc = (e.target as FileReader).result as string;
				showImage = true; // Show the image when the file is loaded
				filename = file.name; // Set filename and shorten if necessary
			};
			reader.readAsDataURL(file);
		} else {
			showImage = false;
			filename = '';
		}
	});

	function handleFileChange(event: any) {
		const file = event.target.files[0];
		if (file) {
			selectedFile.set(file);
		}
	}

	function removeImage() {
		selectedFile.set(null); // Clear the selected file
		imageSrc = undefined; // Reset imageSrc to update background
	}
</script>

<div class="relative flex h-full h-full items-center justify-center overflow-hidden rounded mt-1">
	<!-- File input -->
	<input
		type="file"
		name="image"
		id="image"
		accept="image/jpeg"
		on:change={handleFileChange}
		class="absolute inset-0 z-20 cursor-pointer opacity-0"
	/>

	<!-- Conditional content based on showImage -->
	{#if !showImage}
		<Button class='z-10'>
			<label for="image"> Upload Image </label>
		</Button>
	{:else}
		<div class="relative z-20 flex flex-col items-center">
			<!-- Display filename -->
			<div class="flex flex-col items-center space-y-2">
				<span class="my-4 line-clamp-1 font-semibold">{filename}</span>
				<Button variant="destructive" on:click={removeImage}>Remove</Button>
			</div>
		</div>
	{/if}
	<!-- Background image and overlay -->
	<div
		class="absolute inset-0 border rounded"
		style="background-image: url({imageSrc}); background-size: cover; background-position: center;"
	>
		<div class="absolute inset-0 bg-muted opacity-60"></div>
		<!-- Overlay -->
	</div>
</div>
