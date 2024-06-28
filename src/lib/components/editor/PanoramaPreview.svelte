<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { get } from 'svelte/store';
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
		RefreshCcw,
		Orbit
	} from 'lucide-svelte';

	import { round } from '$lib/Pannellum';

	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';

	let panoElement: any;
	let currentScene: string = '';

	function initPanorama() {
		if ($pannellumViewer) {
			$pannellumViewer.destroy();
		}
		$pannellumViewer = window.pannellum.viewer('panorama', $pannellumSetup);

		panoElement.addEventListener('click', (event: any) => {
			const [clickPitch, clickYaw] = $pannellumViewer.mouseEventToCoords(event);
			$clickedLocation = {
				yaw: round(clickYaw),
				pitch: round(clickPitch)
			};
			if ($viewerSettings.lookAtSelected && $viewerSettings.developmentMode)
				$selectedScene = $pannellumViewer.getScene() || $selectedScene;
		});
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

		// Clean up on component destroy
		return () => {
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

<div class="h-full w-full">
	<div
		class={cn(
			'flex h-full w-full',
			$pannellumViewer && $pannellumViewer.getScene() && Object.keys($scenes).length != 0
				? ''
				: 'hidden'
		)}
	>
		<div bind:this={panoElement} id="panorama" />
		<div id="controls" class="z-2 absolute flex flex-col gap-1 p-2">
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
			<Button variant="outline" size="icon" on:click={reload}><RefreshCcw class="h-4 w-4" /></Button
			>
		</div>
	</div>
	{#if !$pannellumViewer || !$pannellumViewer.getScene() || Object.keys($scenes).length == 0}
		<div class="h-full w-full p-8">
			<div
				class="flex h-full w-full items-center justify-center rounded-2xl border border-2 border-dashed text-center"
			>
				<div class="flex flex-col items-center justify-center">
					<Orbit class="mb-2 h-10 w-10 text-accent" />
					<h2 class="text-xl font-bold">Panorama Preview</h2>
					<p class="text-muted-foreground">There are no scenes in your project.</p>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	#panorama {
		width: 100%;
		height: calc(100vh - 2.5rem);
	}
</style>
