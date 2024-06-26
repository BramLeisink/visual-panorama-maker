<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import panoramaImage from '$lib/assets/equirectangular.webp';

	// Import your Svelte components here

	import MultipleScenes from './features/MultipleScenes.svelte';
	import CustomizeHotSpots from './features/CustomizeHotSpots.svelte';
	import ExportToPannellum from './features/ExportToPannellum.svelte';
	import Slide from '../Slide.svelte';

	interface FeatureProps {
		title: string;
		description: string;
		component: any; // Specify the component type
	}

	const features: FeatureProps[] = [
		{
			title: 'Meerdere Scenes',
			description:
				'Create dynamic virtual tours with multiple scenes, allowing users to seamlessly navigate between different them.',
			component: MultipleScenes
		},
		{
			title: 'HotSpots aanpassen met TailwindCSS',
			description:
				'Personalize interactive elements with ease, and fully customize their appearance using TailwindCSS.',
			component: CustomizeHotSpots
		},
		{
			title: 'Exporteren naar Pannellum',
			description:
				'Easily export your completed virtual tours to Pannellum, and place them onto your own site.',
			component: ExportToPannellum
		}
	];

	const featureList: string[] = [
		'Aanpasbare hotspots',
		'Meerdere scènes',
		'Exporteren naar Pannellum',
		'Eenvoudige interface',
		'Ondersteuning voor TailwindCSS',
		'Ondersteuning voor hoge resolutie'
	];
</script>

<Slide animate>
	<p class="text-5xl font-bold">
		Veel{' '}
		<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
			Functies
		</span>
	</p>

	<li class="flex flex-wrap justify-center gap-2">
		{#each featureList as feature}
			<div>
				<Badge variant="secondary" class="text-sm">
					{feature}
				</Badge>
			</div>
		{/each}
	</li>
</Slide>

{#each features as feature}
	<Slide animate>
		<p class="text-5xl font-bold">
			Veel{' '}
			<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
				Functies
			</span>
		</p>

		<p class="text-3xl">{feature.title}</p>

		<svelte:component this={feature.component} />
	</Slide>
{/each}

<!-- <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each features as feature}
			<Card.Root headingLevel="h6">
				<Card.Header>
					<Card.Title>{feature.title}</Card.Title>
				</Card.Header>

				<Card.Content>{feature.description}</Card.Content>

				<Card.Footer class="w-full">
					<div class="w-full scale-75">
						<svelte:component this={feature.component} />
					</div>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div> -->
