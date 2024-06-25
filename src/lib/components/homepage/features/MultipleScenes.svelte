<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { PackagePlus, Trash2, Badge } from 'lucide-svelte';

	const scenes = {
		house: { title: 'House' },
		busStop: { title: 'Bus Stop' },
		supermarket: {title: 'Supermarket'}
	};

	let selectedScene = 'busStop';
	let firstScene = 'house';
</script>

<div
	class="flex-spread flex h-full w-full flex-col justify-between rounded-xl border p-1 p-4 shadow"
>
	<div class="flex flex-col gap-1 overflow-auto">
		<p class="text-lg font-semibold">Scenes</p>
		{#each Object.entries(scenes) as [key, scene]}
			<Button
				class="group flex items-center justify-between"
				variant={selectedScene === key ? 'secondary' : 'outline'}
				on:click={() => (selectedScene = key)}
			>
				<span>{scene.title || key}</span>
				{#if firstScene == key}
					<Badge class="ml-2 h-4 w-4 fill-primary stroke-none" />
				{/if}
				<div class="flex-1" />
				<Button variant="destructive" size="icon" class="h-6 w-6 opacity-0 group-hover:opacity-100">
					<Trash2 class="h-4 w-4" />
				</Button>
			</Button>
		{/each}
	</div>
	<div class="flex gap-2 pt-2">
		<Button class="flex-1">Edit scene</Button>
		<Button variant="outline" size="icon"><PackagePlus class="h-4 w-4" /></Button>
	</div>
</div>
