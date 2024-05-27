<script lang="ts">
	import PanoramaEditing from '$lib/components/PanoramaEditing.svelte';
	import PanoramaPreview from '$lib/components/PanoramaPreview.svelte';
	import ComponentLib from '$lib/components/Sidebar.svelte';
	import StatisticsAndExport from '$lib/components/StatisticsAndExport.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import ResizableHandle from '$lib/components/ui/resizable/resizable-handle.svelte';
	import ResizablePaneGroup from '$lib/components/ui/resizable/resizable-pane-group.svelte';
</script>

<Resizable.PaneGroup direction="horizontal" class="h-full w-full">
	<Resizable.Pane defaultSize={25} class="p-2">
		<ComponentLib />
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={50}>
		<PanoramaEditing />
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={50}>
		<Resizable.PaneGroup direction="vertical">
			<Resizable.Pane defaultSize={75}>
				<PanoramaPreview />
			</Resizable.Pane>
			<Resizable.Handle withHandle />
			<Resizable.Pane defaultSize={25}>
				<div class="p-2">
					<StatisticsAndExport />
				</div>
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</Resizable.Pane>
</Resizable.PaneGroup>
