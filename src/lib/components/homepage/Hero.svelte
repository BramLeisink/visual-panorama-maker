<script>
	import { Github } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import HeroCards from './HeroCards.svelte';
</script>

<section class="container grid place-items-center gap-10 py-20 md:py-32 lg:grid-cols-2">
	<div class="z-10 space-y-6 text-center lg:text-start">
		<main class="text-5xl font-bold md:text-6xl">
			<h1 class="inline">
				<span
					class="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] bg-clip-text text-transparent"
				>
					Visual
				</span>{' '}
				panorama maker
			</h1>
			{' '}
			for{' '}
			<h2 class="inline">
				<a
					rel="noreferrer noopener"
					target="_blank"
					href="https://github.com/mpetroff/pannellum"
					class="inline border-[#61DAFB] bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] bg-clip-text text-primary text-transparent transition-all hover:border-b-2"
				>
					Pannellum
				</a>
			</h2>
		</main>

		<p class="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0">
			Create interactive and customizable 360-degree tours, all from within an intuitive web interface.
		</p>

		<div class="space-y-4 md:space-x-4 md:space-y-0">
			<Button class="w-full md:w-1/3" href="/editor">View Demo</Button>
			<Button
				rel="noreferrer noopener"
				href="https://github.com/BramLeisink/visual-panorama-maker"
				target="_blank"
				class="w-full md:w-1/3"
				variant="outline"
			>
				<Github class="mr-2 h-4 w-4" /> GitHub Repository
			</Button>
		</div>
	</div>

	<div class="z-10">
		<HeroCards />
	</div>

	<div class="shadow"></div>
</section>

<style>
	/* HeroCards background shadow */
	.shadow {
		position: absolute;
		background: hsl(var(--primary) / 0%);
		border-radius: 24px;
		rotate: 35deg;
		width: 260px;
		top: 200px;
		height: 400px;
		filter: blur(150px);
		animation: shadow-slide infinite 4s linear alternate;
	}

	@keyframes shadow-slide {
		from {
			background: hsl(var(--primary) / 20%);
			right: 460px;
		}
		to {
			background: hsl(var(--primary) / 80%);
			right: 160px;
		}
	}

	@media (max-width: 1024px) {
		.shadow {
			top: 70px;
		}

		@keyframes shadow-slide {
			from {
				background: hsl(var(--primary) / 20%);
				right: 460px;
			}
			to {
				background: hsl(var(--primary) / 50%);
				right: 160px;
			}
		}
	}

	@media (max-width: 768px) {
		.shadow {
			top: 70px;
			width: 100px;
			height: 350px;
			filter: blur(60px);
		}

		@keyframes shadow-slide {
			from {
				background: hsl(var(--primary) / 20%);
				right: 280px;
			}
			to {
				background: hsl(var(--primary) / 30%);
				right: 100px;
			}
		}
	}
</style>
