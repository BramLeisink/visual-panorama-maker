<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index';
	import { resetMode, setMode } from 'mode-watcher';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	let mode: string;
</script>

<Menubar.Root>
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
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>Switch color mode</Menubar.Item>
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
					value="undefined">System</Menubar.RadioItem
				>
			</Menubar.RadioGroup>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
