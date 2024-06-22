import { writable } from 'svelte/store';
import type { hotspot } from '$lib/types';

export const selectedFile = writable(null);
export const viewport = writable<{ yaw: number; pitch: number }>({ yaw: 0, pitch: 0 });
export const hotspotInfo = writable<hotspot[]>([]); // Dont use! Use hotspotsList, a dictionary, listed below
export const hotspotsList = writable<Record<string, hotspot>>({});

export const selectedHotspot = writable<string>('');

export const viewerSettings = writable({
	compass: false,
	autoRotate: false,
	lookAtSelected: true,
	panoramaPaneSize: 50,
	precision: "1",
});

export const clickedLocation = writable({ yaw: undefined, pitch: undefined });
