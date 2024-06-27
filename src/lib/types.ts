// types.ts
export interface HotSpot {
	id: string;
	yaw: number;
	pitch: number;
	type: string;
	text?: string;
	URL?: string;
	attributes?: { [key: string]: any };
	cssClass?: string;
	sceneId?: string;
	targetYaw?: number;
	targetPitch?: number;
	targetHfov?: number;
	scale?: boolean;
}

export interface Scene {
	title: string;
	hfov?: number;
	pitch?: number;
	yaw?: number;
	type: string;
	panorama: string | undefined;
	hotSpots: Array<HotSpot>;
}

export interface PannellumSettings {
	firstScene?: string;
	title?: string;
	author?: string;
	authorUrl?: string;
	sceneFadeDuration?: number;
	autoLoad?: boolean;
	showControls?: boolean;
	compass?: boolean;
}

export interface PannellumSetup {
	default: PannellumSettings;
	scenes: Record<string, Scene>;
}

export function isPannellumSetup(data: any): data is PannellumSetup {
	if (typeof data !== 'object' || data === null) {
		throw new Error('Data is not an object');
	}
	if (!data.default) {
		throw new Error('Missing default settings');
	}
	if (!data.scenes || typeof data.scenes !== 'object') {
		throw new Error('Missing or invalid scenes object');
	}
	return true;
}
