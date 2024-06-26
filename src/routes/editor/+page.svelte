<script context="module" lang="ts">
	// Import necessary dependencies
	import { onMount } from 'svelte';

	// Define the current version and last modified date
	const version: string = __VERSION__;
	const lastMod = __LASTMOD__;

	// Function to check and save version to local storage
	function checkAndSaveVersion() {
		const storedVersion = localStorage.getItem('appVersion');
		if (storedVersion !== version) {
			// Version has changed, update local storage and show dialog
			localStorage.setItem('appVersion', version);
			return true; // Indicate change for showing dialog
		}
		return false; // No change, no need to show dialog
	}
</script>

<script lang="ts">
	// Import necessary components and libraries
	import EditHotSpot2 from '$lib/components/editor/EditHotSpot.svelte';
	import HotSpotsList from '$lib/components/editor/HotSpotsList.svelte';
	import PanoramaPreview2 from '$lib/components/editor/PanoramaPreview.svelte';
	import SceneSelector from '$lib/components/editor/SceneSelector.svelte';
	import SceneList from '$lib/components/editor/SceneList.svelte';
	import StatisticsAndExport from '$lib/components/editor/Export.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	import {
		pannellumSetup,
		pannellumViewer,
		selectedHotSpot,
		viewerSettings,
		scenes
	} from '$lib/storedInfo';
	import WipAlert from '$lib/components/WipAlert.svelte';
	import Header from '$lib/components/editor/Header.svelte';

	// Define types for panorama and scene data
	type PanoramaData = {
		yaw: number;
		pitch: number;
	};

	type SceneData = {
		imageSrc: string;
	};

	// Initialize variables for panorama and scene data
	let panoramaData: PanoramaData = { yaw: 0, pitch: 0 };
	let sceneData: SceneData[] = [];

	// Function to handle updates to panorama data
	function handlePanoramaDataUpdate(event: CustomEvent<PanoramaData>) {
		panoramaData = event.detail;
	}

	// Function to handle updates to scene data
	function handleScenes(event: CustomEvent<SceneData>) {
		sceneData = [...sceneData, event.detail];
	}

	// Function to handle resizing
	function handleResize(newSize: number, prevSize: number | undefined) {
		if ($pannellumViewer || !$pannellumViewer.getScene() || Object.keys($scenes).length == 0) {
			$pannellumViewer.resize();
		} else {
			console.warn('pannellumViewer is not initialized or does not have a resize function.');
		}
	}

	// Initialize local state for dialog visibility
	let showDialog = false;

	// On component mount, check and save version to local storage
	onMount(() => {
		showDialog = checkAndSaveVersion();
	});
</script>

<!-- Display the WipAlert dialog based on showDialog state -->
<WipAlert dialogOpen={showDialog} {version} {lastMod}></WipAlert>

<!-- HTML structure with resizable panes and components -->
<div class="h-[2.5rem]">
	<Header />
</div>
<div id="body">
	<Resizable.PaneGroup direction="horizontal" class="h-full w-full">
		<Resizable.Pane defaultSize={25} class="">
			<Resizable.PaneGroup direction="vertical">
				<div class="p-2">
					<SceneSelector />
				</div>
				<Separator />
				<Resizable.Pane defaultSize={75} class="p-2">
					<HotSpotsList />
				</Resizable.Pane>
				<Resizable.Handle withHandle />
				<Resizable.Pane class="p-2">
					<SceneList />
				</Resizable.Pane>
			</Resizable.PaneGroup>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={50}>
			<Resizable.PaneGroup direction="vertical">
				<div class="flex flex-col gap-2 overflow-y-auto p-2">
					<EditHotSpot2 />
					<StatisticsAndExport />
				</div>
			</Resizable.PaneGroup>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane
			defaultSize={50}
			onResize={(size, prevSize) => {
				$pannellumViewer.resize();
			}}
		>
			<Resizable.PaneGroup direction="vertical">
				<Resizable.Pane defaultSize={75} onResize={handleResize}>
					<PanoramaPreview2 />
				</Resizable.Pane>
			</Resizable.PaneGroup>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>

<style>
	#body {
		width: 100%;
		height: calc(100vh - 2.5rem);
	}
</style>
