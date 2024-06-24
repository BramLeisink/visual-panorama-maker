<script lang="ts">
	import EditHotSpot from '$lib/components/EditHotSpot.svelte';
	import EditHotSpot2 from '$lib/components/EditHotSpot2.svelte';
	import HotSpotsList from '$lib/components/HotSpotsList.svelte';
	import ImagePreview from '$lib/components/ImagePreview.svelte';
	import PanoramaPreview from '$lib/components/PanoramaPreview.svelte';
	import PanoramaPreview2 from '$lib/components/PanoramaPreview2.svelte';
	import SceneSelector from '$lib/components/SceneSelector.svelte';
	import SceneList from '$lib/components/SceneList.svelte';
	import ComponentLib from '$lib/components/Sidebar.svelte';
	import StatisticsAndExport from '$lib/components/StatisticsAndExport.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import ResizableHandle from '$lib/components/ui/resizable/resizable-handle.svelte';
	import ResizablePaneGroup from '$lib/components/ui/resizable/resizable-pane-group.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	import { pannellumSetup, selectedHotSpot, viewerSettings } from '$lib/storedInfo';

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
</script>

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
				<!-- <EditHotSpot2 /> -->
				<StatisticsAndExport data={panoramaData} />
			</div>
		</Resizable.PaneGroup>
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={50} onResize={(size) => ($viewerSettings.panoramaPaneSize = size)}>
		<Resizable.PaneGroup direction="vertical">
			<Resizable.Pane defaultSize={75}>
				<PanoramaPreview2 />
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</Resizable.Pane>
</Resizable.PaneGroup>
