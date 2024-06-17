<script lang="ts">
	import { selectedFile } from '$lib/storedInfo';
	import { onMount } from 'svelte';
  
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
		  filename = shortenFilename(file.name); // Set filename and shorten if necessary
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
  
	function shortenFilename(name: string) {
	  const maxLength = 20; // Max characters to display before shortening
	  if (name.length <= maxLength) {
		return name;
	  } else {
		return name.substring(0, maxLength) + '...'; // Shorten and add ellipsis
	  }
	}
  </script>
  
  <div class="relative flex h-full items-center justify-center rounded overflow-hidden">
	<!-- Background image and overlay -->
	<div class="absolute inset-0 z-10" style="background-image: url({imageSrc}); background-size: cover; background-position: center;">
	  <div class="absolute inset-0 bg-gray-900 opacity-50"></div> <!-- Overlay -->
	</div>
  
	<!-- File input -->
	<input
	  type="file"
	  name="image"
	  id="image"
	  accept="image/jpeg"
	  on:change={handleFileChange}
	  class="absolute inset-0 z-20 opacity-0 cursor-pointer"
	/>
  
	<!-- Conditional content based on showImage -->
	{#if !showImage}
	  <label for="image" class="relative z-20 cursor-pointer font-semibold text-white bg-gray-700 bg-opacity-50 px-4 py-2 rounded">
		Upload Image
	  </label>
	{:else}
	  <div class="relative z-20 flex flex-col items-center">
		<!-- Display filename -->
		<div class="flex items-center space-y-2 flex-col">
		  <span class="text-white font-semibold truncate max-w-full">{filename}</span>
		  <button
			type="button"
			class="px-2 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600 focus:bg-red-600 focus:outline-none"
			on:click={removeImage}
		  >
			Remove
		  </button>
		</div>
	  </div>
	{/if}
  </div>