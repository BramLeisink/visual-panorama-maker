import { writable } from 'svelte/store';



export const selectedFile = writable(null);

export const hotspotInfo = writable([]);