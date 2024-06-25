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
