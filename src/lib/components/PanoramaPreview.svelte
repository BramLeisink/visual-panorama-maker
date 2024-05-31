<svelte:head>
	<script src="https://cdn.pannellum.org/2.5/pannellum.js"></script>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"/>
</svelte:head>

<script>
	//@ts-nocheck
	import { onMount } from 'svelte';
	import { selectedFile } from './storedInfo';
  
	let imgSrc;
	let pannellumViewer;
	let showTxt = true;
	let panoElement;
	
	onMount(() => {
	  selectedFile.subscribe(imageData => {
		console.log('Selected File:', imageData);
		if (imageData) {
			showTxt = false;
		  const reader = new FileReader();
		  reader.onload = (event) => {
			imgSrc = event.target.result;
			console.log('Image Source:', imgSrc);
			if (window.pannellum) {
			  initPanorama(imgSrc);
			} else {
			  console.error('Pannellum not loaded');
			}
		  };
		  reader.readAsDataURL(imageData);
		} else {
		  console.log('No file selected');
		  showTxt = true;
		}
	  });
	});
  
	function initPanorama(imageSrc) {
	  if (pannellumViewer) {
		pannellumViewer.destroy();
	  }
	  pannellumViewer = pannellum.viewer('panorama', {
		type: 'equirectangular',
		panorama: imageSrc,
		 autoLoad: true,
    	mouseZoom: true,
    	showControls: true,
	  });
	}
  </script>
  
  <div class="flex h-full items-center justify-center p-6">
	{#if showTxt}
	<span class="font-semibold" >Panorama preview</span>
	{:else}
	
	<div bind:this={panoElement} id="panorama"></div>
	{/if}
	
	
	
	
  </div>
  
  <style>
	#panorama {
	  width: 600px;
	  height: 400px;
	  
	}
  </style>
  