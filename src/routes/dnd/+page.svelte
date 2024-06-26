<script lang="ts">
	import Board from './Board.svelte';
	let columnsData = [
		{
			id: 'c1',
			name: 'TODO',
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
			name: 'DOING',
			items: [
				{ id: 10, name: 'item50' },
				{ id: 11, name: 'item51' }
			]
		},
		{
			id: 'c3',
			name: 'DONE',
			items: [{ id: 13, name: 'item52' }]
		}
	];
	function handleBoardUpdated(newColumnsData: any) {
		// if you wanted to update a database or a server, this is where you would do it
		columnsData = newColumnsData;
	}
</script>

<h2>Board</h2>
<h5>(svelte-dnd-action example)</h5>
<p>
	This is an exmaple for a board with draggable columns and items. <br />
	Notice that the scroll position is not maintained if you first scroll down in the first column and
	then drag it. This is because I wanted to keep this example super clear. To maintain scroll position
	you will need to save it per column. See
	<a href="https://svelte.dev/repl/eb2f5988bd2f46488810606c1fb13392?version=3.29.4">this example</a
	>.
</p>
<br />
<hr />
<br />
<Board columns={columnsData} onFinalUpdate={handleBoardUpdated} />
