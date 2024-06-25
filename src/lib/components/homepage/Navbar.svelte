<script lang="ts">
	import { Github, Menu, Orbit } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Sheet from '$lib/components/ui/sheet/index';
	import ModeDropdown from './ModeDropdown.svelte';

	const links = [
		{ name: 'About', href: '#howItWorks' },
		{ name: 'Features', href: '#features' },
		{ name: 'Demo', href: '/editor' }
	];
</script>

<header
	class="sticky top-0 z-40 w-full border-b-[1px] bg-white dark:border-b-slate-700 dark:bg-background"
>
	<div class="container hidden items-center justify-between p-2 md:flex">
		<h2 class="flex h-full flex-row items-center text-xl font-bold">
			<Orbit class="mr-2 h-6 w-6 text-primary" />Visual Panorama Maker
		</h2>
		<div class="flex flex-row gap-2">
			{#each links as link}
				<Button href={link.href} variant="ghost">{link.name}</Button>
			{/each}
		</div>
		<div class="flex flex-row gap-2">
			<Button
				variant="secondary"
				rel="noreferrer noopener"
				href="https://github.com/BramLeisink/visual-panorama-maker"
				target="_blank"><Github class="mr-2 h-4 w-4" />Github</Button
			>
			<ModeDropdown />
		</div>
	</div>
	<div class="container flex items-center justify-between p-2 md:hidden">
		<h2 class="flex h-full flex-row items-center text-lg font-bold">
			<Orbit class="mr-2 h-5 w-5 text-primary" />Visual Panorama Maker
		</h2>
		<div class="flex flex-row gap-2">
			<ModeDropdown variant="ghost" />
			<Sheet.Root>
				<Sheet.Trigger>
					<Button variant="ghost" size="icon"><Menu /></Button>
				</Sheet.Trigger>
				<Sheet.Content side="left">
					<Sheet.Header>
						<Sheet.Title class="text-lg font-bold">Visual Panorama Maker</Sheet.Title>
					</Sheet.Header>
					<div class=" my-4 flex flex-col items-center gap-2">
						{#each links as link}
							<Button href={link.href} variant="ghost" class="">{link.name}</Button>
						{/each}
					</div>
					<Sheet.Footer>
						<div class="flex gap-2">
							<Button
								variant="secondary"
								rel="noreferrer noopener"
								href="https://github.com/BramLeisink/visual-panorama-maker"
								target="_blank"
								class="flex-1"><Github class="mr-2 h-4 w-4" />Github</Button
							>
							<ModeDropdown />
						</div>
					</Sheet.Footer>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</header>
