<script lang="ts">
	import EditHotspot from '$lib/components/EditHotspot.svelte';
	import HotspotsList from '$lib/components/HotspotsList.svelte';
	import ImagePreview from '$lib/components/ImagePreview.svelte';
	import PanoramaPreview from '$lib/components/PanoramaPreview.svelte';
	import ComponentLib from '$lib/components/Sidebar.svelte';
	import StatisticsAndExport from '$lib/components/StatisticsAndExport.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import ResizableHandle from '$lib/components/ui/resizable/resizable-handle.svelte';
	import ResizablePaneGroup from '$lib/components/ui/resizable/resizable-pane-group.svelte';
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
	<Resizable.Pane defaultSize={25} class="p-2">
		<Resizable.PaneGroup direction="vertical">
			<Resizable.Pane defaultSize={75}>
				<HotspotsList currentViewport={panoramaData} />
			</Resizable.Pane>
			<Resizable.Handle withHandle />
			<Resizable.Pane>
				<ImagePreview />
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={50}>
		<Resizable.PaneGroup direction="vertical">
				<div class="p-2 flex flex-col gap-2 overflow-y-auto">
					<EditHotspot />
					<StatisticsAndExport data={panoramaData} />
				</div>
		</Resizable.PaneGroup>
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={50}>
		<Resizable.PaneGroup direction="vertical">
			<Resizable.Pane defaultSize={75}>
				<PanoramaPreview on:update={handlePanoramaDataUpdate} {sceneData} />
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</Resizable.Pane>
</Resizable.PaneGroup>
