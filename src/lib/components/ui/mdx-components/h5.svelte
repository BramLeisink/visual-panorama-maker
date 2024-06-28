<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let props: Record<string, any> = {};
</script>

<h5
	class={cn(
		'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
		className
	)}
	{...props}
>
	<slot />
</h5>
