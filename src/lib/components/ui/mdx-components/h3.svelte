<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let props: Record<string, any> = {};
</script>

<h3 class={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...props}>
	<slot />
</h3>
