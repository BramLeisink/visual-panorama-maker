<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Github } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	export let dialogOpen = false;
</script>

<AlertDialog.Root open={dialogOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Beta Version</AlertDialog.Title>
			<AlertDialog.Description>
				This application is currently in beta, so there may be some bugs. Your feedback helps
				improve it! If you encounter any issues, please consider <a
					href="https://github.com/BramLeisink/visual-panorama-maker/issues"
					target="_blank"
					class="text-blue-600 hover:underline">opening an issue on GitHub</a
				>.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<Button
				variant="secondary"
				href="https://github.com/BramLeisink/visual-panorama-maker"
				target="_blank"
			>
				<Github class="mr-2 h-4 w-4" /> View on GitHub
			</Button>
			<AlertDialog.Action>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
