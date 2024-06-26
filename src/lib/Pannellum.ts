import { writable, derived, get } from 'svelte/store';
import type { HotSpot, Scene } from '$lib/types';
import { Warn } from './utils';

import {
	pannellumViewer,
	scenes,
	selectedHotSpot,
	selectedScene,
	viewerSettings,
	hotSpotsInSelectedScene,
	pannellumSetup,
	initialConfig
} from '$lib/storedInfo';

export function round(value: number): number {
	value = Number(value);
	return parseFloat(value.toFixed(Number(get(viewerSettings).precision)));
}

selectedHotSpot.subscribe((hotSpotId) => {
	if (
		hotSpotId &&
		get(viewerSettings).developmentMode &&
		get(viewerSettings).lookAtSelected &&
		get(selectedScene) &&
		get(pannellumViewer)
	) {
		let hotSpotIndex = get(scenes)[get(selectedScene)].hotSpots.findIndex(
			(hotSpot) => hotSpot.id === hotSpotId
		);
		if (hotSpotIndex >= 0) {
			get(pannellumViewer).setYaw(round(Number(get(hotSpotsInSelectedScene)[hotSpotIndex].yaw)));
			get(pannellumViewer).setPitch(
				round(Number(get(hotSpotsInSelectedScene)[hotSpotIndex].pitch))
			);
		}
	}
});

selectedScene.subscribe((sceneId) => {
	if (
		sceneId &&
		get(pannellumViewer) &&
		get(viewerSettings).developmentMode &&
		get(viewerSettings).lookAtSelected
	) {
		get(pannellumViewer).loadScene(sceneId);
		if (get(scenes)[get(selectedScene)].hotSpots.length > 0) {
			selectedHotSpot.set(get(scenes)[get(selectedScene)].hotSpots[0].id);
		}
	}
});

function isUniqueId(id: string): boolean {
	for (const [key, scene] of Object.entries(get(scenes))) {
		if (scene.hotSpots && scene.hotSpots.some((hotSpot) => hotSpot.id === id)) {
			return false;
		}
	}
	return true;
}

export function currentYawPitch(): { yaw: number; pitch: number } {
	let yaw = round(get(pannellumViewer).getYaw());
	let pitch = round(get(pannellumViewer).getPitch());
	return { yaw: yaw, pitch: pitch };
}

// HOTSPOTS
export function addHotSpot(hotSpotConfig: HotSpot, sceneId: string) {
	const isValidId = /^[a-zA-Z0-9_-]+$/.test(hotSpotConfig.id);

	hotSpotConfig.yaw = round(hotSpotConfig.yaw);
	hotSpotConfig.pitch = round(hotSpotConfig.pitch);

	if (!isValidId) {
		Warn('ID must only contain letters, numbers, hyphens, and underscores.');
		return false;
	} else if (!isUniqueId(hotSpotConfig.id)) {
		Warn('ID must be unique. This ID is already in use.');
		return false;
	} else {
		if (get(pannellumViewer).addHotSpot(hotSpotConfig, sceneId)) {
			scenes.set(get(scenes));
			return true;
		} else {
			throw new Error(`Failed to add hotspot '${hotSpotConfig.id}'.`);
		}
	}
}

export function removeHotSpot(id: string, sceneId: string) {
	if (get(pannellumViewer).removeHotSpot(id, sceneId)) {
		scenes.set(get(scenes));

		if (get(selectedHotSpot) === id) {
			selectedHotSpot.set('');
		}
		return true;
	} else {
		throw new Error(`Failed to remove hotspot '${id}'.`);
	}
}

export function editHotSpot(
	hotSpotConfig: HotSpot,
	sceneId: string,
	oldHotSpotConfig?: HotSpot,
	oldSceneId?: string
) {
	oldSceneId = oldSceneId || sceneId;
	oldHotSpotConfig = oldHotSpotConfig || hotSpotConfig;

	console.log(oldSceneId, sceneId);

	const isValidId = /^[a-zA-Z0-9_-]+$/.test(hotSpotConfig.id);

	hotSpotConfig.yaw = round(hotSpotConfig.yaw);
	hotSpotConfig.pitch = round(hotSpotConfig.pitch);

	if (!isValidId) {
		Warn('ID must only contain letters, numbers, hyphens, and underscores.');
		return false;
	} else {
		console.log(hotSpotConfig);
		console.log(oldSceneId);
		if (get(pannellumViewer).removeHotSpot(hotSpotConfig.id, oldSceneId)) {
			if (get(pannellumViewer).addHotSpot(hotSpotConfig, sceneId)) {
				selectedScene.set(sceneId);
				selectedHotSpot.set(hotSpotConfig.id);
				scenes.set(get(scenes));
				return true;
			} else {
				throw new Error(`Failed to add hotspot '${hotSpotConfig.id}'.`);
			}
		} else {
			throw new Error(`Failed to remove hotspot '${hotSpotConfig.id}'.`);
		}
	}
}

// SCENES
export function addScene(sceneId: string, sceneConfig: Scene) {
	const isValidId = /^[a-zA-Z0-9_-]+$/.test(sceneId);
	const isUniqueId = !get(scenes).hasOwnProperty(sceneId);

	if (!isValidId) {
		Warn('ID must only contain letters, numbers, hyphens, and underscores.');
		return false;
	} else if (!isUniqueId) {
		Warn('ID must be unique. This ID is already in use.');
		return false;
	} else {
		if (get(pannellumViewer).addScene(sceneId, sceneConfig)) {
			scenes.set(get(scenes));
			selectedScene.set(sceneId);
			return true;
		} else {
			throw new Error(`Failed to add scene '${sceneId}'.`);
		}
	}
}

export function removeScene(id: string, skipChecks = false) {
	let newSelectedScene = '';
	if (id === get(selectedScene) || id === get(pannellumViewer).getScene()) {
		newSelectedScene = Object.keys(get(scenes)).find((sceneId) => sceneId !== id) || '';
		selectedScene.set(newSelectedScene);
		get(pannellumViewer).loadScene(newSelectedScene);
	}

	if (!skipChecks && id === get(pannellumSetup).firstScene) {
		initialConfig.update((value) => {
			value.firstScene = get(selectedScene) || '';
			return value;
		});
	}

	const checkSceneInterval = setInterval(() => {
		if (get(pannellumViewer).getScene() !== id) {
			clearInterval(checkSceneInterval);

			if (get(pannellumViewer).removeScene(id)) {
				scenes.set(get(scenes));
				return true;
			} else {
				throw new Error(`Failed to remove scene '${id}'.`);
			}
		}
		selectedScene.set(newSelectedScene);
	}, 100);
	return false;
}
