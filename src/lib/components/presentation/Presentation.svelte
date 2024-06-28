<script lang="ts">
	import Slide from './Slide.svelte';
	import Home from './slides/Home.svelte';
	import Features from './slides/Features.svelte';
	import HowItWorks from './slides/HowItWorks.svelte';
	import FirstSlide from './slides/FirstSlide.svelte';
	import Button from '../ui/button/button.svelte';
	import PanoramaPreview from '../editor/PanoramaPreview.svelte';

	import panoramaImage from '$lib/assets/equirectangular.webp';
	import idee1 from '$lib/assets/004d8556-715f-4f3f-9c03-734e874b2136.jpeg'
	import idee2 from '$lib/assets/3bbb5a11-8db1-4adc-ba81-b93cf024f99b.jpeg'
	import idee3 from '$lib/assets/b5bd6396-00c6-4fc5-b16f-84f9c2b0031b.jpeg'
	import idee4 from '$lib/assets/c975d98b-961f-49ee-be24-2d4179b34d98.jpeg'
</script>

<Slide><FirstSlide /></Slide>
<Slide animate backgroundImage="https://www.norte.nu/images/uploads/photos/_medium/header.jpg"
	><p class="text-5xl font-bold">Achtergrond van de opdracht</p>
	<div class="flex items-center justify-center">
		<div class="rounded-lg bg-primary p-4">
			<img
				class=""
				src="https://www.norte.nu/images/uploads/photos/_resize/NorteUitgeverij_resize_d35f16e07c5653169c346ac31ba4c61e.png"
				alt="logo"
			/>
		</div>
	</div></Slide
>
<Slide
	animate
	backgroundImage="https://www.norte.nu/images/uploads/photos/_thumbnail/NaSk_header.jpg"
	backgroundOpacity={0.4}
>
	<p class="text-5xl font-bold">Achtergrond van de opdracht</p>
	<ul>
		<li class="text-xl">Motiveren brugklassers</li>
		<li class="text-xl">Zelf laten ontdekken</li>
		<li class="text-xl">Toevoegen van easter eggs</li>
		<li class="text-xl">Kleine spelletjes per hoofdstuk</li>
	</ul>
</Slide>
<Slide><p class="text-5xl font-bold">Onze spelideeën uitgelegd</p></Slide>
<Slide
	><p class="text-5xl font-bold">Basismodule (metriek)</p>
	<div class="flex items-center justify-center">
		<img
			alt="Panorama"
			class="h-full rounded-xl border object-cover shadow-black/10 drop-shadow-xl dark:shadow-white/10"
			src={idee3}
		/>
	</div>
</Slide>
<Slide
	><p class="text-5xl font-bold">Elektrische energie</p>
	<div class="flex items-center justify-center">
		<img
			alt="Panorama"
			class="h-full rounded-xl border object-cover shadow-black/10 drop-shadow-xl dark:shadow-white/10"
			src={idee2}
		/>
	</div>
</Slide>
<Slide
	><p class="text-5xl font-bold">Thermische energie</p>
	<div class="flex items-center justify-center">
		<img
			alt="Panorama"
			class="h-full rounded-xl border object-cover shadow-black/10 drop-shadow-xl dark:shadow-white/10"
			src={idee1}
		/>
	</div>
</Slide>
<Slide
	><p class="text-5xl font-bold">Chemische energie</p>
	<div class="flex items-center justify-center">
		<img
			alt="Panorama"
			class="h-full rounded-xl border object-cover shadow-black/10 drop-shadow-xl dark:shadow-white/10"
			src={idee4}
		/>
	</div>
</Slide>
<Slide><p class="text-5xl font-bold">Waarom onze spelideeën effectief zijn</p></Slide>
<Slide><Home /></Slide>
<Slide
	><p class="text-5xl font-bold">Equirectangular panorama</p>
	<div class="flex items-center justify-center">
		<img
			alt="Panorama"
			class="h-full rounded-xl border object-cover shadow-black/10 drop-shadow-xl dark:shadow-white/10"
			src={panoramaImage}
		/>
	</div>
</Slide>
<Slide iframe="https://visual-panorama-maker.vercel.app/editor"></Slide>
<Slide>
	<HowItWorks />
</Slide>
<Slide>
	<Features />
</Slide>

<Slide iframe="https://visual-panorama-maker.vercel.app/" interactieve></Slide>

<Slide iframe="https://visual-panorama-maker.vercel.app/editor"></Slide>
