import { writable } from 'svelte/store';
import type {hotspot} from '$lib/types'


export const selectedFile = writable(null);

export const hotspotInfo = writable<hotspot[]>([]);