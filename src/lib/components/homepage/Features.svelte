<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Card from '$lib/components/ui/card/index';

	// Import your Svelte components here

	import MultipleScenes from './features/MultipleScenes.svelte';
	import CustomizeHotSpots from './features/CustomizeHotSpots.svelte';
	import ExportToPannellum from './features/ExportToPannellum.svelte';

	interface FeatureProps {
		title: string;
		description: string;
		component: any; // Specify the component type
	}

	const features: FeatureProps[] = [
		{
			title: 'Multiple Scenes',
			description:
				'Create dynamic virtual tours with multiple scenes, allowing users to seamlessly navigate between different them.',
			component: MultipleScenes
		},
		{
			title: 'Customize HotSpots using TailwindCSS',
			description:
				'Personalize interactive elements with ease, and fully customize their appearance using TailwindCSS.',
			component: CustomizeHotSpots
		},
		{
			title: 'Export to Pannellum',
			description:
				'Easily export your completed virtual tours to Pannellum, and place them onto your own site.',
			component: ExportToPannellum
		}
	];

	const featureList: string[] = [
		'Customize Hotspots',
		'Multiple Scenes',
		'Export to Pannellum',
		'Easy-to-Use Interface',
		'TailwindCSS Support',
		'High Resolution Support'
	];
</script>

<section id="features" class="container space-y-8 py-24 sm:py-32">
	<h2 class="text-3xl font-bold md:text-center lg:text-4xl">
		Many{' '}
		<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
			Great Features
		</span>
	</h2>

	<div class="flex flex-wrap gap-4 md:justify-center">
		{#each featureList as feature}
			<div>
				<Badge variant="secondary" class="text-sm">
					{feature}
				</Badge>
			</div>
		{/each}
	</div>

	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each features as feature}
			<Card.Root>
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
	</div>
</section>
