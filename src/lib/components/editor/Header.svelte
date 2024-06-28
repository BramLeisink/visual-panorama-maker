<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index';
	import { resetMode, setMode } from 'mode-watcher';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	import { viewerSettings } from '$lib/storedInfo';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import MenubarLabel from '$lib/components/ui/menubar/menubar-label.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Github } from 'lucide-svelte';
	import OrganizeHotSpots from './OrganizeHotSpots/Dialog.svelte';
	import Import from './Import.svelte';
	import { Item } from '../ui/accordion';
	import WipAlert from '../WipAlert.svelte';

	let mode: string | undefined;

	let organizeHotSpotsDialogOpen = false;
	let importDialogOpen = false;
	let wipDialogOpen = false;
</script>

<OrganizeHotSpots bind:dialogOpen={organizeHotSpotsDialogOpen} />
<Import bind:dialogOpen={importDialogOpen} class="hidden" />
<WipAlert bind:dialogOpen={wipDialogOpen} />

<Menubar.Root class="flex w-full flex-row rounded-none border-0 border-b">
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item on:click={() => (importDialogOpen = true)}>Import</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item on:click={() => (wipDialogOpen = true)}>About</Menubar.Item>
			<Menubar.Item href="https://github.com/BramLeisink/visual-panorama-maker"
				><Github class="mr-2 h-4 w-4" /> Github</Menubar.Item
			>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Edit</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item disabled>
				Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled>
				Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item on:click={() => (organizeHotSpotsDialogOpen = true)}
				>Organize HotSpots</Menubar.Item
			>
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
			<Menubar.CheckboxItem bind:checked={$viewerSettings.compass} disabled
				>Show compass</Menubar.CheckboxItem
			>
			<Menubar.CheckboxItem bind:checked={$viewerSettings.autoRotate} disabled
				>Rotate</Menubar.CheckboxItem
			>
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
