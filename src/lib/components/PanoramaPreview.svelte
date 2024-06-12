<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type {hotspot} from '$lib/types'
	import { selectedFile, hotspotInfo } from '$lib/storedInfo';
	import { get } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	export let sceneData; //import the scenedata from the sidebar component
	let pannellumViewer: any;
	let imageSrc: string | null | undefined;
	let showText = true;
	let panoElement;
	let yaw = 0;
	let pitch = 0;

	const dispatch = createEventDispatcher();

	function updateYawPitch(data) {
		dispatch('update', data);
	}
	onMount(() => {
		// Subscribe to the selectedFile store
		const subscribeFile = selectedFile.subscribe((imageData) => {
			console.log('Selected File:', imageData);
			if (imageData) {
				showText = false;
				const reader = new FileReader();
				reader.onload = (event) => {
					imageSrc = (event.target as FileReader).result as string;
					console.log('Image Source:', imageSrc);
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

		// Subscribe to the hotspotInfo store
		const subscribeHotspots = hotspotInfo.subscribe((value) => {
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

		const hotspots = get(hotspotInfo);

		pannellumViewer = pannellum.viewer('panorama', {
			type: 'equirectangular',
			panorama: imageSrc,
			autoLoad: true,
			hotSpotDebug: true,
			hotSpots: hotspots,
			yaw: yaw,
			pitch: pitch
		});
	}
</script>

<svelte:head>
	<script src="https://cdn.pannellum.org/2.5/pannellum.js"></script>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css" />
</svelte:head>

<div class="flex h-full items-center justify-center p-6">
	{#if showText}
		<span class="font-semibold">Panorama preview</span>
	{:else}
		<div bind:this={panoElement} id="panorama"></div>
	{/if}
	{#each sceneData as scene}
	<p>{scene}</p>
	{/each}
</div>

<style>
	#panorama {
		width: 600px;
		height: 400px;
	}
</style>
