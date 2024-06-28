<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let props: Record<string, any> = {};
</script>

<h1
	class={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
	{...props}
>
	<slot />
</h1>
