<script lang="ts">
	import Board from './Board.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import { Button } from '$lib/components/ui/button/index';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	export let dialogOpen = false;
	let columnsData = [
		{
			id: 'c1',
			name: 'Scene 1',
			items: [
				{ id: 1, name: 'item41' },
				{ id: 2, name: 'item42' },
				{ id: 3, name: 'item43' },
				{ id: 4, name: 'item44' },
				{ id: 5, name: 'item45' },
				{ id: 6, name: 'item46' },
				{ id: 7, name: 'item47' },
				{ id: 8, name: 'item48' },
				{ id: 9, name: 'item49' }
			]
		},
		{
			id: 'c2',
			name: 'Scene 2',
			items: [
				{ id: 10, name: 'item50' },
				{ id: 11, name: 'item51' },
				{ id: 20, name: 'item47' },
				{ id: 21, name: 'item48' },
				{ id: 22, name: 'item49' }
			]
		},
		{
			id: 'c3',
			name: 'Scene 3',
			items: [{ id: 13, name: 'item52' }]
		}
	];
	function handleBoardUpdated(newColumnsData: any) {
		// if you wanted to update a database or a server, this is where you would do it
		columnsData = newColumnsData;
	}
</script>

<Dialog.Root bind:open={dialogOpen}>
	<div class="max-h-2/3">
		<Dialog.Content class="min-w-fit">
			<Dialog.Header>
				<Dialog.Title>Organize Scenes and HotSpots <Badge class="ml-2">demo</Badge></Dialog.Title>
				<Dialog.Description>Drag and drop the hotspots to different scenes.</Dialog.Description>
			</Dialog.Header>
			<Board columns={columnsData} onFinalUpdate={handleBoardUpdated} />
			<Dialog.Footer>
				<Button>Save changes</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</div>
</Dialog.Root>
