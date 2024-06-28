<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let props: Record<string, any> = {};
</script>

<code
	class={cn('relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm', className)}
	{...props}
>
	<slot />
</code>
