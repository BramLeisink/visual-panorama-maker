<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Toggle } from '$lib/components/ui/toggle/index';
	import * as Select from '$lib/components/ui/select/index';

	import panoramaImage from '$lib/assets/equirectangular.webp';
	import tooltipHotsop from '$lib/assets/tooltip-hotspot.png';

	import { Locate } from 'lucide-svelte';

	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { PackagePlus } from 'lucide-svelte';
	import Slide from '../../Slide.svelte';

	let locationPickerOn = false;

	const scenes = {
		house: { title: 'House' },
		busStop: { title: 'Bus Stop' }
	};

	const hotSpotTypes = {
		scene: 'Scene',
		info: 'Info',
		custom: 'Custom'
	};

	let type = 'scene';

	let selectedScene = 'busStop';
</script>

<div class="flex flex-row gap-4 items-center">
	<img
		alt="Panorama"
		class="h-full w-[400px] rounded-xl"
		src="https://miro.medium.com/v2/resize:fit:644/1*d7Xs5RnaqcQtKzbNrAOAYA.png"
	/>
	<div class="w-full text-xl">
		<div class="space-y-1">
			<Label for="cssclass">Css Classes (tailwindCSS)</Label>
			<Textarea
				id="cssclass"
				class="w-full text-2xl"
				value="w-5 h-5 bg-green-300 hover:bg-green-500 rounded border-4 border-red-500 transition-all"
			/>
		</div>
	</div>
</div>
<!-- <Tabs.Root value="settings" class="w-full">
	<Tabs.List class="grid w-full grid-cols-3 shadow">
		<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
		<Tabs.Trigger value="appearance">Appearance</Tabs.Trigger>
		<Tabs.Trigger value="interactivity">Interactivity</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="settings">
		<div class="flex flex-row items-center justify-center gap-4">

			<div class="w-[400px] text-xl">
				<ul>
					<li>Naam</li>
					<li>Scene</li>
					<li>Yaw & Pitch</li>
					<li>Tooltip</li>
				</ul>
			</div>
		</div>
	</Tabs.Content>
	<Tabs.Content value="appearance">
		<div class="flex flex-row gap-4">
			<div class="w-[400px]"></div>
			<img
				alt="Panorama"
				class="w-full rounded-xl border object-cover shadow-black/10 drop-shadow-xl dark:shadow-white/10"
				src={panoramaImage}
			/>
		</div>
	</Tabs.Content>
	<Tabs.Content value="interactivity">
		<div class="flex flex-row gap-4">
			<div class="w-[400px]"></div>
			<img
				alt="Panorama"
				class="h-full rounded-xl border object-cover shadow-black/10 drop-shadow-xl dark:shadow-white/10"
				src={panoramaImage}
			/>
		</div>
	</Tabs.Content>
</Tabs.Root> -->
