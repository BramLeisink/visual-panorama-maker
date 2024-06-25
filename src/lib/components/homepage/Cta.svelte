<script>
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<section id="cta" class="my-24 bg-muted/50 py-16 sm:my-32">
	<div class="container place-items-center lg:grid lg:grid-cols-2">
		<div class="lg:col-start-1">
			<h2 class="text-3xl font-bold md:text-4xl">
				Explore Your
				<span class="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
					Ideas & Concepts
				</span>
				in a 3D view
			</h2>
			<p class="mb-8 mt-4 text-xl text-muted-foreground lg:mb-0">
				Create immersive 360-degree tours and showcase your ideas seamlessly with Visual Panorama
				Maker. Whether for real estate, tourism, or education, bring your concepts to life.
			</p>
		</div>

		<div class="space-y-4 lg:col-start-2">
			<Button class="w-full md:w-auto" href="/editor">View the Demo</Button>
			<Button variant="outline" class="w-full md:w-auto" href="#features">Explore Features</Button>
		</div>
	</div>
</section>
