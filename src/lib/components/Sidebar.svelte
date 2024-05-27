<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';

	const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
</script>

<div class="h-full overflow-y-auto max-h-screen">
	<Tabs.Root value="hotspots" class="w-full">
		<Tabs.List class="grid w-full grid-cols-2">
			<Tabs.Trigger value="hotspots">Hotspots</Tabs.Trigger>
			<Tabs.Trigger value="customize">Customize</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="hotspots">
			<Card.Root>
				<Card.Header>
					<Card.Title>Default hotspots</Card.Title>
					<Card.Description>
						Drag and drop these default hotspots into your image, you can always customize them
						later.
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<div class="flex flex-wrap items-center justify-center gap-2">
						{#each { length: 12 } as _, i}
							<Skeleton class="h-24 w-24 rounded" />
						{/each}
					</div>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="customize">
			<Card.Root>
				<Card.Header>
					<Card.Title>Customize hotspot</Card.Title>
					<Card.Description>
						Change the look and behaviour of the currently selected hotspot
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-2">
					<div class="space-y-1">
						<Label for="hotspot-name">Name</Label>
						<Input id="hotspot-name" type="text" />
					</div>
					<div class="space-y-1">
						<Label for="hotspot-tooltip">Tooltip</Label>
						<Input id="hotspot-tooltip" type="text" />
					</div>
					<div class="space-y-1">
						<Label for="hotspot-color">Color</Label>
						<Input id="hotspot-color" type="color" />
					</div>
				</Card.Content>
				<Card.Footer>
					<Button>Save changes</Button>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</div>
