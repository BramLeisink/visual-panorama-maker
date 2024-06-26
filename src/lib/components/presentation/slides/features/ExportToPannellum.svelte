<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index';
	import * as Card from '$lib/components/ui/card/index';
	import { FileJson, TriangleAlert } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	let keepTailwind = true;

	const jsonWithTailwind = `{
  "type": "equirectangular",
  "panorama": "YOUR_IMAGE_HERE",
  "hotspots": [
    {
      "id": "MyHotspot",
      "yaw": 11.7,
      "pitch": -3.1,
      "type": "info",
      "text": "Click here",
      "URL": null,
      "cssClass": "w-5 h-5 bg-green-300 hover:bg-green-500 rounded border-4 border-red-500 transition-all"
    },
    {
      "id": "HotspotHouse",
      "yaw": -13.7,
      "pitch": 30.2,
      "type": "info",
      "text": "",
      "URL": null,
      "cssClass": ""
    }
  ]
}`;

	const jsonWithoutTailwind = `{
  "type": "equirectangular",
  "panorama": "YOUR_IMAGE_HERE",
  "hotspots": [
    {
      "id": "MyHotspot",
      "yaw": 11.7,
      "pitch": -3.1,
      "type": "info",
      "text": "Click here",
      "URL": null,
      "cssClass": "MyHotspot"
    },
    {
      "id": "HotspotHouse",
      "yaw": -13.7,
      "pitch": 30.2,
      "type": "info",
      "text": "",
      "URL": null,
      "cssClass": "HotspotHouse"
    }
  ]
}`;

	const css =
		'.MyHotspot {' +
		'height: 1.25rem;' +
		'width: 1.25rem;' +
		'border-radius: 0.25rem;' +
		'border-width: 4px;' +
		'border-color: rgb(239, 68, 68);' +
		'background-color: rgb(34, 197, 94);' +
		'transition-property: all;' +
		'transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);' +
		'transition-duration: 150ms;' +
		'}';
</script>

<div class="flex items-center justify-center">
	<Card.Root class="w-[600px] shadow">
		<Card.Header class="w-full">
			<Card.Title>Export to Pannellum</Card.Title>
		</Card.Header>
		<Card.Content class="space-y-2">
			<div class="flex items-center space-x-2">
				<Switch id="airplane-mode" bind:checked={keepTailwind} />
				<Label for="airplane-mode">Keep TailwindCSS classes</Label>
			</div>

			{#if !keepTailwind}
				<h3 class="text-lg font-bold">pannellum.config.json</h3>
				<Textarea placeholder="The final code goes here" value={jsonWithoutTailwind} />
				<h3 class="text-lg font-bold">
					pannellum-hotSpots.css <Badge variant="destructive" class="ml-2"
						><TriangleAlert class="mr-2 h-3 w-3" />Experimental</Badge
					>
				</h3>
				<Textarea placeholder="The final code goes here" value={css} />
			{:else}
				<h3 class="text-lg font-bold">
					<FileJson class="mr-1 inline h-4 w-4" /> pannellum.config.json
				</h3>
				<Textarea placeholder="The final code goes here" value={jsonWithoutTailwind} />
			{/if}
		</Card.Content>
		<Card.Footer>
			<div class="flex flex-wrap gap-2">
				<Button>Download</Button>
				<Button variant="secondary">Copy</Button>
			</div>
		</Card.Footer>
	</Card.Root>
</div>
