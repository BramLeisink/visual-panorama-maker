<script>
	// @ts-nocheck
	import { selectedFile } from './storedInfo';
	import { onMount } from 'svelte';
  
	let imageSrc; // This will hold the data URL of the image
	let showImage = false;
  
	// Listen to changes in selectedFile
	selectedFile.subscribe(file => {
	  if (file) {
		const reader = new FileReader();
		reader.onload = (e) => {
		  imageSrc = e.target.result;
		  showImage = true; // Show the image when the file is loaded
		};
		reader.readAsDataURL(file);
	  } else {
		showImage = false;
	  }
	});
  
	function handleFileChange(event) {
	  const file = event.target.files[0];
	  if (file) {
		selectedFile.set(file);
	  }
	}
  </script>
  
  <div class="flex h-full items-center justify-center p-6">
	<input type="file" name="image" id="image" accept='image/jpeg' on:change={handleFileChange} hidden>
	
	<!-- Display the data URL of the image -->
	{#if showImage}
	  
	  <img src={imageSrc} alt="Preview" />
	{:else}
	  <label for="image" class="font-semibold cursor-pointer">No image yet, click to select</label>
	{/if}
  </div>
  
  <style>
	img {
	  max-width: 100%;
	  height: auto;
	}
  </style>

