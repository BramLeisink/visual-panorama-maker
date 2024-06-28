<script>
	import { Github } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import HeroCards from '$lib/components/homepage/HeroCards.svelte';
</script>

<section class="container grid place-items-center gap-10 py-20 md:py-32 lg:grid-cols-2">
	<div class="z-20 space-y-6 text-center lg:text-start">
		<main class="text-6xl font-bold md:text-6xl">
			<p class="inline">
				<span
					class="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] bg-clip-text text-transparent"
				>
					Visual
				</span>{' '}
				panorama maker
			</p>
			{' '}
			for{' '}
			<h2 class="inline">
				<p
					class="inline border-[#61DAFB] bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] bg-clip-text text-primary text-transparent transition-all hover:border-b-2"
				>
					Pannellum
			</p>
			</h2>
		</main>

		<p class="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0">
			Maak interactieve en aanpasbare 360-graden rondleidingen, allemaal vanuit een intuïtieve webinterface.
		</p>
	</div>

	<div class="shadow z-1"></div>
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
