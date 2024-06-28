<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let props: Record<string, any> = {};
</script>

<li class={cn('mt-2', className)} {...props}>
	<slot />
</li>
