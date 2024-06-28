<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let props: Record<string, any> = {};
</script>

<p class={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props}>
	<slot />
</p>
