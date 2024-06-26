<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import panoramaImage from '$lib/assets/equirectangular.webp';

	import { CirclePlus, FileSliders, ImageUp, PackagePlus } from 'lucide-svelte';

	// Importeer hier je Svelte-componenten

	import Slide from '../Slide.svelte';

	const features = [
		{
			icon: ImageUp,
			title: 'Upload panoramische afbeeldingen',
			description:
				'Upload afbeeldingen van hoge kwaliteit op verschillende locaties.'
		},
		{
			icon: PackagePlus,
			title: 'Maak meerdere scènes',
			description:
				'Bouw rondleidingen met meerdere scènes om verschillende plekken te verkennen.'
		},
		{
			icon: CirclePlus,
			title: 'Voeg interactieve hotspots toe',
			description: "Plaats interactieve hotspots in panorama's voor extra informatie of links."
		},
		{
			icon: FileSliders,
			title: 'Exporteer rondleidingen',
			description:
				'Exporteer rondleidingen in verschillende formaten voor naadloze integratie met Pannellum.'
		}
	];
</script>

<div class="flex w-full flex-col items-center justify-center">
	<p class="text-5xl font-bold">
		Hoe{' '}
		<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
			Werkt Het?
		</span>
	</p>
	<p class="w-full text-center text-xl text-muted-foreground md:w-3/4">
		Ontdek de eenvoudige stappen om meeslepende 360-graden rondleidingen te maken met Visual
		Panorama Maker.
	</p>
</div>

<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
	{#each features as feature}
		<div class="rounded-xl border bg-muted/50 p-2">
			<p class="grid place-items-center gap-4 font-bold">
				<svelte:component this={feature.icon} class="h-10 w-10 text-primary" />
				{feature.title}
			</p>
			<p class="italic">{feature.description}</p>
		</div>
	{/each}
</div>
