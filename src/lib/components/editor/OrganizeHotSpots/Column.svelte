<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import { Trash2 } from 'lucide-svelte';
	const flipDurationMs = 150;
	export let name: string;
	export let items: any;
	export let onDrop: any;

	function handleDndConsiderCards(e: any) {
		items = e.detail.items;
	}
	function handleDndFinalizeCards(e: any) {
		onDrop(e.detail.items);
	}
</script>

<Card.Root class="h-full w-full overflow-y-hidden">
	<Card.Header>
		<Card.Title>{name}</Card.Title>
		<Card.Description>Description</Card.Description>
	</Card.Header>
	<Card.Content>
		<div
			class="min-h-10 rounded-lg"
			use:dndzone={{ items, flipDurationMs, zoneTabIndex: -1 }}
			on:consider={handleDndConsiderCards}
			on:finalize={handleDndFinalizeCards}
		>
			{#each items as item (item.id)}
				<div class="" animate:flip={{ duration: flipDurationMs }}>
					<div
						class="group mb-1 inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					>
						<span>{item.name || item.id}</span>
						<div class="flex-1" />
						<Button
							variant="destructive"
							size="icon"
							class="h-6 w-6 opacity-0 group-hover:opacity-100"
						>
							<Trash2 class="h-4 w-4" />
						</Button>
					</div>
				</div>
			{/each}
		</div>
	</Card.Content>
</Card.Root>
