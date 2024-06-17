<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { hotspot } from '$lib/types';
	import { Button } from '$lib/components/ui/button/index';
	import { selectedFile, hotspotsList, viewport } from '$lib/storedInfo';
	import { get } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';

	import {
		Maximize,
		ChevronRight,
		ChevronLeft,
		ChevronDown,
		ChevronUp,
		ZoomIn,
		ZoomOut
	} from 'lucide-svelte';
	import AddHotspotDialog from './AddHotspotDialog.svelte';

	export let sceneData; // Import the scenedata from the sidebar component
	let pannellumViewer: any;
	let imageSrc: string | null | undefined;
	let showText = true;
	let panoElement;
	let yaw = 0;
	let pitch = 0;

	let addHotspotDialogOpen = false;
	let positionToAddHotspot = { yaw: 0, pitch: 0 };

	const dispatch = createEventDispatcher();

	function updateYawPitch(data: any) {
		dispatch('update', data);
		viewport.set(data); // Update the viewport store with yaw and pitch
	}

	onMount(() => {
		// Subscribe to the selectedFile store
		const subscribeFile = selectedFile.subscribe((imageData) => {
			if (imageData) {
				showText = false;
				const reader = new FileReader();
				reader.onload = (event) => {
					imageSrc = (event.target as FileReader).result as string;
					if (window.pannellum) {
						initPanorama(imageSrc);
					} else {
						console.error('Pannellum not loaded');
					}
				};
				reader.readAsDataURL(imageData);
			} else {
				console.log('No file selected');
				showText = true;
			}
		});

		// Subscribe to the hotspotsList store
		const subscribeHotspots = hotspotsList.subscribe((value) => {
			if (pannellumViewer) {
				// Reload the panorama with the new hotspots
				initPanorama(imageSrc);
			}
		});

		// Unsubscribe when the component is destroyed
		return () => {
			subscribeFile();
			subscribeHotspots();
			if (pannellumViewer) {
				pannellumViewer.destroy();
			}
		};
	});

	const logInterval = setInterval(() => {
		if (pannellumViewer) {
			yaw = Math.round(pannellumViewer.getYaw());
			pitch = Math.round(pannellumViewer.getPitch());
			const data = { yaw, pitch };
			dispatch('update', data);
		}
	}, 100); // set value every set time

	// Clear the interval when the component is destroyed
	onDestroy(() => clearInterval(logInterval));

	function initPanorama(imageSrc: string | null | undefined) {
		if (pannellumViewer) {
			pannellumViewer.destroy();
		}

		const hotspotsDict = get(hotspotsList);
		const hotspotsArray = Object.values(hotspotsDict);

		pannellumViewer = pannellum.viewer('panorama', {
			type: 'equirectangular',
			panorama: imageSrc,
			autoLoad: true,
			hotSpots: hotspotsArray,
			yaw: yaw,
			pitch: pitch,
			showControls: false
		});
	}

	// Event handlers for controls
	function panUp() {
		if (pannellumViewer) {
			pannellumViewer.setPitch(pannellumViewer.getPitch() + 10);
		}
	}

	function panDown() {
		if (pannellumViewer) {
			pannellumViewer.setPitch(pannellumViewer.getPitch() - 10);
		}
	}

	function panLeft() {
		if (pannellumViewer) {
			pannellumViewer.setYaw(pannellumViewer.getYaw() - 10);
		}
	}

	function panRight() {
		if (pannellumViewer) {
			pannellumViewer.setYaw(pannellumViewer.getYaw() + 10);
		}
	}

	function zoomIn() {
		if (pannellumViewer) {
			pannellumViewer.setHfov(pannellumViewer.getHfov() - 10);
		}
	}

	function zoomOut() {
		if (pannellumViewer) {
			pannellumViewer.setHfov(pannellumViewer.getHfov() + 10);
		}
	}

	function toggleFullscreen() {
		if (pannellumViewer) {
			pannellumViewer.toggleFullscreen();
		}
	}
</script>

<svelte:head>
	<script src="https://cdn.pannellum.org/2.5/pannellum.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css" />
</svelte:head>

<div class="flex h-full items-center justify-center">
	{#if showText}
		<span class="font-semibold">Panorama preview: No image selected</span>
	{:else}
		<div bind:this={panoElement} id="panorama"></div>
		<div id="controls">
			<Button variant="outline" size="icon" on:click={panLeft}
				><ChevronLeft class="h-4 w-4" /></Button
			>
			<Button variant="outline" size="icon" on:click={panRight}
				><ChevronRight class="h-4 w-4" /></Button
			>
			<Button variant="outline" size="icon" on:click={panUp}><ChevronUp class="h-4 w-4" /></Button>
			<Button variant="outline" size="icon" on:click={panDown}
				><ChevronDown class="h-4 w-4" /></Button
			>
			<Button variant="outline" size="icon" on:click={zoomIn}><ZoomIn class="h-4 w-4" /></Button>
			<Button variant="outline" size="icon" on:click={zoomOut}><ZoomOut class="h-4 w-4" /></Button>
			<Button variant="outline" size="icon" on:click={toggleFullscreen}
				><Maximize class="h-4 w-4" /></Button
			>
		</div>
	{/if}
	{#each sceneData as scene}
		<p>{scene}</p>
	{/each}
</div>

<style>
	#panorama {
		width: 100%;
		height: calc(100vh - 2.5rem);
	}

	#controls {
		position: absolute;
		bottom: 0;
		z-index: 2;
		text-align: center;
		padding-bottom: 3px;
	}
</style>
