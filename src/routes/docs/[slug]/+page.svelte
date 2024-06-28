<script>
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { cn } from '$lib/utils';
	import { formatDate } from '$lib/utils';
	import { ChevronRight } from 'lucide-svelte';

	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<!-- Title -->

<div class="mx-auto w-full min-w-0">
	<div class="space-y-4">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Documentation</h1>
		<p class="text-xl text-muted-foreground">Welcome to the Taxonomy documentation.</p>
	</div>

	<hr class="my-4" />

	<!-- Tags -->

	<!-- Post -->
	<div class={`prose dark:prose-invert`}>
		<svelte:component this={data.content} />
	</div>

	<!-- <hr class="my-4 md:my-6" />
	<div class="flex flex-row items-center justify-between">
		<a
			class="ml-auto inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			href="/docs/documentation">Introduction<ChevronRight class="ml-2 h-4 w-4" /></a
		>
	</div> -->
</div>
