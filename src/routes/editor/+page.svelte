<script context="module" lang="ts">
	const version: string = __VERSION__;
	const lastMod = __LASTMOD__;
</script>

<script lang="ts">
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

	let latestGitTag: string = 'v0.2.3';

	type PanoramaData = {
		yaw: number;
		pitch: number;
	};

	type SceneData = {
		imageSrc: string;
	};
	let panoramaData: PanoramaData = { yaw: 0, pitch: 0 };
	let sceneData: SceneData[] = [];
	function handlePanoramaDataUpdate(event: CustomEvent<PanoramaData>) {
		panoramaData = event.detail;
	}

	function handleScenes(event: CustomEvent<SceneData>) {
		sceneData = [...sceneData, event.detail];
	}

	function handleResize(newSize: number, prevSize: number | undefined) {
		if ($pannellumViewer || !$pannellumViewer.getScene() || Object.keys($scenes).length == 0) {
			$pannellumViewer.resize();
		} else {
			console.warn('pannellumViewer is not initialized or does not have a resize function.');
		}
	}
</script>

<WipAlert dialogOpen={true} {version} {lastMod}></WipAlert>
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
