<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index';

	let mode="dark"
</script>

<Menubar.Root>
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				Insert image <Menubar.Shortcut>⌘I</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>
				Insert video <Menubar.Shortcut>⌘V</Menubar.Shortcut>
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
				<Menubar.RadioItem value="light"> Light</Menubar.RadioItem>
				<Menubar.RadioItem value="dark">Dark</Menubar.RadioItem>
				<Menubar.RadioItem value="undefined">System</Menubar.RadioItem>
			</Menubar.RadioGroup>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
