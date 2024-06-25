<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Github } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';

	export let dialogOpen = false;
</script>

<AlertDialog.Root open={dialogOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Beta Version</AlertDialog.Title>
			<AlertDialog.Description>
				This is a work in progress, and there might still be some bugs.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<Button
				variant="secondary"
				href="https://github.com/BramLeisink/visual-panorama-maker"
				target="_blank"><Github class="mr-2 h-4 w-4" /> GitHub</Button
			>
			<AlertDialog.Action>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
