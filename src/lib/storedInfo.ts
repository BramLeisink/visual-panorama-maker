import { writable, derived } from 'svelte/store';
import type { HotSpot, PannellumSettings, PannellumSetup, Scene } from '$lib/types';
export const pannellumViewer = writable<any>();

export const selectedFile = writable(null);
export const viewport = writable<{ yaw: number; pitch: number }>({ yaw: 0, pitch: 0 });
export const hotSpotInfo = writable<HotSpot[]>([]); // Don't use! Use hotSpotsList, a dictionary, listed below
export const hotSpotsList = writable<Record<string, HotSpot>>({});

export const selectedHotSpot = writable<string>('');
export const selectedScene = writable<string>('');

export const viewerSettings = writable({
	compass: false,
	autoRotate: false,
	lookAtSelected: true,
	panoramaPaneSize: 50,
	precision: '1',
	developmentMode: true
});

export const clickedLocation = writable<{ yaw: number; pitch: number }>();
export const initialConfig = writable<PannellumSettings>({
	firstScene: 'circle',
	autoLoad: true,
	sceneFadeDuration: 1000,
	showControls: false
});
export const scenes = writable<Record<string, Scene>>({
	circle: {
		title: 'Mason Circle',
		hfov: 110,
		pitch: -3,
		yaw: 117,
		type: 'equirectangular',
		panorama: 'https://pannellum.org/images/from-tree.jpg',
		hotSpots: [
			{
				id: 'test-hotSpot',
				pitch: -2.1,
				yaw: 132.9,
				type: 'scene',
				text: 'Spring House or Dairy',
				sceneId: 'house',
				scale: true
			}
		]
	},
	house: {
		title: 'Spring House or Dairy',
		hfov: 110,
		yaw: 5,
		pitch: 4,
		type: 'equirectangular',
		panorama: 'https://pannellum.org/images/bma-0.jpg',
		hotSpots: [
			{
				id: 'testhotSpot2',
				pitch: -0.6,
				yaw: 37.1,
				type: 'scene',
				text: 'Mason Circle',
				sceneId: 'circle',
				targetYaw: -23,
				targetPitch: 2
			}
		]
	}
});

export const pannellumSetup = derived([initialConfig, scenes], ([$initialConfig, $scenes]) => ({
	...$initialConfig,
	scenes: $scenes
}));

// Derived store to list the hotSpots in the selected scene
export const hotSpotsInSelectedScene = derived(
	[selectedScene, scenes],
	([$selectedScene, $scenes]) => {
		const scene = $scenes[$selectedScene];
		return scene ? scene.hotSpots : [];
	}
);

export const hotSpotTypes: { [key: string]: string } = {
	scene: 'Scene',
	info: 'Info',
	// custom: 'Custom'
};
