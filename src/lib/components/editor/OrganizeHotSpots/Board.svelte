<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import Column from './Column.svelte';
	const flipDurationMs = 300;

	export let columns: any;
	// will be called any time a card or a column gets dropped to update the parent data
	export let onFinalUpdate: any;

	function handleDndConsiderColumns(e: any) {
		columns = e.detail.items;
	}
	function handleDndFinalizeColumns(e: any) {
		onFinalUpdate(e.detail.items);
	}
	function handleItemFinalize(columnIdx: number, newItems: any) {
		columns[columnIdx].items = newItems;
		onFinalUpdate([...columns]);
	}
</script>

<section
	class="container flex flex-row justify-center gap-2 overflow-y-hidden overflow-x-scroll rounded-lg"
	use:dndzone={{
		items: columns,
		flipDurationMs,
		type: 'column'
	}}
	on:consider={handleDndConsiderColumns}
	on:finalize={handleDndFinalizeColumns}
>
	{#each columns as { id, name, items }, idx (id)}
		<div class="h-full w-80" animate:flip={{ duration: flipDurationMs }}>
			<Column {name} {items} onDrop={(newItems) => handleItemFinalize(idx, newItems)} />
		</div>
	{/each}
</section>
