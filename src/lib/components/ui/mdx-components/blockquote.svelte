<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
	export let props: Record<string, any> = {};
</script>

<blockquote class={cn('mt-6 border-l-2 pl-6 italic text-muted [&>*]:text-muted-foreground', className)} {...props}>
	<slot />
</blockquote>
