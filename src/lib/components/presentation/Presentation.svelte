<script lang="ts">
	import Hero from '../homepage/Hero.svelte';
	import MultipleScenes from '../homepage/features/MultipleScenes.svelte';
	import Slide from './Slide.svelte';
	import Home from './slides/Home.svelte';
	import Features from './slides/Features.svelte';
	import HowItWorks from './slides/HowItWorks.svelte';
	import FirstSlide from './slides/FirstSlide.svelte';
	import Button from '../ui/button/button.svelte';
	import PanoramaPreview from '../editor/PanoramaPreview.svelte';

	import panoramaImage from '$lib/assets/equirectangular.webp';
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
<Slide><p class="text-5xl font-bold">Waarom onze spelideeën effectief zijn</p></Slide>
<Slide><Home /></Slide>
<Slide
	><p class="text-5xl font-bold">Equirectangular panorama</p>
	<img
		alt="Panorama"
		class="h-full rounded-xl border object-cover shadow-black/10 drop-shadow-xl dark:shadow-white/10"
		src={panoramaImage}
	/>
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
