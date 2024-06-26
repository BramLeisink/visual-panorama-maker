<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Check, Github, Lightbulb, Link, CirclePlus } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import MultipleScenes from './features/MultipleScenes.svelte';

	import panoramaImage from '$lib/assets/equirectangular.webp';
</script>

<div class="relative hidden h-[500px] w-[700px] flex-row flex-wrap gap-8 lg:flex">
	<img
		alt="Panorama"
		class="absolute -top-[15px] h-[150px] w-[340px] rounded-xl border object-cover shadow-black/10 drop-shadow-xl dark:shadow-white/10"
		src={panoramaImage}
	/>

	<Card.Root
		class="absolute right-[20px] top-4 flex w-80 flex-col items-center justify-center shadow-black/10 drop-shadow-xl dark:shadow-white/10"
	>
		<Card.Header class="mt-8 flex items-center justify-center pb-2">
			<img
				src="https://avatars.githubusercontent.com/u/1450212"
				alt="user avatar"
				class="absolute -top-12 aspect-square h-24 w-24 rounded-full object-cover grayscale-[0%]"
			/>
			<Card.Title class="text-center">Matthew Petroff</Card.Title>
			<Card.Description class="font-normal text-primary">Author of Pannellum</Card.Description>
		</Card.Header>

		<Card.Content class="pb-2 text-center">
			<p>
				This project is fully based on Pannellum, created by <span class="text-primary"
					>@mpetroff</span
				> in 2011.
			</p>
		</Card.Content>

		<Card.Footer>
			<div>
				<Button
					rel="noreferrer noopener"
					href="https://github.com/mpetroff"
					target="_blank"
					size="sm"
					variant="ghost"
					><span class="sr-only">Github icon</span>
					<Github class="h-5 w-5" /></Button
				>
				<Button
					rel="noreferrer noopener"
					href="https://x.com/petroffm"
					target="_blank"
					size="sm"
					variant="ghost"
				>
					<span class="sr-only">X icon</span>
					<svg
						role="img"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 fill-foreground"
					>
						<title>X</title>
						<path
							d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
						/>
					</svg></Button
				>

				<Button
					rel="noreferrer noopener"
					href="https://mpetroff.net/"
					target="_blank"
					variant="ghost"
					size="sm"
					><span class="sr-only">Website icon</span>
					<Link size="20" /></Button
				>
			</div>
		</Card.Footer>
	</Card.Root>

	<div
		class="absolute left-[50px] top-[150px] w-72 rounded-lg bg-background shadow-black/10 drop-shadow-xl dark:shadow-white/10"
	>
		<MultipleScenes />
	</div>

	<Card.Root
		class="absolute -right-[10px] bottom-[35px] h-[170px] w-[350px] p-4 shadow-black/10 drop-shadow-xl dark:shadow-white/10"
	>
		<Button
			variant="empty"
			class="flex h-full w-full items-center justify-center rounded-2xl border border-2 border-dashed text-center hover:border-muted-foreground"
		>
			<div>
				<div class="flex flex-col items-center justify-center">
					<CirclePlus class="mb-1 h-8 w-8 text-accent" />
					<h2 class="text-lg font-bold">Add HotSpot</h2>
					<p class="text-sm text-muted-foreground">Click to add your first hotspot.</p>
				</div>
			</div>
		</Button>
	</Card.Root>
</div>
