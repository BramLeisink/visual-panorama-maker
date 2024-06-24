<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { HotSpot } from '$lib/types';
	import { Button } from '$lib/components/ui/button/index';
	import {
		selectedFile,
		hotSpotsList,
		viewport,
		selectedHotSpot,
		viewerSettings,
		clickedLocation,
		pannellumSetup
	} from '$lib/storedInfo';
	import { get } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';

	import {
		Maximize,
		ChevronRight,
		ChevronLeft,
		ChevronDown,
		ChevronUp,
		ZoomIn,
		ZoomOut,
		RefreshCcw
	} from 'lucide-svelte';
	import AddHotSpotDialog from './AddHotSpotDialog.svelte';

	export let sceneData; // Import the scenedata from the sidebar component
	let pannellumViewer: any;
	let imageSrc: string | null | undefined;
	let showText = false;
	let panoElement: any;
	let yaw = 0;
	let pitch = 0;

	const dispatch = createEventDispatcher();

	onMount(() => {
		initPanorama(imageSrc);
		// Subscribe to the selectedFile store
		const subscribeFile = selectedFile.subscribe((imageData) => {
			if (imageData) {
				showText = false;
				const reader = new FileReader();
				reader.onload = (event) => {
					imageSrc = (event.target as FileReader).result as string;
					if (window.pannellum) {
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

		// Subscribe to the hotSpotsList store
		const subscribeHotSpots = hotSpotsList.subscribe((value) => {
			if (pannellumViewer) {
				// Reload the panorama with the new hotSpots
				initPanorama(imageSrc);
			}
		});

		const subscribeSelectedHotSpot = selectedHotSpot.subscribe((key) => {
			if (pannellumViewer && key && $viewerSettings.lookAtSelected) {
				const hotSpot = get(hotSpotsList)[key];
				if (hotSpot) {
					pannellumViewer.setYaw(Number(hotSpot.yaw));
					pannellumViewer.setPitch(Number(hotSpot.pitch));
				}
			}
		});

		const subscribeViewerSettings = viewerSettings.subscribe((settings) => {
			if (pannellumViewer && settings) {
				initPanorama(imageSrc);
			}
		});

		// Unsubscribe when the component is destroyed
		return () => {
			subscribeFile();
			subscribeHotSpots();
			subscribeSelectedHotSpot();
			subscribeViewerSettings();
			if (pannellumViewer) {
				pannellumViewer.destroy();
			}
		};
	});

	const logInterval = setInterval(() => {
		if (pannellumViewer) {
			yaw = parseFloat(pannellumViewer.getYaw().toFixed($viewerSettings.precision));
			pitch = parseFloat(pannellumViewer.getPitch().toFixed($viewerSettings.precision));
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

		const hotSpotsDict = get(hotSpotsList);
		const hotSpotsArray = Object.entries(hotSpotsDict).map(([key, hotSpot]) => ({
			...hotSpot,
			clickHandlerFunc: () => {
				selectedHotSpot.set(key);
			}
		}));

		pannellumViewer = pannellum.viewer('panorama', $pannellumSetup);

		// Add event listener for clicks on the panorama
		panoElement.addEventListener('click', (event: any) => {
			const [clickPitch, clickYaw] = pannellumViewer.mouseEventToCoords(event);
			$clickedLocation = {
				yaw: parseFloat(clickYaw.toFixed($viewerSettings.precision)),
				pitch: parseFloat(clickPitch.toFixed($viewerSettings.precision))
			};
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

<div class="flex h-full cursor-crosshair items-center justify-center">
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
		cursor: crosshair;
	}

	#controls {
		position: absolute;
		bottom: 0;
		z-index: 2;
		text-align: center;
		padding-bottom: 3px;
	}
</style>
