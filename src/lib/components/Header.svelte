<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index';
	import { resetMode, setMode } from 'mode-watcher';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	import { viewerSettings } from '$lib/storedInfo';
	import Separator from './ui/separator/separator.svelte';
	import MenubarLabel from './ui/menubar/menubar-label.svelte';
	import Switch from './ui/switch/switch.svelte';
	import Label from './ui/label/label.svelte';
	import { Github } from 'lucide-svelte';

	let mode: string | undefined;
</script>

<Menubar.Root class="flex w-full flex-row rounded-none border-0 border-b">
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				<input type="file" id="image" accept="image/*" hidden />
				<label style="width: 100%; cursor: pointer;" for="image">Insert image</label>
				<Menubar.Shortcut>⌘I</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>
				<input type="file" id="video" accept="video/*" hidden />
				<label style="width: 100%; cursor: pointer;" for="video">Insert video</label>
				<Menubar.Shortcut>⌘V</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item href="https://github.com/BramLeisink/visual-panorama-maker"
				><Github class="w-4 h-4 mr-2" /> Github</Menubar.Item
			>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Edit</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>
				Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Sub>
				<Menubar.SubTrigger>Precision</Menubar.SubTrigger>
				<Menubar.SubContent>
					<Menubar.RadioGroup bind:value={$viewerSettings.precision}>
						<Menubar.RadioItem value="0">0</Menubar.RadioItem>
						<Menubar.RadioItem value="1">1</Menubar.RadioItem>
						<Menubar.RadioItem value="2">2</Menubar.RadioItem>
						<Menubar.RadioItem value="3">3</Menubar.RadioItem>
					</Menubar.RadioGroup>
				</Menubar.SubContent>
			</Menubar.Sub>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content>
			<MenubarLabel>Panorama settings</MenubarLabel>
			<Menubar.CheckboxItem bind:checked={$viewerSettings.compass}
				>Show compass</Menubar.CheckboxItem
			>
			<Menubar.CheckboxItem bind:checked={$viewerSettings.autoRotate}>Rotate</Menubar.CheckboxItem>
			<Menubar.Separator />
			<MenubarLabel>Developer mode</MenubarLabel>
			<Menubar.CheckboxItem bind:checked={$viewerSettings.lookAtSelected}
				>Look at selected HotSpot</Menubar.CheckboxItem
			>

			<Menubar.Separator />
			<Menubar.Sub>
				<Menubar.SubTrigger>Switch color mode</Menubar.SubTrigger>
				<Menubar.SubContent>
					<Menubar.RadioGroup value={mode}>
						<Menubar.RadioItem
							on:click={function () {
								setMode('light');
								mode = 'light';
							}}
							value="light">Light</Menubar.RadioItem
						>
						<Menubar.RadioItem
							on:click={function () {
								setMode('dark');
								mode = 'dark';
							}}
							value="dark">Dark</Menubar.RadioItem
						>
						<Menubar.RadioItem
							on:click={function () {
								resetMode();
								mode = 'system';
							}}
							value="">System</Menubar.RadioItem
						>
					</Menubar.RadioGroup>
				</Menubar.SubContent>
			</Menubar.Sub>
		</Menubar.Content>
	</Menubar.Menu>
	<div class="flex-1"></div>
	<div class="flex items-center space-x-2 px-2">
		<Label for="devMode">Development Mode</Label>
		<Switch id="devMode" bind:checked={$viewerSettings.developmentMode} />
	</div>
</Menubar.Root>
