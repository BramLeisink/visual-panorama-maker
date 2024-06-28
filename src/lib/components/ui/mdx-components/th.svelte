<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let props: Record<string, any> = {};
</script>

<th
	class={cn(
		'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
		className
	)}
	{...props}
>
	<slot />
</th>
