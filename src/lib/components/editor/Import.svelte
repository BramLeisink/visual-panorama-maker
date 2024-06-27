<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import {
		hotSpotsList,
		viewport,
		selectedHotSpot,
		scenes,
		selectedScene,
		pannellumViewer,
		viewerSettings,
		initialConfig
	} from '$lib/storedInfo';
	import { get } from 'svelte/store';
	import type { HotSpot, PannellumSetup } from '$lib/types';
	import { toast } from 'svelte-sonner';

	import Dropzone from 'svelte-file-dropzone';
	import { Button, buttonVariants } from '$lib/components/ui/button/index';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { cn } from '$lib/utils.js';
	import { addScene } from '$lib/Pannellum';
	import { ImageUp, PackagePlus, Trash2 } from 'lucide-svelte';
	import Separator from '../ui/separator/separator.svelte';
	import Badge from '../ui/badge/badge.svelte';

	import { isPannellumSetup } from '$lib/types';

	let jsonConfig: File | null = null;
	let jsonData: PannellumSetup | null = null;

	function handleFilesSelect(e: any) {
		const { acceptedFiles, fileRejections } = e.detail;
		jsonConfig = acceptedFiles[0];
		console.log(jsonConfig);
	}

	function formatFileSize(size: number): string {
		if (size === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		const i = Math.floor(Math.log(size) / Math.log(k));
		return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	async function saveConfig() {
		if (!jsonConfig) {
			toast.error('No file selected');
			return;
		}

		try {
			const fileText = await jsonConfig.text();
			const parsedData: unknown = JSON.parse(fileText);

			try {
				if (isPannellumSetup(parsedData)) {
					jsonData = parsedData as PannellumSetup;
					$pannellumViewer.destroy;
					console.log('Valid Pannellum setup:', jsonData);
					initialConfig.set(jsonData.default);
					console.log($scenes);
					scenes.set(jsonData.scenes);
					console.log($scenes);
					$pannellumViewer.loadScene()
					toast.success('Configuration loaded successfully');
				}
			} catch (validationError) {
				toast.error(`Invalid Pannellum setup: ${validationError.message}`);
			}
		} catch (error) {
			toast.error(`Failed to load configuration: ${error.message}`);
		}
	}

	let className = '';
	export { className as class };

	export let dialogOpen = false;
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Trigger class={cn(className)}><slot /></Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Import pannellum config <Badge class="ml-2">beta</Badge></Dialog.Title>
			<Dialog.Description>Import a previously exported configuration file.</Dialog.Description>
		</Dialog.Header>
		<div class="space-y-2 py-4">
			<div class="space-y-1">
				<Label for="id" class="">Configuration File</Label>
				{#if jsonConfig}
					<div class="flex flex-row rounded-lg border p-2 pl-4">
						<div>
							<h2 class="text-lg font-bold">
								{jsonConfig.name}
							</h2>
							<p class="text-sm text-muted-foreground">
								{formatFileSize(jsonConfig.size)} -
								<button
									type="button"
									class="text-primary underline-offset-4 hover:underline"
									on:click={() => (jsonConfig = null)}
								>
									Remove
								</button>
							</p>
						</div>
					</div>
				{:else}
					<Dropzone
						disableDefaultStyles
						multiple={false}
						accept=".json"
						on:drop={handleFilesSelect}
					>
						<div
							class="flex min-h-40 w-full items-center justify-center rounded-2xl border border-2 border-dashed text-center hover:border-muted-foreground"
						>
							<div>
								<div class="flex flex-col items-center justify-center">
									<PackagePlus class="mb-1 h-8 w-8 text-primary" />

									<h2 class="text-md">
										<span class="font-bold">Click to upload</span> or drag and drop
									</h2>

									<p class="text-sm text-muted-foreground">JSON</p>
								</div>
							</div>
						</div>
					</Dropzone>
				{/if}
			</div>
		</div>
		<Dialog.Footer>
			<Button on:click={saveConfig}>Import</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
