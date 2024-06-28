<script>
	import Footer from '$lib/components/homepage/Footer.svelte';
	import Navbar from '$lib/components/homepage/Navbar.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index';
	import { page } from '$app/stores'; // Importing the page store to access the current URL

	export let data;

	// Reactive statement to check if the current href matches the current URL
	$: currentPath = $page.url.pathname;
</script>

<div class="flex min-h-screen flex-col">
	<Navbar />
	<div class="container flex-1">
		<div
			class="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10"
		>
			<aside
				class="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10"
			>
				{#each Object.entries(data.categorizedPosts) as [folder, posts]}
					<div class="pb-8">
						<h4 class="mb-1 rounded-md px-2 py-1 text-sm font-bold capitalize">{folder}</h4>
						<div class="grid grid-flow-row auto-rows-max text-sm">
							{#each posts as post}
								<a
									class="flex w-full items-center rounded-md p-2 hover:underline {currentPath ===
									post.slug
										? 'bg-muted'
										: ''}"
									href={post.slug}>{post.title}</a
								>
							{/each}
						</div>
					</div>
				{/each}
			</aside>
			<div class="relative py-6 lg:gap-10 lg:py-10 xl:grid xl:grid-cols-[1fr_300px]">
				<div class="mx-auto w-full min-w-0">
					<slot />
				</div>
				<div class="hidden text-sm xl:block">
					<div class="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
						<div class="space-y-2">
							<p class="font-medium">On This Page</p>
							<ul class="m-0 list-none">
								<li class="mt-0 pt-2">
									<a
										href="#features"
										class="inline-block text-sm text-muted-foreground no-underline">Features</a
									>
									<ul class="m-0 list-none pl-4">
										<li class="mt-0 pt-2">
											<a
												href="#documentation"
												class="inline-block text-sm text-muted-foreground no-underline"
												>Documentation</a
											>
										</li>
										<li class="mt-0 pt-2">
											<a
												href="#marketing"
												class="inline-block text-sm text-muted-foreground no-underline">Marketing</a
											>
										</li>
										<li class="mt-0 pt-2">
											<a href="#app" class="inline-block text-sm text-muted-foreground no-underline"
												>App</a
											>
										</li>
										<li class="mt-0 pt-2">
											<a
												href="#blog"
												class="inline-block text-sm text-muted-foreground no-underline">Blog</a
											>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Footer />
</div>
