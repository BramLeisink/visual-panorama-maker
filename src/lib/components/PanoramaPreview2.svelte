<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		selectedFile,
		hotSpotsList,
		viewport,
		selectedHotSpot,
		viewerSettings,
		clickedLocation,
		pannellumSetup,
		selectedScene,
		scenes,
		pannellumViewer
	} from '$lib/storedInfo';

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

	import Button from './ui/button/button.svelte';

	let panoElement: any;

	function initPanorama() {
		if ($pannellumViewer) {
			$pannellumViewer.destroy();
		}
		$pannellumViewer = window.pannellum.viewer('panorama', $pannellumSetup);
	}

	onMount(() => {
		// Ensure the Pannellum script is loaded before initializing the panorama
		if (window.pannellum) {
			initPanorama();
		} else {
			const script = document.createElement('script');
			script.src = 'https://cdn.pannellum.org/2.5/pannellum.js';
			script.onload = () => initPanorama();
			document.head.appendChild(script);
		}

		// const subscribePannellumSetup = pannellumSetup.subscribe((pannellumSetup) => {
		// 	if ($pannellumViewer) {
		// 		if ($pannellumViewer)
		// 		$pannellumViewer.destroy();
		// 		initPanorama();
		// 	}
		// });

		// Unsubscribe when the component is destroyed
		return () => {
			// subscribePannellumSetup();
			if ($pannellumViewer) {
				$pannellumViewer.destroy();
			}
		};
	});

	// Event handlers for controls
	function panUp() {
		if ($pannellumViewer) {
			$pannellumViewer.setPitch($pannellumViewer.getPitch() + 10);
		}
	}

	function panDown() {
		if ($pannellumViewer) {
			$pannellumViewer.setPitch($pannellumViewer.getPitch() - 10);
		}
	}

	function panLeft() {
		if ($pannellumViewer) {
			$pannellumViewer.setYaw($pannellumViewer.getYaw() - 10);
		}
	}

	function panRight() {
		if ($pannellumViewer) {
			$pannellumViewer.setYaw($pannellumViewer.getYaw() + 10);
		}
	}

	function zoomIn() {
		if ($pannellumViewer) {
			$pannellumViewer.setHfov($pannellumViewer.getHfov() - 10);
		}
	}

	function zoomOut() {
		if ($pannellumViewer) {
			$pannellumViewer.setHfov($pannellumViewer.getHfov() + 10);
		}
	}

	function toggleFullscreen() {
		if ($pannellumViewer) {
			$pannellumViewer.toggleFullscreen();
		}
	}

	function reload() {
		if ($pannellumViewer) {
			$pannellumViewer.destroy();
		}
		initPanorama();
	}
</script>

<svelte:head>
	<script src="https://cdn.pannellum.org/2.5/pannellum.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css" />
</svelte:head>

<div class="flex h-full cursor-crosshair">
	<div bind:this={panoElement} id="panorama"></div>
	<div id="controls" class="z-2 absolute flex flex-col gap-1 p-2">
		<!-- <Button variant="outline" size="icon" on:click={panLeft}><ChevronLeft class="h-4 w-4" /></Button
		>
		<Button variant="outline" size="icon" on:click={panRight}
			><ChevronRight class="h-4 w-4" /></Button
		>
		<Button variant="outline" size="icon" on:click={panUp}><ChevronUp class="h-4 w-4" /></Button>
		<Button variant="outline" size="icon" on:click={panDown}><ChevronDown class="h-4 w-4" /></Button
		> -->
		<div class="flex flex-col">
			<Button variant="outline" size="icon" class="rounded-b-none" on:click={zoomIn}
				><ZoomIn class="h-4 w-4" /></Button
			>
			<Button variant="outline" size="icon" class="rounded-t-none" on:click={zoomOut}
				><ZoomOut class="h-4 w-4" /></Button
			>
		</div>
		<Button variant="outline" size="icon" on:click={toggleFullscreen}
			><Maximize class="h-4 w-4" /></Button
		>
		<Button variant="outline" size="icon" on:click={reload}><RefreshCcw class="h-4 w-4" /></Button>
	</div>
</div>

<style>
	#panorama {
		width: 100%;
		height: calc(100vh - 2.5rem);
	}
</style>
