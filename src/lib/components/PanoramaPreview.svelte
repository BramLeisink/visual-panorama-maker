<script>
	// @ts-nocheck
	import { onMount, onDestroy } from 'svelte';
	import { selectedFile, hotspotInfo } from './storedInfo';
	import { get } from 'svelte/store';
  
	let pannellumViewer;
	let imgSrc;
	let showTxt = true;
	let panoElement;
  
	onMount(() => {
	  // Subscribe to the selectedFile store
	  const unsubscribeFile = selectedFile.subscribe((imageData) => {
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
  
	  // Subscribe to the hotspotInfo store
	  const unsubscribeHotspots = hotspotInfo.subscribe(value => {
		if (pannellumViewer) {
		  // Reload the panorama with the new hotspots
		  initPanorama(imgSrc);
		}
	  });
  
	  // Unsubscribe when the component is destroyed
	  return () => {
		unsubscribeFile();
		unsubscribeHotspots();
		if (pannellumViewer) {
		  pannellumViewer.destroy();
		}
	  };
	});
  
	function initPanorama(imageSrc) {
	  if (pannellumViewer) {
		pannellumViewer.destroy();
	  }
  
	  const hotspots = get(hotspotInfo);
  
	  pannellumViewer = pannellum.viewer('panorama', {
		type: 'equirectangular',
		panorama: imageSrc,
		autoLoad: true,
		hotSpotDebug: true,
		hotSpots: hotspots
	  });
	}
  </script>
  
  <svelte:head>
	<script src="https://cdn.pannellum.org/2.5/pannellum.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css" />
  </svelte:head>
  
  <div class="flex h-full items-center justify-center p-6">
	{#if showTxt}
	  <span class="font-semibold">Panorama preview</span>
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
  