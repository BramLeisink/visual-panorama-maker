<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let props: Record<string, any> = {};
</script>

<tr class={cn('m-0 border-t p-0 even:bg-muted', className)} {...props}>
	<slot />
</tr>
